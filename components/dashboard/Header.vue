<template>
    <!-- Header -->
    <!-- FIXME only display banner when it is fully loaded -->
    <div class="row">
        <!-- IF PROFILE EXISTS -->
        <div v-if="storeProfile !== null" class="container parallax">
            <v-parallax
                height="300"
                v-if="storeProfile.storeBanner !== ''"
                :src="storeProfile.storeBanner"
            >
                <div class="bg-center">
                    <div class="container">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <div class="float-left mr-3">
                                    <img
                                        v-if="storeProfile.storeLogo !== ''"
                                        @click="viewProfile(user.uid)"
                                        :src="storeProfile.storeLogo"
                                        alt
                                        class="thumb-lg rounded-circle"
                                        v-bind="attrs"
                                        v-on="on"
                                    />
                                    <img
                                        v-else
                                        @click="viewProfile(user.uid)"
                                        :src="defaultStoreLogo"
                                        alt
                                        class="thumb-lg rounded-circle"
                                        v-bind="attrs"
                                        v-on="on"
                                    />
                                </div>
                            </template>
                            <span>Settings</span>
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
            </v-parallax>
            <v-parallax height="300" v-else :src="defaultStoreBanner">
                <div class="bg-center">
                    <div class="col-sm-6">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <span class="float-left mr-3">
                                    <img
                                        v-if="storeProfile.storeLogo !== ''"
                                        @click="viewProfile(user.uid)"
                                        :src="storeProfile.storeLogo"
                                        alt
                                        class="thumb-lg rounded-circle"
                                        v-bind="attrs"
                                        v-on="on"
                                    />
                                    <img
                                        v-else
                                        @click="viewProfile(user.uid)"
                                        :src="defaultStoreLogo"
                                        alt
                                        class="thumb-lg rounded-circle"
                                        v-bind="attrs"
                                        v-on="on"
                                    />
                                </span>
                            </template>
                            <span>Settings</span>
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
            </v-parallax>
        </div>
        <!-- IF PROFILE EXISTS -->

        <!-- IF PROFILE DOESN'T EXISTS -->
        <div v-else class="parallax">
            <v-parallax src="https://via.placeholder.com/1200">
                <div class="bg-center">
                    <div class="container">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <span class="float-left mr-3">
                                    <img
                                        @click="viewProfile(user.uid)"
                                        src="https://via.placeholder.com/1200/00897b"
                                        alt
                                        class="thumb-lg rounded-circle"
                                        v-bind="attrs"
                                        v-on="on"
                                    />
                                </span>
                            </template>
                            <span>Settings</span>
                        </v-tooltip>

                        <div class="media-body text-white">
                            <p>
                                {{ user.displayName }}
                            </p>
                        </div>
                    </div>
                </div>
            </v-parallax>
        </div>
        <!-- IF PROFILE DOESN'T EXISTS -->
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
            user: '',
            defaultStoreBanner: 'https://via.placeholder.com/1200x300',
            defaultStoreLogo: 'https://via.placeholder.com/1200/00897B'
        };
    },
    computed: {
        storeProfile() {
            if (
                // if the state is undfined or the object does not exist, return null
                this.$store.state.userData.length <= 0 ||
                !this.$store.state.userData[0].storeProfile
            ) {
                return null;
            } else {
                const data = this.$store.state.userData[0].storeProfile;
                return data;
            }
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
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

<style lang="scss" scoped>
.parallax {
    width: 100%;
}
</style>
