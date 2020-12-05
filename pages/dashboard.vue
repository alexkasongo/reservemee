<template>
    <div v-if="user" class="content">
        <!-- Header -->
        <div class="container">
            <Header class="mb-5" />
        </div>
        <!-- Header End-->

        <section class="container">
            <div class="row">
                <div class="col-xl-4">
                    <div>
                        <h2 class="header-title mt-5 mb-5">Bio</h2>
                        <!-- Personal-Information -->
                        <BusinessInfo />
                        <!-- Personal-Information -->
                        <div v-if="user">
                            <h2
                                v-if="
                                    categories.length <= 0 ||
                                    !user.emailVerified ||
                                    categories.length !== 0
                                "
                                class="header-title mt-0 mb-5"
                            >
                                Todos
                            </h2>
                        </div>
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
                    </div>

                    <div>
                        <h2 class="header-title mt-5 mb-5">Messages</h2>
                        <!-- Messages -->
                        <Messages class="mb-5" />
                        <!-- Messages -->
                    </div>
                </div>
                <div class="col-xl-8">
                    <!-- StoreSummary -->
                    <StoreSummary />
                    <!-- StoreSummary -->

                    <!-- <div v-if="!loading">
                        <Scheduling class="services" />
                        <UpcomingEvents />
                    </div> -->
                    <h2 class="header-title mt-0 mb-5">Calendar</h2>
                    <v-card elevation="2">
                        <Calendar class="mb-5" />
                    </v-card>

                    <div>
                        <h2 class="header-title mt-0 mb-5">Services</h2>
                        <!-- ManageServices -->
                        <ManageServices v-if="categories.length !== 0" />
                        <!-- ManageServices -->

                        <!-- ManageServices -->
                        <ManageServices v-else />
                        <!-- ManageServices -->
                    </div>

                    <!-- <v-card elevation="2">
                            <UpcomingEvents />
                        </v-card> -->
                </div>

                <!-- end col -->
            </div>
        </section>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            user: ''
        };
    },
    computed: {
        ...mapGetters({
            categories: 'dashboard/categories',
            services: 'dashboard/services',
            userData: 'dashboard/userData',
            loading: 'loaders/loading',
            userId: 'userId'
        })
    },
    methods: {
        ...mapActions({
            loadUserIdData: 'dashboard/loadUserIdData'
        })
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

        const loadedUserData = this.userData;
        if (
            !loadedUserData ||
            Object.keys(loadedUserData).length <= 0 ||
            loadedUserData === undefined
        ) {
            this.loadUserIdData(this.user.uid);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
