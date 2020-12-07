<template>
    <div>
        <!-- If Messages -->
        <div class="mx-auto">
            <div
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

                    <!-- <div class="inbox-item__left">
                        <v-btn
                            @click="viewProfile(message)"
                            class="teal darken-1"
                            dark
                            >Reply</v-btn
                        >
                    </div> -->
                </div>
            </div>

            <!-- NEW MESSAGE -->
            <div class="new-message">
                <form @submit.prevent="addMessage()">
                    <label for="new-message">New Message (enter to add):</label>
                    <p class="red-text" v-if="feedback">{{ feedback }}</p>
                    <v-text-field
                        type="text"
                        name="new-message"
                        placeholder="type in a message and press enter"
                        v-model="newMessage"
                    ></v-text-field>
                    <v-btn type="submit">Send</v-btn>
                </form>
            </div>
            <!-- NEW MESSAGE END -->
        </div>
        <!--If Messages end-->

        <!-- If No Messages -->
        <!-- <v-card class="mx-auto">
            <v-list-item three-line>
                <v-list-item-content>
                    <v-alert
                        style="cursor: pointer"
                        icon="mdi-alert-circle-outline"
                        text
                        type="info"
                        ><span> You have no messages. </span></v-alert
                    >
                </v-list-item-content>
            </v-list-item>
        </v-card> -->
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
import { db } from '@/plugins/firebase';
import 'firebase/database';

export default {
    data: () => ({
        isModalVisible: false,
        // uid: 'RGfjW6W4YMUgClckhJE5PccAtSF3',
        // NEW MESSAGE
        newMessage: null,
        feedback: null,
        uid: ''
    }),
    computed: {
        ...mapGetters({
            messages: 'chat/messages',
            storeProfile: 'storeFront/loadedStoreProfile'
        }),
        ...mapState(['user'])
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
            if (this.newMessage) {
                const createdMessage = {
                    storeId: this.storeProfile.storeId,
                    storeEmail: this.storeProfile.storeEmail,
                    storeName: this.storeProfile.storeName,
                    storeOwnerImage: this.storeProfile.storeOwnerImage,
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
                this.feedback = 'You must enter a message in order to send one';
            }
        }
        // NEW MESSAGE
    },
    created() {
        console.log(`Messages.vue - 138 - 🌙`, this.storeProfile);
        this.$store.dispatch('chat/loadMessages', this.user.uid);

        // NEW MESSAGE
        this.uis = this.currentUserId;
        this.$store.dispatch('chat/loadMessages', this.user.uid);
        this.$store.dispatch('chat/loadReplies', this.user.uid);
        // NEW MESSAGE
    }
};
</script>
