// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

// create admin user on signup
exports.addUserRole = functions.https.onCall(async (data, context) => {

    // if (!context.auth.token.admin) return
    if (!context.auth) return

    try {
        var _ = await admin.auth().setCustomUserClaims(data.uid, data.role)

        return db.collection("roles").doc(data.uid).set({
            email: data.email,
            role: data.role
        })

    } catch (error) {
        // FIXME
        console.log('🤡', error)
    }

});
// create admin user on signup
exports.setAdmin = functions.https.onCall(async (data, context) => {
    // if (!context.auth.token.admin) return
    if (!context.auth) return

    try {
        var _ = await admin.auth().setCustomUserClaims(data.uid, data.role)

        return db.collection("roles").doc(data.uid).set({
            email: data.email,
            role: data.role
        })

    } catch (error) {
        // FIXME
        console.log('🤡', error)
    }

});

// this function can only be triggered by the admin. This function allows the admin to 
// set user roles accordingly.
exports.setUserRole = functions.https.onCall(async (data, context) => {

    if (!context.auth.token.admin) return

    try {
        var _ = await admin.auth().setCustomUserClaims(data.uid, data.role)

        return db.collection("roles").doc(data.uid).update({
            role: data.role
        })

    } catch (error) {
        // FIXME
        console.log('🤡', error)
    }

});