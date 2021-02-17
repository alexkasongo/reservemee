<template>
    <div class="container">
        <div>
            <h1 class="title">Update Service</h1>
            <h2 class="subtitle">Update the service</h2>

            <!-- Beaufy -->
            <section>
                <b-field label="Category">
                    <b-select
                        placeholder="Select a category"
                        :v-model="category"
                        expanded
                        required
                        validation-message="Only lowercase is allowed"
                    >
                        <option
                            v-for="(category, id) in categoryNames"
                            :key="id"
                            :value="category"
                        >
                            {{ category }}
                        </option>
                    </b-select>
                </b-field>

                <b-field label="Name">
                    <b-input v-model="name"></b-input>
                </b-field>

                <b-field label="Description">
                    <b-input
                        v-model="description"
                        maxlength="200"
                        type="textarea"
                    ></b-input>
                </b-field>

                <b-field label="Image upload">
                    <div class="file has-name is-fullwidth">
                        <label class="file-label">
                            <input
                                class="file-input"
                                type="file"
                                name="resume"
                                @change="
                                    onUploadServiceImage($event.target.files[0])
                                "
                                accept="image/*"
                                ref="fileInputOne"
                            />
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label"> Choose a file… </span>
                            </span>
                            <span class="file-name">
                                {{ previewImgName }}
                            </span>
                        </label>
                    </div>
                </b-field>

                <b-field>
                    <div
                        class="form-group imgPreview"
                        v-bind:style="{
                            'background-image': 'url(' + serviceImage + ')',
                            display: serviceImageDisplay
                        }"
                    ></div>
                </b-field>

                <b-field>
                    <b-button
                        label="Update"
                        aria-label="Update"
                        class="is-primary"
                        :loading="loading"
                        @click="onSubmit"
                    >
                        Update
                    </b-button>
                </b-field>
            </section>
            <!-- Beaufy End -->
        </div>
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
            rawServiceImage: null,
            categoryNames: [],
            previewImgName: '' || 'no image uploaded',
            errors: []
        };
    },
    computed: {
        ...mapState({
            dashboardState: 'dashboard'
        }),
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
        },
        loadfilteredService() {
            this.filteredService(this.$route.params.id);
        },
        // UPLOAD IMAGE
        onUploadServiceImage(event) {
            this.previewImgName = event.name;
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
    async mounted() {
        /*
         ** Pre-populate form
         */
        this.category = this.titleCase;
        this.name = this.serviceUpdateInfo.name;
        this.description = this.serviceUpdateInfo.description;
        this.price = this.serviceUpdateInfo.price;
        this.serviceImage = this.serviceUpdateInfo.serviceImage;

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
