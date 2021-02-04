<template>
    <div>
        <div-text class="py-0">
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
                            <div>
                                <img src="https://via.placeholder.com/150" />
                            </div>
                            <div>
                                <img
                                    src="https://via.placeholder.com/150/00796B"
                                />
                            </div>
                            <div>
                                <img
                                    src="https://via.placeholder.com/150/80D8FF"
                                />
                            </div>
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
        </div-text>
    </div>
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
