<template>
    <div>
        <!-- <div class="layout wrap align-center justify-center">
            <div class="buttons mb-5">
                <b-button type="is-primary" @click="customEventCreation"
                    >Add event</b-button
                >
            </div>
            <div>
                <vue-cal
                    class="demo full-cal vuecal--full-height-delete"
                    hide-weekends="hide-weekends"
                    :selected-date="selectedDate"
                    :time-from="8 * 60"
                    :time-to="19 * 60"
                    :split-days="store.splits"
                    sticky-split-labels="sticky-split-labels"
                    :editable-events="store.editable"
                    :events="store.events"
                    @cell-focus="selectedDate = $event.date || $event"
                    style="height: 500px"
                    ><template v-slot:split-label="{ split }">
                        <b-icon icon="edit"></b-icon
                        ><strong :style="`color: ${split.color}`">{{
                            split.label
                        }}</strong>
                    </template></vue-cal
                >
            </div>
        </div> -->

        <!-- <div class="buttons mb-5">
            <b-button type="is-primary" @click="customEventCreation"
                >Add event</b-button
            >
        </div> -->
        <section class="mb-5">
            <b-button
                label="Instructions"
                :disabled="isActive"
                @click="isActive = true"
            />
            <b-notification
                class="mb-5"
                v-model="isActive"
                aria-close-label="Close notification"
                animation="fade"
            >
                <ul>
                    <li>
                        - Create a new event (by clicking and dragging on a cell
                        or clicking and holding on a cell)
                    </li>
                    <li>
                        - Change time of an event by dragging the resizer
                        handle.
                    </li>
                    <li>
                        - Drag and drop an event (not from the editable title
                        text selection and not from the resizer).
                    </li>
                    <li>
                        - Delete an event (by clicking and holding an event)
                    </li>
                </ul>
            </b-notification>
        </section>

        <vue-cal
            style="height: 650px"
            :selected-date="selectedDate"
            today-button
            :time-from="8 * 60"
            :time-to="20 * 60"
            :special-hours="specialHours"
            :snap-to-time="15"
            editable-events
            :events="events"
            class="vuecal--full-height-delete"
            @cell-click="logEvents('cell-click', $event)"
            @event-focus="logEvents('event-focus', $event)"
            @event-title-change="logEvents('event-title-change', $event)"
            @event-content-change="logEvents('event-content-change', $event)"
            @event-duration-change="logEvents('event-duration-change', $event)"
            @event-drop="logEvents('event-drop', $event)"
            @event-create="logEvents('event-create', $event)"
            @event-drag-create="logEvents('event-drag-create', $event)"
            @event-delete="logEvents('event-delete', $event)"
            :on-event-click="onEventClick"
        >
        </vue-cal>

        <!-- <v-dialog v-model="showDialog">
            <v-card>
                <v-card-title>
                    <v-icon>{{ selectedEvent.icon }}</v-icon>
                    <span>{{ selectedEvent.title }}</span>
                    <v-spacer />
                    <strong>{{
                        selectedEvent.start &&
                        selectedEvent.start.format('DD/MM/YYYY')
                    }}</strong>
                </v-card-title>
                <v-card-text>
                    <p v-html="selectedEvent.contentFull" />
                    <strong>Event details:</strong>
                    <ul>
                        <li>
                            Event starts at:
                            {{
                                selectedEvent.start &&
                                selectedEvent.start.formatTime()
                            }}
                        </li>
                        <li>
                            Event ends at:
                            {{
                                selectedEvent.end &&
                                selectedEvent.end.formatTime()
                            }}
                        </li>
                    </ul>
                </v-card-text>
            </v-card>
        </v-dialog> -->

        <section>
            <!-- <div class="buttons">
                <b-button
                    label="Launch card modal (keep scroll)"
                    type="is-primary"
                    size="is-medium"
                    @click="isCardModalActive = true"
                />
            </div> -->

            <b-modal
                v-model="isCardModalActive"
                :width="960"
                scroll="keep"
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-label="Events Modal"
                aria-modal
            >
                <section class="card">
                    <div class="card-content dialog">
                        <div class="columns">
                            <div class="column">
                                <b-field>
                                    <b-switch v-model="isAmPm">AM/PM</b-switch>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Select start time">
                                    <b-clockpicker
                                        rounded
                                        placeholder="Click to select..."
                                        icon="clock"
                                        :hour-format="format"
                                    >
                                    </b-clockpicker>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Select end time">
                                    <b-clockpicker
                                        rounded
                                        placeholder="Click to select..."
                                        icon="clock"
                                        :hour-format="format"
                                    >
                                    </b-clockpicker>
                                </b-field>
                            </div>
                        </div>

                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img
                                        src="https://via.placeholder.com/300"
                                        alt="Image"
                                    />
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">John Smith</p>
                                <p class="subtitle is-6">@johnsmith</p>
                            </div>
                        </div>

                        <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                            <a>#css</a> <a>#responsive</a>
                            <br />
                            <small>11:09 PM - 1 Jan 2016</small>
                        </div>
                    </div>
                </section>
            </b-modal>
        </section>
    </div>
