import admin from 'firebase-admin';
import serviceAccount from './fkey.json' with { type: 'json' };

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

export default messaging;