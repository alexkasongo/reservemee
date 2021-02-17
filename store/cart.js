export const state = () => ({
    order: []
});

export const getters = {};

export const actions = {
    async addToCart({ commit }, payload) {
        commit('SET_CART', payload);
        this.$swal({
            toast: true,
            position: 'top-start',
            icon: 'success',
            title: 'Added to Cart',
            showConfirmButton: false,
            timer: 2500
        });
    }
};

export const mutations = {
    DEFAULT_CART: (state, payload) => {
        state.order = payload;
    },
    SET_CART: (state, payload) => {
        // set state here
        state.order.push(payload);
    }
};
