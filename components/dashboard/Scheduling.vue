<template>
    <v-container>
        <v-row>
            <!-- <v-col cols="12" sm="6">
                <v-card class="mt-5 mb-5">
                    <div class="card-body">
                        <h5 class="card-title">Bookings</h5>
                        <p class="card-text">
                            View all bookings. Confirm, edit and update.
                        </p>
                        <v-btn
                            class="teal darker-1"
                            dark
                            @click="goToBookings"
                            block
                            elevation="0"
                            >View Bookings</v-btn
                        >
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card class="mb-5">
                    <div class="card-body">
                        <h5 class="card-title">Calendar</h5>
                        <p class="card-text">
                            View, update and create calendar events. Use the
                            calandar quickly view all booked appoints and create
                            open/availble hours for your customers.
                        </p>

                        <v-btn
                            class="teal darker-1"
                            dark
                            @click="goToCalendar"
                            block
                            elevation="0"
                            >View Calendar</v-btn
                        >
                    </div>
                </v-card>
            </v-col> -->
            <v-col cols="12" sm="6">
                <div>
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
                                            'url(' + store.storeBanner + ')'
                                    }"
                                ></div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            {{ store.storeName | capitalize }}
                                        </h5>
                                        <p class="card-text">
                                            {{
                                                store.storeBio
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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Bookings',
    data: () => ({
        stores: [
            {
                storeBanner: 'https://via.placeholder.com/1200',
                storeName: 'Tomato loving',
                storeBio:
                    'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolo.'
            },
            {
                storeBanner: 'https://via.placeholder.com/1200',
                storeName: 'Tomato loving',
                storeBio:
                    'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolo.'
            }
        ]
    }),
    methods: {
        goToBookings() {
            this.$router.push('/service/bookings');
        },
        goToCalendar() {
            this.$router.push('/calendar');
        }
    }
};
</script>

<style></style>
