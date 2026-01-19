import admin from 'firebase-admin';
import serviceAccount from './fkey.json' with { type: 'json' };
import dotenv from 'dotenv'
dotenv.config();

serviceAccount.private_key=process.env.FIREBASE_PVT_KEY;
serviceAccount.private_key_id=process.env.FIREBASE_PVT_KEY_ID;
serviceAccount.client_email=process.env.FIREBASE_EMAIL;
serviceAccount.project_id=process.env.FIREBASE_PROJECT_ID;

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

export default messaging;