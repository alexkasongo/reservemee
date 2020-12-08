import * as firebase from 'firebase/app';
import 'firebase/database';


export const state = () => ({
    messages: [],
    replies: [],
});

export const getters = {
    loading: (state) => state.loading,
    // snackbar: (state) => state.snackbar,
    alert: (state) => state.alert,

    messages: (state) => state.messages,
    replies: (state) => state.replies,
};

export const actions = {
    /*
    ** CHAT
    ** TODO research ways to search firebase realtime database
    */
    deleteMessage: function (context, payload) {
        database.collection('messages').doc(payload.id).delete()
            .then(() => {
                this.commit('DELETE_MESSAGE', payload)
            })
    },
    currentMessage: function (context, payload) {
        this.commit('CURRENT_MESSAGE', payload)
    },
    /*
    ** CHAT
    ** FIXME new messages should get added to the users collections
    */
    async addMsg({ commit }, payload) {

        const message = {
            name: payload.name,
            message: payload.message,
            userId: payload.userId,
            storeId: payload.storeId,
            storeEmail: payload.storeEmail,
            storeName: payload.storeName,
            storeOwnerImage: payload.storeOwnerImage,
            storePhoneNumber: payload.storePhoneNumber,
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
                commit('loaders/SET_SNACKBAR', true, { root: true });
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
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
    editMsg: function (payload) {
        database.collection('messages').doc(payload.id).update({
            content: payload.content,
            name: payload.name,
            timestamp: Date.now()
        }).then(() => {
            this.commit('EDIT_MESSAGE', payload)
        }).catch(error => {
            commit('ERRORS', error);
        })
    },
    userName: function (payload) {
        this.commit('USER_NAME', payload)
    },
    async sendReply({ commit, dispatch }, payload) {
        // console.log(`chat.js - 93 - 🌈`, payload);

        const comment = {
            to: payload.to,
            from: payload.from,
            userId: payload.userId,
            storeId: payload.storeId,
            messageId: payload.messageId,
            storeName: payload.storeName,
            storePhoneNumber: payload.storePhoneNumber,
            storeEmail: payload.storeEmail,
            storeOwnerImage: payload.storeOwnerImage,
            message: payload.message,
            timestamp: Date.now()
        };

        await firebase
            .database()
            .ref('users/' + payload.userId)
            .child('replies')
            .push(comment)
            .then((data) => {
                const key = data.key;
                commit('NEW_REPLY', {
                    ...comment,
                    id: key
                });
                dispatch('loadReplies', payload.userId);
                commit('loaders/SET_SNACKBAR', true, { root: true });
                commit('loaders/SET_LOADING', false, { root: true });
            })
            .catch((error) => {
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
                        name: obj[key].name,
                        message: obj[key].message,
                        timestamp: obj[key].timestamp,
                        storeId: obj[key].storeId,
                        storeEmail: obj[key].storeEmail,
                        storeName: obj[key].storeName,
                        storeOwnerImage: obj[key].storeOwnerImage,
                        storePhoneNumber: obj[key].storePhoneNumber,
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
    async loadReplies({ commit }, payload) {
        commit('loaders/SET_LOADING', true, { root: true });
        //to make it realtime use on() instead of once()
        await firebase
            .database()
            .ref('users/' + payload)
            .child('replies')
            .once('value')
            .then((data) => {
                const replies = [];
                const obj = data.val();
                for (let key in obj) {
                    replies.push({
                        id: key,
                        to: obj[key].to,
                        from: obj[key].from,
                        userId: obj[key].userId,
                        storeId: obj[key].storeId,
                        messageId: obj[key].messageId,
                        storeName: obj[key].storeName,
                        storePhoneNumber: obj[key].storePhoneNumber,
                        storeEmail: obj[key].storeEmail,
                        storeOwnerImage: obj[key].storeOwnerImage,
                        message: obj[key].message,
                        timestamp: obj[key].timestamp,
                    });
                }
                commit('SET_LOADED_REPLIES', replies);
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
    /*
    ** CHAT
    */
    NEW_MESSAGE: (state, payload) => state.messages.push(payload),
    SET_LOADED_MESSAGES: (state, payload) => {
        state.messages = payload
    },
    NEW_REPLY: (state, payload) => state.replies.push(payload),
    SET_LOADED_REPLIES: (state, payload) => {
        state.replies = payload
    },
    /*
    ** CHAT END
    */
};
