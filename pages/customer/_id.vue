<template>
    <v-card max-width="450" class="mx-auto">
        <v-list three-line>
            <template v-for="(reply, index) in replies">
                <!-- <v-subheader
                    v-if="reply.from"
                    :key="reply.index"
                    v-text="reply.from"
                ></v-subheader>

                <v-divider
                    v-else-if="true"
                    :key="index"
                    :inset="true"
                ></v-divider> -->

                <!-- <h1>Messages</h1> -->
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
                <!-- <div v-if="currentUserMessages"> -->
                <v-list-item :key="index">
                    <v-list-item-avatar>
                        <v-img :src="reply.storeOwnerImage"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="deep-purple-text">{{
                            reply.from
                        }}</v-list-item-title>
                        <!-- <v-list-item-subtitle
                            v-html="reply.message"
                        ></v-list-item-subtitle> -->
                        <v-alert
                            v-bind:class="{
                                teal: reply.from === `${user.name}`,
                                grey: reply.from !== `${user.name}`
                            }"
                            dark
                        >
                            {{ reply.message }}
                        </v-alert>
                    </v-list-item-content>
                </v-list-item>
                <!-- </div> -->
            </template>
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
        </v-list>
    </v-card>
</template>

<script>
import * as firebase from 'firebase/app';
import { mapState, mapGetters } from 'vuex';

export default {
    data: () => ({
        profile: null,
        newReply: null,
        feedback: null,
        messages: null,
        role: null
    }),
    computed: {
        ...mapState({
            user: 'user',
            loadedChats: 'chat',
            userData: 'dashboard'
        }),
        ...mapGetters({
            user: 'user'
        }),
        filteredUserData() {
            return this.userData.userData[0].storeProfile;
        },
        loadedReplies() {
            return this.loadedChats.replies;
        },
        sender() {
            return this.loadedChats.messages[0];
        },
        replies() {
            const clonedReplies = [];
            if (!this.loadedReplies.length <= 0) {
                const replies = this.loadedReplies;
                replies.forEach((reply) => {
                    // const key = reply.key;
                    clonedReplies.push({
                        ...reply
                        // id: key
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
        currentUserMessages() {
            if (this.replies !== null) {
                const messages = this.replies.filter((res) => {
                    return res;
                });
                return messages;
            }
        }
    },
    created() {
        console.log(`_id.vue - 128 - 😇`, this.filteredUserData);
        this.$store
            .dispatch('chat/loadReplies', this.$route.params.id)
            .then(() => {
                // console.log(`_id.vue - 82 - 😳`, this.currentUserMessages);
            });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // check user status
                firebase
                    .auth()
                    .currentUser.getIdTokenResult()
                    .then((tokenResult) => {
                        if (tokenResult) {
                            this.role = tokenResult.claims;
                            console.log(tokenResult.claims);
                        }
                    });
            }
        });
    },
    methods: {
        //NOTE  this is adding new reply
        onReply() {
            console.log(`_id.vue - 160 - 🙏🏾`, this.role.customer);
            if (this.role.customer) {
                if (this.newReply) {
                    const createdMessage = {
                        to: this.sender.name,
                        from: this.user.name,
                        userId: this.$route.params.id,
                        storeId: this.user.uid,
                        storeName: this.sender.storeName,
                        storePhoneNumber: this.sender.storePhoneNumber,
                        storeEmail: this.sender.storeEmail,
                        storeOwnerImage: this.filteredUserData.storeOwnerImage,
                        message: this.newReply
                    };
                    this.$store.dispatch('chat/sendReply', createdMessage);
                    this.newReply = null;
                    this.feedback = null;
                } else {
                    this.feedback = 'You must enter a reply to add it';
                }
            }
            if (this.role.admin) {
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
    }
};
</script>

<style lang="scss" scoped>
// .view-profile .card {
//     padding: 20px;
//     margin-top: 60px;
// }
// .view-profile h2 {
//     font-size: 2em;
//     margin-top: 0;
// }
// .view-profile li {
//     padding: 10px;
//     border-bottom: 1px solid #eee;
// }
</style>
