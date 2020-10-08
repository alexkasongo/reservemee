<template>
    <div class="mt-3">
        <div v-if="!user" class="mt-2">
            <p>loading...</p>
        </div>
        <div v-if="user" class="content">
            <div>
                <!-- START HERE -->

                <!-- Header -->
                <div>
                    <Header />
                </div>
                <!-- Header End-->

                <div class="row">
                    <div class="col-xl-4">
                        <div v-if="user">
                            <div>
                                <div v-if="categories.length <= 0">
                                    <!-- CategoryCheck -->
                                    <CategoryCheck />
                                    <!-- CategoryCheck -->
                                </div>
                            </div>
                            <div v-if="!user.emailVerified" class="w-100">
                                <!-- EmailVerified -->
                                <EmailVerified />
                                <!-- EmailVerified -->
                            </div>
                        </div>
                        <!-- Personal-Information -->
                        <BusinessInfo />
                        <!-- Personal-Information -->

                        <!-- Messages -->
                        <Messages />
                        <!-- Messages -->
                    </div>
                    <div class="col-xl-8">
                        <!-- StoreSummary -->
                        <StoreSummary />
                        <!-- StoreSummary -->

                        <div>
                            <!-- ManageServices -->
                            <ManageServices v-if="categories.length !== 0" />
                            <!-- ManageServices -->

                            <!-- ManageServices -->
                            <dManageServices v-else />
                            <!-- ManageServices -->
                        </div>

                        <div class="row" v-if="!loading">
                            <div class="col-xl-12">
                                <Bookings class="services" />
                            </div>
                        </div>

                        <v-card elevation="2">
                            <UpcomingEvents />
                        </v-card>
                    </div>

                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- container -->
        </div>
    </div>
</template>

<script>
import Header from '~/components/dashboard/Header';
import CategoryCheck from '~/components/dashboard/CategoryCheck';
import EmailVerified from '~/components/dashboard/EmailVerified';
import Messages from '~/components/dashboard/Messages';
import StoreSummary from '~/components/dashboard/StoreSummary';
import ManageServices from '~/components/dashboard/ManageServices';
import dManageServices from '~/components/default/dManageServices';
import Bookings from '~/components/dashboard/Bookings';
import UpcomingEvents from '~/components/dashboard/UpcomingEvents';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        Header,
        CategoryCheck,
        EmailVerified,
        Messages,
        StoreSummary,
        ManageServices,
        dManageServices,
        Bookings,
        UpcomingEvents
    },
    data() {
        return {
            user: ''
        };
    },
    computed: {
        ...mapGetters({
            services: 'services',
            categories: 'categories',
            userId: 'userId',
            userData: 'userData'
        }),
        loading() {
            return this.$store.getters.loading;
        }
    },
    mounted() {
        /*
         ** fires each time the page loads, it loads the logged in user object
         */
        firebase.auth().onAuthStateChanged((user) => {
            this.user = user;

            if (!this.user) {
                this.$router.push('/');
            }
        });
    }
};
</script>

<style lang="scss" scoped></style>
