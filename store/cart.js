export const state = () => ({
    cartState: null
});

export const getters = {};

export const actions = {
    addToCart({ commit }, payload) {
        console.log(`booking.js - 7 -  🤌🏾`, { payload });
        // commit state here
        commit("SET_CART_STATE", payload)
        commit('loaders/SET_SNACKBAR', true, { root: true });
    }
};

export const mutations = {
    SET_CART_STATE: (state, payload) => {
        // set state here
        state.cartState = payload
    },
};