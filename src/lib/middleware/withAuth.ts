import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { defaultAuth } from '@/firebase/admin';
// import { adminApp } from '@/firebase/admin';
import { getAuth } from 'firebase/auth';

export function withAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
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
      console.log(error.errorInfo);
      const errorCode = error.errorInfo.code;
      error.status = 401;
      if (errorCode === 'auth/internal-error') {
        error.status = 500;
      }
      //TODO handlle firebase admin errors in more detail
      return res.status(error.status).json({ error: errorCode });
    }

    return handler(req, res);
  };
}
