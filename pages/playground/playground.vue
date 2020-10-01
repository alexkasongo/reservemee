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

        <v-row>
            <v-col cols="11" sm="5">
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="startDate"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="startDate"
                            label="Picker in menu"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="startDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(startDate)"
                        >
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="11" sm="5">
                <v-menu
                    ref="menu"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="startTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="startTime"
                            label="Picker in menu"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menu2"
                        v-model="startTime"
                        full-width
                        format="24hr"
                        @click:minute="$refs.menu.save(startTime)"
                    ></v-time-picker>
                </v-menu>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <h3>DATE</h3>
        <p>{{ startDate }}</p>
        <h3>TIME</h3>
        <p>{{ startTime }}</p>
        <p style="background-color: pink">{{ submittableDateTime }}</p>
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
            startTime: new Date(),
            menu: false,
            menu2: false,
            modal: false

            // startDate: new Date().toISOString().substr(0, 10),
            // startTime: new Date()
        };
    },
    computed: {
        dateObj() {
            console.log(`playground.vue - 140 - 🏝`, this);
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
