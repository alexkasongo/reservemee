<template>
    <!-- BusinessInfo -->
    <div class="content is-normal">
        <client-only>
            <div v-if="storeProfile !== null" class="panel-body">
                <b-notification
                    type="is-primary"
                    style="cursor: pointer"
                    :closable="false"
                >
                    {{
                        storeProfile.storeBio | truncate(100, '...')
                    }}</b-notification
                >

                <div class="mt-5">
                    <b-notification :closable="false">
                        <p>
                            <strong>Store Name :</strong>
                            <span class="m-l-15">{{
                                storeProfile.storeName | capitalize
                            }}</span>
                        </p>
                        <p>
                            <strong>Mobile :</strong>
                            <span class="m-l-15">{{
                                storeProfile.storePhoneNumber
                            }}</span>
                        </p>
                        <p>
                            <strong>Email :</strong>
                            <span class="m-l-15">{{
                                storeProfile.storeEmail
                            }}</span>
                        </p>
                        <p>
                            <strong>Location :</strong>
                            <span class="m-l-15">{{
                                storeProfile.storeLocation
                            }}</span>
                        </p>
                        <!-- Services start -->
                        <div v-if="this.storeProfile">
                            <div v-if="beauty !== null">
                                <b-taglist>
                                    <div
                                        v-for="service in beauty"
                                        :key="service.name"
                                    >
                                        <b-tag
                                            class="ml-1 mr-1"
                                            type="is-link is-light"
                                            >{{ service }}</b-tag
                                        >
                                    </div>
                                </b-taglist>
                                <b-taglist>
                                    <div
                                        v-for="service in wellness"
                                        :key="service.name"
                                    >
                                        <b-tag
                                            class="ml-1 mr-1"
                                            type="is-link is-light"
                                            >{{ service }}</b-tag
                                        >
                                    </div>
                                </b-taglist>
                                <b-taglist>
                                    <div
                                        v-for="service in fitness"
                                        :key="service.name"
                                    >
                                        <b-tag
                                            class="mr-1"
                                            type="is-link is-light"
                                            >{{ service }}</b-tag
                                        >
                                    </div>
                                </b-taglist>
                            </div>
                        </div>
                    </b-notification>
                </div>
                <!-- Services end -->
                <!-- Social media card start -->
                <section>
                    <h5
                        class="title is-5 m-0"
                        v-if="
                            storeProfile.facebook ||
                            storeProfile.instagram ||
                            storeProfile.twitter
                        "
                    >
                        <!-- {{ storeProfile.storeName | capitalize }} -->
                        Socials
                    </h5>

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
                                        <b-icon icon="pencil" size="is-small">
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
                        <a
                            :href="storeProfile.facebook"
                            rel="noopener"
                            target="_blank"
                        >
                            <b-icon
                                icon="facebook"
                                v-if="storeProfile.facebook"
                            >
                                <div icon>
                                    <v-icon>mdi-facebook</v-icon>
                                </div>
                            </b-icon>
                        </a>
                        <a
                            :href="storeProfile.instagram"
                            rel="noopener"
                            target="_blank"
                        >
                            <b-icon
                                icon="instagram"
                                v-if="storeProfile.instagram"
                            >
                                <div icon>
                                    <v-icon>mdi-instagram</v-icon>
                                </div>
                            </b-icon>
                        </a>
                        <a
                            :href="storeProfile.twitter"
                            rel="noopener"
                            target="_blank"
                        >
                            <b-icon icon="twitter" v-if="storeProfile.twitter">
                                <div icon>
                                    <v-icon>mdi-twitter</v-icon>
                                </div>
                            </b-icon>
                        </a>
                    </section>
                </section>

                <!-- Social media card end -->
            </div>
            <div v-else>
                <div
                    style="cursor: pointer"
                    @click="goToSettings"
                    icon="mdi-alert-circle-outline"
                    text
                    type="info"
                >
                    Update Store Information
                </div>
            </div>
        </client-only>
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
