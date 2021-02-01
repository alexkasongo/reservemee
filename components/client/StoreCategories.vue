<template>
    <div class="categories">
        <div class="display-1">Popular Stores</div>

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
        <v-row v-if="!storesLoading" class="categories__popular">
            <v-col v-for="(store, id) in stores" :key="id" class="col-md-6">
                <v-card
                    @click="viewStore(store)"
                    outlined
                    elevation="0"
                    class="rounded-xl mb-3"
                    style="width: 100%"
                    :ripple="false"
                >
                    <div
                        class="services__left-card d-flex flex-no-wrap justify-space-between"
                    >
                        <div class="services__left-card-img-container">
                            <img
                                class="services__left-service-img"
                                :src="store.storeBanner"
                                alt=""
                            />
                        </div>
                        <div class="services__left-card-info">
                            <v-card-title class="headline">{{
                                store.storeName | capitalize
                            }}</v-card-title>

                            <v-card-subtitle>{{
                                store.storeBio | truncate(50, '...')
                            }}</v-card-subtitle>

                            <v-card-text
                                class="display-1 text--primary services__left-card-price"
                            >
                                <v-btn @click="viewStore(store)" elevation="0"
                                    >Visit Store</v-btn
                                >
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                    :class="fav ? 'red--text' : ''"
                                    icon
                                    @click="fav = !fav"
                                >
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
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
        ],
        fav: false,
        error: null
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
                }
            });
        }
    },
    created() {
        /*
         ** Load all stores
         ** REVIEW There should be a better way to consume the data below.
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

                this.stores = validStores;
                this.storesLoading = false;
            })
            .catch((error) => {
                // FIXME
                this.error = error;
            });
    }
};
</script>

<style lang="scss" scoped></style>
