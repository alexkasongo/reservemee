<template>
    <div class="container">
        <div v-if="loading" class="col-md-6 mt-2">
            <p>loading...</p>
        </div>
        <h3>Update Service</h3>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="exampleInputEmail1">Select Category</label>
                <select class="form-control" required v-model="category">
                    <option
                        v-for="category in categories"
                        :key="category.id"
                    >{{ category.name | capitalize }}</option>
                </select>
            </div>
            <div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Name</label>
                    <input
                        required
                        type="name"
                        class="form-control"
                        placeholder="Service Name"
                        v-model="name"
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
                <button type="submit" :disabled="loading" class="btn btn-primary mt-2">Update</button>
            </div>
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
            price: '',
            imageUrl: ''
        };
    },
    computed: {
        ...mapGetters({
            categories: 'categories',
            services: 'services',
            updateId: 'updateId',
            user: 'user'
        }),
        loading() {
            return this.$store.getters.loading;
        },
        titleCase() {
            let formatted = this.updateId.category;

            let removedHyphen = formatted.replace(/-/g, ' ');
            var splitStr = removedHyphen.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] =
                    splitStr[i].charAt(0).toUpperCase() +
                    splitStr[i].substring(1);
            }
            return splitStr.join(' ');
        }
    },
    methods: {
        ...mapActions([
            'createService',
            'updateService',
            'updateData',
            'loadServices',
            'loadUserId'
        ]),
        onSubmit() {
            let res = this.category.replace(/\s+/g, '-').toLowerCase();

            let data = {
                userId: this.user.uid,
                id: this.$route.params.id,
                category: res,
                name: this.name,
                description: this.description,
                imageUrl: this.imageUrl,
                price: this.price
            };

            this.updateService(data);
            this.loadServices(this.user.uid);
            this.$router.push(`/service/${res}`);
        },
        loadUpdateData() {
            this.updateData(this.$route.params.id);
        }
    },
    mounted() {
        //FIXME without the if() we get error on update page reload
        //NOTE issue seems to be coming from store updateId getter. Possible fix
        // could be creating a filtered getter that filters through services using
        // uid.
        if (this.updateId === undefined) {
            this.$router.back();
        } else {
            this.loadUpdateData();
            this.loadServices();
            this.category = this.titleCase;
            this.name = this.updateId.name;
            this.description = this.updateId.description;
            this.price = this.updateId.price;
            this.imageUrl = this.updateId.imageUrl;
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