<template>
    <div class="chat">
        <div class="card container">
            <div class="card-content">
                <div class="">
                    <h2 class="center teal-text">General Board</h2>
                </div>
                <ul class="messages">
                    <li
                        class="wrap"
                        v-for="message in $store.getters.messages"
                        :key="message.id"
                    >
                        <a @click="viewProfile(message.userId)">
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
                            <!-- v-if="message.name == this.$store.getters.user.displayName" -->
                            <button
                                v-if="$store.getters.user.name == message.name"
                                type="button"
                                class="btn"
                                @click="showModal(message)"
                            >
                                Edit
                            </button>
                            <!-- <modal
                                v-show="isModalVisible"
                                @close="closeModal"
                            /> -->
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage />
                <!-- <NewMessage :name="name"/> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
// import Navbar from '@/components/chat/';
import NewMessage from '@/components/chat/NewMessage';
import Modal from '@/components/chat/Modal.vue';

export default {
    name: 'Chat',
    // props: ['name'],
    components: {
        // Navbar,
        NewMessage,
        Modal
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
        viewProfile(id) {
            this.$router.push({
                name: 'customer-id',
                params: {
                    id: id
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
