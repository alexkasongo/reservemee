import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
    createPersistedState({
        paths: ['dashboard.userData', 'dashboard.services', 'dashboard.filteredServiceId', 'user']
    })(store);
};
