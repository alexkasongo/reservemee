import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
    createPersistedState({
        key: 'vuex',
        paths: ['dashboard.userData', 'dashboard.services', 'dashboard.filteredServiceId', 'user', 'chat.messages']
    })(store);
};
