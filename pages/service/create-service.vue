<template>
    <div class="container">
        <h1 class="title">Create Service</h1>
        <h2 class="subtitle">Create new service</h2>

        <!-- Beaufy -->
        <section>
            <b-field label="Expanded">
                <b-select
                    placeholder="Select a character"
                    v-model="category"
                    expanded
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
                    class="is-primary"
                    :loading="loading"
                    @click="onSubmit"
                >
                    Create
                </b-button>
            </b-field>
        </section>
        <!-- Beaufy End -->
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
            categoryNames: [],
            previewImgName: '' || 'no image selected'
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
