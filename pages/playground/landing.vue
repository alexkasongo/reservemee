<template>
    <div class="store margin">
        <!-- <Chat /> -->
        <h1>Hey lol</h1>
        <div
            class="card"
            style="width: 18rem"
            v-for="(store, id) in stores"
            :key="id"
        >
            <div class="card-body">
                <div v-for="store_profile in store" :key="store_profile.id">
                    <h5 class="card-title">{{ store_profile.storeName }}</h5>
                    <p class="card-text">{{ store_profile.storeBio }}</p>
                </div>
                <v-btn class="teal darker-1" dark>Visit Store</v-btn>
            </div>
        </div>
        <!-- <ul v-for="(store, id) in stores" :key="id">
            <li class="card" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title">
                        {{ store.storeProfile }}
                    </h5>
                    <p class="card-text">
                    </p>
                    <v-btn class="teal darker-1" dark>Visit Store</v-btn>
                </div>
            </li>
        </ul> -->
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
        stores: [],
        comments: null,
        uid: 'RGfjW6W4YMUgClckhJE5PccAtSF3'
    }),
    computed: {
        user() {
            return this.$store.getters.user;
        },
        test() {
            return this.stores.filter((res) => res === 'storeProfile');
        }
    },
    created() {
        /*
         ** this can be used in stead of vuex for easier reactivity
         */
        // const data = firebase
        //     .database()
        //     .ref('users/' + this.uid)
        //     .child('messages');
        // data.on('value', (snapshot) => {
        //     console.log(`landing.vue - 32 - 🍎`, snapshot.val());
        //     this.messages = snapshot.val();
        // });

        /*
         ** Load all stores
         */
        const data = firebase.database().ref('users');
        data.on('value', (snapshot) => {
            console.log(`landing.vue - 59 - 🍎`, snapshot.val());
            this.stores = snapshot.val();
            // snapshot.forEach((storeSnapshot) => {
            //     console.log(
            //         'User 🍎' + storeSnapshot.key + ': ' + storeSnapshot
            //     );
            // });
        });
    }
};
</script>

<style lang="scss" scoped>
.store {
    &__grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    &__list {
        list-style-type: none;
    }
}
</style>