<template>
    <div class="w-100">
        <!-- Update Category + description here -->
        <form @submit.prevent="onSubmit" class="mt-3 mb-4">
            <div class="form-group">
                <label for="exampleFormControlFile1">Update Category</label>
                <!-- prefilled text should be capitalized, no dashes -->
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
                    class="form-control"
                    style="min-width: 100%"
                    placeholder="Describe the service"
                    v-model="description"
                ></textarea>
            </div>
            <button
                type="submit"
                :disabled="loading"
                class="btn btn-primary mt-2"
            >
                Update
            </button>
        </form>
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
            loading: 'loaders/loading',
            categories: 'categories',
            user: 'user'
        }),
        filteredCategories() {
            const data = this.categories.filter((res) => {
                return res.id === this.$route.params.id;
                // return res;
            });

            return data[0];
        }
    },
    methods: {
        ...mapActions(['updateCategory', 'loadServices']),
        onSubmit() {
            let categoryName = this.category.replace(/\s+/g, '-').toLowerCase();

            let data = {
                userId: this.user.uid,
                id: this.$route.params.id,
                name: categoryName,
                description: this.description
            };

            this.updateCategory(data);
            this.loadServices(this.user.uid);
        }
    },
    mounted() {
        // REVIEW
        if (process.browser) {
            if (localStorage.getItem('categoryForm')) {
                // get the information in local storage
                let storedForm = JSON.parse(
                    localStorage.getItem('categoryForm')
                );
            } else {
                localStorage.setItem(
                    'categoryForm',
                    JSON.stringify(this.filteredCategories)
                );
            }

            let storedForm = JSON.parse(localStorage.getItem('categoryForm'));

            // set the values in the form. Values should remain in the form on page reload
            this.category = storedForm.name;
            this.description = storedForm.description;
            // if the update form exists in local storage, do nothing
        }
    },
    destroyed() {
        if (process.browser) {
            localStorage.removeItem('categoryForm');
        }
    }
};
</script>

<style></style>
