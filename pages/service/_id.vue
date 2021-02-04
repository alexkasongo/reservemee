<template>
    <div class="services container">
        <div v-if="loading">
            <p>loading...</p>
        </div>
        <div class="display-1" v-if="!loading">
            {{ this.$route.params.id | capitalize }} Services
        </div>

        <!-- SERVICE CARD -->
        <v-row class="services__left pt-5">
            <v-col
                v-for="service in filteredServices"
                :key="service.id"
                class="col-md-6"
            >
                <div class="rounded-xl" :ripple="false">
                    <div
                        class="services__left-card d-flex flex-no-wrap justify-space-between"
                    >
                        <div class="services__left-card-img-container">
                            <img
                                class="services__left-service-img"
                                :src="service.serviceImage"
                                alt=""
                            />
                        </div>
                        <div class="services__left-card-info">
                            <div-title
                                class="headline"
                                v-text="service.name"
                            ></div-title>

                            <div v-text="service.description"></div>

                            <div-text
                                class="display-1 text--primary services__left-card-price"
                            >
                                ${{ service.price }}
                            </div-text>
                            <div>
                                <div
                                    :class="fav ? 'red--text' : ''"
                                    icon
                                    @click="fav = !fav"
                                >
                                    <v-icon>mdi-heart</v-icon>
                                </div>

                                <div @click="updService(service.id)" icon>
                                    <v-icon>mdi-pencil-box</v-icon>
                                </div>

                                <div @click="removeService(service.id)" icon>
                                    <v-icon>mdi-delete</v-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
        <!-- SERVICE CARD END-->
        <div class="col-md-6">
            <div @click="onCreate" type="button" color="teal darken-1" dark>
                Create New Service
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        fav: false
    }),
    computed: {
        ...mapGetters({
            services: 'dashboard/services',
            loading: 'loaders/loading',
            userId: 'userId'
        }),
        filteredServices() {
            return this.services.filter((res) => {
                return res.category === this.$route.params.id;
            });
        },
        formattedCategory() {
            let category = this.$route.params.id;
            let formattedCategory = category.replace(/-/g, ' ');
            return formattedCategory;
        }
    },
    methods: {
        ...mapActions(['loadUserId']),
        onCreate() {
            this.$router.push('/service/create-service');
        },
        ...mapActions({
            deleteService: 'dashboard/deleteService',
            updateServiceId: 'dashboard/updateServiceId',
            loadServices: 'dashboard/loadServices'
        }),
        removeService(id) {
            const data = {
                userId: this.userId,
                serviceId: id
            };

            this.deleteService(data);
            this.loadServices(this.userId);
        },
        updService(id) {
            this.updateServiceId(id);
            this.$router.push({
                name: 'update-service-id',
                params: {
                    id: id
                }
            });
        }
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
.tbody {
    position: relative;
}
.fa-pencil {
    margin: 0 10px 0 0;
}
</style>
