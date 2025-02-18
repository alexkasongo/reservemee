<template>
    <div>
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
                    <li>- Click on event to view full details.</li>
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
            :snap-to-time="15"
            active-view="day"
            events-on-month-view="short"
            :events="events"
            class="vuecal--full-height-delete m-0"
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
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { db } from '@/plugins/firebase';
import { DialogProgrammatic as Dialog } from 'buefy';

const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' };

export default {
    name: 'EventCalendar',
    data: () => ({
        // store,
        selectedDate: new Date(),
        events: [],
        isActive: false,
        // Dialog
        selectedEvent: {},
        isCardModalActive: false,
        minutesGranularity: 15,
        showWeekNumber: false,
        enableSeconds: false,
        hourFormat: undefined, // Browser locale
        locale: undefined, // Browser locale
        start: '',
        end: '',
        details: '',
        title: '',
        errors: [],
        message: ''
    }),
    computed: {
        ...mapState({
            booking: 'booking'
        }),
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
        sampleFormat() {
            const dtf = new Intl.DateTimeFormat(this.locale, {
                hour: 'numeric',
                minute: 'numeric',
                second: this.enableSeconds ? 'numeric' : undefined,
                hour12: this.hourFormat ? this.hourFormat === '12' : undefined,
                timezome: 'UTC'
            });
            return dtf.format(new Date(2000, 12, 12, 22, 23, 24));
        }
    },
    methods: {
        ...mapActions({
            setBookingState: 'booking/setBookingState'
        }),
        confirm(event) {
            Dialog.confirm({
                message: 'Select this date?',
                onConfirm: () => {
                    this.$buefy.toast.open({
                        message: 'Added to your order',
                        type: 'is-success'
                    });
                    // check if a bookingstate already exists, if so do nothing else do something

                    this.setBookingState(event);
                }
            });
        },
        onEventClick(event, e) {
            this.selectedEvent = event;
            this.start = event.start;
            this.end = event.end;
            this.confirm(event);
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
        // Select Data
        selectDate() {
            this.isCardModalActive = false;
        },
        // MANIPULATE EVENTS START
        async logEvents(name, event) {
            // event TITLE CHANGE
            if (name === 'event-title-change') {
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
                    this.errors = error;
                }
            }

            // event CONTENT CHANGE
            if (name === 'event-content-change') {
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
                    this.errors = error;
                }
            }

            // event DURATION CHANGE
            if (name === 'event-duration-change') {
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
                    this.errors = error;
                }
            }

            // event DROP
            if (name === 'event-drop') {
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
                    this.errors = error;
                }
            }

            // event drag CREATE
            if (name === 'event-drag-create') {
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
                    this.errors = error;
                }
            }

            // event DELETE
            if (name === 'event-delete') {
                const docId = event.id;

                try {
                    await db.collection(this.user.uid).doc(`${docId}`).delete();
                } catch (error) {
                    this.errors = error;
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
            let snapshot = await db
                .collection(`${this.$router.history.current.params.id}`)
                .get();
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
                this.events = events;
            }
        },
        async onUpdate() {
            const docId = this.selectedEvent.id;

            const newEvent = {
                allDay: this.selectedEvent.allallDay || '',
                background: this.selectedEvent.background,
                class: this.selectedEvent.class,
                content: this.details,
                daysCount: this.selectedEvent.daysCount,
                end: this.end,
                endTimeMinutes: this.selectedEvent.endTimeMinutes,
                split: this.selectedEvent.split || '',
                start: this.start,
                startTimeMinutes: this.selectedEvent.startTimeMinutes,
                title: this.title || '',
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
                this.errors = error;
            } finally {
                this.isCardModalActive = false;
                this.title = '';
            }
        }
    },
    mounted() {
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
</style>
