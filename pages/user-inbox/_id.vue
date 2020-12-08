<template>
    <div>
        <!-- PREVIEW -->
        <div>messages</div>
        <v-card elevation="0" class="mx-auto rounded-xl">
            <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
            </template>

            <v-card-title>Services</v-card-title>

            <!-- <v-card-text>
                <div class="my-4 subtitle-1">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Select Category</label>
                        <select
                            @change="onChange($event)"
                            class="form-control"
                            required
                        >
                            <option value="all" selected>All</option>
                            <option
                                v-for="(messenger, index) in allMessages"
                                :key="index"
                            >
                                {{ messenger.message | capitalize }}
                            </option>
                        </select>
                    </div>
                </div>
            </v-card-text> -->
            <div v-for="(messenger, index) in allMessages"
                                :key="index">
                <p @click="onChange(messenger)">{{ messenger.message }}</p>
            </div>
        </v-card>
        <!-- PREVIEW END -->
        <!-- MESSAGE -->
        <div v-for="(message, index) in messages" :key="index">
            <p>
                <p>{{ message }}</p>
            </p>
        </div>
        <!-- MESSAGE -->
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        messages: []
    }),
    computed: {
        ...mapGetters({
            replies: 'chat/replies'
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
            console.log(`_id.vue - 75 - variable`, e.messagePreviewId);
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
            this.messages = this.replies;
            console.log(`_id.vue - 108 - variable`, this.messages);
        });
    }
};
</script>

<style lang="sass" scoped>
</style>