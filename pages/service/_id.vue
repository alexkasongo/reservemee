<template>
    <div class="services container">
        <div v-if="loading">
            <p>loading...</p>
        </div>
        <h1 class="title" v-if="!loading">
            {{ this.$route.params.id | capitalize }} Services
        </h1>
        <h2 class="subtitle">View, edit and create services</h2>

        <!-- SERVICE CARD -->
        <!-- <v-row class="services__left pt-5">
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
        </v-row> -->

        <!-- Beufy -->
        <section>
            <div v-for="service in filteredServices" :key="service.id">
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img
                                        :src="service.serviceImage"
                                        alt="Placeholder image"
                                    />
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">{{ service.name }}</p>
                            </div>
                        </div>

                        <div class="content">
                            <div class="columns">
                                <div class="column">
                                    {{ service.description }}
                                </div>
                                <div class="column">
                                    <div
                                        class="block is-flex is-justify-content-flex-end"
                                    >
                                        <div>
                                            <b-icon
                                                style="cursor: pointer"
                                                icon="heart"
                                            ></b-icon>
                                            <span
                                                @click="updService(service.id)"
                                            >
                                                <b-icon
                                                    style="cursor: pointer"
                                                    icon="pencil"
                                                ></b-icon>
                                            </span>
                                            <span
                                                @click="
                                                    removeService(service.id)
                                                "
                                            >
                                                <b-icon
                                                    style="cursor: pointer"
                                                    icon="delete"
                                                ></b-icon>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Beufy End -->
        <!-- SERVICE CARD END-->
        <div class="buttons">
            <b-button @click="onCreate" class="is-primary">
                Create New Service
            </b-button>
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
