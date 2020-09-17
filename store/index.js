import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export const state = () => ({
    user: '',
    userData: '',
    userId: '',
    signupError: '',
    loading: false,
    services: [],
    categories: [],
    updateId: '',
    verificationSent: false
});

export const getters = {
    user: (state) => state.user,
    userData: (state) => state.userData[0],
    userId: (state) => state.userId,
    verificationSent: (state) => state.verificationSent,
    signupError: (state) => state.signupError,
    services: (state) => (state.services),
    categories: (state) => state.categories,
    loading: (state) => state.loading,
    updateId: (state) => {
        const data = state.services.filter((res) => {
            return res.id === state.updateId
        });

        return data[0]
    }
};

export const actions = {
    async loadUser({ commit }, payload) {
        commit('LOADED_USER', payload);
    },
    async loadUserId({ commit }, payload) {
        commit('LOADED_USER_ID', payload);
    },
    async verifyEmail({ commit }, payload) {
        commit('SET_LOADING', true)
        console.log(`index.js - 55 - 🏝`, payload);
        let user = await firebase.auth().currentUser;

        user.sendEmailVerification().then((res) => {
            // Email sent.
            console.log(`index.js - 60 - EMAIL SENT 💌`, res);
            commit('NOTIFICATION', true)
            commit('SET_LOADING', false)
        }).catch((error) => {
            // An error happened.
            commit('ERRORS', error)
            commit('SET_LOADING', false)
        });
    },
    // called in main 
    async loadServices({ commit }, payload) {
        console.log(`index.js - 79 - PLEASE🙏🏾`, payload);
        commit('SET_LOADING', true)
        //to make it realtime use on() instead of once()
        await firebase.database().ref('users/' + payload).child('services').once('value')
            .then((data) => {
                const services = []
                const obj = data.val()
                for (let key in obj) {
                    services.push({
                        id: key,
                        userId: obj[key].userId,
                        category: obj[key].category,
                        name: obj[key].name,
                        description: obj[key].description,
                        imageUrl: obj[key].imageUrl,
                        price: obj[key].price
                    })
                }
                commit('SET_LOADED_SEVICES', services)
                commit('SET_LOADING', false)
            })
            .catch(
                (error) => {
                    commit('ERRORS', error);
                    console.log(`index.js - 80 - 🚧`, error);
                    commit('SET_LOADING', false)
                }
            )
    },
    async loadUserIdData({ commit }, payload) {
        commit('SET_LOADING', true)
        //to make it realtime use on() instead of once()
        await firebase.database().ref('users/' + payload).once('value')
            .then((data) => {
                console.log(`index.js - 109 - 🇳🇫`, data.val());
                const userData = []
                const obj = data.val()

                if (obj) {
                    userData.push(obj)
                }

                commit('USER_DATA', userData)
                commit('SET_LOADING', false)
            })
            .catch(
                (error) => {
                    commit('ERRORS', error);
                    console.log(`index.js - 80 - 🚧`, error);
                    commit('SET_LOADING', false)
                }
            )
    },
    async loadCategories({ commit }, payload) {

        commit('SET_LOADING', true)

        //to make it realtime use on() instead of once()
        await firebase.database().ref('users/' + payload).child('categories').once('value')
            .then((data) => {
                console.log(`index.js - 140 - 🎹`, data.val());
                const categories = []
                const obj = data.val()
                for (let key in obj) {
                    categories.push({
                        id: key,
                        name: obj[key].name,
                    })
                }
                // console.log(`index.js - 142 - 🏅`, categories);
                commit('SET_LOADED_CATEGORIES', categories)
                commit('SET_LOADING', false)
            })
            .catch(
                (error) => {
                    commit('ERRORS', error);
                    console.log(`index.js - 80 - 🚧`, error);
                    commit('SET_LOADING', false)
                }
            )
    },
    async signup({ commit }, user) {
        commit('SET_LOADING', true)
        await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((response) => {
                if (response) {
                    response.user.updateProfile({
                        displayName: user.name,
                    }).then((s) => {
                        console.log(`index.js - 31 - variable`, s);
                        commit('SET_LOADING', false)
                        this.$router.push('/dashboard');
                    })
                }
            })
            .catch((error) => {
                console.log(`index.js - 31 - variable`, error);
                // Handle Errors here.
                commit('ERRORS', error);
                commit('SET_LOADING', false)
            });

    },
    async login({ commit }, user) {
        commit('SET_LOADING', true)
        await firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((response) => {
                commit('LOGGEDIN_USER', response.user)
                this.$router.push('/dashboard');
                commit('SET_LOADING', false)
            })
            .catch((error) => {
                // Handle Errors here.
                commit('ERRORS', error);
                commit('SET_LOADING', false)
            });
    },
    /*
    ** On first login we create the user table using the UID 
    ** when the user clicks on create new category
    */
    async createUserTable({ commit }, payload) {
        commit('SET_LOADING', true)
        console.log(`index.js - 151 - 🎨`, payload);

        await firebase.database().ref('users/' + payload).set({
            categories: '',
            services: '',
            //some more user data can go here
        })
            .then(() => {
                commit('SET_LOADING', false)
            })
            .catch((error) => {
                commit('ERRORS', error);
                console.log(`index.js - 66 - 🚧`, error);
                commit('SET_LOADING', false)
            })
    },
    /*
   ** Using uid we can we create categories unique to the user
   */
    async createCategory({ commit }, payload) {
        commit('SET_LOADING', true)
        // console.log(`index.js - 151 - 🎨`, payload);

        const category = {
            name: payload.category,
            userId: payload.userId,
        }

        await firebase.database().ref('users/' + payload.userId).child('categories').push(category)
            .then((data) => {
                const key = data.key
                commit('NEW_CATEGORY', {
                    ...category,
                    id: key
                })
                commit('SET_LOADING', false)
            })
            .catch((error) => {
                commit('ERRORS', error);
                console.log(`index.js - 66 - 🚧`, error);
                commit('SET_LOADING', false)
            })
    },
    async createService({ commit }, payload) {
        console.log(`index.js - 249 - 🎨`, payload);
        commit('SET_LOADING', true)
        const service = {
            userId: payload.userId,
            category: payload.category,
            name: payload.name,
            description: payload.description,
            imageUrl: payload.imageUrl,
            price: payload.price,
        }


        await firebase.database().ref('users/' + payload.userId).child('services').push(service)
            .then((data) => {
                const key = data.key
                commit('NEW_SERVICE', {
                    ...service,
                    id: key
                })
                commit('SET_LOADING', false)
            })
            .catch((error) => {
                commit('ERRORS', error);
                console.log(`index.js - 66 - 🚧`, error);
                commit('SET_LOADING', false)
            })
    },
    async deleteService({ commit }, payload) {
        commit('SET_LOADING', true)
        console.log(`index.js - 154 - variable`, payload);
        await firebase.database().ref(`/services/${payload}`).remove()
        commit('SET_LOADING', false)
    },
    async updateService({ commit }, payload) {
        commit('SET_LOADING', true)

        firebase.database().ref('users/' + payload.userId).child('services/' + payload.id).set({
            category: payload.category,
            name: payload.name,
            description: payload.description,
            imageUrl: payload.imageUrl,
            price: payload.price
        }).then(() => {
            commit('SET_LOADING', false)
        })
            .catch((error) => {
                commit('ERRORS', error);
                console.log(`index.js - 66 - 🚧`, error);
                commit('SET_LOADING', false)
            });

    },
    async deleteService({ commit }, payload) {
        console.log(`index.js - 289 - 🎨`, payload);
        commit('SET_LOADING', true)
        await firebase
            .database()
            .ref('users/' + payload.userId).child('services/' + payload.serviceId).remove();
        commit('SET_LOADING', false)
    },
    async updateCategory({ commit }, payload) {
        commit('SET_LOADING', true)

        firebase.database().ref('users/' + payload.userId).child('categories/' + payload.id).set({
            name: payload.category,
            uid: payload.id,
        }).then(() => {
            commit('SET_LOADING', false)
        })
            .catch((error) => {
                commit('ERRORS', error);
                console.log(`index.js - 66 - 🚧`, error);
                commit('SET_LOADING', false)
            });

    },
    async deleteCategory({ commit }, payload) {
        console.log(`index.js - 289 - 🎨`, payload);
        commit('SET_LOADING', true)
        await firebase
            .database()
            .ref('users/' + payload.userId).child('categories/' + payload.id).remove();
        commit('SET_LOADING', false)
    },
    // we receive service id as payload to use for filtering
    updateData({ commit }, payload) {
        console.log(`index.js - 165 - variable`, payload);
        commit('UPDATE_ID', payload)
    },
};

export const mutations = {
    LOADED_USER: (state, payload) => (state.user = payload),
    NOTIFICATION: (state, payload) => (state.verificationSent = payload),
    LOGGEDIN_USER: (state, user) => (state.user = JSON.parse(JSON.stringify(user))),
    ERRORS: (state, error) => (state.signupError = error),
    NEW_SERVICE: (state, payload) => (state.services.push(payload)),
    NEW_CATEGORY: (state, payload) => (state.categories.push(payload)),
    SET_LOADED_SEVICES: (state, payload) => {
        state.services = payload
    },
    USER_DATA: (state, payload) => {
        state.userData = payload
    },
    SET_LOADED_CATEGORIES: (state, payload) => {
        state.categories = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
    UPDATE_ID(state, payload) {
        state.updateId = payload
    },
    LOADED_USER_ID: (state, payload) => (state.userId = payload)
};

