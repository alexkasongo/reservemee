<template>
    <div class="container store margin">
        <v-img
            class="rounded-xl mt-5"
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="300"
            max-width="100%"
            src="https://via.placeholder.com/1200"
        ></v-img>

        <div style="width: 100%">
            <div class="store-layout">
                <div class="store-layout__left">
                    <div
                        class="store__left-cat rounded-lg"
                        v-for="(category, id) in categories"
                        :key="id"
                    >
                        <div class="">{{ category.text }}</div>
                    </div>
                </div>
                <div class="store-layout__right">
                    <h2>Stores</h2>

                    <div class="store__sort-card">
                        <div
                            class="store__sort rounded-lg"
                            v-for="(category, id) in sorting"
                            :key="id"
                        >
                            <div class="store__sort-text">
                                {{ category.text }}
                            </div>
                        </div>
                    </div>
                    <div class="store-grid">
                        <div v-for="(store, id) in stores" :key="id">
                            <v-card
                                elevation="0"
                                class="rounded-xl mb-3"
                                style="max-width: 600px"
                            >
                                <div class="row no-gutters">
                                    <div
                                        class="rounded-tl-xl rounded-bl-xl store__banner col-md-4"
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
                                                This is a wider card with
                                                supporting text below as a
                                                natural lead-in to additional
                                                content. This content is a
                                                little bit longer.
                                            </p>

                                            <v-btn elevation="0"
                                                >Visit Store</v-btn
                                            >
                                        </div>
                                    </div>
                                </div>
                            </v-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';

export default {
    data: () => ({
        stores: [],
        comments: null,
        uid: 'RGfjW6W4YMUgClckhJE5PccAtSF3',
        categories: [
            { text: 'Home', image: 'https://via.placeholder.com/150' },
            { text: 'Top Stores', image: 'https://via.placeholder.com/150' },
            { text: 'New Stores', image: 'https://via.placeholder.com/150' },
            { text: 'Services', image: 'https://via.placeholder.com/150' },
            {
                text: 'Mobile Services',
                image: 'https://via.placeholder.com/150'
            },
            { text: 'Specials', image: 'https://via.placeholder.com/150' }
        ],
        sorting: [
            { text: 'Sort', image: 'https://via.placeholder.com/150' },
            { text: 'Product type', image: 'https://via.placeholder.com/150' },
            { text: 'Location', image: 'https://via.placeholder.com/150' },
            { text: 'Price Range', image: 'https://via.placeholder.com/150' },
            { text: 'Mobile', image: 'https://via.placeholder.com/150' },
            { text: 'Specials', image: 'https://via.placeholder.com/150' }
        ]
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
                    });
                }
                this.stores = stores;
            })
            .catch((error) => {
                console.log(`landing.vue - 134 - variable`, error);
            });
        // },
    }
};
</script>

<style lang="scss" scoped>
.store {
    &__left-cat {
        background-color: #cccccc;
        height: 70px;
        margin: 0 0 20px 0;
        padding: 0 0 0 20px;
        display: flex;
        justify-content: left;
        align-items: center;
    }
    &__sort {
        background-color: #cccccc;
        height: 40px;
        min-width: 130px;
        margin: 0 0px 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &__sort-card {
        display: flex;
        justify-content: space-between;
        margin: 40px 0;
    }
}

.store-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
}
.store-landing {
    border-radius: 30px;
}

.store-layout {
    display: flex;
    margin: 50px 0 0 0;
    &__left {
        width: 20%;
        margin: 0 50px 0 0;
    }
    &__right {
        width: 80%;
    }
}
</style>