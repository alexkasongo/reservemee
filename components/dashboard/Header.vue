<template>
    <!-- Header -->
    <div class="header">
        <client-only>
            <section
                v-if="
                    storeProfile !== null &&
                    Object.keys(storeProfile).length > 1
                "
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
                        <h1 class="title">
                            {{ storeProfile.storeName | capitalize }}
                        </h1>
                        <h2 class="subtitle">{{ user.displayName }}</h2>
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
                        <h1 class="title">
                            {{ storeProfile.storeName | capitalize }}
                        </h1>
                        <h2 class="subtitle">{{ user.displayName }}</h2>
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
                    <h2 class="subtitle">{{ user.displayName }}</h2>
                </div>
            </section>
        </client-only>
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
// .header {
//     &__bg {
//         border-radius: 24px;
//     }
// }
</style>
