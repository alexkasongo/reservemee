export const state = () => ({
    // USER ACCOUNTS START
    snackbar: false,
    loading: false,
    cartState: false,
    mobileCartState: false
    // LOADING & ERRORS END
});

export const getters = {
    // USER ACCOUNTS START
    snackbar: (state) => state.snackbar,
    loading: (state) => state.loading
    // LOADING & ERRORS END
};

export const actions = {
    setSnackbar({ commit }, payload) {
        commit('SET_SNACKBAR', payload);
    },
    setCartState({ commit }, payload) {
        commit('SET_CART_STATE', payload);
    },
    setMobileCartState({ commit }, payload) {
        commit('SET_MOBILE_CART_STATE', payload);
    }
};

export const mutations = {
    // START
    // SET_SNACKBAR mutation is commited in dashboard store
    SET_SNACKBAR(state, payload) {
        state.snackbar = payload;
    },
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
    SET_CART_STATE(state, payload) {
        state.cartState = payload;
    },
    SET_MOBILE_CART_STATE(state, payload) {
        state.mobileCartState = payload;
    }
    // END
};
