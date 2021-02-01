import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
    createPersistedState({
        key: 'vuex',
        paths: [
            'user',
            'dashboard.userData',
            'dashboard.services',
            'dashboard.filteredServiceId',
            'chat.messages',
            'chat.replies',
            'booking.bookingState',
            'cart.order',
            'storeFront.loadedStoreServices'
        ]
    })(store);
};
