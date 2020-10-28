<template>
    <div class="container margin">
        <!-- <div v-if="loading" class="col-md-6 mt-2">
            <p>loading...</p>
        </div> -->
        <h3>Create Service</h3>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="exampleInputEmail1">Select Category</label>
                <select class="form-control" required v-model="category">
                    <option v-for="category in categories" :key="category.id">
                        {{ category.name | capitalize }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Name</label>
                <input
                    required
                    type="name"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Service Name"
                    v-model="name"
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
            <div class="form-group">
                <label for="exampleFormControlFile1">Image</label>
                <input
                    required
                    class="form-control"
                    name="imageUrl"
                    label="Image URL"
                    id="image-url"
                    v-model="imageUrl"
                />
            </div>
            <div
                required
                class="form-group imgPreview"
                v-bind:style="{ 'background-image': 'url(' + imageUrl + ')' }"
            ></div>
            <div class="form-group">
                <label for="exampleInputPassword1">Price</label>
                <input
                    required
                    class="form-control"
                    type="number"
                    min="1"
                    step="any"
                    placeholder="50"
                    v-model="price"
                />
            </div>
            <v-btn class="teal darken-1" dark type="submit" :disabled="loading"
                >Create</v-btn
            >
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            category: '',
            name: '',
            description: '',
            image: '',
            price: '',
            imageUrl: ''
        };
    },
    computed: {
        ...mapGetters({
            categories: 'categories',
            userId: 'userId'
        }),
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        ...mapActions(['createService']),
        onSubmit() {
            // category with dashes
            let res = this.category.replace(/\s+/g, '-').toLowerCase();

            let data = {
                userId: this.userId,
                category: res,
                name: this.name,
                description: this.description,
                imageUrl: this.imageUrl,
                price: this.price
            };
            this.createService(data);
            this.$router.push(`/service/${res}`);
        }
    }
};
</script>

<style scoped>
.imgPreview {
    height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
