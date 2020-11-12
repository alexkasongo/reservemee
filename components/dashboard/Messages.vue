<template>
    <div>
        <!-- Messages -->
        <div class="ribbon-box">
            <div class="ribbon ribbon-primary">Messages</div>
            <div class="clearfix"></div>
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
            <div class="card-action">
                <NewMessage />
            </div>
        </div>
        <!-- Messages -->
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import NewMessage from '@/components/chat/NewMessage';
import Modal from '@/components/chat/Modal.vue';

export default {
    name: 'Chat',
    components: {
        NewMessage
    },
    data: () => ({
        isModalVisible: false,
        uid: 'RGfjW6W4YMUgClckhJE5PccAtSF3'
    }),
    computed: {
        ...mapGetters({
            messages: 'chat/messages'
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
    },
    created() {
        this.$store.dispatch('chat/loadMessages', this.uid);
    }
};
</script>

<style lang="scss" scoped></style>