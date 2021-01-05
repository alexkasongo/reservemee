<template>
    <div v-if="user" class="content">
        <!-- Header -->
        <div class="container">
            <Header />
        </div>
        <!-- Header End-->

        <section class="container">
            <div class="row">
                <div class="col-md-4">
                    <div>
                        <div class="display-1 mt-5 mb-5">Bio</div>
                        <!-- Personal-Information -->
                        <BusinessInfo />
                        <!-- Personal-Information -->
                        <div v-if="user">
                            <div
                                v-if="
                                    categories.length <= 0 ||
                                    !user.emailVerified
                                "
                                class="display-1 mt-10 mb-5"
                            >
                                Todos
                            </div>
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
                        <div class="display-1 mt-10 mb-5">Messages</div>
                        <!-- Messages -->
                        <StoreMessages />
                        <!-- Messages -->
                    </div>
                </div>
                <div class="col-md-8">
                    <!-- StoreSummary -->
                    <StoreSummary />
                    <!-- StoreSummary -->

                    <!-- <div v-if="!loading">
                        <Scheduling class="services" />
                        <UpcomingEvents />
                    </div> -->
                    <div class="display-1 mt-10 mb-5">Calendar</div>
                    <!-- <v-card elevation="2"> -->
                    <Calendar />
                    <!-- </v-card>s -->

                    <div>
                        <div class="display-1 mt-10 mb-5">Services</div>
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
    data: () => ({
        user: []
    }),
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
