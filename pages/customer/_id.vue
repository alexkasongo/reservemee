<template>
    <div class="view-profile container margin">
        <h1>Messages</h1>
        <!-- <p>{{ test }}</p> -->
        <div class="card">
            <h2 class="deep-purple-text center">
                {{ sender.name }}
            </h2>
            <ul class="comments collection">
                <li>
                    <div class="deep-purple-text">{{ sender.name }}</div>
                    <div class="grey-text text-darken-2">
                        {{ sender.message }}
                    </div>
                </li>
            </ul>
            <div class="card" v-if="currentUserMessages">
                <ul class="comments collection">
                    <li v-for="(comment, index) in comments" :key="index">
                        <div class="deep-purple-text">{{ comment.from }}</div>
                        <div class="grey-text text-darken-2">
                            {{ comment.message }}
                        </div>
                    </li>
                </ul>
            </div>
            <form @submit.prevent="onReply">
                <div class="field">
                    <label for="comment">Write Message</label>
                    <v-text-field
                        type="text"
                        name="comment"
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
            // loadedComments: 'chat/comments'
        }),
        loadedComments() {
            return this.loadedChats.comments;
        },
        sender() {
            return this.loadedChats.messages[0];
        },
        currentUserMessages() {
            if (!this.comments === null) {
                const messages = this.comments.filter((res) => {
                    return res.userId === this.$route.params.id;
                });
                return messages[0];
            }
        },
        comments() {
            const clonedComments = [];
            if (!this.loadedComments.length <= 0) {
                const comments = this.loadedComments;
                comments.forEach((comment) => {
                    clonedComments.push({
                        ...comment
                    });
                });
                let filtered = clonedComments.filter(
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
        this.$store.dispatch('chat/loadComments', this.user.uid);
        console.log(`_id.vue - 82 - 😳`, this.loadedChats.messages);
        console.log(`_id.vue - 82 - 🌈`, this.user);
    },
    methods: {
        //NOTE  this is adding new comment
        onReply() {
            if (this.newReply) {
                const createdMessage = {
                    to: this.sender.name,
                    from: this.user.name,
                    userId: this.$route.params.id,
                    storeId: this.user.uid,
                    message: this.newReply
                };
                console.log(`_id.vue - 113 - 🍎`, createdMessage);
                // this.$store.dispatch('chat/sendPrivateMessage', createdMessage);
                // this.newReply = null;
                // this.feedback = null;
            } else {
                this.feedback = 'You must enter a comment to add it';
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
