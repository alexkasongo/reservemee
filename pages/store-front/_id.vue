<template>
    <div v-if="!loading" class="container margin store-front">
        <div class="store-front__container mt-5">
            <!-- LEFT -->
            <div class="store-front__left">
                <div class="store-front__left-banner">
                    <div elevation="0" outlined :loading="loading">
                        <template slot="progress">
                            <v-progress-linear
                                color="deep-purple"
                                height="10"
                                indeterminate
                            ></v-progress-linear>
                        </template>

                        <img height="250" :src="storeProfile.storeBanner" />

                        <div-title>{{
                            storeProfile.storeName | capitalize
                        }}</div-title>

                        <div-text>
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
                        </div-text>
                    </div>
                </div>

                <div class="store-front__left-title">
                    <div :loading="loading" elevation="0">
                        <template slot="progress">
                            <v-progress-linear
                                color="deep-purple"
                                height="10"
                                indeterminate
                            ></v-progress-linear>
                        </template>

                        <div-title>Services</div-title>

                        <div-text>
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
                        </div-text>
                    </div>
                </div>

                <!-- DIALOG BOX -->
                <div class="store-front__left-services">
                    <div persistent max-width="500">
                        <template>
                            <!-- SERVICE CARD -->
                            <v-row>
                                <v-col
                                    v-for="(service, id) in storeServices"
                                    :key="id"
                                    cols="12"
                                >
                                    <div
                                        @click="goToServiceInfo(service.id)"
                                        class="rounded-xl"
                                        :ripple="false"
                                    >
                                        <div
                                            class="store-front__left-card d-flex flex-no-wrap justify-space-between"
                                        >
                                            <div>
                                                <div-title
                                                    class="headline"
                                                    v-text="service.name"
                                                ></div-title>

                                                <div
                                                    v-text="service.description"
                                                ></div>

                                                <div-text>
                                                    <div
                                                        class="display-1 text--primary"
                                                    >
                                                        ${{ service.price }}
                                                    </div>
                                                </div-text>
                                                <!-- OPEN DIALOG -->
                                                <div>
                                                    <div
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
                                                    </div>
                                                    <!-- CLOSE DIALOG -->
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    class="store-front__left-service-img"
                                                    :src="service.serviceImage"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <!-- SERVICE CARD END-->
                        </template>
                        <div>
                            <!-- <div-title class="headline">
                                Quick Service Booking
                            </div-title> -->
                            <QuickBook />
                            <div class="container">
                                <div v-if="alert" dense type="error">
                                    {{ alert }}
                                </div>

                                <div color="teal darker-1" dark>
                                    <div
                                        class="d-flex flex-no-wrap justify-space-between"
                                    >
                                        <div>
                                            <div-title class="headline">{{
                                                service.name
                                            }}</div-title>

                                            <!-- <div-text>
                                                <div class="text--primary">
                                                    well meaning and kindly.<br />
                                                    "a benevolent smile"
                                                </div>
                                            </div-text> -->

                                            <div v-if="bookingState !== null">
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
                                            </div>

                                            <!-- <div>
                                                <div
                                                    class="ml-2 mt-3"
                                                    fab
                                                    icon
                                                    height="40px"
                                                    right
                                                    width="40px"
                                                >
                                                    <v-icon>mdi-play</v-icon>
                                                </div>
                                            </div> -->
                                        </div>

                                        <div class="ma-3" size="125" tile>
                                            <img :src="service.serviceImage" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div
                                    color="teal darken-1"
                                    text
                                    @click="dialog = false"
                                >
                                    Cancel
                                </div>
                                <div
                                    color="teal darken-1"
                                    text
                                    @click="quickBook"
                                >
                                    Book Service
                                </div>
                            </div>
                        </div>
                    </div>
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
    }
};
</script>

<style lang="scss" scoped></style>
