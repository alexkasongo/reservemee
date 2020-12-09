<template>
    <div class="inbox container">
        <!-- PREVIEW -->

        <div class="inbox__left">
            <v-card class="mx-auto" height="90vh" width="100%" tile>
                <v-navigation-drawer width="100%" permanent>
                    <!-- HEADER -->
                    <v-card elevation="0" class="mx-auto" max-width="434" tile>
                        <v-img height="100%" class="teal darker-1">
                            <v-row align="end" class="fill-height">
                                <v-col
                                    align-self="start"
                                    class="pa-0"
                                    cols="12"
                                >
                                    <v-avatar
                                        class="profile"
                                        color="grey"
                                        size="164"
                                        tile
                                    >
                                        <v-img
                                            :src="
                                                filteredUserData.storeOwnerImage
                                            "
                                        ></v-img>
                                    </v-avatar>
                                </v-col>
                                <v-col class="py-0">
                                    <v-list-item color="rgba(0, 0, 0, .4)" dark>
                                        <v-list-item-content>
                                            <v-list-item-title class="title">
                                                {{ user.name }}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>{{
                                                user.email
                                            }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-img>
                    </v-card>
                    <!-- HEADER -->
                    <v-divider></v-divider>
                    <v-list nav>
                        <v-list-item-group
                            v-model="selectedItem"
                            color="teal darker-1"
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
                                        >From:
                                        {{ messenger.name }}</v-list-item-title
                                    >
                                    <p v-text="messenger.message"></p>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                    <v-list v-if="allMessages.length <= 0" nav>
                        <v-list-item-group color="teal darker-1">
                            <v-list-item>
                                <v-list-item-content>
                                    <v-alert
                                        class="m-0"
                                        icon="mdi-alert-circle-outline"
                                        text
                                        type="info"
                                        ><span>
                                            You have no messages.
                                        </span></v-alert
                                    >
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
            <v-card height="90vh" class="container inbox__right-card mx-auto">
                <!-- <div v-if="messages.length <= 0">
                    Click on message to view...
                </div> -->
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

                    <v-list v-if="allMessages.length > 0">
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
import * as firebase from 'firebase/app';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        firstMessage: null,
        messages: [],
        selectedItem: [],
        newReply: null,
        feedback: null,
        role: null,
        filteredUserData: []
    }),
    computed: {
        ...mapGetters({
            replies: 'chat/replies',
            user: 'user'
            // userData: 'dashboard/userData'
        }),
        ...mapState({
            allMessagesData: 'chat',
            userData: 'dashboard'
        }),
        allMessages() {
            return this.allMessagesData.messages;
        }
        // filteredUserData() {
        //     if (this.userData.storeProfile) {
        //         return this.userData.storeProfile;
        //     }
        // }
    },
    methods: {
        ...mapActions({
            loadMessages: 'chat/loadMessages',
            loadReplies: 'chat/loadReplies'
        }),
        loadAllReplies(messageData) {
            this.$store
                .dispatch('chat/loadReplies', messageData.userId)
                .then((res) => {
                    // only filter once async call is complete
                    const filteredMessages = this.replies.filter((res) => {
                        return (
                            res.messagePreviewId ===
                            messageData.messagePreviewId
                        );
                    });
                    this.messages = filteredMessages;
                });
        },
        onChange(e) {
            const value = e.id;
            console.log(`admin.vue - 217 - 💋`, e);
            // in this case ID works as the messagePreviewId

            if (e.messagePreviewId === undefined) {
                console.log(`admin.vue - 222 - 🍑`, e.messagePreviewId);
                this.firstMessage = Object.assign({}, e);
            }
            // this.firstMessage = JSON.parse(JSON.stringify(e));

            // if there are no replies then load all replies and filter according to ID which is
            // the same as previewMessageId
            if (e.messagePreviewId === undefined && this.messages.length <= 0) {
                this.firstMessage = null;
                this.loadReplies(e.userId).then(() => {
                    this.messages = this.replies.filter((res) => {
                        return res.messageId === value;
                    });
                });
            }
            //  if service length is more than zero, repopulate and then filter accordingly
            if (e.messagePreviewId === undefined && this.messages.length > 0) {
                this.firstMessage = null;
                this.messages = this.replies;

                const filteredMessages = this.messages.filter((res) => {
                    return res.messageId === value;
                });
                this.messages = filteredMessages;
            }

            console.log(`admin.vue - 239 - 💿`, this.firstMessage);
        },
        //NOTE  this is adding new reply
        onReply() {
            console.log(`admin.vue - 250 - 💦`, this.firstMessage);
            if (this.role.admin) {
                if (this.firstMessage !== null && this.newReply) {
                    const createdMessage = {
                        to: this.firstMessage.name,
                        from: this.user.name,
                        userId: this.firstMessage.userId,
                        storeId: this.firstMessage.storeId,
                        messageId: this.firstMessage.id,
                        storeName: this.firstMessage.storeName,
                        storePhoneNumber: this.firstMessage.storePhoneNumber,
                        storeEmail: this.firstMessage.storeEmail,
                        storeOwnerImage: this.firstMessage.storeOwnerImage,
                        message: this.newReply,
                        messagePreviewId: this.firstMessage.id
                    };
                    console.log(`FIRST MESSAGE.vue - 243 - 🩳`, createdMessage);
                    // this.$store.dispatch('chat/sendReply', createdMessage);
                    this.newReply = null;
                    this.feedback = null;

                    // this.loadAllReplies(this.messages[0]);
                } else {
                    this.feedback = 'You must enter a reply to add it';
                }

                if (this.firstMessage === null && this.newReply) {
                    const createdMessage = {
                        to: this.messages[0].to,
                        from: this.user.name,
                        userId: this.messages[0].userId,
                        storeId: this.messages[0].storeId,
                        messageId: this.messages[0].messageId,
                        storeName: this.filteredUserData.storeName,
                        storePhoneNumber: this.filteredUserData
                            .storePhoneNumber,
                        storeEmail: this.filteredUserData.storeEmail,
                        storeOwnerImage: this.filteredUserData.storeOwnerImage,
                        message: this.newReply,
                        messagePreviewId: this.messages[0].messageId
                    };
                    console.log(`MORE MESSAGES.vue - 243 - 🍇`, createdMessage);
                    // this.$store.dispatch('chat/sendReply', createdMessage);
                    this.newReply = null;
                    this.feedback = null;

                    // this.loadAllReplies(this.messages[0]);
                } else {
                    this.feedback = 'You must enter a reply to add it';
                }
            }
        }
    },
    mounted() {
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

        this.loadMessages(this.user.uid).then(() => {});

        // load store profile data here
        this.filteredUserData = this.userData.userData[0].storeProfile;
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
    &__right-card {
        overflow: auto;
    }
}
</style>