<template>
    <div class="settings">
        <!-- <v-app>
            <v-app>
                <v-navigation-drawer
                    class="margin"
                    v-model="drawer"
                    app
                    permanent
                    :mini-variant="mini"
                >
                    <v-list-item class="px-2">
                        <v-list-item-avatar v-if="loggedInUser.photoURL">
                            <img :src="loggedInUser.photoURL" />
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else>
                            <img src="https://via.placeholder.com/250" />
                        </v-list-item-avatar>

                        <v-list-item-title>{{
                            loggedInUser.displayName
                        }}</v-list-item-title>
                    </v-list-item>
                    <v-divider dark class="my-4"></v-divider>
                    <v-list dense>
                        <template>
                            <v-list @click="onChange(messenger)" link nav>
                                <v-list-item-group
                                    v-model="selectedItem"
                                    color="teal darker-1"
                                >
                                    <v-list-item
                                        v-for="(messenger, i) in allMessages"
                                        :key="i"
                                    >
                                        <v-list-item-avatar
                                            size="25"
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
                                                >From:
                                                {{
                                                    messenger.name
                                                }}</v-list-item-title
                                            >
                                            <p v-text="messenger.message"></p>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </template>
                    </v-list>
                </v-navigation-drawer>

                <v-main>
                    <v-container fluid class="fill-height">
                        <v-row class="settings__right-row">
                            <v-col>
                                <div
                                    elevation="0"
                                    height="100%"
                                    class="inbox__right-card"
                                >

                                    <div class="inbox__right-card-top">
                                        <div
                                            v-if="messagePreview.length > 0"
                                            elevation="0"
                                            class="inbox__right-card-head"
                                        >
                                            <div-text>
                                                <p
                                                    class="display-1 text--primary"
                                                >
                                                    {{
                                                        messagePreview[0].name
                                                            | capitalize
                                                    }}
                                                </p>
                                                <p>
                                                    {{
                                                        new Date(
                                                            messagePreview[0].timestamp
                                                        )
                                                    }}
                                                </p>
                                                <div class="text--primary">
                                                    {{
                                                        messagePreview[0]
                                                            .message
                                                    }}
                                                </div>
                                            </div-text>
                                        </div>
                                        <v-divider
                                            v-if="messagePreview.length > 0"
                                        ></v-divider>


                                        <div class="inbox__right-card-middle">
                                            <v-list three-line>
                                                <div>
                                                    <template
                                                        v-for="(
                                                            message, index
                                                        ) in messages"
                                                    >
                                                        <v-list-item
                                                            :key="index"
                                                        >
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
                                                                    {{
                                                                        message.message
                                                                    }}
                                                                </div>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </template>
                                                </div>
                                            </v-list>
                                        </div>

                                    </div>



                                    <div class="inbox__right-card-btm">
                                        <v-list v-if="allMessages.length > 0">
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <form
                                                        @submit.prevent="
                                                            onReply
                                                        "
                                                    >
                                                        <div class="field">
                                                            <label for="reply"
                                                                >Write
                                                                Message</label
                                                            >
                                                            <v-text-field
                                                                type="text"
                                                                name="reply"
                                                                v-model="
                                                                    newReply
                                                                "
                                                            ></v-text-field>
                                                            <p
                                                                v-if="feedback"
                                                                class="red-text center"
                                                            >
                                                                {{ feedback }}
                                                            </p>
                                                        </div>
                                                        <div
                                                            color="teal"
                                                            type="submit"
                                                            dark
                                                        >
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
                                                    <form
                                                        @submit.prevent="
                                                            onReply
                                                        "
                                                    >
                                                        <div class="field">
                                                            <label for="reply"
                                                                >Write
                                                                Message</label
                                                            >
                                                            <v-text-field
                                                                type="text"
                                                                name="reply"
                                                                v-model="
                                                                    newReply
                                                                "
                                                            ></v-text-field>
                                                            <p
                                                                v-if="feedback"
                                                                class="red-text center"
                                                            >
                                                                {{ feedback }}
                                                            </p>
                                                        </div>
                                                        <div
                                                            color="teal"
                                                            type="submit"
                                                            dark
                                                        >
                                                            Send
                                                        </div>
                                                    </form>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </div>

                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-main>
            </v-app>
        </v-app> -->
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
        filteredUserData: [],

        loggedInUser: [],
        drawer: null,
        items: null,
        mini: false,
        source: 'https://via.placeholder.com/500',
        selected: ''
    }),
    computed: {
        ...mapGetters({
            replies: 'chat/replies',
            user: 'user'
        }),
        ...mapState({
            allMessagesData: 'chat',
            userData: 'dashboard'
        }),
        allMessages() {
            return this.allMessagesData.messages;
        },
        viewPort() {
            // Define our viewportWidth variable
            let viewportWidth;

            // Set/update the viewportWidth value
            let setViewportWidth = function () {
                viewportWidth =
                    window.innerWidth || document.documentElement.clientWidth;
            };

            // Log the viewport width into the console
            let logWidth = () => {
                if (viewportWidth > 640) {
                    this.mini = false;
                } else {
                    this.mini = true;
                }
            };

            // Set our initial width and log it
            setViewportWidth();
            logWidth();

            // On resize events, recalculate and log
            window.addEventListener(
                'resize',
                function () {
                    setViewportWidth();
                    logWidth();
                },
                false
            );
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

            const value = e.id;
            this.loadReplies(e.userId).then(() => {
                // filter replies by message ID
                const data = this.replies.filter((res) => {
                    return res.messageId === value;
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
            if (this.role.admin) {
                if (this.newReply && this.messages[0].name) {
                    const createdMessage = {
                        to: this.messages[0].name,
                        from: this.user.name,
                        userId: this.messages[0].userId,
                        storeId: this.messages[0].storeId,
                        messageId: this.messages[0].id,
                        storeName: this.filteredUserData.storeName,
                        storePhoneNumber: this.filteredUserData
                            .storePhoneNumber,
                        storeEmail: this.filteredUserData.storeEmail,
                        storeOwnerImage: this.filteredUserData.storeOwnerImage,
                        message: this.newReply,
                        messagePreviewId: this.messages[0].id
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

                this.loggedInUser = user;
            }
        });

        // start tracking the viewport
        this.viewPort;

        this.loadMessages(this.user.uid).then(() => {});

        // load store profile data here

        // only do something when userdata is available
        if (this.userData.userData.length > 0) {
            this.filteredUserData = this.userData.userData[0].storeProfile;
        }
    }
};
</script>

<style lang="scss" scoped>
.margin {
    // margin: 90px auto 0 auto;
    margin-top: 64px;
}
.settings {
    &__right-row {
        height: 100%;
    }
}
</style>
