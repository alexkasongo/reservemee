<template>
    <div>
        <client-only>
            <!-- If Messages -->
            <div>
                <!-- NEW MESSAGE -->
                <div class="new-message">
                    <form>
                        <div class="mb-5" @click="$router.push('/settings')">
                            <b-notification
                                v-if="warning"
                                type="is-warning"
                                :closable="false"
                                aria-close-label="Close notification"
                                role="alert"
                                style="cursor: pointer"
                            >
                                {{ warning }}
                            </b-notification>
                        </div>
                        <b-notification
                            v-if="feedback"
                            type="is-danger is-light"
                            aria-close-label="Close notification"
                            role="alert"
                        >
                            {{ feedback }}
                        </b-notification>
                        <b-input
                            maxlength="200"
                            type="textarea"
                            name="new-message"
                            placeholder="Type in a message and click send"
                            v-model="newMessage"
                        ></b-input>
                        <b-button dark type="is-primary" @click="addMessage()">
                            Send Me
                        </b-button>
                    </form>
                </div>
                <!-- NEW MESSAGE END -->
            </div>

            <!--If Messages end-->
            <div v-if="!messages">
                <div
                    style="cursor: pointer"
                    icon="mdi-alert-circle-outline"
                    text
                    type="info"
                >
                    <span> You have no messages. </span>
                </div>
            </div>
            <!--If No Messages end-->
        </client-only>
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
        warning: null,
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
            if (this.user.name === null) {
                this.newMessage = null;
                return;
            }
            if (this.role.customer) {
                if (this.newMessage) {
                    const createdMessage = {
                        storeId: this.storeProfile.storeId,
                        storeEmail: this.storeProfile.storeEmail,
                        storeName: this.storeProfile.storeName,
                        storeOwnerImage:
                            this.user.photoUrl ||
                            'https://via.placeholder.com/150',
                        storePhoneNumber: this.storeProfile.storePhoneNumber,
                        userId: this.user.uid,
                        name: this.user.name,
                        message: this.newMessage
                    };
                    console.log(`admin.vue - 342 - 🍎`, createdMessage);
                    // this.$store.dispatch('chat/addMsg', createdMessage);
                    this.newMessage = null;
                    this.feedback = null;
                } else {
                    this.feedback =
                        'You must have a username and enter a message in order to send one';
                }
            }
            if (this.role.admin) {
                if (this.newMessage) {
                    const createdMessage = {
                        storeId: this.storeProfile.storeId,
                        storeEmail: this.storeProfile.storeEmail,
                        storeName: this.storeProfile.storeName,
                        storeOwnerImage:
                            this.user.photoUrl ||
                            'https://via.placeholder.com/150',
                        storePhoneNumber: this.storeProfile.storePhoneNumber,
                        userId: this.user.uid,
                        name: this.user.name,
                        message: this.newMessage
                    };
                    console.log(`admin.vue - 342 - 🔥`, createdMessage);
                    // this.$store.dispatch('chat/addMsg', createdMessage);
                    this.newMessage = null;
                    this.feedback = null;
                } else {
                    this.feedback =
                        'You must have a username and enter a message in order to send one';
                }
            }
        }
        // NEW MESSAGE
    },
    mounted() {
        if (this.user.name === null) {
            this.warning =
                'You must have a username to send a message. Go to settings and create a username';
        }

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

<style></style>
