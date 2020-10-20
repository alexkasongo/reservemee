<template>
    <div class="categories">
        <h2>Top Stores</h2>

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
        <div class="categories-grid">
            <div v-for="(store, id) in stores" :key="id">
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
    }
};
</script>

<style lang="scss" scoped>
</style>