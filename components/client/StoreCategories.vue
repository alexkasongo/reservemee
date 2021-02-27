<template>
    <div class="categories">
        <h1 class="title">Popular Stores</h1>

        <!-- SORT -->
        <div class="categories__sort-card">
            <div
                class="categories__sort rounded-lg"
                v-for="(category, id) in sorting"
                :key="id"
            >
                <div
                    @click="onCatClicked(category.text)"
                    :style="[
                        isClicked
                            ? { background: '#7957d5' }
                            : { background: '#cccccc' }
                    ]"
                    class="categories__sort-text"
                >
                    {{ category.text }}
                </div>
            </div>
        </div>
        <!-- SORT END -->

        <!-- POPULAR STORES -->
        <div v-if="storesLoading">
            <p>Loading...</p>
        </div>

        <div v-if="!storesLoading" class="categories__grid">
            <div v-for="(store, id) in stores" :key="id">
                <div
                    class="card categories__grid-card m-0"
                    @click="viewStore(store)"
                    style="cursor: pointer"
                >
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img
                                        :src="store.storeBanner"
                                        :alt="store.storeBanner"
                                    />
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">
                                    {{ store.storeName | capitalize }}
                                </p>
                            </div>
                        </div>

                        <div class="content">
                            <div class="columns">
                                <div class="column">
                                    {{ store.storeBio | truncate(100, '...') }}
                                </div>
                                <div class="column">
                                    <div
                                        class="block is-flex is-justify-content-flex-end"
                                    >
                                        <div>
                                            <b-icon
                                                style="cursor: pointer"
                                                icon="heart"
                                            ></b-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        error: null,
        isClicked: false
        // on: "red",
        // off: ""
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
        },
        onCatClicked(e) {
            console.log(`StoreCategories.vue - 135 - 🍎`, e);
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
