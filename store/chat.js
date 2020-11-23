import * as firebase from 'firebase/app';
import 'firebase/database';


export const state = () => ({
    messages: '',
    comments: [],
});

export const getters = {
    loading: (state) => state.loading,
    // snackbar: (state) => state.snackbar,
    alert: (state) => state.alert,

    messages: (state) => state.messages,
    comments: (state) => state.comments,
};

export const actions = {
    /*
    ** CHAT
    ** TODO research ways to search firebase realtime database
    */
    deleteMessage: function (context, payload) {
        // console.log(payload)
        database.collection('messages').doc(payload.id).delete()
            .then(() => {
                this.commit('DELETE_MESSAGE', payload)
                // console.log(payload)
            })
    },
    currentMessage: function (context, payload) {
        this.commit('CURRENT_MESSAGE', payload)
        console.log(payload)
    },
    async addMsg({ commit }, payload) {

        const message = {
            name: payload.name,
            message: payload.message,
            userId: payload.userId,
            storeId: payload.storeId,
            timestamp: Date.now()
        };

        await firebase
            .database()
            .ref('users/' + payload.storeId)
            .child('messages')
            .push(message)
            .then((data) => {
                const key = data.key;
                commit('NEW_MESSAGE', {
                    ...message,
                    id: key
                });
                // commit('SET_SNACKBAR', true)
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
                console.log(`index.js - 696 - 😳`, error);
                commit('ERRORS', error);
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed',
                    showConfirmButton: false,
                    timer: 2500
                });
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    editMsg: function (context, payload) {
        // console.log(payload)
        database.collection('messages').doc(payload.id).update({
            content: payload.content,
            name: payload.name,
            timestamp: Date.now()
        }).then(() => {
            this.commit('EDIT_MESSAGE', payload)
            // this.close
            // this.$router.push({ name: 'Chat' })

        }).catch(err => {
            console.log(err)
        })
        // this.content = null
        // this.feedback = null
    },
    userName: function (context, payload) {
        this.commit('USER_NAME', payload)
    },
    async sendPrivateMessage({ commit, dispatch }, payload) {

        const comment = {
            to: payload.to,
            from: payload.from,
            userId: payload.userId,
            storeId: payload.storeId,
            message: payload.message,
            timestamp: Date.now()
        };

        await firebase
            .database()
            .ref('users/' + payload.storeId)
            .child('comments')
            .push(comment)
            .then((data) => {
                const key = data.key;
                commit('NEW_COMMENT', {
                    ...comment,
                    id: key
                });
                dispatch('loadComments', payload.storeId);
                // commit('SET_SNACKBAR', true)
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
                console.log(`index.js - 696 - 😳`, error);
                commit('ERRORS', error);
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed',
                    showConfirmButton: false,
                    timer: 2500
                });
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },

    async loadMessages({ commit }, payload) {

        commit('loaders/SET_LOADING', true, { root: true });
        //to make it realtime use on() instead of once()
        await firebase
            .database()
            .ref('users/' + payload)
            .child('messages')
            .once('value')
            .then((data) => {
                const messages = [];
                const obj = data.val();
                for (let key in obj) {
                    messages.push({
                        id: key,
                        userId: obj[key].userId,
                        storeId: obj[key].storeId,
                        name: obj[key].name,
                        message: obj[key].message,
                        timestamp: obj[key].timestamp,
                    });
                }
                commit('SET_LOADED_MESSAGES', messages);
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    async loadComments({ commit }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });
        //to make it realtime use on() instead of once()
        await firebase
            .database()
            .ref('users/' + payload)
            .child('comments')
            .once('value')
            .then((data) => {
                const comments = [];
                const obj = data.val();
                for (let key in obj) {
                    comments.push({
                        id: key,
                        to: obj[key].to,
                        from: obj[key].from,
                        userId: obj[key].userId,
                        storeId: obj[key].storeId,
                        message: obj[key].message,
                        timestamp: obj[key].timestamp,
                    });
                }
                commit('SET_LOADED_COMMENTS', comments);
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
                commit('ERRORS', error);
                commit('loaders/SET_LOADING', false, { root: true });
            });
    },
    // CHAT END
};

export const mutations = {
    // // FIXME 
    // loaders/ SET_LOADING(state, payload) {
    //     state.loading = payload;
    // },
    // SET_SNACKBAR(state, payload) {
    //     state.snackbar = payload;
    // },
    /*
    ** CHAT
    */
    NEW_MESSAGE: (state, payload) => state.messages.push(payload),
    SET_LOADED_MESSAGES: (state, payload) => {
        state.messages = payload
    },
    NEW_COMMENT: (state, payload) => state.comments.push(payload),
    SET_LOADED_COMMENTS: (state, payload) => {
        state.comments = payload
    },
    /*
    ** CHAT
    */
};
