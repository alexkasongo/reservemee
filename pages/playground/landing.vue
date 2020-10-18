<template>
    <div class="store margin">
        <!-- <Chat /> -->
        <!-- <h1>Hey lol</h1> -->

        <div class="store__grid">
            <div style="width: 100%" v-for="(store, id) in stores" :key="id">
                <v-card class="mb-3" style="max-width: 540px">
                    <div class="row no-gutters">
                        <div
                            class="store__banner col-md-4"
                            v-bind:style="{
                                'background-image':
                                    'url(' +
                                    store.storeProfile.storeBanner +
                                    ')'
                            }"
                        ></div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">
                                    {{
                                        store.storeProfile.storeName
                                            | capitalize
                                    }}
                                </h5>
                                <p class="card-text">
                                    This is a wider card with supporting text
                                    below as a natural lead-in to additional
                                    content. This content is a little bit
                                    longer.
                                </p>

                                <v-btn elevation="0">Visit Store</v-btn>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
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
            return this.stores.filter((res) => {
                res.storeProfile;
            });
        }
    },
    created() {
        /*
         ** Load all stores
         */
        // const data = firebase.database().ref('users');
        // data.on('value', (snapshot) => {
        //     console.log(`landing.vue - 59 - 🍎`, snapshot.val());
        //     this.stores = snapshot.val();
        // });

        // loadComments({ commit }, payload) {
        // commit('SET_LOADING', true);
        //to make it realtime use on() instead of once()
        firebase
            .database()
            .ref('users')
            .once('value')
            .then((data) => {
                // console.log(`landing.vue - 115 - 🥶`, data.val());
                const stores = [];
                const obj = data.val();
                for (let key in obj) {
                    stores.push({
                        storeProfile: obj[key].storeProfile
                        // from: obj[key].from,
                        // userId: obj[key].userId,
                        // storeId: obj[key].storeId,
                        // message: obj[key].message,
                        // timestamp: obj[key].timestamp,
                    });
                }
                // commit('SET_LOADED_STORES', stores);
                // commit('SET_LOADING', false);
                console.log(`landing.vue - 130 - 🙈`, stores);
                this.stores = stores;
            })
            .catch((error) => {
                // commit('ERRORS', error);
                // commit('SET_LOADING', false);
                console.log(`landing.vue - 134 - variable`, error);
            });
        // },
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
    &__banner {
        background-image: url('https://via.placeholder.com/250');
        background-position: center;
        background-size: cover;
    }
}
</style>