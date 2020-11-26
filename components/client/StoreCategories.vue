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
        <div v-if="storesLoading">
            <p>Loading...</p>
        </div>
        <div v-if="!storesLoading" class="categories__popular">
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
                                    'url(' + store.storeBanner + ')'
                            }"
                        ></div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">
                                    {{ store.storeName | capitalize }}
                                </h5>
                                <p class="card-text">
                                    {{ store.storeBio | truncate(50, '...') }}
                                </p>

                                <v-btn @click="viewStore(store)" elevation="0"
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
            <h2>New Stores</h2>
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
        storesLoading: false,
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
            { text: 'Store 4', image: 'https://via.placeholder.com/150' },
            { text: 'Store 5', image: 'https://via.placeholder.com/150' },
            { text: 'Store 6', image: 'https://via.placeholder.com/150' }
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
                    id: store.storeId
                    // name: store.storeName
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
                this.storesLoading = true;

                const validStores = [];
                const stores = [];
                const arrayObj = data.val();

                for (let key in arrayObj) {
                    stores.push({
                        data: arrayObj[key]
                    });
                }

                // remove any key that is not
                const filtered = stores.filter((res) => {
                    return res.data.storeProfile;
                });

                // remove all stores that do not meet minimum store requirements
                const valid = filtered.filter((res) => {
                    return res.data.storeProfile.storeBanner !== undefined;
                });

                // loop through the filtered data and push valid data to validstore array
                for (let key in valid) {
                    validStores.push({
                        storeBanner: valid[key].data.storeProfile.storeBanner,
                        storeBio: valid[key].data.storeProfile.storeBio,
                        storeEmail: valid[key].data.storeProfile.storeEmail,
                        storeId: valid[key].data.storeProfile.storeId,
                        storeLocation:
                            valid[key].data.storeProfile.storeLocation,
                        storeLogo: valid[key].data.storeProfile.storeLogo,
                        storeName: valid[key].data.storeProfile.storeName,
                        storeOwnerImage:
                            valid[key].data.storeProfile.storeOwnerImage,
                        storePhoneNumber:
                            valid[key].data.storeProfile.storePhoneNumber
                    });
                }

                console.log(`StoreCategories.vue - 179 - 😊`, filtered);

                this.stores = validStores;
                this.storesLoading = false;
            })
            .catch((error) => {
                // TODO handle this error
                console.log(`🙈`, error);
            });
    }
};
</script>

<style lang="scss" scoped>
</style>