<template>
    <!-- BusinessInfo -->
    <div>
        <div v-if="storeProfile !== null" class="panel-body">
            <p class="text-muted font-13">{{ storeProfile.storeBio }}</p>

            <v-divider></v-divider>

            <div class="mt-5 mb-5">
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
                <!-- Services start -->
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
            <!-- Services end -->
            <!-- Social media card start -->
            <div v-if="this.storeProfile"></div>
            <v-card class="mx-auto" color="teal darker-1" elevation="0" dark>
                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                            <v-img
                                class="elevation-6"
                                alt=""
                                src="https://via.placeholder.com/150"
                            ></v-img>
                            <!-- <v-img
                                class="elevation-6"
                                alt=""
                                :src="storeProfile.storeOwnerImage"
                            ></v-img> -->
                        </v-list-item-avatar>

                        <v-list-item-content
                            v-if="
                                storeProfile.facebook ||
                                storeProfile.instagram ||
                                storeProfile.twitter
                            "
                        >
                            <v-list-item-title>{{
                                storeProfile.storeName | capitalize
                            }}</v-list-item-title>
                        </v-list-item-content>

                        <section class="b-tooltips">
                            <b-tooltip
                                position="is-bottom"
                                multilined
                                style="width: 100%"
                            >
                                <div @click="$router.push('/settings')">
                                    <b-notification
                                        type="is-primary"
                                        style="cursor: pointer"
                                        :closable="false"
                                        v-if="
                                            !storeProfile.facebook &&
                                            !storeProfile.instagram &&
                                            !storeProfile.twitter
                                        "
                                    >
                                        <div
                                            class="is-flex is-justify-content-space-between"
                                        >
                                            <p class="m-0">Social Card</p>
                                            <b-icon
                                                icon="pencil"
                                                size="is-small"
                                            >
                                            </b-icon>
                                        </div>
                                    </b-notification>
                                </div>
                                <template v-slot:content>
                                    Click on this notification to add social
                                    handles.
                                </template>
                            </b-tooltip>
                        </section>

                        <section>
                            <a :href="storeProfile.facebook" target="_blank">
                                <b-icon
                                    icon="facebook"
                                    v-if="storeProfile.facebook"
                                >
                                    <v-btn icon>
                                        <v-icon>mdi-facebook</v-icon>
                                    </v-btn>
                                </b-icon>
                            </a>
                            <a :href="storeProfile.instagram" target="_blank">
                                <b-icon
                                    icon="instagram"
                                    v-if="storeProfile.instagram"
                                >
                                    <v-btn icon>
                                        <v-icon>mdi-instagram</v-icon>
                                    </v-btn>
                                </b-icon>
                            </a>
                            <a :href="storeProfile.twitter" target="_blank">
                                <b-icon
                                    icon="twitter"
                                    v-if="storeProfile.twitter"
                                >
                                    <v-btn icon>
                                        <v-icon>mdi-twitter</v-icon>
                                    </v-btn>
                                </b-icon>
                            </a>
                        </section>
                    </v-list-item>
                </v-card-actions>
            </v-card>
            <!-- Social media card end -->
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
            this.beauty = this.storeProfile.beauty;
            this.wellness = this.storeProfile.wellness;
            this.fitness = this.storeProfile.fitness;
        }
    }
};
</script>

<style lang="scss" scoped></style>
