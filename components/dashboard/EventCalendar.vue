<template>
    <div>
        <!-- <div class="text-center headline mb-10">
            <span class="grey--text darken-1">Go for the date picker...</span
            ><span class="ml-8 primary--text text--darken-1"
                >or unleash the full potential!</span
            >
        </div> -->
        <div class="layout wrap align-center justify-center">
            <!-- <div class="mx-2">
                <vue-cal
                    class="vuecal--date-picker demo"
                    xsmall="xsmall"
                    :selected-date="selectedDate"
                    hide-view-selector="hide-view-selector"
                    :time="false"
                    :transitions="false"
                    active-view="month"
                    :events="demoExample.events"
                    :disable-views="['week', 'day']"
                    @cell-click="selectedDate = $event"
                    style="width: 210px; height: 230px"
                ></vue-cal>
                <div class="grey--text code my-2" style="font-size: 13px">
                    Selected date: '{{ selectedDate.format() }}'
                </div>
            </div> -->
            <div>
                <vue-cal
                    class="demo full-cal vuecal--full-height-delete"
                    hide-weekends="hide-weekends"
                    :selected-date="selectedDate"
                    :time-from="8 * 60"
                    :time-to="19 * 60"
                    :split-days="demoExample.splits"
                    sticky-split-labels="sticky-split-labels"
                    :editable-events="demoExample.editable"
                    :events="demoExample.events"
                    @cell-focus="selectedDate = $event.date || $event"
                    style="height: 500px"
                    ><template v-slot:split-label="{ split }">
                        <b-icon icon="edit"></b-icon
                        ><strong :style="`color: ${split.color}`">{{
                            split.label
                        }}</strong>
                    </template></vue-cal
                >
                <!-- <a
                    class="mt-4 layout justify-end grey--text text--lighten-1"
                    href="https://github.com/antoniandre/vue-cal/blob/master/src/documentation/main-demo.vue"
                    target="_blank"
                    >View this example source code<v-icon
                        class="ml-1"
                        small="small"
                        color="grey lighten-1"
                        >open_in_new</v-icon
                    ></a
                > -->
            </div>
        </div>
    </div>
</template>

<script>
const demoExample = {
    splits: [
        { label: 'Aleko', class: 'Aleko' },
        { label: 'Ketsia', class: 'Ketsia' }
    ],
    editable: {
        title: false,
        drag: true,
        resize: true,
        create: true,
        delete: true
    },
    events: []
};

