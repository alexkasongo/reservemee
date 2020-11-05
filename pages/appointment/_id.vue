<template>
    <div class="container margin">
        <!-- <h1>Welcome: {{ this.$route.params.id }}</h1> -->
        <div class="appointment">
            <div class="appointment__left">
                <div class="shop-inf">
                    <!--                    <div class="avatar">-->
                    <!--                        -->
                    <!--                        -->
                    <!--                    </div>-->
                    <div class="shop-name">
                        <b
                            ><a href="#" class="text-capitalize"
                                >Luna Nail Lounge
                            </a></b
                        >
                    </div>
                    <br />
                    <div class="shop-name">
                        <a href="tel:(425) 332-3981" style="font-size: 16px"
                            >(425) 332-3981</a
                        >
                    </div>
                </div>
                <div class="shop-w-hour">
                    <p>
                        <span class="ttl">Mon:</span
                        ><span class="w-hour">9:30 AM - 7:00 PM </span>
                    </p>
                    <p>
                        <span class="ttl">Tue:</span
                        ><span class="w-hour">9:30 AM - 7:00 PM</span>
                    </p>
                    <p>
                        <span class="ttl">Wed:</span
                        ><span class="w-hour">9:30 AM - 7:00 PM</span>
                    </p>
                    <p>
                        <span class="ttl">Thu:</span
                        ><span class="w-hour">9:30 AM - 7:00 PM</span>
                    </p>
                    <p>
                        <span class="ttl">Fri:</span
                        ><span class="w-hour">9:30 AM - 7:00 PM</span>
                    </p>
                    <p>
                        <span class="ttl">Sat:</span
                        ><span class="w-hour">9:00 AM - 6:00 PM</span>
                    </p>
                    <p>
                        <span class="ttl">Sun:</span
                        ><span class="w-hour">10:00 AM - 5:00 PM</span>
                    </p>
                    <strong style="padding-top: 20px"
                        >Booking available until 7:00 PM today</strong
                    >
                    <!--                    <a href="/appointment/make" class="text-uppercase appoint-btn">Booking an appointment</a>-->
                </div>
                <!-- END: SHOP WORK HOURS-->
                <div class="side-menu">
                    <div class="side-menu-itm">
                        <p class="active">Staff</p>
                        <div
                            class="staff-selected"
                            style="
                                padding-left: 17px;
                                font-size: 14px;
                                margin-bottom: 5px;
                            "
                        >
                            <span class="staff"> N/A </span>
                            <br /><a
                                href="/appointment/book"
                                class="reselect"
                                style="
                                    display: block;
                                    padding: 8px 0;
                                    color: #2996cc;
                                "
                                >Edit staff</a
                            >
                        </div>
                    </div>
                    <div class="side-menu-itm">
                        <p class="active">Services</p>
                        <div class="service-selected" id="service-selected">
                            <span class="service" id="service-77"
                                >Deluxe Manicure (25 mins)</span
                            ><a href="#" class="reselect">Edit services</a>
                        </div>
                    </div>

                    <div class="side-menu-itm">
                        <p class="datetime-select active">
                            Select date &amp; time
                        </p>
                        <div class="date-selected hide">
                            <a href="#" class="reselect-time">
                                <span class="date-book"
                                    >Wednesday, October 18, 2017</span
                                ><span class="time-book"
                                    >12:00 PM - 12:30 PM US Central</span
                                ></a
                            >
                        </div>
                    </div>
                    <div class="side-menu-itm">
                        <p class="your-inf">Your info</p>
                    </div>
                </div>
            </div>
            <!-- END: SIDEBAR-->

            <!-- RIGHT -->
            <div class="appointment__right">
                <v-card>
                    <Calendar />
                </v-card>
            </div>
            <!-- RIGHT END -->
        </div>
    </div>
</template>

<script>
import Calendar from '@/components/Calendar';

export default {
    components: {
        Calendar
    }
};
</script>

<style lang="scss" scoped>
</style>