<template>
    <div class="container margin">
        <div class="mx-auto appointment__calendar" elevation="0">
            <BookingCalendar />
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
    },
    mounted() {
        console.log(`QuickBook.vue - 100 - 💦`);
    }
};
</script>

<style lang="scss" scoped>
</style>