<template>
    <div class="container mt-3">
        <div v-if="loading" class="col-md-6 mt-2">
            <p>loading...</p>
        </div>
        <!-- Create Category + description here -->
        <form @submit.prevent="onSubmit" class="mt-3 mb-4">
            <div class="form-group">
                <label for="exampleFormControlFile1">Create New Category</label>
                <input
                    type="text"
                    class="form-control"
                    name="category"
                    label="Category"
                    placeholder="Category name"
                    v-model="category"
                    required
                />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Description</label>
                <textarea
                    required
                    class="form-control"
                    style="min-width: 100%;"
                    placeholder="Describe the service"
                    v-model="description"
                ></textarea>
            </div>
            <button type="submit" :disabled="loading" class="btn btn-primary mt-2">Create</button>
        </form>
        <!-- Display Categories if they exist here -->
        <div v-if="categories.length > 0" class="d-flex justify-content-start">
            <div class="w-100">
                <div class="card">
                    <div class="card-header">
                        <h3>Categories</h3>
                    </div>
                    <ul
                        v-for="category in categories"
                        :key="category.id"
                        class="list-group list-group-flush"
                    >
                        <li
                            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <p>{{ category.name | capitalize }}</p>
                                <p>{{ category.description }}</p>
                            </div>
                            <div class="editBtns mb-2">
                                <a href="#" @click="updCategory(category.id)" class="text-dark">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </a>
                                <a href="#" @click="removeCategory(category.id)" class="text-dark">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <small
                    id="fullNameHelp"
                    class="form-text text-muted mt-2"
                >Note that deleting a category deletes all serivices in that category.</small>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            category: '',
            description: ''
        };
    },
    computed: {
        ...mapGetters({
            categories: 'categories',
            userId: 'userId',
            user: 'user'
        }),
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        ...mapActions(['createCategory', 'loadCategories', 'deleteCategory']),
        onSubmit(event) {
            // category with dashes
            let res = this.category.replace(/\s+/g, '-').toLowerCase();

            let data = {
                category: res,
                description: this.description,
                userId: this.userId
            };
            this.createCategory(data);
            // this.loadCategories();
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
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
.editBtns {
    display: flex;
    width: 50px;
    justify-content: space-between;
}
</style>