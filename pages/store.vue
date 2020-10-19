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
            <div class="store__layout">
                <div class="store__left">
                    <div
                        class="store__left-cat rounded-lg"
                        v-for="(category, id) in categories"
                        :key="id"
                    >
                        <div class="">{{ category.text }}</div>
                    </div>
                </div>
                <div class="store__right">
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
                                outlined
                                elevation="0"
                                class="rounded-xl mb-3"
                                style="width: 100%"
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
                                                {{
                                                    store.storeProfile.storeBio
                                                        | truncate(50, '...')
                                                }}
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
        firebase
            .database()
            .ref('users')
            .once('value')
            .then((data) => {
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
</style>