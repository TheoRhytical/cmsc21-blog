export default function FormatDate({date}: {date: string}) {
	const dateObj = new Date(date);
	const formattedDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long'}).format(dateObj);
	return (
		<div style={{marginTop: '1rem'}}>
			{formattedDate}
		</div>
	);
}