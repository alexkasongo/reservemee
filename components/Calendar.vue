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
                            {{ this.title }}
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

                                <!-- START TIME PICKER -->
                                <h3>Start Time</h3>
                                <v-row>
                                    <v-row justify="center">
                                        <v-date-picker
                                            v-model="startDate"
                                        ></v-date-picker>
                                    </v-row>
                                    <br />
                                    <v-row justify="center">
                                        <v-time-picker
                                            v-model="startTime"
                                        ></v-time-picker>
                                    </v-row>
                                </v-row>
                                <!-- START TIME PICKER END-->
                                <!-- END TIME PICKER -->
                                <h3>End Time</h3>
                                <v-row>
                                    <v-row justify="center">
                                        <v-date-picker
                                            v-model="endDate"
                                        ></v-date-picker>
                                    </v-row>
                                    <br />
                                    <v-row justify="center">
                                        <v-time-picker
                                            v-model="endTime"
                                        ></v-time-picker>
                                    </v-row>
                                </v-row>
                                <!-- END TIME PICKER END-->
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
import { mapGetters } from 'vuex';

export default {
    name: 'Calendar',
    data: () => ({
        // Date and time picker logic
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(),
        // Date and time picker logic END
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
        dialog: false,
        names: [],
        colors: [
            'blue',
            'indigo',
            'deep-purple',
            'cyan',
            'green',
            'orange',
            'grey darken-1'
        ],
        names: [
            'Meeting',
            'Holiday',
            'PTO',
            'Travel',
            'Event',
            'Birthday',
            'Conference',
            'Party'
        ]
    }),
    computed: {
        ...mapGetters({
            user: 'user'
        }),
        title() {
            const { start, end } = this;
            if (!start || !end) {
                return '';
            }
            const startMonth = this.monthFormatter(start);
            const endMonth = this.monthFormatter(end);
            const suffixMonth = startMonth === endMonth ? '' : endMonth;
            const startYear = start.year;
            const endYear = end.year;
            const suffixYear = startYear === endYear ? '' : endYear;
            const startDay = start.day + this.nth(start.day);
            const endDay = end.day + this.nth(end.day);
            switch (this.type) {
                case 'month':
                    return `${startMonth} ${startYear}`;
                case 'week':
                case '4day':
                    return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
                case 'day':
                    return `${startMonth} ${startDay} ${startYear}`;
            }
            return '';
        },
        monthFormatter() {
            return this.$refs.calendar.getFormatter({
                timeZone: 'UTC',
                month: 'long'
            });
        },
        //FIXME date displays one day behind
        submittableStartDateTime() {
            const date = new Date(this.startDate);
            if (typeof this.startTime === 'string') {
                const hours = this.startTime.match(/^(\d+)/)[1];
                const minutes = this.startTime.match(/:(\d+)/)[1];
                date.setHours(hours);
                date.setMinutes(minutes);
            } else {
                date.setHours(this.startTime.getHours());
                date.setMinutes(this.startTime.getMinutes());
            }
            return date;
        },
        //FIXME date displays one day behind
        submittableEndDateTime() {
            const date = new Date(this.endDate);
            if (typeof this.endTime === 'string') {
                const hours = this.endTime.match(/^(\d+)/)[1];
                const minutes = this.endTime.match(/:(\d+)/)[1];
                date.setHours(hours);
                date.setMinutes(minutes);
            } else {
                date.setHours(this.endTime.getHours());
                date.setMinutes(this.endTime.getMinutes());
            }
            return date;
        }
    },
    mounted() {
        this.getEvents();
        console.log(`Calendar.vue - 306 - variable`, this.start);
    },
    methods: {
        /*
         ** FIRESTORE LOGIC
         */
        async getEvents() {
            let snapshot = await db.collection(this.user.uid).get();
            let events = [];
            // loop through and push events on each itteration
            snapshot.forEach((doc) => {
                let appData = [];
                appData.id = doc.id;
                appData.color = doc.data().color;
                appData.details = doc.data().details;
                appData.end = doc.data().end.toDate();
                appData.name = doc.data().name;
                appData.start = doc.data().start.toDate();
                // Must include timed:boolean else timed events will not be displayed accordingly
                appData.timed = doc.data().timed;
                events.push(appData);
            });
            this.events = events;
        },
        async addEvent() {
            const start = this.submittableStartDateTime;
            const end = this.submittableEndDateTime;
            console.log(`Calendar.vue - 327 - variable`, start, end);
            if (
                this.name &&
                this.submittableStartDateTime &&
                this.submittableEndDateTime
            ) {
                await db.collection(this.user.uid).add({
                    name: this.name,
                    details: this.details,
                    start: start,
                    end: end,
                    color: this.color,
                    timed: true,
                    booked: false
                });
            } else {
                alert('Name, Start and End date are required');
            }

            this.getEvents();
            this.name = '';
            this.details = '';
            this.start = '';
            this.end = '';
            this.color = '#1976D2';
        },
        async updateEvent(ev) {
            await db
                .collection(this.user.uid)
                .doc(this.currentlyEditing)
                .update({
                    details: ev.details
                });
            this.selectedOpen = false;
            this.currentlyEditing = null;
        },
        async deleteEvent(ev) {
            await db.collection(this.user.uid).doc(ev).delete();

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
            console.log(`Calendar.vue - 428 - 🥛`);
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
