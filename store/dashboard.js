import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/functions';

export const state = () => ({
    // DASHBOARD START
    userData: [],
    services: [],
    categories: [],
    filteredServiceId: [],
    storeProfile: [],
    // DASHBOARD END
});

export const getters = {
    // DASHBOARD START
    userData: (state) => state.userData[0],
    services: (state) => state.services,
    categories: (state) => state.categories,
    filteredService: (state) => {
        const data = state.services.filter((res) => {
            return res.id === state.filteredServiceId;
        });

        return data[0];
    },
    storeProfile: (state) => state.storeProfile[0],
    // DASHBOARD END
};

export const actions = {
    // DASHBOARD START
    //REVIEW Page reload resolved using persistedstate plugin
    async loadUserIdData({ commit }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });
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
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    async loadServices({ commit }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });
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
                        serviceImage: obj[key].serviceImage,
                        price: obj[key].price
                    });
                }
                commit('SET_LOADED_SEVICES', services);
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    async loadCategories({ commit }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });

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
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    /*
     ** Using uid we can we create categories unique to the user
     */
    async createCategory({ commit }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });

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
                commit('loaders/SET_SNACKBAR', true, { root: true })
                commit('loaders/SET_LOADING', false, { root: true });
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
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    async createService({ commit, dispatch }, payload) {

        // IF NO IMAGE 
        if (payload.rawServiceImage === null) {
            commit('loaders/SET_LOADING', true, { root: true });
            const service = {
                name: payload.name,
                price: payload.price,
                userId: payload.userId,
                category: payload.category,
                description: payload.description,
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
                })
                .then(() => {
                    commit('loaders/SET_SNACKBAR', true, { root: true });
                    dispatch('loadServices', payload.userId);
                    commit('loaders/SET_LOADING', false, { root: true });
                })
                .then(() => {
                    this.$router.push(`/service/${payload.category}`);
                })
                .catch((error) => {
                    commit('ERRORS', error);
                    commit('loaders/SET_LOADING', false, { root: true });
                });
        }
        // IF NO IMAGE END

        // 1. IF IMAGE EXISTS PROFILE IMAGE
        if (payload.rawServiceImage !== null) {
            commit('loaders/SET_LOADING', true, { root: true });
            // upload service Image
            let serviceImage = ''

            const serviceImageFilename = payload.rawServiceImage.name
            const serviceImageFileExt = serviceImageFilename.slice(serviceImageFilename.lastIndexOf('.'))
            firebase.storage().ref('serviceImages/')
                .child(`${payload.userId}/` + payload.serviceImageName + serviceImageFileExt)
                .put(payload.rawServiceImage)
                .then(fileData => {
                    let fullPath = fileData.metadata.fullPath
                    return firebase.storage().ref(fullPath).getDownloadURL()
                })
                .then((URL) => {
                    serviceImage = URL
                    return serviceImage
                })
                .then((image) => {
                    const service = {
                        name: payload.name,
                        price: payload.price,
                        userId: payload.userId,
                        category: payload.category,
                        description: payload.description,
                        serviceImage: image
                    };
                    // successful
                    firebase
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
                        })
                        .then(() => {
                            commit('loaders/SET_SNACKBAR', true, { root: true })
                            dispatch('loadServices', payload.userId)
                            commit('loaders/SET_LOADING', false, { root: true });
                        })
                        .then(() => {
                            this.$router.push(`/service/${payload.category}`);
                        })
                        .catch((error) => {
                            commit('ERRORS', error);
                            commit('loaders/SET_LOADING', false, { root: true });
                        });
                })
                .catch((error) => {
                    commit('ERRORS', error);
                    commit('loaders/SET_LOADING', false, { root: true });
                });
            return
        }
        // 1. IF IMAGE EXISTS END
    },
    async updateService({ commit, dispatch }, payload) {

        // IF NO IMAGE 
        if (payload.rawServiceImage === null) {
            commit('loaders/SET_LOADING', true, { root: true });
            await firebase
                .database()
                .ref('users/' + payload.userId)
                .child('services/' + payload.serviceId)
                .update({
                    category: payload.category,
                    name: payload.name,
                    description: payload.description,
                    price: payload.price
                })
                .then(() => {
                    commit('loaders/SET_SNACKBAR', true, { root: true })
                    dispatch('loadServices', payload.userId)
                    commit('loaders/SET_LOADING', false, { root: true });
                })
                .then(() => {
                    this.$router.push(`/service/${payload.category}`);
                })
                .catch((error) => {
                    commit('ERRORS', error);
                    commit('loaders/SET_LOADING', false, { root: true });
                });
        }
        // IF NO IMAGE END

        // 1. IF IMAGE EXISTS PROFILE IMAGE
        if (payload.rawServiceImage !== null) {
            commit('loaders/SET_LOADING', true, { root: true });
            // upload service Image
            let serviceImage = ''

            const serviceImageFilename = payload.rawServiceImage.name
            const serviceImageFileExt = serviceImageFilename.slice(serviceImageFilename.lastIndexOf('.'))
            firebase.storage().ref('serviceImages/')
                .child(`${payload.userId}/` + payload.serviceImageName + serviceImageFileExt)
                .put(payload.rawServiceImage)
                .then(fileData => {
                    let fullPath = fileData.metadata.fullPath
                    return firebase.storage().ref(fullPath).getDownloadURL()
                })
                .then((URL) => {
                    serviceImage = URL
                    return serviceImage
                })
                .then((image) => {
                    // successful
                    firebase
                        .database()
                        .ref('users/' + payload.userId)
                        .child('services/' + payload.serviceId)
                        .update({
                            category: payload.category,
                            name: payload.name,
                            description: payload.description,
                            price: payload.price,
                            serviceImage: image,
                            userId: payload.userId
                        })
                        .then(() => {
                            commit('loaders/SET_SNACKBAR', true, { root: true })
                            dispatch('loadServices', payload.userId)
                            commit('loaders/SET_LOADING', false, { root: true });
                        })
                        .then(() => {
                            this.$router.push(`/service/${payload.category}`);
                        })
                        .catch((error) => {
                            commit('ERRORS', error);
                            commit('loaders/SET_LOADING', false, { root: true });
                        });
                })
                .catch((error) => {
                    commit('ERRORS', error);
                    commit('loaders/SET_LOADING', false, { root: true });
                });
            return
        }
        // 1. IF IMAGE EXISTS PROFILE IMAGE END
    },
    async deleteService({ commit }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });
        await firebase
            .database()
            .ref('users/' + payload.userId)
            .child('services/' + payload.serviceId)
            .remove();
        commit('loaders/SET_LOADING', false, { root: true });
    },
    async updateCategory({ commit }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });

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
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    async deleteCategory({ commit }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });
        await firebase
            .database()
            .ref('users/' + payload.userId)
            .child('categories/' + payload.id)
            .remove();
        commit('loaders/SET_LOADING', false, { root: true });
    },
    /*
     ** update logged in user profile info
     */
    // we receive service id as payload to use for filtering
    async updateUserProfile({ commit, dispatch }, payload) {
        console.log(`dashboard.js - 391 - 🌎`, payload);
        commit('loaders/SET_LOADING', true, { root: true });

        // 1. IF NO PROFILE IMAGE EXISTS
        if (payload.rawStoreOwnerImage === null) {
            console.log(`dashboard.js - 396 - 🍿`, payload);
            const user = await firebase.auth().currentUser;
            // check if the storeOwnerImage does not exist, if it does not exist
            // run the code below
            if (payload.storeOwnerImage !== null) {
                user.updateProfile({
                    displayName: payload.name,
                    photoURL: payload.storeOwnerImage
                })
                    .then(() => {
                        firebase
                            .database()
                            .ref('users/' + payload.userId)
                            .child('storeProfile/')
                            .update({
                                // this allows the store to display properly on the store page!
                                storeId: payload.userId,
                            })
                    })
                    .then(() => {
                        commit('loaders/SET_SNACKBAR', true, { root: true })
                        commit('loaders/SET_LOADING', false, { root: true });
                    })
                    .catch((error) => {
                        // An error happened.
                        commit('ERRORS', error);
                        commit('loaders/SET_LOADING', false, { root: true });
                    });
                // if the storeOwnerImage does exist then run the code below
            } else {
                user.updateProfile({
                    displayName: payload.name,
                })
                    .then(() => {
                        firebase
                            .database()
                            .ref('users/' + payload.userId)
                            .child('storeProfile/')
                            .update({
                                // this allows the store to display properly on the store page!
                                storeId: payload.userId,
                            })
                    })
                    .then(() => {
                        commit('loaders/SET_SNACKBAR', true, { root: true })
                        commit('loaders/SET_LOADING', false, { root: true });
                    })
                    .catch((error) => {
                        // An error happened.
                        commit('ERRORS', error);
                        commit('loaders/SET_LOADING', false, { root: true });
                    });

            }
        }
        // 1. IF NO PROFILE IMAGE

        // 2. IF IMAGE EXISTS PROFILE IMAGE
        if (payload.rawStoreOwnerImage !== null) {
            console.log(`dashboard.js - 425 - 🧽`, payload);
            let storeOwnerImage = ''

            // upload store banner
            const ownerImageFilename = payload.rawStoreOwnerImage.name
            const ownerImageFileExt = ownerImageFilename.slice(ownerImageFilename.lastIndexOf('.'))
            firebase.storage().ref('storeOwnerImages/' + payload.userId + ownerImageFileExt).put(payload.rawStoreOwnerImage)
                .then(fileData => {
                    let fullPath = fileData.metadata.fullPath
                    return firebase.storage().ref(fullPath).getDownloadURL()
                })
                .then((URL) => {
                    storeOwnerImage = URL
                    return storeOwnerImage
                })
                .then((image) => {
                    // successful
                    firebase
                        .database()
                        .ref('users/' + payload.userId)
                        .child('storeProfile/')
                        .update({
                            // image: image URL from firebase storage
                            storeOwnerImage: image,
                            // if only the image is added we add the storeId too so that we can access the store in store-front
                            storeId: payload.userId,
                        })
                        .then(() => {
                            // 2. Update user profile
                            const user = firebase.auth().currentUser;

                            user.updateProfile({
                                displayName: payload.name,
                                photoURL: image
                                // we are updating the image attached to the storeProfile, this is easier to maintain
                                // photoURL: image
                            })
                                .then(() => {
                                    // Update successful.
                                    dispatch('loadUserIdData', payload.userId);
                                    commit('loaders/SET_SNACKBAR', true, { root: true })
                                    commit('loaders/SET_LOADING', false, { root: true });
                                })
                                .catch((error) => {
                                    // An error happened.
                                    commit('ERRORS', error);
                                    commit('loaders/SET_LOADING', false, { root: true });
                                });
                        })

                    // commit('loaders/SET_LOADING', false, { root: true });
                })
                .catch((error) => {
                    commit('ERRORS', error);
                    commit('loaders/SET_LOADING', false, { root: true });
                });
            return
        }
        // 2. IF IMAGE EXISTS END


    },
    /*
     ** update store profile information, no need to create
     ** profile during created on signup
     */
    async updateStoreProfile({ commit, dispatch }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });

        // if both logo and banner have been added run the code below
        let logoImageUrl = ''
        let bannerImageUrl = ''

        // if no new logo or banner added, only update the rest of the information
        if (payload.rawStoreLogo === null && payload.rawStoreBanner === null) {
            firebase
                .database()
                .ref('users/' + payload.userId)
                .child('storeProfile/')
                .update({
                    storeId: payload.userId,
                    storeLogo: payload.storeLogo,
                    storeName: payload.storeName,
                    storeEmail: payload.storeEmail,
                    storePhoneNumber: payload.storePhoneNumber,
                    storeBio: payload.storeBio,
                    storeBanner: payload.storeBanner,
                    storeLocation: payload.storeLocation,
                    beauty: payload.beauty,
                    wellness: payload.wellness,
                    fitness: payload.fitness,
                    twitter: payload.twitter,
                    facebook: payload.facebook,
                    instagram: payload.instagram
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
            commit('loaders/SET_LOADING', false, { root: true });
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
                        .update({
                            storeLogo: logo,
                            storeName: payload.storeName,
                            storeEmail: payload.storeEmail,
                            storePhoneNumber: payload.storePhoneNumber,
                            storeBio: payload.storeBio,
                            storeBanner: payload.storeBanner,
                            storeLocation: payload.storeLocation,
                            beauty: payload.beauty,
                            wellness: payload.wellness,
                            fitness: payload.fitness,
                            twitter: payload.twitter,
                            facebook: payload.facebook,
                            instagram: payload.instagram
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
                    commit('loaders/SET_LOADING', false, { root: true });
                })
                .catch((error) => {
                    commit('ERRORS', error);
                    commit('loaders/SET_LOADING', false, { root: true });
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
                        .update({
                            storeLogo: payload.storeLogo,
                            storeName: payload.storeName,
                            storeEmail: payload.storeEmail,
                            storePhoneNumber: payload.storePhoneNumber,
                            storeBio: payload.storeBio,
                            storeBanner: banner,
                            storeLocation: payload.storeLocation,
                            beauty: payload.beauty,
                            wellness: payload.wellness,
                            fitness: payload.fitness,
                            twitter: payload.twitter,
                            facebook: payload.facebook,
                            instagram: payload.instagram
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
                    commit('loaders/SET_LOADING', false, { root: true });
                })
                .catch((error) => {
                    commit('ERRORS', error);
                    commit('loaders/SET_LOADING', false, { root: true });
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
                            .update({
                                storeLogo: logo,
                                storeName: payload.storeName,
                                storeEmail: payload.storeEmail,
                                storePhoneNumber: payload.storePhoneNumber,
                                storeBio: payload.storeBio,
                                storeBanner: banner,
                                storeLocation: payload.storeLocation,
                                beauty: payload.beauty,
                                wellness: payload.wellness,
                                fitness: payload.fitness
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
                        commit('loaders/SET_LOADING', false, { root: true });
                    })
                    .catch((error) => {
                        commit('ERRORS', error);
                        commit('loaders/SET_LOADING', false, { root: true });
                    });
            })


    },
    updateServiceId({ commit }, payload) {
        commit('UPDATE_SERVICE_ID', payload);
    }
    // DASHBOARD END
};

export const mutations = {

    // DASHBOARD START
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
    UPDATE_SERVICE_ID(state, payload) {
        state.filteredServiceId = payload;
    },
    SET_LOADED_STORE: (state, payload) => {
        state.storeProfile = payload;
    },
    // DASHBOARD END


    // LOADING START
    ERRORS: (state, error) => (state.signupError = error),
    // loaders/ SET_LOADING(state, payload) {
    //     state.loading = payload;
    // },
    SET_ALERT(state, payload) {
        state.alert = payload;
    },
    // LOADING END
};
