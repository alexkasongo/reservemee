<template>
    <div class="container margin">
        <h3>Update Service</h3>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="exampleInputEmail1">Select Category</label>
                <v-select
                    class="form-control"
                    :items="categories"
                    required
                    v-model="category"
                >
                    {{ categoryNames }}
                </v-select>
            </div>
            <div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Name</label>
                    <v-text-field
                        required
                        type="name"
                        placeholder="Service Name"
                        v-model="name"
                    ></v-text-field>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Description</label>
                    <v-textarea
                        required
                        outlined
                        placeholder="Describe the service"
                        v-model="description"
                    ></v-textarea>
                </div>
                <div class="form-group">
                    <div class="form-group">
                        <label for="exampleFormControlFile1">Picture</label>
                        <v-file-input
                            type="file"
                            color="teal accent-4"
                            @change="updateServiceImage"
                            label="Upload profile image"
                            outlined
                            truncate-length="50"
                            prepend-icon="mdi-camera"
                            dense
                            accept="image/*"
                            ref="fileInputOne"
                        >
                            <template v-slot:selection="{ text }">
                                <v-chip small label dark color="teal darken-1">
                                    {{ text }}
                                </v-chip>
                            </template>
                        </v-file-input>
                    </div>
                </div>
                <div
                    required
                    class="form-group imgPreview"
                    v-bind:style="{
                        'background-image': 'url(' + serviceImage + ')',
                        display: serviceImageDisplay
                    }"
                ></div>
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
                    type="submit"
                    :loading="loading"
                    class="teal darker-1 mt-2"
                    dark
                >
                    Update
                </v-btn>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            category: '',
            name: '',
            description: '',
            price: '',
            serviceImage: '',
            serviceImageDisplay: '',
            rawServiceImage: null
        };
    },
    computed: {
        ...mapGetters({
            filteredService: 'dashboard/filteredService',
            categories: 'dashboard/categories',
            services: 'dashboard/services',
            loading: 'loaders/loading',
            user: 'user'
        }),
        serviceUpdateInfo() {
            const data = this.services;

            const filter = data.filter((res) => {
                return res.id === this.$route.params.id;
            });

            return filter[0];
        },
        titleCase() {
            let formatted = this.serviceUpdateInfo.category;

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
        ...mapActions({
            createService: 'dashboard/createService',
            updateService: 'dashboard/updateService',
            loadServices: 'dashboard/loadServices',
            loadUserId: 'dashboard/loadUserId'
        }),
        onSubmit() {
            // replace spaces with dashes
            let routeName = this.category.replace(/\s+/g, '-').toLowerCase();
            let imageName = this.name.replace(/\s+/g, '-').toLowerCase();

            let data = {
                userId: this.user.uid,
                serviceId: this.$route.params.id,
                id: this.$route.params.id,
                category: routeName,
                name: this.name,
                serviceImageName: imageName,
                description: this.description,
                serviceImage: this.serviceImage,
                rawServiceImage: this.rawServiceImage,
                price: this.price
            };

            this.updateService(data);
            // this.$router.push(`/service/${res}`);
            // this.loadServices(this.user.uid);
        },
        loadfilteredService() {
            this.filteredService(this.$route.params.id);
        },
        // UPLOAD IMAGE
        updateServiceImage(event) {
            // if a file is inserted or a logo exists then show it
            if (event || this.storeLogo) {
                this.serviceImageDisplay = 'block';
            }

            //  if no image then do this
            if (event === undefined) {
                this.serviceImageDisplay = 'none';
                this.serviceImage = '';
                this.rawServiceImage = null;
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
        // this.serviceImageDisplay = 'none';
        /*
         ** Pre-populate form
         */
        this.category = this.titleCase;
        this.name = this.serviceUpdateInfo.name;
        this.description = this.serviceUpdateInfo.description;
        this.price = this.serviceUpdateInfo.price;
        this.serviceImage = this.serviceUpdateInfo.serviceImage;
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
