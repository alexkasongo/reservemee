import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/functions';

export const state = () => ({
    // USER ACCOUNTS START
    user: '',
    userId: '',
    verificationSent: false,
    // USER ACCOUNTS END

    // LOADING & ERRORS
    signupError: '',
    // loading: false,
    alert: false,
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
    alert: (state) => state.alert,
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
    async signup({ commit }, user) {
        commit('loaders/SET_LOADING', true, { root: true });
        await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((response) => {
                if (response) {
                    response.user
                        .updateProfile({
                            displayName: user.name
                        }).then(() => {
                            firebase
                                .auth()
                                .signOut()
                                .then(() => {
                                    this.user = '';
                                    window.localStorage.removeItem('email');
                                    window.localStorage.removeItem('vuex');
                                    this.$router.push('/signin');
                                });
                            commit('loaders/SET_LOADING', false, { root: true });
                        })
                        .then(() => {
                            this.$swal({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Account created. Go ahead and signin.',
                                showConfirmButton: true,
                                timer: 60000
                            });
                        })

                }
            })
            .catch((error) => {
                // Handle Errors here.
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    async signupAdmin({ commit }, user) {
        commit('loaders/SET_LOADING', true, { root: true });
        await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((response) => {
                if (response) {
                    const data = { uid: response.user.uid, role: user.role };
                    const setAdmin = firebase.functions().httpsCallable("setAdmin");
                    setAdmin(data)
                        .then((result) => {
                            if (result) {
                                response.user
                                    .updateProfile({
                                        displayName: user.name
                                    })
                                this.$swal({
                                    toast: true,
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Account created. Go ahead and signin.',
                                    showConfirmButton: true,
                                    timer: 60000
                                });
                                commit('loaders/SET_LOADING', false, { root: true });
                            } else {
                                this.$swal({
                                    toast: true,
                                    position: 'top-end',
                                    icon: 'fail',
                                    title: 'Account failed to create. Try again.',
                                    showConfirmButton: true,
                                    timer: 60000
                                });
                                commit('loaders/SET_LOADING', false, { root: true });
                            }
                        })
                        .then(() => {
                            firebase
                                .auth()
                                .signOut()
                                .then(() => {
                                    this.user = '';
                                    window.localStorage.removeItem('email');
                                    window.localStorage.removeItem('vuex');
                                    this.$router.push('/signin');
                                });
                        })
                }
            })
            .catch((error) => {
                // Handle Errors here.
                console.log(`index.js - 148 - 🙈`, error);
                // commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    async verifyEmail({ commit }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });
        let user = await firebase.auth().currentUser;

        user.sendEmailVerification()
            .then(() => {
                commit('NOTIFICATION', true);
                commit('loaders/SET_LOADING', false, { root: true });
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
            .then((response) => {
                commit('LOGGEDIN_USER', response.user);

                if (response) {
                    firebase
                        .auth()
                        .currentUser.getIdTokenResult()
                        .then((tokenResult) => {
                            if (tokenResult) {
                                this.role = tokenResult.claims;
                                if (tokenResult.claims.admin) {
                                    this.$router.push('/dashboard');
                                }
                                if (tokenResult.claims.customer) {
                                    this.$router.push('/store');
                                }
                            }
                        });
                }
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
                // Handle Errors here.
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    // USER ACCOUNTS END
};

export const mutations = {
    ERRORS: (state, error) => (state.signupError = error),

    // USER ACCOUNTS START
    LOADED_USER: (state, payload) => (state.user = payload),
    LOADED_USER_ID: (state, payload) => (state.userId = payload),
    NOTIFICATION: (state, payload) => (state.verificationSent = payload),
    LOGGEDIN_USER: (state, user) => {
        (state.user = JSON.parse(JSON.stringify(user)))
    },
    // USER ACCOUNTS END

    // LOADING START
    SET_ALERT(state, payload) {
        state.alert = payload;
    },
    // LOADING END
};
