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

                    <div class="inbox-item__left">
                        <v-btn
                            @click="viewProfile(message)"
                            class="teal darken-1"
                            dark
                            >Reply</v-btn
                        >
                    </div>
                </div>
            </div>
        </div>
        <!--If Messages end-->

        <!-- If No Messages -->
        <v-list-item-content v-if="messages.length <= 0">
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
        }

        // NEW MESSAGE
        // addMessage() {
        //     if (this.newMessage) {
        //         const createdMessage = {
        //             storeId: this.storeProfile.storeId,
        //             userId: this.user.uid,
        //             name: this.user.displayName,
        //             message: this.newMessage
        //         };
        //         this.$store.dispatch('chat/addMsg', createdMessage);
        //         this.newMessage = null;
        //         this.feedback = null;
        //     } else {
        //         this.feedback = 'You must enter a message in order to send one';
        //     }
        // }
        // NEW MESSAGE
    },
    created() {
        console.log(`StoreMessages.vue - 109 - 🥶`, this.messages);
        this.$store.dispatch('chat/loadMessages', this.user.uid);

        // NEW MESSAGE
        this.uis = this.currentUserId;
        this.$store.dispatch('chat/loadMessages', this.user.uid);
        this.$store.dispatch('chat/loadReplies', this.user.uid);
        // NEW MESSAGE
    }
};
</script>
