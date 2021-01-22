export const state = () => ({
    order: []
});

export const getters = {};

export const actions = {
    async addToCart({ commit }, payload) {
        // create order object
        const order = await {
            id: payload.id,
            note: payload.note,
            serviceCategory: payload.service.category,
            serviceDescription: payload.service.description,
            serviceId: payload.service.id,
            serviceName: payload.service.name,
            servicePrice: payload.service.price,
            serviceImage: payload.service.serviceImage,
            serviceUserId: payload.service.userId,
            eventBooked: payload.event.booked,
            eventColor: payload.event.color,
            eventDetails: payload.event.details,
            eventEnd: payload.event.end,
            eventName: payload.event.name,
            eventStart: payload.event.start,
            eventTimed: payload.event.timed
        };
        commit('SET_CART', order);
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
