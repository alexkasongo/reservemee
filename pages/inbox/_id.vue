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

        <div class="sidebar-page">
            <section class="sidebar-layout">
                <b-sidebar
                    position="static"
                    :mobile="mobile"
                    :expand-on-hover="expandOnHover"
                    :reduce="reduce"
                    :fullheight="true"
                    type="is-light"
                    open
                    class="sidebar"
                >
                    <div class="p-1">
                        <div class="block">
                            <ul>
                                <li>
                                    <img
                                        :src="filteredUserData.storeOwnerImage"
                                        style="height: 100px"
                                    />
                                </li>
                                <li>{{ user.name }}</li>
                                <li>{{ user.email }}</li>
                            </ul>
                        </div>
                        <b-menu class="is-custom-mobile">
                            <b-menu-list label="From:">
                                <div
                                    v-for="(messenger, i) in allMessages"
                                    :key="i"
                                >
                                    <b-menu-item
                                        expanded
                                        icon="checkbox-blank-circle"
                                        :label="messenger.name"
                                    >
                                        <b-menu-item
                                            active
                                            class="is-active"
                                            @click="onChange(messenger)"
                                            :label="messenger.message"
                                        ></b-menu-item>
                                    </b-menu-item>
                                </div>
                            </b-menu-list>
                        </b-menu>
                    </div>
                </b-sidebar>

                <div class="settings-container">
                    <div
                        class="inbox-view ml-5 mr-5 is-flex is-flex-direction-column is-justify-content-space-between"
                    >
                        <div class="inbox__right-card-top">
                            <div
                                v-if="messagePreview.length > 0"
                                elevation="0"
                                class="inbox__right-card-head"
                            >
                                <div>
                                    <p class="display-1 text--primary">
                                        {{
                                            messagePreview[0].name | capitalize
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
                                        {{ messagePreview[0].message }}
                                    </div>
                                </div>
                            </div>
                            <hr v-if="messagePreview.length > 0" />

                            <div class="inbox__right-card-middle">
                                <ul
                                    v-for="(message, index) in messages"
                                    :key="index"
                                >
                                    <li :key="index" class="is-flex mb-5">
                                        <div class="inbox__right-avatar">
                                            <img
                                                class="message-avatar"
                                                :src="message.storeOwnerImage"
                                            />
                                        </div>
                                        <div>
                                            <div class="ml-2">
                                                {{ message.from }}
                                            </div>
                                            <div
                                                v-bind:class="{
                                                    purple:
                                                        message.from ===
                                                        `${user.name}`,
                                                    grey:
                                                        message.from !==
                                                        `${user.name}`
                                                }"
                                                class="ml-2"
                                            >
                                                {{ message.message }}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="inbox__right-card-btm">
                            <ul v-if="allMessages.length > 0">
                                <li>
                                    <div>
                                        <form>
                                            <div class="field">
                                                <label for="reply"
                                                    >Write Message</label
                                                >
                                                <b-input
                                                    type="text"
                                                    name="reply"
                                                    v-model="newReply"
                                                ></b-input>
                                                <p
                                                    v-if="feedback"
                                                    class="red-text center"
                                                >
                                                    {{ feedback }}
                                                </p>
                                            </div>
                                            <b-button
                                                label="Send"
                                                aria-label="Send message"
                                                @click="onReply"
                                                type="is-primary"
                                                expanded
                                            >
                                                Send
                                            </b-button>
                                        </form>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div
                            v-if="allMessages.length <= 0"
                            class="inbox__right-card-btm"
                        >
                            <ul>
                                <li>
                                    <div>
                                        <form>
                                            <div class="field">
                                                <label for="reply"
                                                    >Write Message</label
                                                >
                                                <b-input
                                                    type="text"
                                                    name="reply"
                                                    v-model="newReply"
                                                ></b-input>
                                                <p
                                                    v-if="feedback"
                                                    class="red-text center"
                                                >
                                                    {{ feedback }}
                                                </p>
                                            </div>
                                            <b-button
                                                label="Send"
                                                aria-label="Send message"
                                                @click="onReply"
                                                type="is-primary"
                                                expanded
                                            >
                                                Send
                                            </b-button>
                                        </form>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import { mapState, mapGetters, mapActions } from 'vuex';
import { db } from '@/plugins/firebase';

export default {
    data: () => ({
        messages: [],
        messagePreview: [],
        selectedItem: [],
        newReply: null,
        feedback: null,
        role: null,
        filteredUserData: [],
        expandOnHover: false,
        mobile: 'reduce',
        reduce: false
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
    created() {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                // User is signed in.
                // check user status

                // get logged in user role
                await db
                    .collection('roles')
                    .doc(user.uid)
                    .get()
                    .then((res) => {
                        this.role = res.data().role;
                    });
                // get logged in user role - end
            }
        });

        this.loadMessages(this.user.uid).then(() => {});

        // only do something when userdata is available
        if (this.userData.userData.length > 0) {
            this.filteredUserData = this.userData.userData[0].storeProfile;
        }
    }
};
</script>

<style lang="scss" scoped>
.p-1 {
    padding: 1em;
}
.sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    .sidebar-layout {
        display: flex;
        flex-direction: row;
        height: calc(100vh - 56px);
    }
}
@media screen and (max-width: 1023px) {
    .b-sidebar {
        .sidebar-content {
            box-shadow: none;
            &.is-mini-mobile {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
@media screen and (min-width: 1024px) {
    .b-sidebar {
        .sidebar-content {
            box-shadow: none;
            &.is-mini {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
.is-mini-expand {
    .menu-list a {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
.settings-container {
    width: 100%;
}

// MESSAGES
.message-avatar {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 50%;
    // margin: 0 0 10px 0;
}
.purple {
    background-color: #7957d5;
    color: #fff;
    padding: 15px;
    border-radius: 24px 24px 0px 24px;
}
.grey {
    background-color: #777;
    color: #fff;
    padding: 15px;
    border-radius: 24px 24px 24px 0px;
}
.inbox-view {
    height: calc(100vh - 56px);
}
</style>
