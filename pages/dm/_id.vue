<template>
    <div>
        <div>messages</div>
        <v-card
            max-width="300"
            v-for="(messenger, index) in allMessages"
            :key="index"
        >
            <a>{{ messenger.message }}</a>
        </v-card>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            allMessagesData: 'chat'
        }),
        allMessages() {
            return this.allMessagesData.messages;
        }
    },
    methods: {
        ...mapActions({
            loadMesssages: 'chat/loadMessages'
        })
    },
    mounted() {
        this.loadMesssages(this.$route.params.id).then(() => {
            console.log(`_id.vue - 21 - 🐠`, this.allMessagesData);
        });
    }
};
</script>

<style lang="sass" scoped>
</style>