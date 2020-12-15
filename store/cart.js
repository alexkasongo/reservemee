export const state = () => ({
    order: []
});

export const getters = {};

export const actions = {
    async addToCart({ commit }, payload) {
        // const order = await new Array(payload)

        const order = await [{
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
            eventTimed: payload.event.timed,
        }]

        console.log(`booking.js - 7 -  🤌🏾`, order);
        // commit state here

        // commit('SET_CART', {
        //     ...order,
        //     id: payload.id,
        // });

        commit("SET_CART", order)
        commit('loaders/SET_SNACKBAR', true, { root: true });
    }
};

export const mutations = {
    SET_CART: (state, payload) => {
        // set state here
        console.log('typeof 🤔', typeof (state.order))
        state.order.push(payload)
    },

    // SET_CART: (state, payload) => state.order.push(payload),
};