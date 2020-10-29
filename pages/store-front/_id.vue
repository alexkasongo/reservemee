<template>
    <div class="container margin store-front">
        <!-- <h1>Welcome to your store: {{ this.$route.params.name }}</h1>
        <p>id: {{ this.$route.params.id }}</p> -->
        <div class="store-front__container">
            <div class="store-front__left">
                <div class="store-front__left-banner">
                    <v-card
                        elevation="0"
                        outlined
                        :loading="loading"
                        class="mx-auto rounded-xl"
                    >
                        <template slot="progress">
                            <v-progress-linear
                                color="deep-purple"
                                height="10"
                                indeterminate
                            ></v-progress-linear>
                        </template>

                        <v-img
                            height="250"
                            :src="storeProfile.storeBanner"
                        ></v-img>

                        <v-card-title>{{
                            storeProfile.storeName | capitalize
                        }}</v-card-title>

                        <v-card-text>
                            <v-row align="center" class="mx-0">
                                <v-rating
                                    :value="4.5"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="14"
                                ></v-rating>

                                <div class="grey--text ml-4">4.5 (413)</div>
                            </v-row>

                            <div class="my-4 subtitle-1">
                                <strong>Mobile</strong>: Type of service
                            </div>
                            <div class="my-4 subtitle-1">
                                <strong>Mobile</strong>:
                                {{ storeProfile.storePhoneNumber }}
                            </div>
                            <div class="my-4 subtitle-1">
                                <strong>Email</strong>:
                                {{ storeProfile.storeEmail }}
                            </div>
                            <div class="my-4 subtitle-1">
                                <strong>Location</strong>:
                                {{ storeProfile.storeLocation }}
                            </div>
                            <div>
                                {{ storeProfile.storeBio }}
                            </div>
                        </v-card-text>
                    </v-card>
                </div>

                <!-- <v-divider class="mx-4"></v-divider> -->

                <div class="store-front__left-title">
                    <v-card
                        :loading="loading"
                        elevation="0"
                        class="mx-auto rounded-xl"
                    >
                        <template slot="progress">
                            <v-progress-linear
                                color="deep-purple"
                                height="10"
                                indeterminate
                            ></v-progress-linear>
                        </template>

                        <v-card-title>Services</v-card-title>

                        <v-card-text>
                            <!-- <div class="my-4 subtitle-1">$ • Italian, Cafe</div> -->
                            <div class="my-4 subtitle-1">
                                <!-- <v-container fluid>
                                    <v-row align="center">
                                        <v-col cols="6">
                                            <v-subheader> Sort </v-subheader>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-select
                                                v-model="select"
                                                :hint="`${select.state}`"
                                                :items="categories.name"
                                                item-text="name"
                                                item-value="name"
                                                label="Select"
                                                persistent-hint
                                                return-object
                                                single-line
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container> -->
                                <div class="form-group">
                                    <label for="exampleInputEmail1"
                                        >Select Category</label
                                    >
                                    <select
                                        @change="onChange($event)"
                                        class="form-control"
                                        required
                                        v-model="select"
                                    >
                                        <option
                                            v-for="category in categories"
                                            :key="category.id"
                                        >
                                            {{ category.name | capitalize }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
                <div class="store-front__left-services">
                    <v-row dense>
                        <v-col
                            v-for="(service, id) in services"
                            :key="id"
                            cols="12"
                        >
                            <!-- <v-card :color="item.color" dark class="rounded-xl"> -->
                            <v-card class="rounded-xl">
                                <div
                                    class="d-flex flex-no-wrap justify-space-between"
                                >
                                    <div>
                                        <v-card-title
                                            class="headline"
                                            v-text="service.name"
                                        ></v-card-title>

                                        <v-card-subtitle
                                            v-text="service.description"
                                        ></v-card-subtitle>

                                        <v-card-text>
                                            <!-- <div>Word of the Day</div> -->
                                            <div
                                                class="display-1 text--primary"
                                            >
                                                ${{ service.price }}
                                                <!-- <v-btn
                                                    class="ml-2"
                                                    outlined
                                                    rounded
                                                    small
                                                >
                                                    Book Service
                                                </v-btn> -->
                                            </div>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-btn
                                                class="ml-2"
                                                outlined
                                                rounded
                                                small
                                            >
                                                Book Service
                                            </v-btn>
                                        </v-card-actions>
                                    </div>

                                    <!-- <v-avatar width="200" tile>
                                        <v-img :src="service.imageUrl"></v-img>
                                    </v-avatar> -->
                                    <div
                                        class="store-front__left-service-img"
                                        v-bind:style="{
                                            'background-image':
                                                'url(' + service.imageUrl + ')'
                                        }"
                                    ></div>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
            </div>
            <div class="store-front__right">right</div>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';

export default {
    data: () => ({
        storeProfile: '',
        services: '',
        categories: '',
        loading: false,
        selection: 1,
        select: { state: 'Florida', abbr: 'FL' },
        items: [
            { state: 'Florida', abbr: 'FL' },
            { state: 'Georgia', abbr: 'GA' },
            { state: 'Nebraska', abbr: 'NE' },
            { state: 'California', abbr: 'CA' },
            { state: 'New York', abbr: 'NY' }
        ]
    }),
    methods: {
        reserve() {
            this.loading = true;

            setTimeout(() => (this.loading = false), 2000);
        },
        // filter services using category name
        onChange(e) {
            const services = Object.values(this.services).filter((res) => {
                res;
            });
            // const filtered = services.filter((res) => {
            //     res.category === e;
            // });
            console.log(`_id.vue - 238 - 🍎`, services);
            // return filtered;
        }
    },
    created() {
        // query database and only retrieve store with matching storeID
        firebase
            .database()
            .ref('users/' + this.$route.params.id)
            .once('value')
            .then((res) => {
                const data = res.val();
                if (data.storeProfile) {
                    this.storeProfile = data.storeProfile;
                    // console.log(`_id.vue - 21 - 🥶`, data);
                }
                if (data.categories) {
                    // const categories = Object.keys(
                    //     data.categories
                    // ).map((key) => [data.categories[key]]);
                    // this.categories = categories;
                    this.categories = data.categories;
                    console.log(`_id.vue - 21 - 🥶`, data.categories);
                }
                if (data.services) {
                    this.services = data.services;
                }
            })
            .catch((error) => {
                console.log(`_id.vue - 34 -  🙈`, error);
            });
    }
};
</script>

<style lang="scss" scoped>
</style>