export const state = () => ({
    bookingState: null
});

export const getters = {};

export const actions = {
    setBookingState({ commit }, payload) {
        // commit state here
        // if (payload !== null) {
        //     commit('loaders/SET_SNACKBAR', true, { root: true });
        // }
        commit('SET_BOOKING_STATE', payload);
    }
};

export const mutations = {
    SET_BOOKING_STATE: (state, payload) => {
        // set state here
        state.bookingState = payload;
    }
};
