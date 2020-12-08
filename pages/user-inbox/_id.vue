<template>
    <div class="inbox container">
        <!-- PREVIEW -->

        <div class="inbox__left">
            <v-card class="mx-auto" width="100%" tile>
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
                                        v-text="messenger.message"
                                    ></v-list-item-title>
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
            <v-card>
                <div v-for="(message, index) in messages" :key="index">
                    <p>{{ message }}</p>
                </div>
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
        selectedItem: 0,
        items: [
            { text: 'My Files', icon: 'mdi-folder' },
            { text: 'Shared with me', icon: 'mdi-account-multiple' },
            { text: 'Starred', icon: 'mdi-star' },
            { text: 'Recent', icon: 'mdi-history' },
            { text: 'Offline', icon: 'mdi-check-circle' },
            { text: 'Uploads', icon: 'mdi-upload' },
            { text: 'Backups', icon: 'mdi-cloud-upload' }
        ]
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
        // allReplies() {
        //     return this.allMessagesData.replies;
        // }
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
        }
    },
    mounted() {
        this.loadMessages(this.$route.params.id).then(() => {});
        this.loadReplies(this.$route.params.id).then(() => {
            // this.messages = this.replies;
            console.log(`_id.vue - 108 - variable`, this.messages);
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