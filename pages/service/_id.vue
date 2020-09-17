<template>
    <div class="container">
        <div v-if="loading" class="col-md-6 mt-2">
            <p>loading...</p>
        </div>
        <!-- <div v-if="this.$route.params.id === 'classic-nail-polish'">{{ this.$route.params }}</div> -->
        <div class="px-lg-0 mt-3">
            <div class="pb-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 pt-3 bg-white rounded shadow-sm">
                            <!-- Shopping cart table -->
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="border-0 bg-light">
                                                <div
                                                    class="p-2 px-3 text-uppercase"
                                                >{{ formattedCategory }}</div>
                                            </th>
                                            <th scope="col" class="border-0 bg-light">
                                                <div class="py-2 text-uppercase text-right">Price</div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody
                                        v-for="service in filteredServices"
                                        :key="service.id"
                                        class="tbody"
                                    >
                                        <tr>
                                            <th scope="row" class="border-0">
                                                <div class="p-2">
                                                    <img
                                                        :src="service.imageUrl"
                                                        alt
                                                        width="70"
                                                        class="img-fluid rounded shadow-sm"
                                                    />
                                                    <div class="d-inline-block align-middle mt-2">
                                                        <h5 class="mb-0">
                                                            <a
                                                                href="#"
                                                                class="text-dark d-inline-block align-middle"
                                                            >{{ service.name }}</a>
                                                        </h5>
                                                        <span
                                                            class="text-muted font-weight-normal font-italic d-block"
                                                        >{{ service.description }}</span>
                                                    </div>
                                                </div>
                                            </th>
                                            <td class="border-0 align-middle">
                                                <strong>${{ service.price }}.00</strong>
                                            </td>
                                        </tr>
                                        <div class="editBtns mb-2">
                                            <a
                                                href="#"
                                                @click="updService(service.id)"
                                                class="text-dark"
                                            >
                                                <i class="fa fa-pencil" aria-hidden="true"></i>
                                            </a>
                                            <a
                                                href="#"
                                                @click="removeService(service.id)"
                                                class="text-dark"
                                            >
                                                <i class="fa fa-trash"></i>
                                            </a>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                            <!-- End -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <button
                @click="onCreate"
                type="button"
                class="btn btn-primary btn-block"
            >Create New Service</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            services: 'services',
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
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        ...mapActions(['loadUserId']),
        onCreate() {
            this.$router.push('/service/create-service');
        },
        ...mapActions(['deleteService', 'updateData', 'loadServices']),
        removeService(id) {
            const data = {
                userId: this.userId,
                serviceId: id
            };

            this.deleteService(data);
            this.loadServices(this.userId);
        },
        updService(id) {
            this.updateData(id);
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

<style scoped>
.tbody {
    position: relative;
}
.editBtns {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60px;
    display: flex;
    justify-content: space-between;
}
</style>