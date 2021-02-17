<template>
    <div>
        <!-- <div
            class="inbox-widget"
            v-for="message in messages.slice(0, 3)"
            :key="message.id"
        >
            <div class="inbox-item">
                <div class="inbox-item__left">
                    <div class="inbox-item-img">
                        <img :src="message.storeOwnerImage" alt />
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
        </div>
        <b-button
            type="is-primary"
            expanded
            v-if="messages.length > 0"
            @click="$router.push('/inbox/admin')"
            >View All</b-button
        > -->
        <client-only>
            <div v-if="messages.length <= 0">
                <b-notification
                    type="is-success is-light"
                    aria-close-label="Close notification"
                    :closable="false"
                >
                    You have no messages.
                </b-notification>
            </div>
        </client-only>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import 'firebase/database';

export default {
    data: () => ({
        isModalVisible: false,
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
                    id: message.id,
                    name: message.name
                }
            });
        }
    },
    created() {
        // if (process.client) {
        // }
        this.$store.dispatch('chat/loadMessages', this.user.uid);
        // NEW MESSAGE
        this.uis = this.currentUserId;
        this.$store.dispatch('chat/loadMessages', this.user.uid);
        this.$store.dispatch('chat/loadReplies', this.user.uid);
        // NEW MESSAGE
    }
};
</script>
