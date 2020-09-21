<template>
    <!-- ManageServices -->
    <div class="row">
        <div class="col-md-12">
            <div class="card-manage services">
                <div class="card-body">
                    <h5 class="card-title text-uppercase mb-0">Manage Services</h5>
                </div>
                <div class="table-responsive">
                    <table class="table no-wrap user-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col" class="border-0 text-uppercase font-medium pl-4">#</th>
                                <th scope="col" class="border-0 text-uppercase font-medium">Category</th>
                                <th
                                    scope="col"
                                    class="border-0 text-uppercase font-medium"
                                >Description</th>
                                <th scope="col" class="border-0 text-uppercase font-medium">Services</th>
                                <th scope="col" class="border-0 text-uppercase font-medium">Manage</th>
                            </tr>
                        </thead>
                        <tbody v-for="category in categories" :key="category.id">
                            <tr>
                                <td class="pl-4">1</td>
                                <td style="vertical-align:middle">
                                    <p class="m-0">{{ category.name }}</p>
                                    <!-- <span class="text-muted">Texas, United states</span> -->
                                </td>
                                <td style="vertical-align:middle">
                                    <span
                                        class="text-muted"
                                    >{{category.description | truncate(20, '...')}}</span>
                                    <!-- <br />
                                    <span class="text-muted">Past : teacher</span>-->
                                </td>
                                <td style="vertical-align:middle">
                                    <button
                                        @click="goToService(category.name)"
                                        type="button"
                                        class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                                    >View Services</button>
                                </td>
                                <td>
                                    <button
                                        @click="updCategory(category.id)"
                                        type="button"
                                        class="btn btn-outline-dark btn-circle btn-lg btn-circle ml-2"
                                    >
                                        <i class="fa fa-pencil"></i>
                                    </button>
                                    <button
                                        @click="removeCategory(category.id)"
                                        type="button"
                                        class="btn btn-outline-dark btn-circle btn-lg btn-circle ml-2"
                                    >
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-if="categories.length > 0" class="d-flex justify-content-start mt-3">
                <div class="w-100">
                    <div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
                        <label class="btn btn-success" @click="onCreateCategory">
                            <input type="radio" name="options" id="option2" autocomplete="off" /> Create Category
                        </label>
                        <label class="btn btn-secondary" @click="onCreateService">
                            <input type="radio" name="options" id="option3" autocomplete="off" /> Create Service
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ManageServices -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ManageServices',
    computed: {
        ...mapGetters({
            services: 'services',
            categories: 'categories',
            user: 'user'
        }),
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        ...mapActions(['createCategory', 'loadCategories', 'deleteCategory']),
        onCreateService() {
            this.$router.push('/service/create-service');
        },
        onCreateCategory() {
            this.$router.push('/service/create-category');
        },
        goToService(service) {
            this.$router.push({
                name: 'service-id',
                params: {
                    id: service
                }
            });
        },
        updCategory(id) {
            this.$router.push({
                name: 'update-category-id',
                params: {
                    id: id
                }
            });
        },
        removeCategory(id) {
            const payload = {
                userId: this.user.uid,
                id: id
            };
            this.deleteCategory(payload);
            this.loadCategories(this.user.uid);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>