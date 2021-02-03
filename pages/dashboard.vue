<template>
    <div v-if="user" class="content">
        <!-- Header -->
        <div class="container">
            <Header />
        </div>
        <!-- Header End-->

        <div class="columns">
            <div
                class="column is-full-mobile is-full-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd"
            >
                <div class="mt-5 mb-5">Bio</div>
                <!-- Personal-Information -->
                <BusinessInfo />
                <!-- Personal-Information -->
                <div v-if="user">
                    <div
                        v-if="categories.length <= 0 || !user.emailVerified"
                        class="mt-10 mb-5"
                    >
                        Todos
                    </div>
                </div>
                <div v-if="user">
                    <div v-if="categories.length <= 0" class="mb-5">
                        <!-- CategoryCheck -->
                        <CategoryCheck />
                        <!-- CategoryCheck -->
                    </div>
                    <div v-if="!user.emailVerified" class="mb-5">
                        <!-- EmailVerified -->
                        <EmailVerified />
                        <!-- EmailVerified -->
                    </div>
                </div>

                <div>
                    <div class="display-1 mt-10 mb-5">Messages</div>
                    <!-- Messages -->
                    <StoreMessages />
                    <!-- Messages -->
                </div>
            </div>
            <div class="column">
                <!-- StoreSummary -->
                <StoreSummary />
                <!-- StoreSummary -->

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
            </div>
        </div>

        <!-- <section class="container">
            <div class="row">
                <div class="col-md-4">
                    <div>
                        <div class="display-1 mt-5 mb-5">Bio</div>

                        <BusinessInfo />

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

                                    <CategoryCheck />

                                </div>
                            </div>
                            <div v-if="!user.emailVerified" class="w-100">

                                <EmailVerified />

                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="display-1 mt-10 mb-5">Messages</div>

                        <StoreMessages />

                    </div>
                </div>
                <div class="col-md-8">

                    <StoreSummary />

                    <div class="display-1 mt-10 mb-5">Calendar</div>

                    <Calendar />


                    <div>
                        <div class="display-1 mt-10 mb-5">Services</div>

                        <ManageServices v-if="categories.length !== 0" />

                        <ManageServices v-else />

                    </div>
                </div>
            </div>
        </section> -->
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

<style lang="scss" scoped></style>
