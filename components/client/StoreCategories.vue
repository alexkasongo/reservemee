<template>
    <div class="categories">
        <h2>Popular Stores</h2>

        <!-- SORT -->
        <div class="categories__sort-card">
            <div
                class="categories__sort rounded-lg"
                v-for="(category, id) in sorting"
                :key="id"
            >
                <div class="categories__sort-text">
                    {{ category.text }}
                </div>
            </div>
        </div>
        <!-- SORT END -->

        <!-- POPULAR STORES -->
        <div class="categories__popular">
            <div v-for="(store, id) in stores.slice(0, 4)" :key="id">
                <v-card
                    outlined
                    elevation="0"
                    class="rounded-xl mb-3"
                    style="width: 100%"
                >
                    <div class="row no-gutters">
                        <div
                            class="categories__store-card col-md-4"
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

                                <v-btn
                                    @click="viewStore(store.storeProfile)"
                                    elevation="0"
                                    >Visit Store</v-btn
                                >
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
        <!-- POPULAR STORES END -->

        <!-- NEW STORES -->
        <div class="categories__new">
            <h2>Popular Stores</h2>
            <div class="categories__new-stores">
                <div
                    class="categories__new-store-card"
                    v-for="(store, id) in newStores"
                    :key="id"
                >
                    <div
                        class="categories__new-store"
                        v-bind:style="{
                            'background-image': 'url(' + store.image + ')'
                        }"
                    ></div>
                </div>
            </div>
        </div>
        <!-- NEW STORES -->

        <!-- RECOMMENDED STORES -->
        <div class="categories__new">
            <h2>Recommended Stores</h2>
            <div class="categories__new-stores">
                <div
                    class="categories__new-store-card"
                    v-for="(store, id) in newStores"
                    :key="id"
                >
                    <div
                        class="categories__new-store"
                        v-bind:style="{
                            'background-image': 'url(' + store.image + ')'
                        }"
                    ></div>
                </div>
            </div>
        </div>
        <!-- RECOMMENDED STORES -->
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';

export default {
    name: 'StoreCategories',
    data: () => ({
        stores: [],
        comments: null,
        uid: 'RGfjW6W4YMUgClckhJE5PccAtSF3',
        sorting: [
            { text: 'Sort', image: 'https://via.placeholder.com/150' },
            { text: 'Product type', image: 'https://via.placeholder.com/150' },
            { text: 'Location', image: 'https://via.placeholder.com/150' },
            { text: 'Price Range', image: 'https://via.placeholder.com/150' },
            { text: 'Mobile', image: 'https://via.placeholder.com/150' },
            { text: 'Specials', image: 'https://via.placeholder.com/150' }
        ],
        newStores: [
            { text: 'Store 1', image: 'https://via.placeholder.com/150' },
            { text: 'Store 2', image: 'https://via.placeholder.com/150' },
            { text: 'Store 3', image: 'https://via.placeholder.com/150' },
            { text: 'Store 4', image: 'https://via.placeholder.com/150' }
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
    methods: {
        viewStore(store) {
            this.$router.push({
                name: 'store-front-id',
                params: {
                    id: store.storeId,
                    name: store.storeName
                }
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
    }
};
</script>

<style lang="scss" scoped>
</style>