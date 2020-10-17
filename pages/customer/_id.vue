<template>
    <div class="view-profile container">
        <h1>Messages</h1>
        <!-- <p>{{ test }}</p> -->
        <div class="card">
            <!-- <div class="card" v-if="currentUserMessages"> -->
            <h2 class="deep-purple-text center">
                {{ this.$route.params.name }}
            </h2>
            <ul class="comments collection">
                <li v-for="(comment, index) in comments" :key="index">
                    <div class="deep-purple-text">{{ comment.from }}</div>
                    <div class="grey-text text-darken-2">
                        {{ comment.message }}
                    </div>
                </li>
            </ul>
            <form @submit.prevent="onSubmit">
                <div class="field">
                    <label for="comment">Write Message</label>
                    <v-text-field
                        type="text"
                        name="comment"
                        v-model="newComment"
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
import { db } from '@/plugins/firebase';
import { mapState, mapGetters } from 'vuex';

export default {
    data: () => ({
        profile: null,
        newComment: null,
        feedback: null,
        uid: 'RGfjW6W4YMUgClckhJE5PccAtSF3',
        messages: null,
        customerInfo: [
            {
                id: '1',
                name: 'Aleko',
                message: 'Thank you so much for the...'
            },
            {
                id: 2,
                name: 'Kay Love',
                message: 'Amazing, I love you...'
            },
            {
                id: 3,
                name: 'Tine Wangu',
                message: 'Well done, you have out done...'
            },
            {
                id: 4,
                name: 'Aleko',
                message: 'I did not receive my order...'
            },
            {
                id: 5,
                name: 'Andrea',
                message: 'I would like to make multiple...'
            },
            {
                id: 6,
                name: 'Michelle',
                message: 'I will pay anything for your...'
            }
        ]
    }),
    computed: {
        ...mapGetters({
            user: 'user'
        })
    },
    computed: {
        currentUserMessages() {
            const messages = this.comments.filter((res) => {
                return res.userId === this.$route.params.id;
            });
            return messages[0];
        },
        comments() {
            const clonedComments = [];
            const comments = this.$store.getters.comments;
            comments.forEach((comment) => {
                clonedComments.push({
                    ...comment
                });
            });
            let filtered = clonedComments.filter(
                (res) => res.userId === this.$route.params.id
                // res.storeId === this.uid
            );
            return filtered;
        },
        currentUserComments() {
            const data = this.comments;
            const filteredData = data.filter((res) => {
                return (res.userId = this.$route.params.id);
            });
            return filteredData;
        },
        ...mapState(['user'])
    },
    created() {
        // this.comments = filteredComments;
        // this.messages = this.$store.state.messages;
        // db.collection('comments')
        //     .where('to', '==', this.$route.params.id)
        //     .onSnapshot((snapshot) => {
        //         snapshot.docChanges().forEach((change) => {
        //             if (change.type == 'added') {
        //                 this.comments.unshift({
        //                     from: change.doc.data().from,
        //                     content: change.doc.data().content
        //                 });
        //             }
        //         });
        //     });
    },
    methods: {
        //NOTE  this is adding new comment
        onSubmit() {
            if (this.newComment) {
                const createdMessage = {
                    to: this.$route.params.name,
                    from: this.user.name,
                    userId: this.$route.params.id,
                    storeId: this.uid,
                    message: this.newComment
                };
                // console.log(`_id.vue - 101 - 🍉`, this.$route.params.name);
                // console.log(`_id.vue - 102 - 🏝`, createdMessage);

                this.$store.dispatch('sendPrivateMessage', createdMessage);
                this.newComment = null;
                this.feedback = null;
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
body {
    background: #ddd;
}
</style>