export default {
    name: 'EventCalendar',
    data: () => ({
        demoExample,
        selectedDate: new Date()
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
    created() {
        // Place all the events in the real time current week.
        for (let i = 0; i < 5; i++) {
            const day = this.previousFirstDayOfWeek.addDays(i).format();
            this.demoExample.events.push(
                {
                    start: `${day} 12:00`,
                    end: `${day} 13:00`,
                    title: 'LUNCH',
                    class: 'lunch',
                    background: true,
                    deletable: false,
                    resizable: false,
                    split: 1
                },
                {
                    start: `${day} 12:00`,
                    end: `${day} 13:00`,
                    title: 'LUNCH',
                    class: 'lunch',
                    background: true,
                    deletable: false,
                    resizable: false,
                    split: 2
                }
            );
        }
        // Date.format() and Date.addDays() are helper methods added by Vue Cal.
        const monday = this.previousFirstDayOfWeek.format();
        const tuesday = this.previousFirstDayOfWeek.addDays(1).format();
        const thursday = this.previousFirstDayOfWeek.addDays(3).format();
        const friday = this.previousFirstDayOfWeek.addDays(4).format();
        this.demoExample.events.push(
            {
                start: `${monday} 15:30`,
                end: `${monday} 17:30`,
                title: 'Tennis',
                content:
                    '<i class="v-icon material-icons mt-1">sports_tennis</i>',
                resizable: false,
                split: 1
            },
            {
                start: `${monday} 15:30`,
                end: `${monday} 17:30`,
                title: 'Tennis',
                content:
                    '<i class="v-icon material-icons mt-1">sports_tennis</i>',
                resizable: false,
                split: 2
            },
            {
                start: `${tuesday} 08:00`,
                end: `${tuesday} 10:00`,
                title: 'Volleyball',
                content:
                    '<i class="v-icon material-icons mt-1">sports_volleyball</i>',
                resizable: false,
                split: 2
            },
            {
                start: `${thursday} 09:00`,
                end: `${thursday} 11:30`,
                title: 'Golf',
                content:
                    '<i class="v-icon material-icons mt-2">golf_course</i>',
                resizable: false,
                split: 1
            },
            {
                start: `${friday} 16:45`,
                end: `${friday} 18:45`,
                title: 'Movie',
                content: '<i class="v-icon material-icons mt-1">local_play</i>',
                resizable: false,
                split: 2
            }
        );
    }
};
</script>

<style lang="scss">
$Aleko: #42b983;
$Ketsia: #ff7fc8;
.demo {
    border-radius: 4px;
    // Date picker.
    &.vuecal--date-picker .vuecal__cell-events-count {
        width: 4px;
        height: 4px;
        min-width: 0;
        padding: 0;
        margin-top: 4px;
        color: transparent;
        background-color: $Aleko;
    }
    &.vuecal--date-picker .vuecal__cell--selected .vuecal__cell-events-count {
        background-color: #fff;
    }
    // Both calendars.
    .vuecal__cell--out-of-scope {
        color: rgba(0, 0, 0, 0.15);
    }
    // Full power calendar.
    // ------------------------------------------------------
    &.full-cal .vuecal__menu {
        background-color: transparent;
    }
    &.full-cal .vuecal__title-bar {
        background: rgba(0, 0, 0, 0.03);
    }
    .vuecal__view-btn {
        background: none;
        padding: 0 10px;
        margin: 4px 2px;
        border-radius: 30px;
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        text-transform: uppercase;
        border: none;
        color: inherit;
        &--active {
            background: rgb(66, 185, 130);
            color: #fff;
        }
    }
    &.full-cal .weekday-label {
        opacity: 0.4;
        font-weight: 500;
    }
    .vuecal__header .v-icon {
        color: inherit;
    }
    &:not(.vuecal--day-view) .vuecal__cell--selected {
        background-color: transparent;
    }
    &:not(.vuecal--day-view).full-cal .vuecal__cell--selected:before {
        border: 1px solid rgba($Aleko, 0.8);
    }
    .vuecal__event-time {
        margin: 3px 0;
        font-size: 12px;
        font-weight: 500;
        line-height: 1.2;
    }
    // Aleko.
    .vuecal__header .Aleko {
        color: darken($Aleko, 5);
    }
    .vuecal__body .Aleko {
        background-color: rgba($Aleko, 0.08);
    }
    .Aleko .vuecal__event {
        background-color: rgba(lighten($Aleko, 5), 0.85);
        color: #fff;
    }
    .Aleko .lunch {
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba($Aleko, 0.15) 10px,
            rgba($Aleko, 0.15) 20px
        );
        color: transparentize(darken($Aleko, 10), 0.4);
    }
    // Ketsia.
    .vuecal__header .Ketsia {
        color: darken($Ketsia, 5);
    }
    .vuecal__body .Ketsia {
        background-color: rgba($Ketsia, 0.08);
    }
    .Ketsia .vuecal__event {
        background-color: rgba(lighten($Ketsia, 5), 0.85);
        color: #fff;
    }
    .Ketsia .lunch {
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba($Ketsia, 0.15) 10px,
            rgba($Ketsia, 0.15) 20px
        );
        color: transparentize(darken($Ketsia, 10), 0.4);
    }
    // ------------------------------------------------------
}
</style>
