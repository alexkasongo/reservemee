<template>
    <div class="chat">
        <div class="card container">
            <div class="card-content">
                <div class="">
                    <h2 class="center teal-text">All Messages</h2>
                </div>
                <ul class="messages">
                    <li
                        class="wrap"
                        v-for="message in $store.getters.messages"
                        :key="message.id"
                    >
                        <a @click="viewProfile(message)">
                            <span class="teal-text name">{{
                                message.name
                            }}</span>
                        </a>

                        <span class="grey-text text-darken-3">{{
                            message.message
                        }}</span>
                        <span class="grey-text time">{{
                            message.timestamp
                        }}</span>
                        <i
                            v-if="$store.getters.user.name == message.name"
                            class="material-icons btn-delete"
                            @click="removeMessage(message)"
                            >delete</i
                        >
                        <div>
                            <button
                                v-if="$store.getters.user.name == message.name"
                                type="button"
                                class="btn"
                                @click="showModal(message)"
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage />
            </div>
        </div>
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
    data() {
        return {
            isModalVisible: false,
            uid: 'RGfjW6W4YMUgClckhJE5PccAtSF3'
        };
    },
    computed: {
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
        this.$store.dispatch('loadMessages', this.uid);
    }
};
</script>

<style>
.chat h2 {
    font-size: 2.6em;
    margin-bottom: 40px;
}
.chat span {
    font-size: 1.4em;
}
.chat .name {
    margin-right: 5px;
}
.chat .time {
    display: block;
    font-size: 0.8em;
}
.messages {
    max-height: 300px;
    overflow: auto;
}
.chat .wrap {
    position: relative;
}
.chat .material-icons {
    position: absolute;
    top: 10px;
    right: 4px;
}
.chat .btn-delete {
    cursor: pointer;
}

.chat .container {
    margin: 10px auto;
}

.messages::-webkit-scrollbar {
    width: 3px;
}

.messages::-webkit-scrollbar-track {
    background: #ddd;
}

.messages::-webkit-scrollbar-thumb {
    background: #aaa;
}

.chat .btn {
    position: absolute;
    top: 4px;
    right: 40px;
    font-size: 0.7em;
}
</style>
