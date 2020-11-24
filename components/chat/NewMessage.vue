<template>
    <div class="new-message">
        <form @submit.prevent="addMessage()">
            <label for="new-message">New Message (enter to add):</label>
            <p class="red-text" v-if="feedback">{{ feedback }}</p>
            <v-text-field
                type="text"
                name="new-message"
                placeholder="type in a message and press enter"
                v-model="newMessage"
            ></v-text-field>
            <v-btn type="submit">Send</v-btn>
        </form>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { db } from '@/plugins/firebase';
import 'firebase/database';

export default {
    name: 'NewMessage',
    // props: ['name'],
    data() {
        return {
            newMessage: null,
            feedback: null,
            uid: 'RGfjW6W4YMUgClckhJE5PccAtSF3'
        };
    },
    computed: {
        ...mapState(['user'])
    },
    created() {
        this.$store.dispatch('chat/loadMessages', this.uid);
        this.$store.dispatch('chat/loadComments', this.uid);
    },
    methods: {
        addMessage() {
            if (this.newMessage) {
                const createdMessage = {
                    storeId: this.uid,
                    userId: this.user.uid,
                    name: this.user.name,
                    message: this.newMessage
                };
                this.$store.dispatch('chat/addMsg', createdMessage);
                this.newMessage = null;
                this.feedback = null;
            } else {
                this.feedback = 'You must enter a message in order to send one';
            }
        }
    }
};
</script>
