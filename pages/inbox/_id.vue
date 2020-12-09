<template>
    <div class="inbox container">
        <!-- PREVIEW -->

        <div class="inbox__left">
            <v-card class="mx-auto" height="90vh" width="100%" tile>
                <v-navigation-drawer width="100%" permanent>
                    <!-- HEADER -->
                    <!-- <v-list>
                        <v-list-item>
                            <v-avatar size="128">
                                <img
                                    :src="filteredUserData.storeOwnerImage"
                                    :alt="user.name"
                                />
                            </v-avatar>
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
                    </v-list> -->
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
                <div v-if="messages.length <= 0">
                    Click on message to view...
                </div>
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
                    <v-list v-if="messages.length > 0">
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
                <v-list v-if="messages.length <= 0" nav>
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
        messages: [],
        selectedItem: [],
        newReply: null,
        feedback: null,
        role: null
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
        filteredUserData() {
            return this.userData.userData[0].storeProfile;
        }
    },
    methods: {
        ...mapActions({
            loadMessages: 'chat/loadMessages',
            loadReplies: 'chat/loadReplies'
        }),
        loadAllReplies(messageId) {
            this.$store
                .dispatch('chat/loadReplies', this.user.uid)
                .then((res) => {
                    // only filter once async call is complete
                    const filteredMessages = this.replies.filter((res) => {
                        return res.messagePreviewId === messageId;
                    });
                    this.messages = filteredMessages;
                });
        },
        onChange(e) {
            const value = e.messagePreviewId;

            // if all is selected show all
            if (this.messages.length <= 0) {
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

                    this.loadAllReplies(this.messages[0].messagePreviewId);
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