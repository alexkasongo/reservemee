<template>
    <div class="dashboard">
        <div v-if="user">
            <!-- Header -->
            <div>
                <Header />
            </div>
            <!-- Header End-->

            <div class="dashboard__columns mt-5">
                <div class="dashboard__col-one dashboard__bg">
                    <!-- <div
                    class="dashboard__bg column is-full-mobile is-full-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd"
                > -->
                    <!-- Personal-Information -->
                    <div class="mb-5">
                        <BusinessInfo />
                    </div>
                    <!-- Personal-Information -->
                    <div v-if="user">
                        <h5
                            v-if="categories.length <= 0 || !user.emailVerified"
                            class="title is-5 mt-10 mb-5"
                        >
                            Todos
                        </h5>
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
                        <h5 class="title is-5 mt-10 mb-5">Messages</h5>
                        <!-- Messages -->
                        <StoreMessages />
                        <!-- Messages -->
                    </div>
                </div>
                <div class="dashboard__col-two">
                    <!-- StoreSummary -->
                    <div class="mb-5">
                        <StoreSummary />
                    </div>
                    <!-- StoreSummary -->

                    <!-- Vue-cal -->
                    <div>
                        <h1 class="title mt-5 mb-5">Business Hours</h1>
                        <h2 class="subtitle">
                            Create and edit business operating hours
                        </h2>
                        <EventCalendar />
                    </div>
                    <!-- Vue-cal End -->

                    <div>
                        <h1 class="title mt-5 mb-5">Services</h1>
                        <h2 class="subtitle">
                            Create and edit categories and view services for
                            each category
                        </h2>
                        <!-- ManageServices -->
                        <ManageServices />
                        <!-- ManageServices -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Header from '../components/dashboard/Header';
// import BusinessInfo from '../components/dashboard/BusinessInfo';
// import CategoryCheck from '../components/dashboard/CategoryCheck';
// import EmailVerified from '../components/dashboard/EmailVerified';
// import StoreMessages from '../components/chat/Header';
// import StoreSummary from '../components/dashboard/StoreSummary';
// import EventCalendar from '../components/dashboard/EventCalendar';
// import ManageServices from '../components/dashboard/ManageServices';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { mapGetters, mapActions } from 'vuex';

export default {
    // components: {
    //     Header,
    //     BusinessInfo,
    //     CategoryCheck,
    //     EmailVerified,
    //     StoreMessages,
    //     StoreSummary,
    //     EventCalendar,
    //     ManageServices
    // },
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
