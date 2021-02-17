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
            <b-button
                label="Create New Service"
                aria-label="Create new service"
                @click="onCreate"
                class="is-primary"
            >
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
