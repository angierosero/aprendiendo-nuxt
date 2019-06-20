const functions = require('firebase-functions');
const slug = require('slug-generator')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });

 exports.onCreateProduct = functions.firestore
    .document("productos/{producto_id}")
    .onCreate((snap, context) => {
        let newData = snap.data()
        newData.slug = newData.nombre
        return snap.ref.set(newData)
    })
    
    // CAMBIA => onUpdate
    
