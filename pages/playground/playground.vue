<template>
    <!-- <v-app>
        <p>{{ count }}</p>
        <p>
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
        </p>
        <small>Check out your localStorage to see the updates.</small>

        <br />
        <br />

        <v-row justify="center">
            <v-btn color="primary" @click="showAlert" elevation="2"
                >Click Me</v-btn
            >
        </v-row>

        <br />
        <br />

        <v-row justify="center">
            <v-date-picker v-model="startDate"></v-date-picker>
        </v-row>
        {{ startDate }}

        <p style="background-color: pink">{{ submittableDateTime }}</p>

        <br />
        <br />

        <v-row justify="center">
            <v-time-picker v-model="startTime"></v-time-picker>
        </v-row>
        {{ startTime }}

        <br />
        <br />
    </v-app> -->
    <div>
        <Calendar />
    </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue';

export default {
    components: {
        Calendar
    },
    data() {
        return {
            startDate: new Date().toISOString().substr(0, 10),
            startTime: new Date()
        };
    },
    computed: {
        count() {
            return this.$store.state.count;
        },
        submittableDateTime() {
            //REVIEW new date() returns date one day behind
            const date = new Date(this.startDate);
            // to fix, I add 1 day to current date
            date.setDate(date.getDate() + 1);
            const timezone = date.getTimezoneOffset();
            if (typeof this.startTime === 'string') {
                const hours = this.startTime.match(/^(\d+)/)[1];
                const minutes = this.startTime.match(/:(\d+)/)[1];
                date.setHours(hours);
                date.setMinutes(minutes);
            } else {
                date.setHours(this.startTime.getHours());
                date.setMinutes(this.startTime.getMinutes());
            }
            console.log(`playground.vue - 62 - ⏰`, date);
            return date;
        }
    },
    methods: {
        increment() {
            this.$store.commit('increment');
        },
        decrement() {
            this.$store.commit('decrement');
        },
        showAlert() {
            // Use sweetalert2
            this.$swal({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
};
</script>

<style scoped></style>
