<template>
    <div>
        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title">Bookings</h5>
                <p class="card-text">
                    View all bookings. Confirm, edit and update.
                </p>
                <nuxt-link to="/service/bookings" class="btn btn-dark btn-block"
                    >View Bookings</nuxt-link
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

                <nuxt-link to="/calendar" class="btn btn-dark btn-block"
                    >View Calendar</nuxt-link
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Bookings'
};
</script>

<style></style>
