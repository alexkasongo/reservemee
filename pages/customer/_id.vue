<template>
    <div class="view-profile container margin">
        <h1>Messages</h1>
        <!-- <p>{{ test }}</p> -->
        <div class="card">
            <!-- <h2 class="deep-purple-text center">
                {{ sender.name }}
            </h2>
            <ul class="replies collection">
                <li>
                    <div class="deep-purple-text">{{ sender.name }}</div>
                    <div class="grey-text text-darken-2">
                        {{ sender.message }}
                    </div>
                </li>
            </ul> -->
            <div class="card" v-if="currentUserMessages">
                <ul class="comments collection">
                    <li v-for="(reply, index) in replies" :key="index">
                        <div class="deep-purple-text">{{ reply.from }}</div>
                        <div class="grey-text text-darken-2">
                            {{ reply.message }}
                        </div>
                    </li>
                </ul>
            </div>
            <form @submit.prevent="onReply">
                <div class="field">
                    <label for="reply">Write Message</label>
                    <v-text-field
                        type="text"
                        name="reply"
                        v-model="newReply"
                    ></v-text-field>
                    <p v-if="feedback" class="red-text center">
                        {{ feedback }}
                    </p>
                </div>
                <v-btn type="submit">Send</v-btn>
            </form>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import { mapState, mapGetters } from 'vuex';

export default {
    data: () => ({
        profile: null,
        newReply: null,
        feedback: null,
        // uid: 'RGfjW6W4YMUgClckhJE5PccAtSF3',
        messages: null
    }),
    computed: {
        ...mapGetters({
            user: 'user'
            // loadedReplies: 'chat/replies'
        }),
        loadedReplies() {
            return this.loadedChats.replies;
        },
        sender() {
            return this.loadedChats.messages[0];
        },
        currentUserMessages() {
            if (this.replies !== null) {
                const messages = this.replies.filter((res) => {
                    return res;
                });
                return messages;
            }
        },
        replies() {
            const clonedReplies = [];
            if (!this.loadedReplies.length <= 0) {
                const replies = this.loadedReplies;
                replies.forEach((reply) => {
                    clonedReplies.push({
                        ...reply
                    });
                });
                let filtered = clonedReplies.filter(
                    (res) => res.userId === this.$route.params.id
                );
                return filtered;
            } else {
                return null;
            }
        },
        ...mapState({
            user: 'user',
            loadedChats: 'chat'
        })
    },
    created() {
        this.$store.dispatch('chat/loadReplies', this.$route.params.id);
        console.log(`_id.vue - 82 - 😳`, this.currentUserMessages);
    },
    methods: {
        //NOTE  this is adding new reply
        onReply() {
            if (this.newReply) {
                const createdMessage = {
                    to: this.sender.name,
                    from: this.user.name,
                    userId: this.$route.params.id,
                    storeId: this.user.uid,
                    storeName: this.sender.storeName,
                    storePhoneNumber: this.sender.storePhoneNumber,
                    storeEmail: this.sender.storeEmail,
                    storeOwnerImage: this.sender.storeOwnerImage,
                    message: this.newReply
                };
                this.$store.dispatch('chat/sendReply', createdMessage);
                this.newReply = null;
                this.feedback = null;
            } else {
                this.feedback = 'You must enter a reply to add it';
            }
        }
    }
};
</script>

<style>
.view-profile .card {
    padding: 20px;
    margin-top: 60px;
}
.view-profile h2 {
    font-size: 2em;
    margin-top: 0;
}
.view-profile li {
    padding: 10px;
    border-bottom: 1px solid #eee;
}
</style>
