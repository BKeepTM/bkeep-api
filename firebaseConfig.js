const admin = require('firebase-admin');
const serviceAccount = require('./fkey.json');

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

export default messaging; 