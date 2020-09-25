import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    createPersistedState({
        paths: ['userData', 'services', 'filteredServiceId'],

    })(store)
}