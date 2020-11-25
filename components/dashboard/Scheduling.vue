<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6">
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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Bookings',
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
