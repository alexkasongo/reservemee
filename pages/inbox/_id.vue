<template>
    <div class="inbox container">
        <!-- Alert start-->
        <div v-if="!filteredUserData.storeOwnerImage">
            <div
                style="cursor: pointer"
                @click="$router.push(`/profile/${user.uid}`)"
                icon="mdi-alert-circle-outline"
                text
                type="info"
            >
                Go to setting and add profile picture to unlock inbox
            </div>
        </div>
        <!-- Alert End -->

        <div class="inbox__card-container">
            <div class="inbox__left">
                <div>
                    <v-navigation-drawer width="100%" permanent>
                        <!-- HEADER -->
                        <div
                            elevation="0"
                            class="inbox__left-card"
                            width="100%"
                            tile
                        >
                            <img height="100%" class="teal darker-1" />
                            <v-row
                                align="end"
                                class="fill-height inbox__left-card-header"
                            >
                                <v-col
                                    align-self="start"
                                    class="pa-0"
                                    cols="12"
                                >
                                    <div
                                        class="profile"
                                        color="grey"
                                        size="164"
                                        tile
                                    >
                                        <img
                                            :src="
                                                filteredUserData.storeOwnerImage
                                            "
                                        />
                                    </div>
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
                        </div>
                        <!-- HEADER -->
                        <div class="inbox__left-messages">
                            <!-- <v-divider></v-divider> -->
                            <v-list nav>
                                <v-list-item-group
                                    v-model="selectedItem"
                                    color="teal darker-1"
                                >
                                    <v-list-item
                                        v-for="(messenger, i) in allMessages"
                                        :key="i"
                                    >
                                        <v-list-item-avatar
                                            @click="onChange(messenger)"
                                        >
                                            <img
                                                :src="messenger.storeOwnerImage"
                                            />
                                        </v-list-item-avatar>

                                        <v-list-item-content
                                            class="inbox__left-content"
                                            @click="onChange(messenger)"
                                        >
                                            <v-list-item-title
                                                >To:
                                                {{
                                                    messenger.storeName
                                                }}</v-list-item-title
                                            >
                                            <p v-text="messenger.message"></p>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </div>
                        <v-list v-if="allMessages.length <= 0" nav>
                            <v-list-item-group color="teal darker-1">
                                <v-list-item>
                                    <v-list-item-content>
                                        <div
                                            class="m-0"
                                            icon="mdi-alert-circle-outline"
                                            text
                                            type="info"
                                        >
                                            <span> You have no messages. </span>
                                        </div>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-navigation-drawer>
                </div>
            </div>
            <!-- PREVIEW END -->

            <!-- MESSAGE -->
            <div class="inbox__right">
                <div height="100%" class="inbox__right-card">
                    <!-- Message -->
                    <div class="inbox__right-card-top">
                        <div v-if="messagePreview.length > 0" elevation="0">
                            <div-text>
                                <p class="display-1 text--primary">
                                    {{ messagePreview[0].name | capitalize }}
                                </p>
                                <p>
                                    {{ new Date(messagePreview[0].timestamp) }}
                                </p>
                                <div class="text--primary">
                                    {{ messagePreview[0].message }}
                                </div>
                            </div-text>
                        </div>
                        <v-divider v-if="messagePreview.length > 0"></v-divider>

                        <!-- Conversation start -->
                        <div class="inbox__right-card-middle">
                            <v-list three-line>
                                <div>
                                    <template
                                        v-for="(message, index) in messages"
                                    >
                                        <v-list-item :key="index">
                                            <v-list-item-avatar
                                                class="inbox__right-avatar"
                                            >
                                                <img
                                                    :src="
                                                        message.storeOwnerImage
                                                    "
                                                />
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title
                                                    class="deep-purple-text"
                                                    >{{
                                                        message.from
                                                    }}</v-list-item-title
                                                >
                                                <div
                                                    v-bind:class="{
                                                        teal:
                                                            message.from ===
                                                            `${user.name}`,
                                                        grey:
                                                            message.from !==
                                                            `${user.name}`
                                                    }"
                                                    dark
                                                >
                                                    {{ message.message }}
                                                </div>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                </div>
                            </v-list>
                        </div>
                        <!-- Conversation End -->
                    </div>
                    <!-- Message End -->

                    <!-- Reply -->
                    <div class="inbox__right-card-btm">
                        <v-list v-if="allMessages.length > 0">
                            <v-list-item>
                                <v-list-item-content>
                                    <form @submit.prevent="onReply">
                                        <div class="field">
                                            <label for="reply"
                                                >Write Message</label
                                            >
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
                                        <div color="teal" type="submit" dark>
                                            Send
                                        </div>
                                    </form>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                    <div
                        v-if="allMessages.length <= 0"
                        class="inbox__right-card-btm"
                    >
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <form @submit.prevent="onReply">
                                        <div class="field">
                                            <label for="reply"
                                                >Write Message</label
                                            >
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
                                        <div color="teal" type="submit" dark>
                                            Send
                                        </div>
                                    </form>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                    <!-- Reply End -->
                </div>
            </div>
            <!-- MESSAGE -->
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        messages: [],
        messagePreview: [],
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
    },
    methods: {
        ...mapActions({
            loadMessages: 'chat/loadMessages',
            loadReplies: 'chat/loadReplies'
        }),
        loadFirstReply(messageData) {
            this.$store
                .dispatch('chat/loadReplies', messageData.userId)
                .then((res) => {
                    // only filter once async call is complete
                    const filteredMessages = this.replies.filter((res) => {
                        return res.messagePreviewId === messageData.id;
                    });
                    this.messages = filteredMessages;
                });
        },
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
            this.messagePreview = new Array(e);

            const value = e.messagePreviewId;
            this.loadReplies(e.userId).then(() => {
                const data = this.replies.filter((res) => {
                    return res.messagePreviewId === value;
                });
                if (data.length <= 0) {
                    this.messages = new Array(e);
                } else {
                    this.messages = data;
                }
            });
        },
        //NOTE  this is adding new reply
        onReply() {
            if (this.role.customer) {
                if (this.newReply && this.messages[0].name) {
                    const createdMessage = {
                        to: this.messages[0].storeName,
                        from: this.user.name,
                        userId: this.user.uid,
                        storeId: this.messages[0].storeId,
                        messageId: this.messages[0].messagePreviewId,
                        storeName: this.messages[0].storeName,
                        storePhoneNumber: this.messages[0].storePhoneNumber,
                        storeEmail: this.messages[0].storeEmail,
                        storeOwnerImage: this.filteredUserData.storeOwnerImage,
                        message: this.newReply,
                        messagePreviewId: this.messages[0].messagePreviewId
                    };
                    this.$store.dispatch('chat/sendReply', createdMessage);
                    this.newReply = null;
                    this.feedback = null;

                    this.loadFirstReply(this.messages[0]);
                } else {
                    this.feedback = 'You must enter a reply to add it';
                }

                // if the reply is to the initial message then use these details
                if (this.newReply && !this.messages[0].name) {
                    const createdMessage = {
                        to: this.messages[0].from,
                        from: this.user.name,
                        userId: this.user.uid,
                        storeId: this.messages[0].storeId,
                        messageId: this.messages[0].messageId,
                        storeName: this.messages[0].storeName,
                        storePhoneNumber: this.messages[0].storePhoneNumber,
                        storeEmail: this.messages[0].storeEmail,
                        storeOwnerImage: this.filteredUserData.storeOwnerImage,
                        message: this.newReply,
                        messagePreviewId: this.messages[0].messagePreviewId
                    };
                    this.$store.dispatch('chat/sendReply', createdMessage);
                    this.newReply = null;
                    this.feedback = null;

                    this.loadAllReplies(this.messages[0]);
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

        // only do something when userdata is available
        if (this.userData.userData.length > 0) {
            this.filteredUserData = this.userData.userData[0].storeProfile;
        }
    }
};
</script>

<style lang="scss" scoped></style>
