<template>
    <v-app id="app" data-app>
        <v-row class="fill-height">
            <v-col>
                <v-sheet height="64">
                    <v-toolbar flat>
                        <v-btn
                            class="mr-4"
                            color="primary dark"
                            @click.stop="dialog = true"
                        >
                            New Event
                        </v-btn>
                        <v-btn
                            outlined
                            class="mr-4"
                            color="grey darken-2"
                            @click="setToday"
                        >
                            Today
                        </v-btn>
                        <v-btn
                            fab
                            text
                            small
                            color="grey darken-2"
                            @click="prev"
                        >
                            <v-icon small> mdi-chevron-left </v-icon>
                        </v-btn>
                        <v-btn
                            fab
                            text
                            small
                            color="grey darken-2"
                            @click="next"
                        >
                            <v-icon small> mdi-chevron-right </v-icon>
                        </v-btn>
                        <v-toolbar-title v-if="$refs.calendar">
                            {{ $refs.calendar.title }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-menu bottom right>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    outlined
                                    color="grey darken-2"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <span>{{ typeToLabel[type] }}</span>
                                    <v-icon right> mdi-menu-down </v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click="type = 'day'">
                                    <v-list-item-title>Day</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'week'">
                                    <v-list-item-title>Week</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'month'">
                                    <v-list-item-title>Month</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = '4day'">
                                    <v-list-item-title
                                        >4 days</v-list-item-title
                                    >
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-toolbar>
                </v-sheet>

                <!-- Add event dialog -->
                <v-dialog v-model="dialog" max-width="500">
                    <v-card>
                        <v-container>
                            <v-form @submit.prevent="addEvent">
                                <v-text-field
                                    v-model="name"
                                    type="text"
                                    label="event name (required)"
                                ></v-text-field>
                                <v-text-field
                                    v-model="details"
                                    type="text"
                                    label="detail"
                                ></v-text-field>
                                <!-- <v-text-field
                                    v-model="start"
                                    type="time"
                                    label="start (required)"
                                ></v-text-field>
                                <v-text-field
                                    v-model="end"
                                    type="time"
                                    label="end (required)"
                                ></v-text-field> -->
                                <!-- TIME PICKER -->
                                <v-row>
                                    <v-col cols="11" sm="5">
                                        <v-menu
                                            ref="menu"
                                            v-model="timeStart"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="start"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <v-text-field
                                                    v-model="start"
                                                    label="Start"
                                                    prepend-icon="mdi-clock-time-four-outline"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                v-if="timeStart"
                                                v-model="start"
                                                full-width
                                                @click:minute="
                                                    $refs.menu.save(start)
                                                "
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col cols="11" sm="5">
                                        <v-menu
                                            ref="end"
                                            v-model="timeEnd"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="end"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <v-text-field
                                                    v-model="end"
                                                    label="Start"
                                                    prepend-icon="mdi-clock-time-four-outline"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                v-if="timeEnd"
                                                v-model="end"
                                                full-width
                                                @click:minute="
                                                    $refs.menu.save(end)
                                                "
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <!-- TIME PICKER END-->
                                <v-text-field
                                    v-model="color"
                                    type="color"
                                    label="color (click to open color menu)"
                                ></v-text-field>
                                <v-btn
                                    type="submit"
                                    color="primary"
                                    class="mr-4"
                                    @click.stop="dialog = false"
                                >
                                    create event
                                </v-btn>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-dialog>
                <!-- Add event dialog end -->

                <v-sheet height="600">
                    <v-calendar
                        ref="calendar"
                        v-model="focus"
                        color="primary"
                        :events="events"
                        :event-color="getEventColor"
                        :type="type"
                        @click:event="showEvent"
                        @click:more="viewDay"
                        @click:date="viewDay"
                        @change="updateRange"
                    ></v-calendar>
                    <v-menu
                        v-model="selectedOpen"
                        :close-on-content-click="false"
                        :activator="selectedElement"
                        offset-x
                    >
                        <v-card color="grey lighten-4" min-width="350px" flat>
                            <v-toolbar :color="selectedEvent.color" dark>
                                <v-btn
                                    @click="deleteEvent(selectedEvent.id)"
                                    icon
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <v-toolbar-title
                                    v-html="selectedEvent.name"
                                ></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <form
                                    v-if="currentlyEditing !== selectedEvent.id"
                                >
                                    {{ selectedEvent.details }}
                                </form>
                                <form v-else>
                                    <v-textarea
                                        filled
                                        v-model="selectedEvent.details"
                                        type="text"
                                        style="width: 100%"
                                        :min-height="100"
                                        placeholder="add note"
                                    ></v-textarea>
                                </form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                    text
                                    color="secondary"
                                    @click="selectedOpen = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    text
                                    v-if="currentlyEditing !== selectedEvent.id"
                                    @click.prevent="editEvent(selectedEvent)"
                                >
                                    Edit
                                </v-btn>
                                <v-btn
                                    text
                                    v-else
                                    @click.prevent="updateEvent(selectedEvent)"
                                >
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </v-sheet>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
import { db } from '@/plugins/firebase';

export default {
    name: 'Calendar',
    data: () => ({
        test: null,
        time: null,
        timeStart: false,
        timeEnd: false,
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),
        type: 'month',
        typeToLabel: {
            month: 'Month',
            week: 'Week',
            day: 'Day',
            '4day': '4 Days'
        },
        name: null,
        details: null,
        start: null,
        end: null,
        color: '#1976D2',
        currentlyEditing: null,
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        dialog: false
    }),
    mounted() {
        this.getEvents();
        console.log(`Calendar.vue - 306 - variable`, this.start);
    },
    methods: {
        /*
         ** FIRESTORE LOGIC
         */
        async getEvents() {
            let snapshot = await db.collection('calEvent').get();
            let events = [];
            // loop through and push events on each itteration
            snapshot.forEach((doc) => {
                let appData = doc.data();
                appData.id = doc.id;
                events.push(appData);
            });
            console.log(`Calendar.vue - 143 - 🥶`, events);
            // this.events = events;
        },
        async addEvent() {
            // const start = new Date(this.start).toISOString().substr(0, 10);
            // const start = new DateTime(this.start)
            // this.end = new Date(this.end).toISOString().substring(0, 10);
            console.log(`Calendar.vue - 327 - variable`, this.start, this.end);
            // if (this.name && this.start && this.end) {
            //     await db.collection('calEvent').add({
            //         name: this.name,
            //         details: this.details,
            //         start: start,
            //         end: end,
            //         color: this.color
            //     });
            // } else {
            //     alert('Name, Start and End date are required');
            // }

            this.getEvents();
            this.name = '';
            this.details = '';
            this.start = '';
            this.end = '';
            this.color = '#1976D2';
        },
        async updateEvent(ev) {
            await db.collection('calEvent').doc(this.currentlyEditing).update({
                details: ev.details
            });
            this.selectedOpen = false;
            this.currentlyEditing = null;
        },
        async deleteEvent(ev) {
            await db.collection('calEvent').doc(ev).delete();

            this.selectedOpen = false;
            this.getEvents();
        },
        /*
         ** LOCAL LOGIC
         */
        viewDay({ date }) {
            this.focus = date;
            this.type = 'day';
        },
        getEventColor(event) {
            return event.color;
        },
        setToday() {
            this.focus = '';
        },
        prev() {
            this.$refs.calendar.prev();
        },
        next() {
            this.$refs.calendar.next();
        },
        editEvent(ev) {
            this.currentlyEditing = ev.id;
        },
        showEvent({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event;
                this.selectedElement = nativeEvent.target;
                setTimeout(() => {
                    this.selectedOpen = true;
                }, 10);
            };

            if (this.selectedOpen) {
                this.selectedOpen = false;
                setTimeout(open, 10);
            } else {
                open();
            }

            nativeEvent.stopPropagation();
        },
        updateRange({ start, end }) {
            // this.start = start;
            // this.end = end;
            console.log(`Calendar.vue - 400 - here 🥇`);
        },
        nth(d) {
            return d > 3 && d < 21
                ? 'th'
                : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][
                      d % 10
                  ];
        }
    }
};
</script>

<style lang="sass" scoped></style>
