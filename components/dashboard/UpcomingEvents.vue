<template>
    <v-card elevation="2" class="mx-auto mt-3" width="100%">
        <!-- <v-card dark flat>
            <v-img
                src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
                gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
            >
                <v-container class="fill-height">
                    <v-row align="center">
                        <strong class="display-4 font-weight-regular mr-6"
                            >8</strong
                        >
                        <v-row justify="end">
                            <div class="headline font-weight-light">Monday</div>
                            <div class="text-uppercase font-weight-light">
                                February 2015
                            </div>
                        </v-row>
                    </v-row>
                </v-container>
            </v-img>
        </v-card> -->
        <v-card-text class="py-0">
            <v-timeline align-top dense>
                <v-timeline-item color="pink" small>
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>3-4pm</strong>
                        </v-col>
                        <v-col>
                            <strong>New Order</strong>
                            <div class="caption">Service Name</div>
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item color="teal lighten-3" small>
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>1-2pm</strong>
                        </v-col>
                        <v-col>
                            <strong>Appointment</strong>
                            <div class="caption mb-2">
                                Customer + Service Name
                            </div>
                            <v-avatar>
                                <v-img
                                    src="https://via.placeholder.com/150"
                                ></v-img>
                            </v-avatar>
                            <v-avatar>
                                <v-img
                                    src="https://via.placeholder.com/150/00796B"
                                ></v-img>
                            </v-avatar>
                            <v-avatar>
                                <v-img
                                    src="https://via.placeholder.com/150/80D8FF"
                                ></v-img>
                            </v-avatar>
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item color="pink" small>
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>12pm</strong>
                        </v-col>
                        <v-col>
                            <strong>Lunch break</strong>
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item color="teal lighten-3" small>
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>9-11am</strong>
                        </v-col>
                        <v-col>
                            <strong>Appointment</strong>
                            <div class="caption">Customer + Service Name</div>
                        </v-col>
                    </v-row>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        events: [],
        input: null,
        nonce: 0
    }),

    computed: {
        timeline() {
            return this.events.slice().reverse();
        }
    },

    methods: {
        comment() {
            const time = new Date().toTimeString();
            this.events.push({
                id: this.nonce++,
                text: this.input,
                time: time.replace(
                    /:\d{2}\sGMT-\d{4}\s\((.*)\)/,
                    (match, contents, offset) => {
                        return ` ${contents
                            .split(' ')
                            .map((v) => v.charAt(0))
                            .join('')}`;
                    }
                )
            });

            this.input = null;
        }
    }
};
</script>

<style lang="stylus" scoped></style>