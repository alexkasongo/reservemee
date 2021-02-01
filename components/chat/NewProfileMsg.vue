<template>
    <div class="new-message">
        <form @submit.prevent="addMessage()">
            <label for="new-message">New Message (enter to add):</label>
            <p class="red-text" v-if="feedback">{{ feedback }}</p>
            <input
                type="text"
                name="new-message"
                placeholder="type in a message"
                v-model="newMessage"
            />
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'NewMessage',
    data() {
        return {
            newMessage: null,
            feedback: null
        };
    },
    computed: {
        ...mapState(['name'])
    },
    methods: {
        addMessage() {
            if (this.newMessage) {
                const createdMessage = {
                    name: this.name,
                    content: this.newMessage
                };
                this.$store.dispatch('addProfileMsg', createdMessage);
                this.newMessage = null;
                this.feedback = null;
            } else {
                this.feedback = 'You must enter a message in order to send one';
            }
        }
    }
};
</script>
