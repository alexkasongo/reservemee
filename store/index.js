import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/functions';
import { db } from '@/plugins/firebase';

export const state = () => ({
    // USER ACCOUNTS START
    user: '',
    userId: '',
    verificationSent: false,
    // USER ACCOUNTS END

    // LOADING & ERRORS
    signupError: '',
    // loading: false,
    alert: false
    // LOADING & ERRORS END
});

export const getters = {
    // USER ACCOUNTS START
    user: (state) => state.user,
    userId: (state) => state.userId,
    verificationSent: (state) => state.verificationSent,
    // USER ACCOUNTS END

    // LOADING & ERRORS
    signupError: (state) => state.signupError,
    // loading: (state) => state.loading,
    alert: (state) => state.alert
    // LOADING & ERRORS END
};

export const actions = {
    // USER ACCOUNTS START
    async loadUser({ commit }, payload) {
        commit('LOADED_USER', payload);
    },
    async loadUserId({ commit }, payload) {
        commit('LOADED_USER_ID', payload);
    },
    signup({ commit }, user) {
        commit('loaders/SET_LOADING', true, { root: true });
        console.log(`index.js - 46 - 🍎`, user);
        firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((response) => {
                if (response) {
                    const data = {
                        uid: response.user.uid,
                        role: user.role,
                        email: user.email
                    };
                    // call firebase cloud function - start
                    // const setAdmin = firebase
                    //     .functions()
                    //     .httpsCallable('addUserRole');
                    // // setAdmin(data)
                    //     .then((result) => {
                    //         commit('loaders/SET_LOADING', true, { root: true });
                    //         if (result) {
                    //             response.user
                    //                 .updateProfile({
                    //                     displayName: user.name
                    //                 })
                    //             this.$swal({
                    //                 toast: true,
                    //                 position: 'top-end',
                    //                 icon: 'success',
                    //                 title: 'Account created. Go ahead and signin.',
                    //                 showConfirmButton: true,
                    //                 timer: 60000
                    //             });
                    //             commit('loaders/SET_LOADING', false, { root: true });
                    //             this.$router.push('/store');
                    //         } else {
                    //             this.$swal({
                    //                 toast: true,
                    //                 position: 'top-end',
                    //                 icon: 'fail',
                    //                 title: 'Account failed to create. Try again.',
                    //                 showConfirmButton: true,
                    //                 timer: 60000
                    //             });
                    //         }
                    //     })
                    // call firebase cloud function - end

                    // add user role to firestore without cloud function - start
                    db.collection('roles')
                        .doc(data.uid)
                        .set({
                            uid: data.uid,
                            role: data.role,
                            email: data.email
                        })
                        .then(() => {
                            this.$swal({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Event added successfully.',
                                showConfirmButton: false,
                                timer: 3000
                            });
                        });
                    commit('loaders/SET_LOADING', false, { root: true });
                    this.$router.push('/store');
                    // add user role to firestore without cloud function - end
                }
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    async signupAdmin({ commit, dispatch }, user) {
        commit('loaders/SET_LOADING', true, { root: true });
        await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((response) => {
                if (response) {
                    const data = {
                        uid: response.user.uid,
                        role: user.role,
                        email: user.email
                    };
                    // use firebase cloud function

                    // const setAdmin = firebase
                    //     .functions()
                    //     .httpsCallable('setAdmin');
                    // setAdmin(data)
                    //     .then((result) => {
                    //         if (result) {
                    //             response.user.updateProfile({
                    //                 displayName: user.name
                    //             });
                    //             this.$swal({
                    //                 toast: true,
                    //                 position: 'top-end',
                    //                 icon: 'success',
                    //                 title:
                    //                     'Account created. Go ahead and signin.',
                    //                 showConfirmButton: true,
                    //                 timer: 60000
                    //             });
                    //             commit('loaders/SET_LOADING', false, {
                    //                 root: true
                    //             });
                    //         } else {
                    //             this.$swal({
                    //                 toast: true,
                    //                 position: 'top-end',
                    //                 icon: 'fail',
                    //                 title:
                    //                     'Account failed to create. Try again.',
                    //                 showConfirmButton: true,
                    //                 timer: 60000
                    //             });
                    //         }
                    //     })
                    //     .then(() => {
                    //         firebase
                    //             .auth()
                    //             .signOut()
                    //             .then(() => {
                    //                 dispatch('removeUserData');
                    //             })
                    //             .then(() => {
                    //                 this.$router.push('/signin');
                    //                 window.localStorage.removeItem('email');
                    //                 window.localStorage.removeItem('vuex');
                    //             });
                    //     });

                    // use firebase cloud function end

                    // no firebase cloud function
                    db.collection('roles')
                        .doc(data.uid)
                        .set({
                            uid: data.uid,
                            role: data.role,
                            email: data.email
                        })
                        .then(() => {
                            this.$swal({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Event added successfully.',
                                showConfirmButton: false,
                                timer: 3000
                            });
                        });
                    commit('loaders/SET_LOADING', false, { root: true });
                    this.$router.push('/dashboard');
                    // no firebase cloud function - end
                }
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    async verifyEmail({ commit, dispatch }) {
        commit('loaders/SET_LOADING', true, { root: true });

        // get logged in user auth details
        let user = await firebase.auth().currentUser;

        // using the details retrieved, send verification email to currently logged in user.
        user.sendEmailVerification()
            .then(() => {
                commit('loaders/SET_LOADING', false, { root: true });
            })
            // notify user that the operation was successful
            .then(() => {
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'A verification email has been sent to your mailbox',
                    showConfirmButton: true,
                    timer: '300000'
                }).then((result) => {
                    // once the user clicks on OK, log them out and redirect them to the log in page!
                    if (result.isConfirmed) {
                        firebase
                            .auth()
                            .signOut()
                            .then(() => {
                                // remove persistent state data
                                dispatch('removeUserData');
                                this.$router.push('/signin');
                            });
                    }
                });
            })
            .catch((error) => {
                // An error happened.
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    async login({ commit }, user) {
        commit('loaders/SET_LOADING', true, { root: true });
        await firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(async (response) => {
                commit('LOGGEDIN_USER', response.user);

                if (response) {
                    console.log(`index.js - 230 - 🔥`, response.user.uid);
                    const uid = response.user.uid;
                    const role = db.collection('roles').doc(uid);
                    const doc = await role.get();
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        const data = doc.data();
                        console.log('Document data:', data);
                        if (data.role.customer) {
                            this.$router.push('/store');
                        }
                        if (data.role.admin) {
                            this.$router.push('/dashboard');
                        }
                    }
                }

                // if (response) {
                //     firebase
                //         .auth()
                //         .currentUser.getIdTokenResult()
                //         .then((tokenResult) => {
                //             if (tokenResult) {
                //                 this.role = tokenResult.claims;
                //                 if (tokenResult.claims.admin) {
                //                     this.$router.push('/dashboard');
                //                 }
                //                 if (tokenResult.claims.customer) {
                //                     this.$router.push('/store');
                //                 }
                //             }
                //         });
                // }
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
                // Handle Errors here.
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
                console.log(`index.js - 257 - 🐷`, error);
            });
    },
    async removeUserData({ commit }) {
        // calling on localStorage.removeItem() does not seem to removed the vuex persistent state
        // instead re initialize all state with empty Arrays, Objects, strings etc.
        commit('LOADED_USER', '');
        commit('LOADED_USER_ID', '');
        commit('LOGGEDIN_USER', '');
        // in dashboard module
        commit('dashboard/SET_LOADED_SEVICES', [], { root: true });
        commit('dashboard/USER_DATA', [], { root: true });
        commit('dashboard/SET_LOADED_CATEGORIES', [], { root: true });
        commit('dashboard/UPDATE_SERVICE_ID', [], { root: true });
        commit('dashboard/SET_LOADED_STORE', [], { root: true });
        // In cart module
        commit('cart/DEFAULT_CART', [], { root: true });
        // In chat
        commit('chat/SET_LOADED_MESSAGES', [], { root: true });
        commit('chat/SET_LOADED_REPLIES', [], { root: true });
    }
    // USER ACCOUNTS END
};

export const mutations = {
    ERRORS: (state, error) => (state.signupError = error),

    // USER ACCOUNTS START
    LOADED_USER: (state, payload) => (state.user = payload),
    LOADED_USER_ID: (state, payload) => (state.userId = payload),
    VERIFICATION_SENT: (state, payload) => (state.verificationSent = payload),
    LOGGEDIN_USER: (state, user) => {
        state.user = JSON.parse(JSON.stringify(user));
    },
    // USER ACCOUNTS END

    // LOADING START
    SET_ALERT(state, payload) {
        state.alert = payload;
    }
    // LOADING END
};
