<template>
    <div v-if="!loading" class="container margin store-front">
        <!-- <div class="store-front__container mt-5">

            <div class="store-front__left">
                <div class="store-front__left-banner">
                    <div elevation="0" outlined :loading="loading">
                        <div slot="progress">
                            <div
                                color="deep-purple"
                                height="10"
                                indeterminate
                            ></div>
                        </div>

                        <img height="250" :src="storeProfile.storeBanner" />

                        <div-title>{{
                            storeProfile.storeName | capitalize
                        }}</div-title>

                        <div>
                            <div align="center" class="mx-0">
                                <div
                                    :value="4.5"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="14"
                                ></div>

                                <div class="grey--text ml-4">4.5 (413)</div>
                            </div>

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
                        </div>
                    </div>
                </div>

                <div class="store-front__left-title">
                    <div :loading="loading" elevation="0">
                        <div slot="progress">
                            <div
                                color="deep-purple"
                                height="10"
                                indeterminate
                            ></div>
                        </div>

                        <div>Services</div>

                        <div>
                            <div class="my-4 subtitle-1">
                                <div class="form-group">
                                    <div for="exampleInputEmail1">
                                        Select Category
                                    </div>
                                    <select
                                        v-model="selectedItem"
                                        :items="categoryNames"
                                        outlined
                                    ></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="store-front__left-services">
                    <div persistent max-width="500">
                        <div>

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
                                                <div
                                                    class="headline"
                                                    v-text="service.name"
                                                ></div>

                                                <div
                                                    v-text="service.description"
                                                ></div>

                                                <div>
                                                    <div
                                                        class="display-1 text--primary"
                                                    >
                                                        ${{ service.price }}
                                                    </div>
                                                </div>

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

                        </div>
                        <div>
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
            </div>
        </div> -->

        <!-- BEUFY -->
        <section
            class="hero is-medium is-link store__bg"
            v-bind:style="{
                'background-image': 'url(' + storeProfile.storeBanner + ')'
            }"
        >
            <div class="hero-body store__bg-inner">
                <p class="title m-0">
                    {{ storeProfile.storeName | capitalize }}
                </p>
                <section>
                    <b-rate @change="success"></b-rate>
                </section>
            </div>
        </section>

        <section>
            <div elevation="0" outlined :loading="loading">
                <div slot="progress">
                    <div color="deep-purple" height="10" indeterminate></div>
                </div>

                <!-- <img height="250" :src="storeProfile.storeBanner" /> -->

                <!-- <h1 class="title">{{ storeProfile.storeName | capitalize }}</h1> -->

                <div class="mb-5">
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
                </div>
            </div>
        </section>

        <b-field label="Sort">
            <b-select placeholder="Select a character" expanded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>

        <div class="categories__grid">
            <div v-for="(service, id) in storeServices" :key="id">
                <div
                    class="card categories__grid-card m-0"
                    @click="goToServiceInfo(service.id)"
                    style="cursor: pointer"
                >
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img
                                        :src="service.serviceImage"
                                        :alt="service.serviceImage"
                                    />
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">
                                    {{ service.name | capitalize }}
                                </p>
                                <p class="subtitle is-6">
                                    ${{ service.price }}
                                </p>
                            </div>
                        </div>

                        <div class="content">
                            <div class="columns">
                                <div class="column">
                                    {{ service.description }}
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
// import * as firebase from 'firebase/app';
import 'firebase/database';
// import { db } from '@/plugins/firebase';
import { mapActions, mapGetters, mapState } from 'vuex';
import Messages from '@/components/chat/Messages';
import QuickBook from '@/components/cart/QuickBook';
import { ToastProgrammatic as Toast } from 'buefy';

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
        selectedItem: '',
        success() {
            Toast.open({
                message: 'Thanks for your Rate!',
                type: 'is-success'
            });
        }
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

<style lang="scss" scoped>
.store__bg {
    background-size: contain;
    background-position: center;
    border-radius: 24px;
}
// .store__bg-inner {
//     background-color: purple;
// }
</style>
