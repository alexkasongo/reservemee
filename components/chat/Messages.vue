<template>
    <div>
        <h1 class="title">TEST</h1>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import * as firebase from 'firebase/app';
import { db } from '@/plugins/firebase';
import 'firebase/database';

export default {
    data: () => ({
        isModalVisible: false,
        newMessage: null,
        feedback: null,
        uid: '',
        role: null
    }),
    computed: {
        ...mapGetters({
            messages: 'chat/messages',
            storeProfile: 'storeFront/loadedStoreProfile'
        }),
        ...mapState({
            user: 'user',
            allUserData: 'dashboard'
        }),
        userProfile() {
            return this.allUserData.userData[0].storeProfile;
        }
    },
    methods: {
        removeMessage(message) {
            this.$store.dispatch('deleteMessage', message);
        },
        closeModal() {
            this.isModalVisible = false;
        },
        viewProfile(message) {
            this.$router.push({
                name: 'customer-id',
                params: {
                    id: message.userId,
                    name: message.name
                }
            });
        },

        // NEW MESSAGE
        addMessage() {
            if (this.role.customer) {
                if (this.newMessage) {
                    const createdMessage = {
                        storeId: this.storeProfile.storeId,
                        storeEmail: this.storeProfile.storeEmail,
                        storeName: this.storeProfile.storeName,
                        storeOwnerImage: this.userProfile.storeOwnerImage,
                        storePhoneNumber: this.storeProfile.storePhoneNumber,
                        userId: this.user.uid,
                        name: this.user.name,
                        message: this.newMessage
                    };
                    this.$store.dispatch('chat/addMsg', createdMessage);
                    this.newMessage = null;
                    this.feedback = null;
                } else {
                    this.feedback =
                        'You must enter a message in order to send one';
                }
            }
            if (this.role.admin) {
                if (this.newMessage) {
                    const createdMessage = {
                        storeId: this.storeProfile.storeId,
                        storeEmail: this.storeProfile.storeEmail,
                        storeName: this.storeProfile.storeName,
                        storeOwnerImage: this.userProfile.storeOwnerImage,
                        storePhoneNumber: this.storeProfile.storePhoneNumber,
                        userId: this.user.uid,
                        name: this.user.name,
                        message: this.newMessage
                    };
                    this.$store.dispatch('chat/addMsg', createdMessage);
                    this.newMessage = null;
                    this.feedback = null;
                } else {
                    this.feedback =
                        'You must enter a message in order to send one';
                }
            }
        }
        // NEW MESSAGE
    },
    mounted() {
        this.$store.dispatch('chat/loadMessages', this.user.uid);

        // this.uis = this.currentUserId;
        this.$store.dispatch('chat/loadMessages', this.user.uid);
        this.$store.dispatch('chat/loadReplies', this.user.uid);
        // NEW MESSAGE

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                // get logged in user role
                await db
                    .collection('roles')
                    .doc(user.uid)
                    .get()
                    .then((res) => {
                        this.role = res.data().role;
                    });
                // get logged in user role - end
            }
        });
    }
};
</script>
