import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/functions';

export const state = () => ({
    count: 0, // persistedstate test counter

    user: '',
    userData: '',
    userId: '',
    signupError: '',
    loading: false,
    snackbar: false,
    alert: false,
    services: [],
    categories: [],
    storeProfile: '',
    filteredServiceId: '',
    verificationSent: false,

    messages: '',
    comments: []
});

export const getters = {
    user: (state) => state.user,
    userData: (state) => state.userData[0],
    userId: (state) => state.userId,
    verificationSent: (state) => state.verificationSent,
    signupError: (state) => state.signupError,
    services: (state) => state.services,
    categories: (state) => state.categories,
    storeProfile: (state) => state.storeProfile[0],
    loading: (state) => state.loading,
    snackbar: (state) => state.snackbar,
    alert: (state) => state.alert,
    filteredService: (state) => {
        const data = state.services.filter((res) => {
            return res.id === state.filteredServiceId;
        });

        return data[0];
    },

    messages: (state) => state.messages,
    comments: (state) => state.comments
};

export const actions = {
    async loadUser({ commit }, payload) {
        commit('LOADED_USER', payload);
    },
    async loadUserId({ commit }, payload) {
        commit('LOADED_USER_ID', payload);
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
    // called in main
    async loadServices({ commit }, payload) {
        commit('SET_LOADING', true);
        //to make it realtime use on() instead of once()
        await firebase
            .database()
            .ref('users/' + payload)
            .child('services')
            .once('value')
            .then((data) => {
                const services = [];
                const obj = data.val();
                for (let key in obj) {
                    services.push({
                        id: key,
                        userId: obj[key].userId,
                        category: obj[key].category,
                        name: obj[key].name,
                        description: obj[key].description,
                        imageUrl: obj[key].imageUrl,
                        price: obj[key].price
                    });
                }
                commit('SET_LOADED_SEVICES', services);
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },
    //REVIEW error on page reload has been resolved using persistedstate plugin
    async loadUserIdData({ commit }, payload) {
        commit('SET_LOADING', true);
        //to make it realtime use on() instead of once()
        await firebase
            .database()
            .ref('users/' + payload)
            .once('value')
            .then((data) => {
                const userData = [];
                const obj = data.val();

                if (obj) {
                    userData.push(obj);
                }

                commit('USER_DATA', userData);
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },
    async loadCategories({ commit }, payload) {
        commit('SET_LOADING', true);

        //to make it realtime use on() instead of once()
        await firebase
            .database()
            .ref('users/' + payload)
            .child('categories')
            .once('value')
            .then((data) => {
                const categories = [];
                const obj = data.val();
                for (let key in obj) {
                    categories.push({
                        id: key,
                        name: obj[key].name,
                        description: obj[key].description
                    });
                }
                commit('SET_LOADED_CATEGORIES', categories);
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
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
                console.log(`index.js - 229 - 🍎`, error);
                // Handle Errors here.
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },
    /*
     ** Not necessery. Firebase dynamically handles this
     ** just use firebase set() function
     */
    async createUserTable({ commit }, payload) {
        commit('SET_LOADING', true);

        await firebase
            .database()
            .ref('users/' + payload)
            .set({
                categories: '',
                services: ''
                //some more user data can go here
            })
            .then(() => {
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    }, // Not being used
    /*
     ** Using uid we can we create categories unique to the user
     */
    async createCategory({ commit }, payload) {
        commit('SET_LOADING', true);

        const category = {
            name: payload.category,
            description: payload.description,
            userId: payload.userId
        };

        await firebase
            .database()
            .ref('users/' + payload.userId)
            .child('categories')
            .push(category)
            .then((data) => {
                const key = data.key;
                commit('NEW_CATEGORY', {
                    ...category,
                    id: key
                });
                commit('SET_SNACKBAR', true)
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                commit('ERRORS', error);
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed',
                    showConfirmButton: false,
                    timer: 2500
                });
                commit('SET_LOADING', false);
            });
    },
    async createService({ commit }, payload) {
        commit('SET_LOADING', true);
        const service = {
            userId: payload.userId,
            category: payload.category,
            name: payload.name,
            description: payload.description,
            imageUrl: payload.imageUrl,
            price: payload.price
        };

        await firebase
            .database()
            .ref('users/' + payload.userId)
            .child('services')
            .push(service)
            .then((data) => {
                const key = data.key;
                commit('NEW_SERVICE', {
                    ...service,
                    id: key
                });
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },
    async updateService({ commit }, payload) {
        commit('SET_LOADING', true);

        firebase
            .database()
            .ref('users/' + payload.userId)
            .child('services/' + payload.id)
            .set({
                category: payload.category,
                name: payload.name,
                description: payload.description,
                imageUrl: payload.imageUrl,
                price: payload.price
            })
            .then(() => {
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },
    async deleteService({ commit }, payload) {
        commit('SET_LOADING', true);
        await firebase
            .database()
            .ref('users/' + payload.userId)
            .child('services/' + payload.serviceId)
            .remove();
        commit('SET_LOADING', false);
    },
    async updateCategory({ commit }, payload) {
        commit('SET_LOADING', true);

        await firebase
            .database()
            .ref('users/' + payload.userId)
            .child('categories/' + payload.id)
            .set({
                name: payload.name,
                description: payload.description,
                uid: payload.id
            })
            .then(() => {
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Updated',
                    showConfirmButton: false,
                    timer: 2500
                });
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },
    async deleteCategory({ commit }, payload) {
        commit('SET_LOADING', true);
        await firebase
            .database()
            .ref('users/' + payload.userId)
            .child('categories/' + payload.id)
            .remove();
        commit('SET_LOADING', false);
    },
    /*
     ** update store profile information, no need to create
     ** profile created on signup
     */
    async updateStoreProfile({ commit, dispatch }, payload) {
        commit('SET_LOADING', true);

        // if both logo and banner have been added run the code below
        let logoImageUrl = ''
        let bannerImageUrl = ''

        // if no new logo or banner added, only update the rest of the information
        if (payload.rawStoreLogo === null && payload.rawStoreBanner === null) {
            firebase
                .database()
                .ref('users/' + payload.userId)
                .child('storeProfile/')
                .set({
                    storeLogo: payload.storeLogo,
                    storeName: payload.storeName,
                    storeEmail: payload.storeEmail,
                    storePhoneNumber: payload.storePhoneNumber,
                    storeBio: payload.storeBio,
                    storeBanner: payload.storeBanner,
                    storeLocation: payload.storeLocation
                })

            // update successful
            this.$swal({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Saved',
                showConfirmButton: false,
                timer: 2500
            });
            dispatch('loadUserIdData', payload.userId);
            commit('SET_LOADING', false);
            return
        }

        // NO BANNER
        if (payload.rawStoreBanner === null) {
            let logoImageUrl = ''

            const logoFilename = payload.rawStoreLogo.name
            const logoFileExt = logoFilename.slice(logoFilename.lastIndexOf('.'))
            firebase.storage().ref('storeLogo/' + payload.userId + logoFileExt).put(payload.rawStoreLogo)
                .then(fileData => {
                    let fullPath = fileData.metadata.fullPath
                    return firebase.storage().ref(fullPath).getDownloadURL()
                })
                .then((URL) => {
                    logoImageUrl = URL
                    return logoImageUrl
                })
                .then((logo) => {
                    // successful
                    firebase
                        .database()
                        .ref('users/' + payload.userId)
                        .child('storeProfile/')
                        .set({
                            storeLogo: logo,
                            storeName: payload.storeName,
                            storeEmail: payload.storeEmail,
                            storePhoneNumber: payload.storePhoneNumber,
                            storeBio: payload.storeBio,
                            storeBanner: payload.storeBanner,
                            storeLocation: payload.storeLocation
                        })

                    // update successful
                    this.$swal({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Saved',
                        showConfirmButton: false,
                        timer: 2500
                    });
                    dispatch('loadUserIdData', payload.userId);
                    commit('SET_LOADING', false);
                })
                .catch((error) => {
                    commit('ERRORS', error);
                    commit('SET_LOADING', false);
                });
            return
        }

        // NO LOGO
        if (payload.rawStoreLogo === null) {
            let bannerImageUrl = ''

            // upload store banner
            const bannerFilename = payload.rawStoreBanner.name
            const bannerFileExt = bannerFilename.slice(bannerFilename.lastIndexOf('.'))
            firebase.storage().ref('storeBanner/' + payload.userId + bannerFileExt).put(payload.rawStoreBanner)
                .then(fileData => {
                    let fullPath = fileData.metadata.fullPath
                    return firebase.storage().ref(fullPath).getDownloadURL()
                })
                .then((URL) => {
                    bannerImageUrl = URL
                    return bannerImageUrl
                })
                .then((banner) => {
                    // successful
                    firebase
                        .database()
                        .ref('users/' + payload.userId)
                        .child('storeProfile/')
                        .set({
                            storeLogo: payload.storeLogo,
                            storeName: payload.storeName,
                            storeEmail: payload.storeEmail,
                            storePhoneNumber: payload.storePhoneNumber,
                            storeBio: payload.storeBio,
                            storeBanner: banner,
                            storeLocation: payload.storeLocation
                        })

                    // update successful
                    this.$swal({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Saved',
                        showConfirmButton: false,
                        timer: 2500
                    });
                    dispatch('loadUserIdData', payload.userId);
                    commit('SET_LOADING', false);
                })
                .catch((error) => {
                    commit('ERRORS', error);
                    commit('SET_LOADING', false);
                });
            return
        }

        // upload store banner and logo
        const bannerFilename = payload.rawStoreBanner.name
        const bannerFileExt = bannerFilename.slice(bannerFilename.lastIndexOf('.'))
        firebase.storage().ref('storeBanner/' + payload.userId + bannerFileExt).put(payload.rawStoreBanner)
            .then(fileData => {
                let fullPath = fileData.metadata.fullPath
                return firebase.storage().ref(fullPath).getDownloadURL()
            })
            .then((URL) => {
                bannerImageUrl = URL
                return bannerImageUrl
            }).then((banner) => {
                // upload store logo
                const logoFilename = payload.rawStoreLogo.name
                const logoFileExt = logoFilename.slice(logoFilename.lastIndexOf('.'))
                firebase.storage().ref('storeLogo/' + payload.userId + logoFileExt).put(payload.rawStoreLogo)
                    .then(fileData => {
                        let fullPath = fileData.metadata.fullPath
                        return firebase.storage().ref(fullPath).getDownloadURL()
                    })
                    .then((URL) => {
                        logoImageUrl = URL
                        return logoImageUrl
                    })
                    .then((logo) => {
                        // successful
                        firebase
                            .database()
                            .ref('users/' + payload.userId)
                            .child('storeProfile/')
                            .set({
                                storeLogo: logo,
                                storeName: payload.storeName,
                                storeEmail: payload.storeEmail,
                                storePhoneNumber: payload.storePhoneNumber,
                                storeBio: payload.storeBio,
                                storeBanner: banner,
                                storeLocation: payload.storeLocation
                            })

                        // update successful
                        this.$swal({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: 'Saved',
                            showConfirmButton: false,
                            timer: 2500
                        });
                        dispatch('loadUserIdData', payload.userId);
                        commit('SET_LOADING', false);
                    })
                    .catch((error) => {
                        commit('ERRORS', error);
                        commit('SET_LOADING', false);
                    });
            })


    },
    /*
     ** update logged in user profile info
     */
    // we receive service id as payload to use for filtering
    async updateUserProfile({ commit }, payload) {
        commit('SET_LOADING', true);

        const user = await firebase.auth().currentUser;

        user.updateProfile({
            displayName: payload.name,
            photoURL: payload.photoUrl
        })
            .then((res) => {
                // Update successful.
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Saved',
                    showConfirmButton: false,
                    timer: 2500
                });
                commit('SET_ALERT', true);
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                // An error happened.
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },
    updateServiceId({ commit }, payload) {
        commit('UPDATE_SERVICE_ID', payload);
    },
    /*
    ** CHAT
    ** TODO research ways to search firebase realtime database
    */
    // getDatabase: function (context) {
    //     let ref = database.collection('messages').orderBy('timestamp')
    //     ref.onSnapshot(snapshot => {
    //         snapshot.docChanges().forEach(change => {
    //             if (change.type == 'added') {
    //                 let doc = change.doc
    //                 // console.log()
    //                 this.commit('GET_MESSAGE', {
    //                     id: doc.id,
    //                     name: doc.data().name,
    //                     content: doc.data().content,
    //                     timestamp: moment(doc.data().timestamp).format('lll')
    //                 })
    //             }
    //         })
    //     })
    // },
    deleteMessage: function (context, payload) {
        // console.log(payload)
        database.collection('messages').doc(payload.id).delete()
            .then(() => {
                this.commit('DELETE_MESSAGE', payload)
                // console.log(payload)
            })
    },
    currentMessage: function (context, payload) {
        this.commit('CURRENT_MESSAGE', payload)
        console.log(payload)
    },
    async addMsg({ commit }, payload) {

        const message = {
            name: payload.name,
            message: payload.message,
            userId: payload.userId,
            storeId: payload.storeId,
            timestamp: Date.now()
        };

        await firebase
            .database()
            .ref('users/' + payload.storeId)
            .child('messages')
            .push(message)
            .then((data) => {
                const key = data.key;
                commit('NEW_MESSAGE', {
                    ...message,
                    id: key
                });
                commit('SET_SNACKBAR', true)
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                console.log(`index.js - 696 - 😳`, error);
                commit('ERRORS', error);
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed',
                    showConfirmButton: false,
                    timer: 2500
                });
                commit('SET_LOADING', false);
            });
    },
    editMsg: function (context, payload) {
        // console.log(payload)
        database.collection('messages').doc(payload.id).update({
            content: payload.content,
            name: payload.name,
            timestamp: Date.now()
        }).then(() => {
            this.commit('EDIT_MESSAGE', payload)
            // this.close
            // this.$router.push({ name: 'Chat' })

        }).catch(err => {
            console.log(err)
        })
        // this.content = null
        // this.feedback = null
    },
    userName: function (context, payload) {
        this.commit('USER_NAME', payload)
    },
    async sendPrivateMessage({ commit, dispatch }, payload) {

        const comment = {
            to: payload.to,
            from: payload.from,
            userId: payload.userId,
            storeId: payload.storeId,
            message: payload.message,
            timestamp: Date.now()
        };

        await firebase
            .database()
            .ref('users/' + payload.storeId)
            .child('comments')
            .push(comment)
            .then((data) => {
                const key = data.key;
                commit('NEW_COMMENT', {
                    ...comment,
                    id: key
                });
                dispatch('loadComments', payload.storeId);
                commit('SET_SNACKBAR', true)
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                console.log(`index.js - 696 - 😳`, error);
                commit('ERRORS', error);
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed',
                    showConfirmButton: false,
                    timer: 2500
                });
                commit('SET_LOADING', false);
            });
    },

    async loadMessages({ commit }, payload) {
        commit('SET_LOADING', true);
        //to make it realtime use on() instead of once()
        await firebase
            .database()
            .ref('users/' + payload)
            .child('messages')
            .once('value')
            .then((data) => {
                const messages = [];
                const obj = data.val();
                for (let key in obj) {
                    messages.push({
                        id: key,
                        userId: obj[key].userId,
                        storeId: obj[key].storeId,
                        name: obj[key].name,
                        message: obj[key].message,
                        timestamp: obj[key].timestamp,
                    });
                }
                commit('SET_LOADED_MESSAGES', messages);
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },
    async loadComments({ commit }, payload) {
        commit('SET_LOADING', true);
        //to make it realtime use on() instead of once()
        await firebase
            .database()
            .ref('users/' + payload)
            .child('comments')
            .once('value')
            .then((data) => {
                const comments = [];
                const obj = data.val();
                for (let key in obj) {
                    comments.push({
                        id: key,
                        to: obj[key].to,
                        from: obj[key].from,
                        userId: obj[key].userId,
                        storeId: obj[key].storeId,
                        message: obj[key].message,
                        timestamp: obj[key].timestamp,
                    });
                }
                commit('SET_LOADED_COMMENTS', comments);
                commit('SET_LOADING', false);
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('SET_LOADING', false);
            });
    },


};

export const mutations = {
    increment: (state) => state.count++, // persistedstate test mutation
    decrement: (state) => state.count--, // persistedstate test mutation

    LOADED_USER: (state, payload) => (state.user = payload),
    NOTIFICATION: (state, payload) => (state.verificationSent = payload),
    LOGGEDIN_USER: (state, user) =>
        (state.user = JSON.parse(JSON.stringify(user))),
    ERRORS: (state, error) => (state.signupError = error),
    NEW_SERVICE: (state, payload) => state.services.push(payload),
    NEW_CATEGORY: (state, payload) => state.categories.push(payload),
    SET_LOADED_SEVICES: (state, payload) => {
        state.services = payload;
    },
    USER_DATA: (state, payload) => {
        state.userData = payload;
    },
    SET_LOADED_CATEGORIES: (state, payload) => {
        state.categories = payload;
    },
    SET_LOADED_STORE: (state, payload) => {
        state.storeProfile = payload;
    },
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    SET_SNACKBAR(state, payload) {
        state.snackbar = payload;
    },
    SET_ALERT(state, payload) {
        state.alert = payload;
    },
    UPDATE_SERVICE_ID(state, payload) {
        state.filteredServiceId = payload;
    },
    LOADED_USER_ID: (state, payload) => (state.userId = payload),

    /*
    ** CHAT
    */
    NEW_MESSAGE: (state, payload) => state.messages.push(payload),
    SET_LOADED_MESSAGES: (state, payload) => {
        state.messages = payload
    },
    NEW_COMMENT: (state, payload) => state.comments.push(payload),
    SET_LOADED_COMMENTS: (state, payload) => {
        state.comments = payload
    },
};
