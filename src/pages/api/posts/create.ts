import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@/lib/middleware/withAuth';
import { defaultFirestore } from '@/firebase/admin';
import { Timestamp } from 'firebase-admin/firestore';
import { createRouter,  } from 'next-connect';
import { defaultAuth } from '@/firebase/admin';
import multer from 'multer';


export const config = {
  api: { bodyParser: false },
};

let filename: string;

const upload = multer({
	storage: multer.diskStorage({
		destination: './public/uploads/posts/',
    filename: (req, file, cb) => {
			console.log('file:', file.filename, file.fieldname, file);
			const fileExt = file.originalname.split('.')[1]
			const title = req.body.title.replace(/[^A-Za-z0-9]/g, '');
			filename = `${title}${Date.now()}.${fileExt}`;
			cb(null, filename);
		}
  }),
});


const router = createRouter<NextApiRequest & {url: string}, NextApiResponse>();

// Might be better to move all to .post method
// Find a way to validate multipart/form-data first before uploading
router
	.use(upload.single('img') as any)
	.use(async (req, res, next) => {
		const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).end('Not authenticated. No Auth header');
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = await defaultAuth.verifyIdToken(token);
      if (!decodedToken || !decodedToken.uid)
        return res.status(401).end('Not authenticated');
      req.body.uid = decodedToken.uid;
    } catch (error: any) {
      const errorCode = error.errorInfo.code;
      error.status = 401;
      if (errorCode === 'auth/internal-error') {
        error.status = 500;
      }
      //TODO handlle firebase admin errors in more detail
      return res.status(error.status).json({ error: errorCode });
    }
		next();
	})
	.post((req, res) => {
		const body = req.body;
		defaultFirestore.collection("posts").add({
			title: body.title,
			img: filename,
			content: body.content,
			uploaderUuid: body.uid,
			uploadDate: Timestamp.now()
		}).then(docRef => {
			console.log("Document written to `posts` with ID: " + docRef.id);
		}).catch(err => {
			console.log("Error writing to `posts`", err);
			res.status(500).json({
				message: "Error uploading new blog entry"
			});
		});
		res.status(200).json({
			data: 'Success'
		});
	})


// Firebase auth middleware
// https://dev.to/dingran/next-js-firebase-authentication-and-middleware-for-api-routes-29m1
export default router.handler({
	onError: (err: any, req, res) => {
    // console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});