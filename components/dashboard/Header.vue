<template>
    <!-- Header -->
    <div class="header">
        <!-- IF PROFILE EXISTS -->
        <section
            v-if="storeProfile !== null && Object.keys(storeProfile).length > 1"
        >
            <section
                v-if="storeProfile.storeBanner !== ''"
                :src="storeProfile.storeBanner"
                class="hero is-small is-link header__bg"
            >
                <div class="hero-body">
                    <img
                        v-if="storeProfile.storeLogo !== ''"
                        @click="$router.push('/settings')"
                        :src="storeProfile.storeLogo"
                        alt
                        class="header__thumb-lg rounded-circle"
                    />
                    <img
                        v-else
                        @click="$router.push('/settings')"
                        :src="defaultStoreLogo"
                        alt
                        class="header__thumb-lg rounded-circle"
                    />
                    <p class="title">
                        {{ storeProfile.storeName | capitalize }}
                    </p>
                    <p class="subtitle">{{ user.displayName }}</p>
                </div>
            </section>
            <section v-else class="hero is-small is-link">
                <div class="hero-body" :src="defaultStoreBanner">
                    <img
                        v-if="storeProfile.storeLogo !== ''"
                        @click="$router.push('/settings')"
                        :src="storeProfile.storeLogo"
                        alt
                        class="header__thumb-lg rounded-circle"
                    />
                    <img
                        v-else
                        @click="$router.push('/settings')"
                        :src="defaultStoreLogo"
                        alt
                        class="header__thumb-lg rounded-circle"
                    />
                    <p class="title">
                        {{ storeProfile.storeName | capitalize }}
                    </p>
                    <p class="subtitle">{{ user.displayName }}</p>
                </div>
            </section>
        </section>

        <section v-else class="hero is-small is-link">
            <div class="hero-body">
                <img
                    @click="$router.push('/settings')"
                    src="https://via.placeholder.com/1200/00897b"
                    alt
                    class="header__thumb-lg rounded-circle"
                />
                <p class="subtitle">{{ user.displayName }}</p>
            </div>
        </section>

        <!-- IF PROFILE EXISTS END -->

        <!-- IF PROFILE DOESN'T EXISTS -->

        <!-- IF PROFILE DOESN'T EXISTS END -->

        <!-- <div
            v-if="storeProfile !== null && Object.keys(storeProfile).length > 1"
            class="parallax"
        >
            <v-parallax
                class="rounded-xl"
                height="300"
                v-if="storeProfile.storeBanner !== ''"
                :src="storeProfile.storeBanner"
            >
                <div class="header__profile-image">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <div class="float-left mr-3">
                                <img
                                    v-if="storeProfile.storeLogo !== ''"
                                    @click="$router.push('/settings')"
                                    :src="storeProfile.storeLogo"
                                    alt
                                    class="header__thumb-lg rounded-circle"
                                    v-bind="attrs"
                                    v-on="on"
                                />
                                <img
                                    v-else
                                    @click="$router.push('/settings')"
                                    :src="defaultStoreLogo"
                                    alt
                                    class="header__thumb-lg rounded-circle"
                                    v-bind="attrs"
                                    v-on="on"
                                />
                            </div>
                        </template>
                        <span>Settings</span>
                    </v-tooltip>

                    <div class="header__titles">
                        <h4>
                            {{ storeProfile.storeName | capitalize }}
                        </h4>
                        <p class="header__subtitle">
                            {{ user.displayName }}
                        </p>
                    </div>
                </div>
            </v-parallax>

            <v-parallax
                v-else
                class="rounded-xl"
                height="300"
                :src="defaultStoreBanner"
            >
                <div class="bg-center">
                    <div class="header__profile-image">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <div class="float-left mr-3">
                                    <img
                                        v-if="storeProfile.storeLogo !== ''"
                                        @click="$router.push('/settings')"
                                        :src="storeProfile.storeLogo"
                                        alt
                                        class="header__thumb-lg rounded-circle"
                                        v-bind="attrs"
                                        v-on="on"
                                    />
                                    <img
                                        v-else
                                        @click="$router.push('/settings')"
                                        :src="defaultStoreLogo"
                                        alt
                                        class="header__thumb-lg rounded-circle"
                                        v-bind="attrs"
                                        v-on="on"
                                    />
                                </div>
                            </template>
                            <span>Settings</span>
                        </v-tooltip>

                        <div class="header__titles">
                            <h4 class="mt-1 mb-1 font-18">
                                {{ storeProfile.storeName | capitalize }}
                            </h4>
                            <p class="header__subtitle">
                                {{ user.displayName }}
                            </p>
                        </div>
                    </div>
                </div>
            </v-parallax>
        </div> -->
        <!-- IF PROFILE EXISTS -->

        <!-- IF PROFILE DOESN'T EXISTS -->
        <!-- <div v-else class="parallax">
            <v-parallax
                class="rounded-xl"
                height="300"
                src="https://via.placeholder.com/1200"
            >
                <div class="bg-center">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span class="float-left mr-3">
                                <img
                                    @click="$router.push('/settings')"
                                    src="https://via.placeholder.com/1200/00897b"
                                    alt
                                    class="header__thumb-lg rounded-circle"
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
            </v-parallax>
        </div> -->
        <!-- IF PROFILE DOESN'T EXISTS -->
    </div>
    <!-- Header End-->
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { mapState } from 'vuex';

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
        ...mapState({
            dashboardStore: 'dashboard'
        }),
        userData() {
            return this.dashboardStore.userData;
        },
        storeProfile() {
            if (
                // if the state is undfined or the object does not exist, return null
                this.userData.length <= 0 ||
                !this.userData[0].storeProfile
            ) {
                return null;
            } else {
                // Run this if storeOwnerImage exists but the rest of the storeProfile data doesn't exist yet
                const initialData = this.userData[0].storeProfile;
                // Remove storeOwnerImage from object so that the header evaluation logic can pass
                let blackListKeys = ['storeOwnerImage'];
                let filteredData = {};
                for (let k in initialData) {
                    if (blackListKeys.indexOf(k) === -1)
                        filteredData[k] = initialData[k];
                }
                return filteredData;
            }
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.user = user;
            }
        });
    }
};
</script>

<style lang="scss" scoped>
.header {
    &__bg {
        border-radius: 24px;
    }
}
</style>
