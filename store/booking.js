export const state = () => ({
    bookingState: null
});

export const getters = {};

export const actions = {
    setBookingState({ commit }, payload) {
        console.log(`booking.js - 7 - 🍎`, { payload });
        // commit state here
        commit("SET_BOOKING_STATE", payload)
        commit('loaders/SET_SNACKBAR', true, { root: true });
    }
};

export const mutations = {
    SET_BOOKING_STATE: (state, payload) => {
        // set state here
        state.bookingState = payload
    },
};