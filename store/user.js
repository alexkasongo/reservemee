export const state = () => ({
    user: ''
});

export const getters = {
    user: (state) => state.user,
};

export const actions = {
    async loadUser({ commit }, payload) {
        commit('LOADED_USER', payload);
    }
};

export const mutations = {
    LOADED_USER: (state, payload) => (state.user = payload),
};
