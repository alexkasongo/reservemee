<template>
    <div>
        <v-list three-line>
            <div>
                <template v-for="(reply, index) in filteredReplies">
                    <v-list-item :key="index">
                        <v-list-item-avatar>
                            <img :src="reply.storeOwnerImage" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="deep-purple-text">{{
                                reply.from
                            }}</v-list-item-title>
                            <div
                                v-bind:class="{
                                    teal: reply.from === `${user.name}`,
                                    grey: reply.from !== `${user.name}`
                                }"
                                dark
                            >
                                {{ reply.message }}
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </div>
            <!-- <div v-else>Go ahead and respond...</div> -->
            <v-list>
                <v-list-item>
                    <v-list-item-content>
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
                            <div color="teal" type="submit" dark>Send</div>
                        </form>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-list>
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
        messages: null,
        role: null,
        filteredReplies: null
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
            return this.loadedChats.messages;
        },
        filteredSender() {
            const data = this.sender.filter((res) => {
                return res.id === this.$route.params.id;
            });
            return data[0];
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
        }
    },
    created() {
        this.$store
            .dispatch('chat/loadReplies', this.filteredSender.userId)
            .then((res) => {
                // only filter once async call is complete
                this.filterReplies();
            });

        // check if signin user is admin or customer
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
                        }
                    });
            }
        });
    },
    methods: {
        filterReplies() {
            const data = this.loadedReplies.filter((res) => {
                return res.messageId === this.$route.params.id;
            });
            this.filteredReplies = data;
        },
        loadAllReplies() {
            this.$store
                .dispatch('chat/loadReplies', this.filteredSender.userId)
                .then((res) => {
                    // only filter once async call is complete
                    this.filterReplies();
                });
        },
        //NOTE  this is adding new reply
        onReply() {
            if (this.role.customer) {
                if (this.newReply) {
                    const createdMessage = {
                        to: this.filteredSender.name,
                        from: this.user.name,
                        userId: this.filteredSender.userId,
                        storeId: this.user.uid,
                        messageId: this.$route.params.id,
                        storeName: this.filteredSender.storeName,
                        storePhoneNumber: this.filteredSender.storePhoneNumber,
                        storeEmail: this.filteredSender.storeEmail,
                        storeOwnerImage: this.filteredUserData.storeOwnerImage,
                        message: this.newReply,
                        messagePreviewId: this.filteredSender.id
                    };
                    this.$store.dispatch('chat/sendReply', createdMessage);
                    this.newReply = null;
                    this.feedback = null;

                    this.loadAllReplies();
                } else {
                    this.feedback = 'You must enter a reply to add it';
                }
            }
            if (this.role.admin) {
                if (this.newReply) {
                    const createdMessage = {
                        to: this.filteredSender.name,
                        from: this.user.name,
                        userId: this.filteredSender.userId,
                        storeId: this.user.uid,
                        messageId: this.$route.params.id,
                        storeName: this.filteredSender.storeName,
                        storePhoneNumber: this.filteredSender.storePhoneNumber,
                        storeEmail: this.filteredSender.storeEmail,
                        storeOwnerImage: this.filteredUserData.storeOwnerImage,
                        message: this.newReply,
                        messagePreviewId: this.filteredSender.id
                    };
                    this.$store.dispatch('chat/sendReply', createdMessage);
                    this.newReply = null;
                    this.feedback = null;

                    this.loadAllReplies();
                } else {
                    this.feedback = 'You must enter a reply to add it';
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
