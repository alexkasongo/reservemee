<template>
    <div v-if="!loading" class="container margin store-front">
        <div class="store-front__container">
            <!-- LEFT -->
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
                            <div class="my-4 subtitle-1">
                                <div class="form-group">
                                    <label for="exampleInputEmail1"
                                        >Select Category</label
                                    >
                                    <select
                                        @change="onChange($event)"
                                        class="form-control"
                                        required
                                    >
                                        <option value="all" selected>
                                            All
                                        </option>
                                        <option
                                            v-for="category in storeCategories"
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

                <!-- DIALOG BOX -->
                <div class="store-front__left-services">
                    <v-dialog v-model="dialog" persistent max-width="500">
                        <template v-slot:activator="{ on, attrs }">
                            <!-- SERVICE CARD -->
                            <v-row dense>
                                <v-col
                                    v-for="(service, id) in storeServices"
                                    :key="id"
                                    cols="12"
                                >
                                    <v-card
                                        @click="goToServiceInfo(service.id)"
                                        class="rounded-xl"
                                        :ripple="false"
                                    >
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
                                                    <div
                                                        class="display-1 text--primary"
                                                    >
                                                        ${{ service.price }}
                                                    </div>
                                                </v-card-text>
                                                <!-- OPEN DIALOG -->
                                                <v-card-actions>
                                                    <v-btn
                                                        class="ml-2"
                                                        outlined
                                                        rounded
                                                        small
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                        Quick Booking
                                                    </v-btn>
                                                    <!-- CLOSE DIALOG -->
                                                </v-card-actions>
                                            </div>
                                            <div
                                                class="store-front__left-service-img"
                                                v-bind:style="{
                                                    'background-image':
                                                        'url(' +
                                                        service.imageUrl +
                                                        ')'
                                                }"
                                            ></div>
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <!-- SERVICE CARD END-->
                        </template>
                        <v-card>
                            <v-card-title class="headline">
                                Quick Service Booking
                            </v-card-title>
                            <v-card-text
                                >Let Google help apps determine location. This
                                means sending anonymous location data to Google,
                                even when no apps are running.</v-card-text
                            >
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="teal darken-1"
                                    text
                                    @click="dialog = false"
                                >
                                    Disagree
                                </v-btn>
                                <v-btn
                                    color="teal darken-1"
                                    text
                                    @click="dialog = false"
                                >
                                    Agree
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
                <!-- DIALOG END -->
            </div>
            <!-- LEFT END -->

            <!-- RIGHT -->
            <div class="store-front__right">
                <Ratings />
            </div>
            <!-- RIGHT END -->
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';
import { db } from '@/plugins/firebase';
import { mapActions, mapGetters } from 'vuex';
import Ratings from '@/components/client/Ratings';

export default {
    components: {
        Ratings
    },
    data: () => ({
        storeServices: [],
        categories: [],
        testData: [],
        dialog: false,
        events: []
    }),
    watch: {
        // call function when dialog/modal opens
        dialog(visible) {
            if (visible) {
                // Do this when dialog opens up
                console.log('Dialog was opened! 🐣');
                this.quickBooking();
            } else {
                // Do this when dialog closes
                console.log('Dialog was closed! 🥚');
            }
        }
    },
    computed: {
        ...mapGetters({
            storeProfile: 'loadedStoreProfile',
            storeCategories: 'loadedStoreCategories'
        }),
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        ...mapActions(['loadStoreServices']),
        reserve() {
            this.loading = true;

            setTimeout(() => (this.loading = false), 2000);
        },
        // filter services using category name
        onChange(e) {
            const services = this.services;
            // replace empty space with dash and transform to lowercase as value Array.filter()
            // is case sensitive
            const value = e.target.value.replace(/\s+/g, '-').toLowerCase();
            console.log(`_id.vue - 241 - 🔫`, value);

            // if all is selected show all
            if (value === 'all') {
                this.storeServices = this.$store.getters.loadedStoreServices;
            }

            // function which we can use filter object
            if (value !== 'all') {
                const filteredServices = this.storeServices.filter((res) => {
                    return res.category === value;
                });
                this.storeServices = filteredServices;
            }

            //  if service length is less than zero, repopulate and then filter accordingly
            if (this.storeServices.length <= 0) {
                this.storeServices = this.$store.getters.loadedStoreServices;

                const filteredServices = this.storeServices.filter((res) => {
                    return res.category === value;
                });
                this.storeServices = filteredServices;
            }
        },
        async quickBooking() {
            // get firebase calendar events
            let snapshot = await db.collection(this.$route.params.id).get();
            let events = [];
            // loop through and push events on each itteration
            snapshot.forEach((doc) => {
                let appData = [];
                appData.id = doc.id;
                appData.color = doc.data().color;
                appData.details = doc.data().details;
                appData.end = doc.data().end.toDate();
                appData.name = doc.data().name;
                appData.start = doc.data().start.toDate();
                // Must include timed:boolean else timed events will not be displayed accordingly
                appData.timed = doc.data().timed;
                events.push(appData);
            });
            this.events = events;
            console.log(`_id.vue - 309 - 🌹`, events);
            // add to cart or cancel
        },
        goToServiceInfo(id) {
            console.log(`_id.vue - 316 - 🐏`, id);
            this.$router.push({
                name: 'appointment-id',
                params: {
                    id: id
                }
            });
        },
        loadCalendar() {
            // load calendar using store ID
        }
    },
    created() {
        // query database and only retrieve store with matching storeID
        this.loadStoreServices(this.$route.params.id).then(() => {
            // only perform this once async function is complete
            this.storeServices = this.$store.getters.loadedStoreServices;
        });
    }
};
</script>

<style lang="scss" scoped>
</style>