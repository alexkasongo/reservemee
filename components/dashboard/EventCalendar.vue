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

        <vue-cal
            :selected-date="selectedDate"
            today-button
            :time-from="8 * 60"
            :time-to="19 * 60"
            hide-weekends
            :snap-to-time="15"
            editable-events
            :events="events"
            :split-days="[
                { id: 1, label: 'Dr 1' },
                { id: 2, label: 'Dr 2' }
            ]"
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
        >
        </vue-cal>
    </div>
</template>

<script>
// const store = {
//     splits: [
//         { label: 'Aleko', class: 'Aleko' },
//         { label: 'Ketsia', class: 'Ketsia' }
//     ],
//     editable: {
//         title: false,
//         drag: true,
//         resize: true,
//         create: true,
//         delete: true
//     },
//     events: []
// };

export default {
    name: 'EventCalendar',
    data: () => ({
        // store,
        selectedDate: new Date(),
        events: []
    }),
    computed: {
        // Get the Monday of the real time current week.
        previousFirstDayOfWeek() {
            return new Date(
                new Date().setDate(
                    new Date().getDate() - ((new Date().getDay() + 6) % 7)
                )
            );
        }
    },
    methods: {
        customEventCreation() {
            const thursday = this.previousFirstDayOfWeek.addDays(3).format();
            const dateTime = prompt(
                'Create event on (YYYY-MM-DD HH:mm)',
                '2021-02-04 14:00'
            );

            // Check if date format is correct before creating event.
            if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateTime)) {
                // this.$refs.vuecal.createEvent(
                this.store.events.push({
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
        logEvents(name, event) {
            console.log(`EventCalendar.vue - 84 - 🍎`, name, event);
        }
    }
    // async created() {
    //     // Place all the events in the real time current week.
    //     for (let i = 0; i < 5; i++) {
    //         const day = await this.previousFirstDayOfWeek.addDays(i).format();
    //         this.store.events.push(
    //             {
    //                 start: `${day} 12:00`,
    //                 end: `${day} 13:00`,
    //                 title: 'LUNCH',
    //                 class: 'lunch',
    //                 background: true,
    //                 deletable: false,
    //                 resizable: false,
    //                 split: 1
    //             },
    //             {
    //                 start: `${day} 12:00`,
    //                 end: `${day} 13:00`,
    //                 title: 'LUNCH',
    //                 class: 'lunch',
    //                 background: true,
    //                 deletable: false,
    //                 resizable: false,
    //                 split: 2
    //             }
    //         );
    //     }
    //     // Date.format() and Date.addDays() are helper methods added by Vue Cal.
    //     const monday = await this.previousFirstDayOfWeek.format();
    //     const tuesday = await this.previousFirstDayOfWeek.addDays(1).format();
    //     const thursday = await this.previousFirstDayOfWeek.addDays(3).format();
    //     const friday = await this.previousFirstDayOfWeek.addDays(4).format();
    //     this.store.events.push(
    //         {
    //             start: `${monday} 15:30`,
    //             end: `${monday} 17:30`,
    //             title: 'Tennis',
    //             content:
    //                 '<i class="v-icon material-icons mt-1">sports_tennis</i>',
    //             resizable: false,
    //             split: 1
    //         },
    //         {
    //             start: `${monday} 15:30`,
    //             end: `${monday} 17:30`,
    //             title: 'Tennis',
    //             content:
    //                 '<i class="v-icon material-icons mt-1">sports_tennis</i>',
    //             resizable: false,
    //             split: 2
    //         },
    //         {
    //             start: `${tuesday} 08:00`,
    //             end: `${tuesday} 10:00`,
    //             title: 'Volleyball',
    //             content:
    //                 '<i class="v-icon material-icons mt-1">sports_volleyball</i>',
    //             resizable: false,
    //             split: 2
    //         },
    //         {
    //             start: `${thursday} 09:00`,
    //             end: `${thursday} 11:30`,
    //             title: 'Golf',
    //             content:
    //                 '<i class="v-icon material-icons mt-2">golf_course</i>',
    //             resizable: false,
    //             split: 1
    //         },
    //         {
    //             start: `${friday} 16:45`,
    //             end: `${friday} 18:45`,
    //             title: 'Movie',
    //             content: '<i class="v-icon material-icons mt-1">local_play</i>',
    //             resizable: false,
    //             split: 2
    //         }
    //     );
    // }
};
</script>

<style lang="scss">
.vuecal__menu {
    background-color: #42b983;
    color: #fff;
}

.vuecal__title-bar {
    background-color: #e4f5ef;
}

.vuecal__event--dragging {
    background-color: rgba(60, 60, 60, 0.3);
}

.vuecal__event {
    background-color: rgba(164, 230, 210, 0.9);
    border: 1px solid #90d2be;
}

// $Aleko: #42b983;
// $Ketsia: #ff7fc8;
// .demo {
//     border-radius: 4px;
//     // Date picker.
//     &.vuecal--date-picker .vuecal__cell-events-count {
//         width: 4px;
//         height: 4px;
//         min-width: 0;
//         padding: 0;
//         margin-top: 4px;
//         color: transparent;
//         background-color: $Aleko;
//     }
//     &.vuecal--date-picker .vuecal__cell--selected .vuecal__cell-events-count {
//         background-color: #fff;
//     }
//     // Both calendars.
//     .vuecal__cell--out-of-scope {
//         color: rgba(0, 0, 0, 0.15);
//     }
//     // Full power calendar.
//     // ------------------------------------------------------
//     &.full-cal .vuecal__menu {
//         background-color: transparent;
//     }
//     &.full-cal .vuecal__title-bar {
//         background: rgba(0, 0, 0, 0.03);
//     }
//     .vuecal__view-btn {
//         background: none;
//         padding: 0 10px;
//         margin: 4px 2px;
//         border-radius: 30px;
//         height: 20px;
//         line-height: 20px;
//         font-size: 13px;
//         text-transform: uppercase;
//         border: none;
//         color: inherit;
//         &--active {
//             background: rgb(66, 185, 130);
//             color: #fff;
//         }
//     }
//     &.full-cal .weekday-label {
//         opacity: 0.4;
//         font-weight: 500;
//     }
//     .vuecal__header .v-icon {
//         color: inherit;
//     }
//     &:not(.vuecal--day-view) .vuecal__cell--selected {
//         background-color: transparent;
//     }
//     &:not(.vuecal--day-view).full-cal .vuecal__cell--selected:before {
//         border: 1px solid rgba($Aleko, 0.8);
//     }
//     .vuecal__event-time {
//         margin: 3px 0;
//         font-size: 12px;
//         font-weight: 500;
//         line-height: 1.2;
//     }
//     // Aleko.
//     .vuecal__header .Aleko {
//         color: darken($Aleko, 5);
//     }
//     .vuecal__body .Aleko {
//         background-color: rgba($Aleko, 0.08);
//     }
//     .Aleko .vuecal__event {
//         background-color: rgba(lighten($Aleko, 5), 0.85);
//         color: #fff;
//     }
//     .Aleko .lunch {
//         background: repeating-linear-gradient(
//             45deg,
//             transparent,
//             transparent 10px,
//             rgba($Aleko, 0.15) 10px,
//             rgba($Aleko, 0.15) 20px
//         );
//         color: transparentize(darken($Aleko, 10), 0.4);
//     }
//     // Ketsia.
//     .vuecal__header .Ketsia {
//         color: darken($Ketsia, 5);
//     }
//     .vuecal__body .Ketsia {
//         background-color: rgba($Ketsia, 0.08);
//     }
//     .Ketsia .vuecal__event {
//         background-color: rgba(lighten($Ketsia, 5), 0.85);
//         color: #fff;
//     }
//     .Ketsia .lunch {
//         background: repeating-linear-gradient(
//             45deg,
//             transparent,
//             transparent 10px,
//             rgba($Ketsia, 0.15) 10px,
//             rgba($Ketsia, 0.15) 20px
//         );
//         color: transparentize(darken($Ketsia, 10), 0.4);
//     }
//     // ------------------------------------------------------
// }
</style>
