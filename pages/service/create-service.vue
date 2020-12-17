<template>
    <div class="container margin">
        <div class="display-1 p-3">Create Service</div>
        <v-card>
            <div class="p-3">
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Select Category</label>
                        <v-select
                            :items="categoryNames"
                            required
                            v-model="category"
                        >
                            <!-- <option v-for="category in categories" :key="category.id"> -->
                            {{ categoryNames }}
                            <!-- </option> -->
                        </v-select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Name</label>
                        <v-text-field
                            required
                            type="name"
                            id="exampleFormControlInput1"
                            placeholder="Service Name"
                            v-model="name"
                        ></v-text-field>
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
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Picture</label>
                            <v-file-input
                                type="file"
                                color="teal accent-4"
                                @change="onUploadServiceImage"
                                label="Upload profile image"
                                outlined
                                truncate-length="50"
                                prepend-icon="mdi-camera"
                                dense
                                accept="image/*"
                                ref="fileInputOne"
                            >
                                <template v-slot:selection="{ text }">
                                    <v-chip
                                        small
                                        label
                                        dark
                                        color="teal darken-1"
                                    >
                                        {{ text }}
                                    </v-chip>
                                </template>
                            </v-file-input>
                        </div>
                        <div
                            class="form-group imgPreview"
                            v-bind:style="{
                                'background-image': 'url(' + serviceImage + ')',
                                display: serviceImageDisplay
                            }"
                        ></div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Price</label>
                        <v-text-field
                            required
                            type="number"
                            min="1"
                            step="any"
                            placeholder="50"
                            v-model="price"
                        ></v-text-field>
                    </div>
                    <v-btn
                        :loading="loading"
                        class="teal darken-1"
                        dark
                        type="submit"
                        >Create</v-btn
                    >
                </form>
            </div>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            name: '',
            image: '',
            price: '',
            category: '',
            description: '',
            serviceImage: '',
            serviceImageDisplay: '',
            rawServiceImage: null,
            categoryNames: []
        };
    },
    computed: {
        ...mapGetters({
            categories: 'dashboard/categories',
            loading: 'loaders/loading',
            userId: 'userId'
        })
    },
    methods: {
        ...mapActions({
            createService: 'dashboard/createService'
        }),
        onSubmit() {
            // category with dashes
            let routeName = this.category.replace(/\s+/g, '-').toLowerCase();
            let imageName = this.name.replace(/\s+/g, '').toLowerCase();

            let data = {
                userId: this.userId,
                category: routeName,
                name: this.name,
                serviceImageName: imageName,
                description: this.description,
                serviceImage: this.serviceImage,
                rawServiceImage: this.rawServiceImage,
                price: this.price
            };
            this.createService(data);
            // this.$router.push(`/service/${res}`);
        },
        // UPLOAD IMAGE
        onUploadServiceImage(event) {
            // if a file is inserted or a logo exists then show it
            if (event || this.storeLogo) {
                this.serviceImageDisplay = 'block';
            }

            //  if no image then do this
            if (event === undefined) {
                this.serviceImageDisplay = 'none';
                return;
            }
            const files = event;
            let filename = files.name;
            // check if the file doesn't have an extension
            if (filename.lastIndexOf('.') <= 0) {
                return alert('Please add a valid file!');
            }
            // turn file into base64 string which can be used to upload
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.serviceImage = fileReader.result;
            });
            fileReader.readAsDataURL(files);
            // raw file to be used on form submit
            this.rawServiceImage = files;
        }
        // UPLOAD IMAGE END
    },
    mounted() {
        // If serviceImageDisplay state is empty, run this
        this.serviceImageDisplay = 'none';

        // this.categoryNames = new Array(this.categories.name);

        for (let key in this.categories) {
            this.categoryNames.push(this.categories[key].name);
        }
    }
};
</script>

<style scoped>
.imgPreview {
    height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
</style>
