<template>
    <div>
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

                                <!-- START DATE/TIME PICKER -->
                                <v-spacer></v-spacer>
                                <v-row>
                                    <v-col cols="11" sm="5">
                                        <v-menu
                                            ref="date"
                                            v-model="menu"
                                            :close-on-content-click="false"
                                            :return-value.sync="startDate"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <v-text-field
                                                    v-model="startDate"
                                                    label="Start Date"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="startDate"
                                                no-title
                                                scrollable
                                            >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="menu = false"
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="
                                                        $refs.date.save(
                                                            startDate
                                                        )
                                                    "
                                                >
                                                    OK
                                                </v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col cols="11" sm="5">
                                        <v-menu
                                            ref="endDate"
                                            v-model="menu2"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="startTime"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <v-text-field
                                                    v-model="startTime"
                                                    label="Start Time"
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
                                                @click:minute="
                                                    $refs.endDate.save(
                                                        startTime
                                                    )
                                                "
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                </v-row>
                                <!-- START DATE/TIME PICKER END-->

                                <!-- END DATE/TIME PICKER -->
                                <v-row>
                                    <v-col cols="11" sm="5">
                                        <v-menu
                                            ref="end"
                                            v-model="menu3"
                                            :close-on-content-click="false"
                                            :return-value.sync="endDate"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <v-text-field
                                                    v-model="endDate"
                                                    label="End Date"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="endDate"
                                                no-title
                                                scrollable
                                            >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="menu = false"
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="
                                                        $refs.end.save(endDate)
                                                    "
                                                >
                                                    OK
                                                </v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col cols="11" sm="5">
                                        <v-menu
                                            ref="endTime"
                                            v-model="menu4"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="endTime"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <v-text-field
                                                    v-model="endTime"
                                                    label="End Time"
                                                    prepend-icon="mdi-clock-time-four-outline"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                v-if="menu4"
                                                v-model="endTime"
                                                full-width
                                                format="24hr"
                                                @click:minute="
                                                    $refs.endTime.save(endTime)
                                                "
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                </v-row>
                                <!-- END END/TIME PICKER END-->
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

                <!-- Pop up -->
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
                                <!-- Edit card -->
                                <form v-else>
                                    <v-container>
                                        <v-text-field
                                            v-model="selectedEvent.name"
                                            type="text"
                                            label="event name (required)"
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="selectedEvent.details"
                                            type="text"
                                            label="detail"
                                        ></v-text-field>

                                        <!-- EDIT START TIME PICKER END -->
                                        <v-spacer></v-spacer>
                                        <v-row>
                                            <v-col cols="11" sm="5">
                                                <v-menu
                                                    ref="dateEdit"
                                                    v-model="menu5"
                                                    :close-on-content-click="
                                                        false
                                                    "
                                                    :return-value.sync="
                                                        startDate
                                                    "
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template
                                                        v-slot:activator="{
                                                            on,
                                                            attrs
                                                        }"
                                                    >
                                                        <v-text-field
                                                            v-model="startDate"
                                                            label="Start Date"
                                                            prepend-icon="mdi-calendar"
                                                            readonly
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="startDate"
                                                        no-title
                                                        scrollable
                                                    >
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            text
                                                            color="primary"
                                                            @click="
                                                                menu5 = false
                                                            "
                                                        >
                                                            Cancel
                                                        </v-btn>
                                                        <v-btn
                                                            text
                                                            color="primary"
                                                            @click="
                                                                $refs.dateEdit.save(
                                                                    startDate
                                                                )
                                                            "
                                                        >
                                                            OK
                                                        </v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                            <v-col cols="11" sm="5">
                                                <v-menu
                                                    ref="startTime"
                                                    v-model="menu6"
                                                    :close-on-content-click="
                                                        false
                                                    "
                                                    :nudge-right="40"
                                                    :return-value.sync="
                                                        startTime
                                                    "
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px"
                                                >
                                                    <template
                                                        v-slot:activator="{
                                                            on,
                                                            attrs
                                                        }"
                                                    >
                                                        <v-text-field
                                                            v-model="startTime"
                                                            label="Start Time"
                                                            prepend-icon="mdi-clock-time-four-outline"
                                                            readonly
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="menu6"
                                                        v-model="startTime"
                                                        full-width
                                                        format="24hr"
                                                        @click:minute="
                                                            $refs.startTime.save(
                                                                startTime
                                                            )
                                                        "
                                                    ></v-time-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                        </v-row>
                                        <!-- EDIT START TIME PICKER END-->

                                        <!-- EDIT END TIME PICKER -->
                                        <v-row>
                                            <v-col cols="11" sm="5">
                                                <v-menu
                                                    ref="end"
                                                    v-model="menu7"
                                                    :close-on-content-click="
                                                        false
                                                    "
                                                    :return-value.sync="endDate"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template
                                                        v-slot:activator="{
                                                            on,
                                                            attrs
                                                        }"
                                                    >
                                                        <v-text-field
                                                            v-model="endDate"
                                                            label="End Date"
                                                            prepend-icon="mdi-calendar"
                                                            readonly
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="endDate"
                                                        no-title
                                                        scrollable
                                                    >
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            text
                                                            color="primary"
                                                            @click="
                                                                menu7 = false
                                                            "
                                                        >
                                                            Cancel
                                                        </v-btn>
                                                        <v-btn
                                                            text
                                                            color="primary"
                                                            @click="
                                                                $refs.end.save(
                                                                    endDate
                                                                )
                                                            "
                                                        >
                                                            OK
                                                        </v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                            <v-col cols="11" sm="5">
                                                <v-menu
                                                    ref="endTime"
                                                    v-model="menu8"
                                                    :close-on-content-click="
                                                        false
                                                    "
                                                    :nudge-right="40"
                                                    :return-value.sync="endTime"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px"
                                                >
                                                    <template
                                                        v-slot:activator="{
                                                            on,
                                                            attrs
                                                        }"
                                                    >
                                                        <v-text-field
                                                            v-model="endTime"
                                                            label="End Time"
                                                            prepend-icon="mdi-clock-time-four-outline"
                                                            readonly
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="menu8"
                                                        v-model="endTime"
                                                        full-width
                                                        format="24hr"
                                                        @click:minute="
                                                            $refs.endTime.save(
                                                                endTime
                                                            )
                                                        "
                                                    ></v-time-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                        </v-row>
                                        <!-- EDIT END TIME PICKER-->
                                        <v-text-field
                                            v-model="selectedEvent.color"
                                            type="color"
                                            label="color (click to open color menu)"
                                        ></v-text-field>
                                    </v-container>
                                </form>

                                <!-- Edit card -->
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                    text
                                    class="teal darken-1"
                                    dark
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
                <!-- Pop up end -->
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { db } from '@/plugins/firebase';
import { mapGetters } from 'vuex';

