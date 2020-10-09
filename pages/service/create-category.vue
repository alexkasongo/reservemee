<template>
    <div class="container mt-3">
        <div class="row justify-content-md-center">
            <!-- Create Category + description here -->
            <div class="col col-lg-6">
                <form @submit.prevent="onSubmit" class="mt-3 mb-4">
                    <div class="form-group">
                        <label for="exampleFormControlFile1"
                            >Create New Category</label
                        >
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
                            style="min-width: 100%"
                            placeholder="Describe the service"
                            v-model="description"
                        ></textarea>
                    </div>
                    <v-btn
                        type="submit"
                        :disabled="loading"
                        class="teal darker-1 mt-2"
                        dark
                    >
                        Create
                    </v-btn>
                </form>
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
            description: '',
            multiLine: true,
            text: 'New category created.'
        };
    },
    computed: {
        ...mapGetters({
            categories: 'categories',
            user: 'user'
        }),
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        ...mapActions(['createCategory', 'loadCategories', 'deleteCategory']),
        showAlert() {
            // Use sweetalert2
            this.$swal({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Successful',
                showConfirmButton: false,
                timer: 2500
            });
        },
        async onSubmit(event) {
            // category with dashes
            let res = this.category.replace(/\s+/g, '-').toLowerCase();

            let data = {
                category: res,
                description: this.description,
                userId: this.user.uid
            };
            await this.createCategory(data);
            this.$router.push('/dashboard');
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
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteCategory(payload);
                    this.loadCategories(this.user.uid);
                    this.$swal(
                        'Deleted!',
                        'Category has been Deleted.',
                        'success'
                    );
                }
            });
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
