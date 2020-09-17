<template>
    <div class="home mt-3">
        <div class="home__grid">
            <div class="home__grid-left">
                <div class="w-100">
                    <div v-if="loading" class="mt-2">
                        <p>loading...</p>
                    </div>
                    <div v-if="!loading">
                        <div v-if="categories.length == 0">
                            <div class="w-100">
                                <div class="card">
                                    <div class="card-header">Dashboard</div>
                                    <div class="card-body">
                                        <h3 v-if="user">Welcome {{ user.displayName }}</h3>
                                        <p>You currently have no services. Start by creating a category.</p>

                                        <button
                                            @click="onCreateInitCat"
                                            type="button"
                                            class="btn btn-block btn-primary"
                                        >Create Category</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="!user.emailVerified" class="w-100">
                            <div class="card">
                                <div class="card-body">
                                    <h3 v-if="user">Your email address is not verified.</h3>
                                    <p>Verified: {{ user.emailVerified }}</p>
                                    <button
                                        @click="verifyEmail"
                                        type="button"
                                        class="btn btn-block btn-primary"
                                    >Verify Email</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="categories.length > 0" class="d-flex justify-content-start mt-3">
                        <div class="w-100">
                            <div class="card">
                                <div class="card-header">
                                    <h4>Service Categories</h4>
                                </div>
                                <ul
                                    v-for="category in categories"
                                    :key="category.id"
                                    class="list-group list-group-flush"
                                >
                                    <li
                                        @click="goToService(category.name)"
                                        class="list-group-item list-group-item-action"
                                    >{{ category.name | capitalize }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-if="categories.length > 0" class="d-flex justify-content-start mt-3">
                        <div class="w-100">
                            <div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
                                <label class="btn btn-primary" @click="onCreateCategory">
                                    <input
                                        type="radio"
                                        name="options"
                                        id="option2"
                                        autocomplete="off"
                                    /> Create Category
                                </label>
                                <label class="btn btn-secondary" @click="onCreateService">
                                    <input
                                        type="radio"
                                        name="options"
                                        id="option3"
                                        autocomplete="off"
                                    /> Create Service
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!loading">
                <div class="home__grid-right">
                    <Bookings />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bookings from '~/components/dashboard/Bookings';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        Bookings
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
    methods: {
        ...mapActions(['createUserTable']),
        onCreateService() {
            this.$router.push('/service/create-service');
        },
        onCreateInitCat() {
            this.createUserTable(this.userId);
            this.$router.push('/service/create-category');
        },
        onCreateCategory() {
            this.$router.push('/service/create-category');
        },
        verifyEmail() {
            this.$router.push('/verification');
        },
        goToService(service) {
            this.$router.push({
                name: 'service-id',
                params: {
                    id: service
                }
            });
        }
    },
    beforeMount() {},
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

<style lang="scss" scoped>
.home {
    width: 100%;
    margin-right: auto;
    margin-left: auto;

    &__grid {
        height: 100vh;
    }

    &__grid-left {
        display: flex;
        align-items: center;
        // background-color: pink;
        // height: calc(50% - 56px);
        // height: 50%;
    }
    &__grid-right {
        display: flex;
        align-items: center;
        // background-color: lightblue;
        // height: calc(50% + 56px);
        // height: 50%;
    }
}
</style>