export default {
    name: 'Calendar',
    data: () => ({
        time: null,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        menu2: false,
        menu3: false,
        menu4: false,
        menu5: false,
        menu6: false,
        menu7: false,
        menu8: false,
        modal: false,
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
        dialog: false
    }),
    computed: {
        user() {
            return this.$store.state.user;
        },
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
        submittableStartDateTime() {
            //REVIEW new date() returns date one day behind
            const date = new Date(this.startDate);
            // to fix, I add 1 day to current date
            date.setDate(date.getDate() + 1);
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
        submittableEndDateTime() {
            //REVIEW new date() returns date one day behind
            const date = new Date(this.startDate);
            // to fix, I add 1 day to current date
            date.setDate(date.getDate() + 1);
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
            if (
                this.name &&
                this.submittableStartDateTime &&
                this.submittableEndDateTime
            ) {
                await db
                    .collection(this.user.uid)
                    .add({
                        name: this.name,
                        details: this.details,
                        start: start,
                        end: end,
                        color: this.color,
                        timed: true,
                        booked: false
                    })
                    .then(() => {
                        this.$swal({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: 'Event added successfully.',
                            showConfirmButton: false,
                            timer: 3000
                        });
                    });
            } else {
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Name, Start and End date are required',
                    showConfirmButton: true,
                    timer: 10000
                });
            }

            this.getEvents();
            this.name = '';
            this.details = '';
            this.start = '';
            this.end = '';
            this.color = '';
        },
        async updateEvent(ev) {
            const start = this.submittableStartDateTime;
            const end = this.submittableEndDateTime;
            if (
                ev.name &&
                this.submittableStartDateTime &&
                this.submittableEndDateTime
            ) {
                await db
                    .collection(this.user.uid)
                    .doc(this.currentlyEditing)
                    .update({
                        details: ev.details,
                        name: ev.name,
                        start: start,
                        end: end,
                        color: ev.color,
                        timed: true
                        // booked: false
                    });
                this.selectedOpen = false;
                this.currentlyEditing = null;
                this.getEvents();
            } else {
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Name, Start and End date are required',
                    showConfirmButton: true,
                    timer: 10000
                });
            }
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
            // parse date object and get date out
            let startDate = new Date(event.start);
            let sd = startDate.toISOString().substr(0, 10);
            let endDate = new Date(event.end);
            let ed = endDate.toISOString().substr(0, 10);

            // Get start time
            let startTime = new Date(event.start);
            let day = startTime.getDate(),
                month = startTime.getMonth() + 1,
                year = startTime.getFullYear(),
                hour = startTime.getHours(),
                min = startTime.getMinutes();

            month = (month < 10 ? '0' : '') + month;
            day = (day < 10 ? '0' : '') + day;
            hour = (hour < 10 ? '0' : '') + hour;
            min = (min < 10 ? '0' : '') + min;

            let st = hour + ':' + min;

            // Get end time
            let endTime = new Date(event.end);
            let day2 = endTime.getDate(),
                month2 = endTime.getMonth() + 1,
                year2 = endTime.getFullYear(),
                hour2 = endTime.getHours(),
                min2 = endTime.getMinutes();

            month2 = (month2 < 10 ? '0' : '') + month2;
            day2 = (day2 < 10 ? '0' : '') + day2;
            hour2 = (hour2 < 10 ? '0' : '') + hour2;
            min2 = (min2 < 10 ? '0' : '') + min2;

            let et = hour2 + ':' + min2;

            // set local state
            const open = () => {
                this.selectedEvent = event;
                this.selectedElement = nativeEvent.target;
                this.startDate = sd;
                this.endDate = ed;

                this.startTime = st;
                this.endTime = et;
                setTimeout(() => {
                    this.selectedOpen = true;
                }, 10);
            };
            // set popup opening detay
            if (this.selectedOpen) {
                this.selectedOpen = false;
                setTimeout(open, 10);
            } else {
                open();
            }
            // stop event from bubbling
            nativeEvent.stopPropagation();
        },
        updateRange({ start, end }) {
            console.log(`Calendar.vue - 428 - 🥛`);
        },
        // add these to numbers
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
