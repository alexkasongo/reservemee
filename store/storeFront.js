import * as firebase from 'firebase/app';
import 'firebase/database';


export const state = () => ({

    loadedStoreProfile: [],
    loadedStoreServices: [],
    loadedStoreCategories: [],
});

export const getters = {
    loadedStoreProfile: (state) => state.loadedStoreProfile,
    loadedStoreServices: (state) => state.loadedStoreServices,
    loadedStoreCategories: (state) => state.loadedStoreCategories
};

export const actions = {
    /*
    * STORE
    */
    async loadStoreServices({ commit }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });
        await firebase
            .database()
            .ref('users/' + payload)
            .once('value')
            .then((res) => {
                const data = res.val();
                // Store Profile
                if (data.storeProfile) {
                    commit('SET_LOADED_STORE_PROFILE', data.storeProfile);
                }

                //  Store Categories
                if (data.categories) {
                    const storeCategories = [];
                    const categoriesObj = data;

                    if (categoriesObj) {
                        // storeCategories.push(categoriesObj.categories);
                        for (let key in categoriesObj.categories) {
                            storeCategories.push({
                                id: key,
                                description: categoriesObj.categories[key].description,
                                name: categoriesObj.categories[key].name,
                                userId: categoriesObj.categories[key].id
                            });
                        }
                        commit('SET_LOADED_STORE_CATEGORIES', storeCategories);
                    }

                } else {
                    commit('SET_LOADED_STORE_CATEGORIES', []);
                }
                // Store Services
                if (data.services) {
                    const storeServices = [];
                    const servicesObj = data;

                    for (let key in servicesObj.services) {
                        storeServices.push({
                            id: key,
                            category: servicesObj.services[key].category,
                            description: servicesObj.services[key].description,
                            serviceImage: servicesObj.services[key].serviceImage,
                            name: servicesObj.services[key].name,
                            price: servicesObj.services[key].price,
                            userId: servicesObj.services[key].userId
                        });
                    }
                    commit('SET_LOADED_STORE_SERVICES', storeServices);
                } else {
                    commit('SET_LOADED_STORE_SERVICES', []);
                }
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    }

};

export const mutations = {
    /*
    ** STORE
    */
    ERRORS: (state, error) => (state.signupError = error),
    SET_LOADED_STORE_PROFILE: (state, payload) => {
        state.loadedStoreProfile = payload
    },
    SET_LOADED_STORE_SERVICES: (state, payload) => {
        state.loadedStoreServices = payload
    },
    SET_LOADED_STORE_CATEGORIES: (state, payload) => {
        state.loadedStoreCategories = payload
    },
};
