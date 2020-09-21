<template>
    <div class="w-100">
        <p>Update category {{ this.$route.params.id }}</p>
        <!-- Update Category + description here -->
        <form @submit.prevent="onSubmit" class="mt-3 mb-4">
            <div class="form-group">
                <label for="exampleFormControlFile1">Update Category</label>
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
            <button type="submit" :disabled="loading" class="btn btn-primary mt-2">Update</button>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            category: '',
            description: ''
        };
    },
    computed: {
        ...mapGetters({
            categories: 'categories'
        }),
        loading() {
            return this.$store.getters.loading;
        },
        filteredCategories() {
            const data = this.categories.filter((res) => {
                return res.id === this.$route.params.id;
                // return res;
            });

            return data[0];
        }
    },
    mounted() {
        this.category = this.filteredCategories.name;
        this.description = this.filteredCategories.description;
        console.log(`_id.vue - 61 - 🏝`, this.filteredCategories);
    }
};
</script>

<style>
</style>