<template>
    <div class="margin">
        <!-- <Chat /> -->
        <h1>Hey lol</h1>

        <ul v-for="message in messages" :key="message.id">
            <li>name: {{ message.name }}</li>
            <li>message: {{ message.message }}</li>
        </ul>
    </div>
</template>

<script>
import Chat from '@/components/chat/Chat';
import * as firebase from 'firebase/app';
import 'firebase/database';
import NewMessage from '@/components/chat/NewMessage';

export default {
    components: {
        Chat
    },
    data: () => ({
        messages: null,
        comments: null,
        uid: 'RGfjW6W4YMUgClckhJE5PccAtSF3'
    }),
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    created() {
        // this can be used in stead of vuex for easier reactivity
        const data = firebase
            .database()
            .ref('users/' + this.uid)
            .child('messages');
        data.on('value', (snapshot) => {
            console.log(`landing.vue - 32 - 🍎`, snapshot.val());
            this.messages = snapshot.val();
        });
    }
};
</script>

<style lang="scss" scoped>
</style>