export const state = () => ({
    // USER ACCOUNTS START
    snackbar: false,
    // LOADING & ERRORS END

});

export const getters = {
    // USER ACCOUNTS START
    snackbar: (state) => state.snackbar,
    // LOADING & ERRORS END
};

export const actions = {
    setSnackbar({ commit }, payload) {
        commit('SET_SNACKBAR', payload)
    }
};

export const mutations = {

    // START
    // SET_SNACKBAR mutation is commited in dashboard store
    SET_SNACKBAR(state, payload) {
        state.snackbar = payload;
    },
    // SET_LOADING(state, payload) {
    //     state.loading = payload;
    // },
    // END
};