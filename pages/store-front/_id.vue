<template>
    <div class="container margin store-front">
        <!-- <h1>Welcome to your store: {{ this.$route.params.name }}</h1>
        <p>id: {{ this.$route.params.id }}</p> -->
        <div class="store-front__container">
            <div class="store-front__left">
                <div class="store-front__left-banner">
                    <v-card
                        elevation="0"
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
                                $ • Type of service •
                                {{ storeProfile.storeLocation }}
                            </div>

                            <div>
                                {{ storeProfile.storeBio }}
                            </div>
                        </v-card-text>
                    </v-card>
                </div>

                <v-divider class="mx-4"></v-divider>

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
                            <div class="my-4 subtitle-1">$ • Italian, Cafe</div>

                            <div>
                                Small plates, salads & sandwiches - an intimate
                                setting with 12 indoor seats plus patio seating.
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
                <div class="store-front__left-services">
                    <v-row dense>
                        <v-col v-for="(item, i) in items" :key="i" cols="12">
                            <!-- <v-card :color="item.color" dark class="rounded-xl"> -->
                            <v-card class="rounded-xl">
                                <div
                                    class="d-flex flex-no-wrap justify-space-between"
                                >
                                    <div>
                                        <v-card-title
                                            class="headline"
                                            v-text="item.title"
                                        ></v-card-title>

                                        <v-card-subtitle
                                            v-text="item.artist"
                                        ></v-card-subtitle>

                                        <v-card-text>
                                            <!-- <div>Word of the Day</div> -->
                                            <p class="display-1 text--primary">
                                                $58
                                            </p>
                                            <!-- <p>adjective</p> -->
                                            <!-- <div class="my-4 subtitle-1">
                                                $58
                                            </div> -->
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

                                    <v-avatar class="ma-3" size="200" tile>
                                        <v-img :src="item.src"></v-img>
                                    </v-avatar>
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
        loading: false,
        selection: 1,
        items: [
            {
                color: '#1F7087',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                title: 'Service Name',
                artist: 'Description'
            },
            {
                color: '#952175',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'Service Name',
                artist: 'Description'
            }
        ]
    }),
    methods: {
        reserve() {
            this.loading = true;

            setTimeout(() => (this.loading = false), 2000);
        }
    },
    created() {
        // query database and only retrieve store with matching storeID
        //to make it realtime use on() instead of once()
        firebase
            .database()
            .ref('users/' + this.$route.params.id)
            .once('value')
            .then((res) => {
                const data = res.val();
                if (data.storeProfile) {
                    this.storeProfile = data.storeProfile;
                    console.log(`_id.vue - 21 - 🥶`, data);
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