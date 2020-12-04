// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

// automatically assign customer role on signup
// trigger function on new user creation.
// when a new user is created this fucntion is triggered. When triggered a defualt 
// data object is pushed to the roles collection, this object contains the user's role status
// exports.addUserRole = functions.auth.user().onCreate(async (authUser) => {

//     if (authUser.email) {
//         const customClaims = {
//             customer: true,
//         };
//         try {
//             var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)

//             return db.collection("roles").doc(authUser.uid).set({
//                 email: authUser.email,
//                 role: customClaims
//             })

//         } catch (error) {
//             console.log('🤡', error)
//         }


//     }
// });

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
        console.log('🤡', error)
    }

});
// create admin user on signup
exports.setAdmin = functions.https.onCall(async (data, context) => {
    console.log(`index.js - 43 - ❤️`, data);

    // if (!context.auth.token.admin) return
    if (!context.auth) return

    try {
        var _ = await admin.auth().setCustomUserClaims(data.uid, data.role)

        return db.collection("roles").doc(data.uid).set({
            email: data.email,
            role: data.role
        })

    } catch (error) {
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
        console.log('🤡', error)
    }

});