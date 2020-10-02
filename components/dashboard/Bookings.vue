<template>
    <div>
        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title">Bookings</h5>
                <p class="card-text">
                    View all bookings. Confirm, edit and update.
                </p>
                <v-btn @click="goToBookings" block color="#00897B" dark
                    >View Bookings</v-btn
                >
            </div>
        </div>
        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title">Calendar</h5>
                <p class="card-text">
                    View, update and create calendar events. Use the calandar
                    quickly view all booked appoints and create open/availble
                    hours for your customers.
                </p>

                <v-btn @click="goToCalendar" block color="#00897B" dark
                    >View Calendar</v-btn
                >
            </div>
        </div>
    </div>
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