</template>

<script>
import { db } from '@/plugins/firebase';

const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' };

export default {
    name: 'EventCalendar',
    data: () => ({
        // store,
        selectedDate: new Date(),
        events: [],
        specialHours: {
            1: dailyHours,
            2: dailyHours,
            3: [
                { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
                { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
            ],
            4: dailyHours,
            5: dailyHours
        },
        isActive: false,
        // Dialog
        selectedEvent: {},
        isCardModalActive: false,
        isAmPm: false
    }),
    computed: {
        user() {
            return this.$store.state.user;
        },
        // Get the Monday of the real time current week.
        previousFirstDayOfWeek() {
            return new Date(
                new Date().setDate(
                    new Date().getDate() - ((new Date().getDay() + 6) % 7)
                )
            );
        },
        format() {
            return this.isAmPm ? '12' : '24';
        }
    },
    methods: {
        onEventClick(event, e) {
            console.log(`EventCalendar.vue - 218 - 🇨🇩`, event);
            this.selectedEvent = event;
            this.isCardModalActive = true;

            // Prevent navigating to narrower view (default vue-cal behavior).
            // e.stopPropagation();
        },
        customEventCreation() {
            const thursday = this.previousFirstDayOfWeek.addDays(3).format();
            const dateTime = prompt(
                'Create event on (YYYY-MM-DD HH:mm)',
                '2021-02-04 14:00'
            );

            // Check if date format is correct before creating event.
            if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateTime)) {
                // this.$refs.vuecal.createEvent(
                this.events.push({
                    start: `${thursday} 14:00`,
                    end: `${thursday} 16:00`,
                    title: 'Aleko',
                    content:
                        '<i class="v-icon material-icons mt-1">sports_tennis</i>',
                    resizable: true,
                    split: 1
                });
            } else if (dateTime) alert('Wrong date format.');
        },
        // MANIPULATE EVENTS START
        async logEvents(name, event) {
            if (name === 'cell-click') {
                // click event
                console.log(`EventCalendar.vue - 171 - cell-click`);
            }
            if (name === 'event-create') {
                // create event
                console.log(`EventCalendar.vue - 171 - create-event`, event);

                // Get all events after creating new event
                // this.getEvents();

                // this.name = '';
                // this.details = '';
                // this.start = '';
                // this.end = '';
                // this.color = '';
            }

            // event CLICK
            // if (name === 'event-focus') {
            //     console.log(`EventCalendar.vue - 171 - event-focus`);
            // }

            // event FOCUS
            // if (name === 'event-focus') {
            //     console.log(`EventCalendar.vue - 171 - event-focus`);
            // }

            // event TITLE CHANGE
            if (name === 'event-title-change') {
                console.log(`EventCalendar.vue - 171 - event-title-change`);

                const docId = event.event.id;

                const newEvent = {
                    allDay: event.event.allallDay || '',
                    background: event.event.background,
                    class: event.event.class,
                    content: event.event.content,
                    daysCount: event.event.daysCount,
                    end: event.event.end,
                    endTimeMinutes: event.event.endTimeMinutes,
                    split: event.event.split || '',
                    start: event.event.start,
                    startTimeMinutes: event.event.startTimeMinutes,
                    title: event.event.title || '',
                    booked: false,
                    deletable: 'deletable',
                    draggable: 'draggable',
                    resizable: 'resizable'
                };

                try {
                    await db
                        .collection(this.user.uid)
                        .doc(`${docId}`)
                        .update(newEvent)
                        .then(() => {
                            // Alert
                            this.$swal({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Event added successfully.',
                                showConfirmButton: false,
                                timer: 3000
                            });
                            // Get all events after creating new event
                            this.getEvents(this.user.uid);
                        });
                } catch (error) {
                    console.log(`EventCalendar.vue - 293 - 🔥`, error);
                }
            }

            // event CONTENT CHANGE
            if (name === 'event-content-change') {
                console.log(`EventCalendar.vue - 171 - event-content-change`);

                const docId = event.event.id;

                const newEvent = {
                    allDay: event.event.allallDay || '',
                    background: event.event.background,
                    class: event.event.class,
                    content: event.event.content,
                    daysCount: event.event.daysCount,
                    end: event.event.end,
                    endTimeMinutes: event.event.endTimeMinutes,
                    split: event.event.split || '',
                    start: event.event.start,
                    startTimeMinutes: event.event.startTimeMinutes,
                    title: event.event.title || '',
                    booked: false,
                    deletable: 'deletable',
                    draggable: 'draggable',
                    resizable: 'resizable'
                };

                try {
                    await db
                        .collection(this.user.uid)
                        .doc(`${docId}`)
                        .update(newEvent)
                        .then(() => {
                            // Alert
                            this.$swal({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Event added successfully.',
                                showConfirmButton: false,
                                timer: 3000
                            });
                            // Get all events after creating new event
                            this.getEvents(this.user.uid);
                        });
                } catch (error) {
                    console.log(`EventCalendar.vue - 293 - 🔥`, error);
                }
            }

            // event DURATION CHANGE
            if (name === 'event-duration-change') {
                console.log(
                    `EventCalendar.vue - 171 - event-duration-change`,
                    event
                );

                const docId = event.event.id;

                const newEvent = {
                    allDay: event.event.allallDay || '',
                    background: event.event.background,
                    class: event.event.class,
                    content: event.event.content,
                    daysCount: event.event.daysCount,
                    end: event.event.end,
                    endTimeMinutes: event.event.endTimeMinutes,
                    split: event.event.split || '',
                    start: event.event.start,
                    startTimeMinutes: event.event.startTimeMinutes,
                    title: event.event.title || '',
                    booked: false,
                    deletable: 'deletable',
                    draggable: 'draggable',
                    resizable: 'resizable'
                };

                console.log(`EventCalendar.vue - 233 - 🛍`, newEvent);

                try {
                    await db
                        .collection(this.user.uid)
                        .doc(`${docId}`)
                        .update(newEvent)
                        .then(() => {
                            // Alert
                            this.$swal({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Event added successfully.',
                                showConfirmButton: false,
                                timer: 3000
                            });
                            // Get all events after creating new event
                            this.getEvents(this.user.uid);
                        });
                } catch (error) {
                    console.log(`EventCalendar.vue - 293 - 🔥`, error);
                }
            }

            // event DROP
            if (name === 'event-drop') {
                console.log(`EventCalendar.vue - 171 - event-drop`);

                const docId = event.event.id;

                const newEvent = {
                    allDay: event.event.allallDay || '',
                    background: event.event.background,
                    class: event.event.class,
                    content: event.event.content,
                    daysCount: event.event.daysCount,
                    end: event.event.end,
                    endTimeMinutes: event.event.endTimeMinutes,
                    split: event.event.split || '',
                    start: event.event.start,
                    startTimeMinutes: event.event.startTimeMinutes,
                    title: event.event.title || '',
                    booked: false,
                    deletable: 'deletable',
                    draggable: 'draggable',
                    resizable: 'resizable'
                };

                console.log(`EventCalendar.vue - 233 - 🛍`, newEvent);

                try {
                    await db
                        .collection(this.user.uid)
                        .doc(`${docId}`)
                        .update(newEvent)
                        .then(() => {
                            // Alert
                            this.$swal({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Event added successfully.',
                                showConfirmButton: false,
                                timer: 3000
                            });
                            // Get all events after creating new event
                            this.getEvents(this.user.uid);
                        });
                } catch (error) {
                    console.log(`EventCalendar.vue - 293 - 🔥`, error);
                }
            }

            // event drag CREATE
            if (name === 'event-drag-create') {
                console.log(`EventCalendar.vue - 171 - event-drag-create`);

                const newEvent = {
                    allDay: event.allallDay || '',
                    background: event.background,
                    class: event.class,
                    content: event.content,
                    daysCount: event.daysCount,
                    end: event.end,
                    endTimeMinutes: event.endTimeMinutes,
                    split: event.split || '',
                    start: event.start,
                    startTimeMinutes: event.startTimeMinutes,
                    title: event.event || '',
                    booked: false,
                    deletable: 'deletable',
                    draggable: 'draggable',
                    resizable: 'resizable'
                };

                try {
                    await db
                        .collection(this.user.uid)
                        .add(newEvent)
                        .then(() => {
                            // Alert
                            this.$swal({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Event added successfully.',
                                showConfirmButton: false,
                                timer: 3000
                            });
                            // Get all events after creating new event
                            this.getEvents(this.user.uid);
                        });
                } catch (error) {
                    console.log(`EventCalendar.vue - 293 - 🔥`, error);
                }
            }

            // event DELETE
            if (name === 'event-delete') {
                console.log(`EventCalendar.vue - 171 - event-delete`, event);

                const docId = event.id;

                console.log(`EventCalendar.vue - 399 - 🤣`, docId);

                try {
                    await db.collection(this.user.uid).doc(`${docId}`).delete();
                } catch (error) {
                    console.log(`EventCalendar.vue - 293 - 🔥`, error);
                } finally {
                    // Alert
                    this.$swal({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Event deleted successfully.',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    // Get all events after creating new event
                    this.getEvents(this.user.uid);
                }
            }
        },
        // MANIPULATE EVENTS END
        async getEvents(uid) {
            let snapshot = await db.collection(`${uid}`).get();
            let events = [];
            // loop through and push events on each itteration
            snapshot.forEach((doc) => {
                let appData = [];

                appData.id = doc.id;
                appData.allDay = doc.data().allallDay;
                appData.background = doc.data().background;
                appData.class = doc.data().class;
                appData.content = doc.data().content;
                appData.daysCount = doc.data().daysCount;
                appData.end = doc.data().end.toDate();
                appData.endTimeMinutes = doc.data().endTimeMinutes;
                appData.split = doc.data().split;
                appData.start = doc.data().start.toDate();
                appData.startTimeMinutes = doc.data().startTimeMinutes;
                appData.title = doc.data().title;
                appData.booked = doc.data().booked;
                appData.deletable = doc.data().deletable;
                appData.draggable = doc.data().draggable;
                appData.resizable = doc.data().resizable;
                events.push(appData);
            });
            if (events.length <= 0) {
                // this.events = this.defaultEvents;
                this.events = [];
            }
            if (events.length > 0) {
                console.log(`EventCalendar.vue - 154 - ✅`, events);
                this.events = events;
            }
        }
    },
    mounted() {
        console.log(`EventCalendar.vue - 163 - 🏝`, this.user.uid);
        this.getEvents(this.user.uid);
    }
};
</script>

<style lang="scss">
.vuecal__menu {
    background-color: #7957d5;
    color: #fff;
}

.vuecal__title-bar {
    background-color: #f2eefb;
}

.vuecal__event--dragging {
    background-color: rgba(60, 60, 60, 0.3);
}

.vuecal__event {
    background-color: #a189e2;
    border: 1px solid #a189e2;
    color: #fff;
}

.vuecal__cell--selected {
    background-color: rgba(121, 87, 213, 0.1);
}

.vuecal__event {
    cursor: pointer;
}

.vuecal__event-title {
    font-size: 1.2em;
    font-weight: bold;
    margin: 4px 0 8px;
}

.vuecal__event-time {
    display: inline-block;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
    font-style: italic;
}

.dialog {
    height: 500px;
}
</style>
