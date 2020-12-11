import * as admin from 'firebase-admin'; 
import * as firebaseAccountCredentials  from './serviceAccount.json';

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://cs554-a8ee8.firebaseio.com"
  });

async function decodeIDToken(req, res, next) {
const header = req.headers?.authorization;
if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
const idToken = req.headers.authorization.split('Bearer ')[1];
try {
	const decodedToken = await admin.auth().verifyIdToken(idToken);
	req['currentUser'] = decodedToken;
	} catch (err) {
	console.log(err);
	}
}
next();
}

export {decodeIDToken};