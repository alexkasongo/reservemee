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
    loading: false,
    snackbar: false,
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
    loading: (state) => state.loading,
    snackbar: (state) => state.snackbar,
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
        commit('SET_LOADING', true);
        await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((response) => {
                if (response) {
                    response.user
                        .updateProfile({
                            displayName: user.name
                        })

                }
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
            .then(() => {
                // REVIEW 
                // FIXME Cannot read property 'getIdTokenResult' of null
                // but rest of the code works great
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.user = '';
                        window.localStorage.removeItem('email');
                        window.localStorage.removeItem('vuex');
                        this.$router.push('/signin');
                    });
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                // Handle Errors here.
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },
    async signupAdmin({ commit }, user) {
        commit('SET_LOADING', true);
        await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((response) => {
                if (response) {
                    const setAdmin = firebase.functions().httpsCallable("setAdmin");
                    const data = { uid: response.user.uid, role: user.role };
                    setAdmin(data)
                        .then((result) => {
                            console.log(`index.js - 183 - "🎉"`, result);
                        })

                    response.user
                        .updateProfile({
                            displayName: user.name

                        })
                }
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
            .then(() => {
                // REVIEW 
                // FIXME Cannot read property 'getIdTokenResult' of null
                // but rest of the code works great
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.user = '';
                        window.localStorage.removeItem('email');
                        window.localStorage.removeItem('vuex');
                        this.$router.push('/signin');
                    });
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                // Handle Errors here.
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },
    async verifyEmail({ commit }, payload) {
        commit('SET_LOADING', true);
        let user = await firebase.auth().currentUser;

        user.sendEmailVerification()
            .then(() => {
                commit('NOTIFICATION', true);
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                // An error happened.
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },
    async login({ commit }, user) {
        commit('SET_LOADING', true);
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
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                // Handle Errors here.
                commit('ERRORS', error);
                commit('SET_LOADING', false);
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
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    SET_SNACKBAR(state, payload) {
        state.snackbar = payload;
    },
    SET_ALERT(state, payload) {
        state.alert = payload;
    },
    // LOADING END
};
