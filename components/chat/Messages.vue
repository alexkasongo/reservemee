<template>
    <div>
        <!-- If Messages -->
        <div class="mx-auto">
            <!-- <div
                class="inbox-widget"
                v-for="message in messages"
                :key="message.id"
            >
                <div class="inbox-item">
                    <div class="inbox-item__left">
                        <div class="inbox-item-img">
                            <img src="https://via.placeholder.com/150" alt />
                        </div>
                        <div>
                            <p class="inbox-item-author">
                                {{ message.name }}
                            </p>
                            <p class="inbox-item-text">
                                {{ message.message }}
                            </p>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- If Messages -->

            <!-- NEW MESSAGE -->
            <div class="new-message">
                <form @submit.prevent="addMessage()">
                    <!-- <label for="new-message">New Message (enter to add):</label> -->
                    <p class="red-text" v-if="feedback">{{ feedback }}</p>
                    <v-textarea
                        type="text"
                        name="new-message"
                        placeholder="type in a message and press enter"
                        v-model="newMessage"
                        class="mb-3"
                    ></v-textarea>
                    <v-btn type="submit">Send Me</v-btn>
                </form>
            </div>
            <!-- NEW MESSAGE END -->
        </div>

        <!--If Messages end-->
        <v-list-item-content v-if="!messages">
            <v-alert
                style="cursor: pointer"
                icon="mdi-alert-circle-outline"
                text
                type="info"
                ><span> You have no messages. </span></v-alert
            >
        </v-list-item-content>
        <!--If No Messages end-->
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
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
                    console.log(`Messages.vue - 132 - 💜`, createdMessage);
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
                    console.log(`Messages.vue - 132 - 🍲`, createdMessage);
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
        // console.log(`Messages.vue - 138 - 🥎`, this.userProfile);
        this.$store.dispatch('chat/loadMessages', this.user.uid);

        // NEW MESSAGE
        // this.uis = this.currentUserId;
        this.$store.dispatch('chat/loadMessages', this.user.uid);
        this.$store.dispatch('chat/loadReplies', this.user.uid);
        // NEW MESSAGE

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // check user status
                firebase
                    .auth()
                    .currentUser.getIdTokenResult()
                    .then((tokenResult) => {
                        if (tokenResult) {
                            this.role = tokenResult.claims;
                        }
                    });
            }
        });
    }
};
</script>
