import * as admin from 'firebase-admin';
import * as firebaseAccountCredentials from '../../serviceAccount.json';

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://cs554-a8ee8.firebaseio.com"
});
const permittedEnpoints = [{
	method: "POST",
	url: "/api/users"
}, {
	method: "GET",
	url: "/api/images"
}, {
	method: "GET",
	url: "download"
}]
async function decodeIDToken(req, res, next) {
	const header = req.headers?.authorization;
	if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
		const idToken = req.headers.authorization.split('Bearer ')[1];
		try {
			const decodedToken = await admin.auth().verifyIdToken(idToken);
			req['currentUser'] = decodedToken;
			next();
		} catch (err) {
			res.status(400).send(err.message);
		}
	} else {
		const endpoint = req.originalUrl;
		const method = req.method;
		const pe = permittedEnpoints.find(pe => {
			return (endpoint.includes(pe.url) && pe.method === method);
		})
		if (pe === undefined) {
			res.status(401).send("Please sigin to see the data");
		} else {
			next();
		}
	}
}

export { decodeIDToken };