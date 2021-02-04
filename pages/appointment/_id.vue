<template>
    <div class="container margin">
        <div class="appointment">
            <div class="appointment__left">
                <div class="side-menu">
                    <div>
                        <h2 class="header-title">Messages</h2>
                        <!-- Messages -->
                        <Messages />
                        <!-- Messages -->
                    </div>
                </div>
            </div>
            <!-- END: SIDEBAR-->

            <!-- RIGHT -->
            <div class="appointment__right">
                <div>
                    <BookingCalendar />
                </div>
                <div elevation="0" class="appointment__cart-container">
                    <div-title> Your Order </div-title>
                    <div>
                        Below is a summary of your order. When ready, push add
                        to cart.
                    </div>
                </div>
                <!-- SERVICE CARD -->
                <v-row dense>
                    <v-col cols="12">
                        <div class="rounded-xl" :ripple="false">
                            <div
                                class="appointment__left-card d-flex flex-no-wrap justify-space-between"
                            >
                                <div>
                                    <div-title
                                        class="headline"
                                        v-text="service.name"
                                    ></div-title>

                                    <div v-text="service.description"></div>

                                    <div-text
                                        v-if="bookingState !== null"
                                        class="pb-0"
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
                                    </div-text>

                                    <div-text class="pt-2">
                                        <div class="display-1 text--primary">
                                            ${{ service.price }}
                                        </div>
                                    </div-text>
                                    <!-- OPEN DIALOG -->
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

                <v-row>
                    <v-col cols="12" md="12">
                        <v-textarea
                            class="rounded-xl"
                            outlined
                            name="input-7-4"
                            label="Leave a note"
                            v-model="note"
                        ></v-textarea>
                    </v-col>
                </v-row>

                <div v-if="alert" dense type="error">
                    {{ alert }}
                </div>

                <v-list-item class="grow">
                    <v-row align="center" justify="end">
                        <div
                            rounded
                            elevation="0"
                            dark
                            large
                            class="teal darker-1"
                            @click="addToCart()"
                        >
                            Add to Cart
                        </div>
                    </v-row>
                </v-list-item>
            </div>
            <!-- RIGHT END -->
        </div>
    </div>
</template>

<script>
import BookingCalendar from '@/components/cart/BookingCalendar';
import Messages from '@/components/chat/Messages';
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
    components: {
        Messages,
        BookingCalendar
    },
    data: () => ({
        workingHours: [
            {
                day: 'Mon:',
                time: '9:30 AM - 7:00 PM'
            },
            {
                day: 'Tue:',
                time: '9:30 AM - 7:00 PM'
            },
            {
                day: 'Wed:',
                time: '9:30 AM - 7:00 PM'
            },
            {
                day: 'Thu:',
                time: '9:30 AM - 7:00 PM'
            },
            {
                day: 'Fri:',
                time: '9:30 AM - 7:00 PM'
            },
            {
                day: 'Sat:',
                time: '9:00 AM - 6:00 PM'
            },
            {
                day: 'Sun:',
                time: '10:00 AM - 5:00 PM'
            }
        ],
        imageUrl: 'https://via.placeholder.com/600',
        note: '',
        alert: ''
    }),
    computed: {
        ...mapGetters({
            storeProfile: 'storeFront/loadedStoreProfile',
            services: 'storeFront/loadedStoreServices'
        }),
        ...mapState({
            booking: 'booking'
        }),
        bookingState() {
            return this.booking.bookingState;
        },
        service() {
            const filtered = this.services.filter((res) => {
                return res.id === this.$route.params.id;
            });
            return filtered[0];
        }
    },
    methods: {
        ...mapActions({
            addToCartAction: 'cart/addToCart'
        }),
        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        },
        addToCart() {
            // validate
            if (this.bookingState !== null) {
                // push service data to persisted local storage state
                // create order entry in database
                const event = this.bookingState;
                const service = this.service;
                const note = this.note;
                const id = this.getRandomInt(100);

                const order = {
                    id,
                    event,
                    service,
                    note
                };
                this.addToCartAction(order);
                this.alert = '';
                this.note = '';
            } else {
                this.alert = 'Please select a date and time.';
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
