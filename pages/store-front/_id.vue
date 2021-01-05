<template>
    <div v-if="!loading" class="container margin store-front">
        <div class="store-front__container mt-5">
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
                                    <v-select
                                        v-model="selectedItem"
                                        :items="categoryNames"
                                        outlined
                                    >
                                        <!-- <option value="all" selected>
                                            All
                                        </option> -->
                                        <!-- <option
                                            v-for="category in storeCategories"
                                            :key="category.id"
                                        >
                                            {{ category.name | capitalize }}
                                        </option> -->
                                    </v-select>
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
                            <v-row>
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
                                            class="store-front__left-card d-flex flex-no-wrap justify-space-between"
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
                                                        @click="
                                                            openQuickBook(
                                                                service
                                                            )
                                                        "
                                                    >
                                                        Quick Booking
                                                    </v-btn>
                                                    <!-- CLOSE DIALOG -->
                                                </v-card-actions>
                                            </div>
                                            <div>
                                                <img
                                                    class="store-front__left-service-img"
                                                    :src="service.serviceImage"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <!-- SERVICE CARD END-->
                        </template>
                        <v-card>
                            <!-- <v-card-title class="headline">
                                Quick Service Booking
                            </v-card-title> -->
                            <QuickBook />
                            <div class="container">
                                <v-alert v-if="alert" dense type="error">
                                    {{ alert }}
                                </v-alert>

                                <v-card color="teal darker-1" dark>
                                    <div
                                        class="d-flex flex-no-wrap justify-space-between"
                                    >
                                        <div>
                                            <v-card-title class="headline">{{
                                                service.name
                                            }}</v-card-title>

                                            <!-- <v-card-text>
                                                <div class="text--primary">
                                                    well meaning and kindly.<br />
                                                    "a benevolent smile"
                                                </div>
                                            </v-card-text> -->

                                            <v-card-subtitle
                                                v-if="bookingState !== null"
                                            >
                                                <div>
                                                    Start:
                                                    {{
                                                        new Date(
                                                            this.bookingState.start
                                                        ).toLocaleString()
                                                    }}
                                                </div>
                                                <div>
                                                    End:
                                                    {{
                                                        new Date(
                                                            this.bookingState.end
                                                        ).toLocaleString()
                                                    }}
                                                </div>
                                            </v-card-subtitle>

                                            <!-- <v-card-actions>
                                                <v-btn
                                                    class="ml-2 mt-3"
                                                    fab
                                                    icon
                                                    height="40px"
                                                    right
                                                    width="40px"
                                                >
                                                    <v-icon>mdi-play</v-icon>
                                                </v-btn>
                                            </v-card-actions> -->
                                        </div>

                                        <v-avatar class="ma-3" size="125" tile>
                                            <v-img
                                                :src="service.serviceImage"
                                            ></v-img>
                                        </v-avatar>
                                    </div>
                                </v-card>
                            </div>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="teal darken-1"
                                    text
                                    @click="dialog = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    color="teal darken-1"
                                    text
                                    @click="quickBook"
                                >
                                    Book Service
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
                <!-- DIALOG END -->
            </div>
            <!-- LEFT END -->

            <!-- RIGHT -->
            <!-- <div class="store-front__right">
                <Messages />
            </div> -->
            <!-- RIGHT END -->
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';
import { db } from '@/plugins/firebase';
import { mapActions, mapGetters, mapState } from 'vuex';
import Messages from '@/components/chat/Messages';
import QuickBook from '@/components/cart/QuickBook';

export default {
    components: {
        Messages,
        QuickBook
    },
    data: () => ({
        storeServices: [],
        categories: [],
        dialog: false,
        testData: [],
        service: [],
        events: [],
        role: [],
        ServiceId: '',
        alert: '',
        note: '',
        categoryNames: ['all'],
        selectedItem: ''
    }),
    watch: {
        // call function when dialog/modal opens
        dialog(visible) {
            if (visible) {
                // Do this when dialog opens up
            } else {
                // Do this when dialog closes
            }
        },
        // filter services using category name
        // because v-select is a custom select vuetify component, $event does not trigger
        // therefore we use a watcher to act as onChange($event)
        selectedItem(newVal) {
            const services = this.services;
            // replace empty space with dash and transform to lowercase as value Array.filter()
            // is case sensitive
            const value = newVal.replace(/\s+/g, '-').toLowerCase();

            // if all is selected show all
            if (value === 'all') {
                this.storeServices = this.loadedStoreServices;
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
                this.storeServices = this.loadedStoreServices;

                const filteredServices = this.storeServices.filter((res) => {
                    return res.category === value;
                });
                this.storeServices = filteredServices;
            }
        }
    },
    computed: {
        ...mapGetters({
            loadedStoreServices: 'storeFront/loadedStoreServices',
            storeCategories: 'storeFront/loadedStoreCategories',
            storeProfile: 'storeFront/loadedStoreProfile',
            loading: 'loaders/loading'
        }),
        ...mapState({
            booking: 'booking'
        }),
        bookingState() {
            return this.booking.bookingState;
        }
    },
    methods: {
        ...mapActions({
            loadStoreServices: 'storeFront/loadStoreServices',
            addToCartAction: 'cart/addToCart'
        }),
        async quickBooking() {},
        goToServiceInfo(id) {
            this.$router.push({
                name: 'appointment-id',
                params: {
                    id: id
                }
            });
        },
        openQuickBook(ev) {
            // locally store all the data
            this.service = ev;
            this.note = '';
            this.ServiceId = ev.id;
        },
        quickBook() {
            if (this.bookingState !== null) {
                const event = this.bookingState;
                const service = this.service;
                const note = this.note;
                const id = this.ServiceId;

                const order = {
                    id,
                    event,
                    service,
                    note
                };
                this.addToCartAction(order);
                this.dialog = false;
                this.alert = '';
            } else {
                this.alert = 'Please select a date and time.';
            }
        }
    },
    mounted() {
        // query database and only retrieve store with matching storeID
        this.loadStoreServices(this.$route.params.id).then(() => {
            // only perform this once async function is complete

            this.storeServices = this.loadedStoreServices;
            for (let key in this.storeCategories) {
                this.categoryNames.push(this.storeCategories[key].name);
                // this.categoryNames.push('all');
            }
        });

        // load categories
        console.log(`_id.vue - 414 - 🍎`, this.categoryNames);
    }
};
</script>

<style lang="scss" scoped>
</style>