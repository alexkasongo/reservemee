<template>
    <div class="inbox container">
        <!-- PREVIEW -->

        <div class="inbox__left">
            <v-card class="mx-auto" height="90vh" width="100%" tile>
                <v-navigation-drawer width="100%" permanent>
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-img
                                    src="https://via.placeholder.com/120"
                                ></v-img>
                            </v-list-item-avatar>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="title">
                                    {{ user.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle>{{
                                    user.email
                                }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list nav>
                        <v-list-item-group
                            v-model="selectedItem"
                            color="primary"
                        >
                            <v-list-item
                                v-for="(messenger, i) in allMessages"
                                :key="i"
                            >
                                <v-list-item-avatar>
                                    <v-img
                                        :src="messenger.storeOwnerImage"
                                    ></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content
                                    @click="onChange(messenger)"
                                >
                                    <v-list-item-title
                                        >To:
                                        {{
                                            messenger.storeName
                                        }}</v-list-item-title
                                    >
                                    <v-list-item-subtitle
                                        v-text="messenger.message"
                                    ></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-navigation-drawer>
            </v-card>
        </div>
        <!-- PREVIEW END -->

        <!-- MESSAGE -->
        <div class="inbox__right">
            <v-card height="90vh" class="container mx-auto">
                <v-list three-line>
                    <div>
                        <template v-for="(message, index) in messages">
                            <v-list-item :key="index">
                                <v-list-item-avatar>
                                    <v-img
                                        :src="message.storeOwnerImage"
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title
                                        class="deep-purple-text"
                                        >{{ message.from }}</v-list-item-title
                                    >
                                    <v-alert
                                        v-bind:class="{
                                            teal:
                                                message.from === `${user.name}`,
                                            grey:
                                                message.from !== `${user.name}`
                                        }"
                                        dark
                                    >
                                        {{ message.message }}
                                    </v-alert>
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
                                        <p
                                            v-if="feedback"
                                            class="red-text center"
                                        >
                                            {{ feedback }}
                                        </p>
                                    </div>
                                    <v-btn color="teal" type="submit" dark
                                        >Send</v-btn
                                    >
                                </form>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-list>
            </v-card>
        </div>
        <!-- MESSAGE -->
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        messages: [],
        selectedItem: [],
        newReply: null,
        feedback: null
    }),
    computed: {
        ...mapGetters({
            replies: 'chat/replies',
            user: 'user'
        }),
        ...mapState({
            allMessagesData: 'chat'
        }),
        allMessages() {
            return this.allMessagesData.messages;
        }
    },
    methods: {
        ...mapActions({
            loadMessages: 'chat/loadMessages',
            loadReplies: 'chat/loadReplies'
        }),
        onChange(e) {
            // replace empty space with dash and transform to lowercase as value Array.filter()
            // is case sensitive
            const value = e.messagePreviewId;

            // if all is selected show all
            if (value === 'all') {
                this.messages = this.replies;
            }

            // function which we can use filter object
            if (value !== 'all') {
                const filteredMessages = this.messages.filter((res) => {
                    return res.messagePreviewId === value;
                });
                this.messages = filteredMessages;
            }

            //  if service length is less than zero, repopulate and then filter accordingly
            if (this.messages.length <= 0) {
                this.messages = this.replies;

                const filteredMessages = this.messages.filter((res) => {
                    return res.messagePreviewId === value;
                });
                this.messages = filteredMessages;
            }
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
                    // console.log(`_id.vue - 180 - 🥶`, createdMessage);
                    this.newReply = null;
                    this.feedback = null;

                    this.loadAllReplies();
                } else {
                    this.feedback = 'You must enter a reply to add it';
                }
            }
        }
    },
    mounted() {
        this.loadMessages(this.$route.params.id).then(() => {});
        this.loadReplies(this.$route.params.id).then(() => {
            // this.messages = this.replies;
            console.log(`_id.vue - 108 - variable`, this.allMessages);
        });

        // check if signed in user is admin or customer
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
    }
};
</script>

<style lang="scss" scoped>
.inbox {
    display: flex;
    &__left {
        width: 40%;
        margin: 0 10px 0 0;
    }
    &__right {
        width: 60%;
    }
}
</style>