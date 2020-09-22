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
            user: 'user'
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
            this.$router.push(`/dashboard`);
        }
    },
    mounted() {
        //FIXME without the if() we get error on update page reload
        //NOTE issue seems to be coming from store getter. Possible fix
        // could be creating a filtered getter that filters through services using
        // uid. or storing state in localStorage
        if (this.filteredCategories === undefined) {
            this.$router.back();
        } else {
            this.category = this.filteredCategories.name;
            this.description = this.filteredCategories.description;
            console.log(`_id.vue - 61 - 🏝`, this.filteredCategories);
        }
    }
};
</script>

<style>
</style>