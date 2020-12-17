<template>
    <!-- BusinessInfo -->
    <div class="mb-5">
        <div v-if="storeProfile !== null" class="panel-body">
            <p class="text-muted font-13">{{ storeProfile.storeBio }}</p>
            <hr />
            <div class="text-left">
                <p class="text-muted font-13">
                    <strong>Store Name :</strong>
                    <span class="m-l-15">{{
                        storeProfile.storeName | capitalize
                    }}</span>
                </p>
                <p class="text-muted font-13">
                    <strong>Mobile :</strong>
                    <span class="m-l-15">{{
                        storeProfile.storePhoneNumber
                    }}</span>
                </p>
                <p class="text-muted font-13">
                    <strong>Email :</strong>
                    <span class="m-l-15">{{ storeProfile.storeEmail }}</span>
                </p>
                <p class="text-muted font-13">
                    <strong>Location :</strong>
                    <span class="m-l-15">{{ storeProfile.storeLocation }}</span>
                </p>
                <div v-if="this.storeProfile">
                    <p v-if="beauty !== null" class="text-muted font-13">
                        <strong>Services :</strong>
                        <span v-for="service in beauty" :key="service.name">
                            <span class="m-l-5">
                                <span
                                    class="flag-icon flag-icon-us m-r-5"
                                    title="us"
                                ></span>
                                <v-chip class="mb-2">{{ service }}</v-chip>
                            </span>
                        </span>
                        <span v-for="service in wellness" :key="service.name">
                            <span class="m-l-5">
                                <span
                                    class="flag-icon flag-icon-us m-r-5 m-t-0"
                                    title="us"
                                ></span>
                                <v-chip class="mb-2">{{ service }}</v-chip>
                            </span>
                        </span>
                        <span v-for="service in fitness" :key="service.name">
                            <span class="m-l-5">
                                <span
                                    class="flag-icon flag-icon-us m-r-5 m-t-0"
                                    title="us"
                                ></span>
                                <v-chip class="mb-2">{{ service }}</v-chip>
                            </span>
                        </span>
                    </p>
                </div>
            </div>
            <v-card class="mx-auto" color="#26c6da" dark max-width="400">
                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                            <v-img
                                class="elevation-6"
                                alt=""
                                :src="storeProfile.storeOwnerImage"
                            ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{
                                storeProfile.storeName | capitalize
                            }}</v-list-item-title>
                        </v-list-item-content>

                        <v-row align="center" justify="end">
                            <v-btn
                                @click="$route.push(`${storeProfile.facebook}`)"
                                icon
                            >
                                <v-icon>mdi-facebook</v-icon>
                            </v-btn>

                            <v-btn icon>
                                <v-icon>mdi-instagram</v-icon>
                            </v-btn>

                            <v-btn icon>
                                <v-icon>mdi-twitter</v-icon>
                            </v-btn>
                        </v-row>
                    </v-list-item>
                </v-card-actions>
            </v-card>
            <!-- <ul class="social-links list-inline mt-4 mb-0">
                <li class="list-inline-item">
                    <a
                        title
                        data-placement="top"
                        data-toggle="tooltip"
                        class="tooltips"
                        href
                        data-original-title="Facebook"
                    >
                        <i class="fa text-dark fa-facebook"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a
                        title
                        data-placement="top"
                        data-toggle="tooltip"
                        class="tooltips"
                        href
                        data-original-title="Twitter"
                    >
                        <i class="fa text-dark fa-twitter"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a
                        title
                        data-placement="top"
                        data-toggle="tooltip"
                        class="tooltips"
                        href
                        data-original-title="Skype"
                    >
                        <i class="fa text-dark fa-skype"></i>
                    </a>
                </li>
            </ul> -->
        </div>
        <div v-else>
            <v-alert
                style="cursor: pointer"
                @click="goToSettings"
                icon="mdi-alert-circle-outline"
                text
                type="info"
                >Update Store Information</v-alert
            >
        </div>
    </div>
    <!-- BusinessInfo -->
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
    name: 'BusinessInfo',
    data() {
        return {
            services: [
                {
                    name: 'Service1'
                },
                {
                    name: 'Service2'
                },
                {
                    name: 'Service3'
                },
                {
                    name: 'Service4'
                }
            ],
            beauty: [],
            wellness: [],
            fitness: []
        };
    },
    computed: {
        ...mapGetters({
            user: 'user'
        }),
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
                const data = this.userData[0].storeProfile;
                return data;
            }
        }
    },
    methods: {
        goToSettings() {
            this.$router.push(`/profile/${this.user.uid}`);
        }
    },
    mounted() {
        // If storeProfile is null do something
        if (this.storeProfile) {
            console.log(`BusinessInfo.vue - 167 - 🐷`, this.storeProfile);
            this.beauty = this.storeProfile.beauty;
            this.wellness = this.storeProfile.wellness;
            this.fitness = this.storeProfile.fitness;
        }
    }
};
</script>

<style lang="scss" scoped></style>
