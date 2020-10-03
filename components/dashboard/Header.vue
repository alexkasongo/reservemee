<template>
    <!-- Header -->
    <div class="row">
        <div v-if="storeProfile !== null" class="col-sm-12">
            <!-- meta -->
            <div
                class="profile-user-box card-box bg-custom"
                :style="{
                    backgroundImage: 'url(' + storeProfile.storeBanner + ')'
                }"
            ></div>
            <div class="bg-center">
                <div class="col-sm-6">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span class="float-left mr-3">
                                <img
                                    @click="viewProfile(user.uid)"
                                    :src="storeProfile.storeLogo"
                                    alt
                                    class="thumb-lg rounded-circle"
                                    v-bind="attrs"
                                    v-on="on"
                                />
                            </span>
                        </template>
                        <span>Go to settings</span>
                    </v-tooltip>

                    <div class="media-body text-white">
                        <h4 class="mt-1 mb-1 font-18">
                            {{ storeProfile.storeName | capitalize }}
                        </h4>
                        <p>
                            {{ user.displayName }}
                        </p>
                    </div>
                </div>
            </div>
            <!--/ meta -->
        </div>
        <div v-else class="col-sm-12">
            <!-- meta -->
            <div
                class="profile-user-box card-box bg-custom"
                style="
                    background-image: url('https://via.placeholder.com/1200/00897b');
                "
            ></div>
            <div class="bg-center">
                <div class="col-sm-6">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span class="float-left mr-3">
                                <img
                                    @click="viewProfile(user.uid)"
                                    src="https://via.placeholder.com/1200"
                                    alt
                                    class="thumb-lg rounded-circle"
                                    v-bind="attrs"
                                    v-on="on"
                                />
                            </span>
                        </template>
                        <span>Go to settings</span>
                    </v-tooltip>

                    <div class="media-body text-white">
                        <!-- <h4 class="mt-1 mb-1 font-18">
                            {{ storeProfile.storeName | capitalize }}
                        </h4> -->
                        <p>
                            {{ user.displayName }}
                        </p>
                    </div>
                </div>
            </div>
            <!--/ meta -->
        </div>
    </div>
    <!-- Header End-->
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: 'Header',
    data() {
        return {
            user: ''
        };
    },
    computed: {
        storeProfile() {
            if (this.$store.state.userData[0].storeProfile === undefined) {
                return null;
            } else {
                const data = this.$store.state.userData[0].storeProfile;
                return data;
            }
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(`Header.vue - 54 - 🍎`, user);
            if (user !== null) {
                this.user = user;
            }
        });
    },
    methods: {
        viewProfile(id) {
            this.$router.push({
                name: 'profile-id',
                params: {
                    id: id
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped></style>
