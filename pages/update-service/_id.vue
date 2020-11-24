<template>
    <div class="container margin">
        <h3>Update Service</h3>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="exampleInputEmail1">Select Category</label>
                <select class="form-control" required v-model="category">
                    <option v-for="category in categories" :key="category.id">
                        {{ category.name | capitalize }}
                    </option>
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
                    v-bind:style="{
                        'background-image': 'url(' + imageUrl + ')'
                    }"
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
                <v-btn
                    type="submit"
                    :disabled="loading"
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
            imageUrl: ''
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
        loadfilteredService() {
            this.filteredService(this.$route.params.id);
        }
    },
    mounted() {
        /*
         ** Pre-populate form
         */
        this.category = this.titleCase;
        this.name = this.serviceUpdateInfo.name;
        this.description = this.serviceUpdateInfo.description;
        this.price = this.serviceUpdateInfo.price;
        this.imageUrl = this.serviceUpdateInfo.imageUrl;

        // if banner does not exist do not disply it's containers
        // let bannerState = null;
        // this.userInfo.forEach((res) => {
        //     if (res.storeProfile === undefined) {
        //         bannerState = null;
        //         return;
        //     }

        //     if (res.storeProfile.storeBanner) {
        //         bannerState = true;
        //     } else {
        //         bannerState = null;
        //     }
        // });

        // // if banner does not exist do not disply their containers
        // if (
        //     (this.storeForm.storeBanner =
        //         '' || this.userData === undefined || bannerState === null)
        // ) {
        //     this.bannerDisplay = 'none';
        // } else {
        //     this.bannerDisplay = 'block';
        // }

        // // if the state is undfined or the object does not exist, return null
        // if (this.userInfo.length <= 0 || !this.userInfo[0].storeProfile) {
        //     return null;
        // } else {
        //     this.storeForm.storeLogo = this.userInfo[0].storeProfile.storeLogo;
        //     this.storeForm.storeBanner = this.userInfo[0].storeProfile.storeBanner;
        //     this.storeForm.storeOwnerImage = this.userInfo[0].storeProfile.storeOwnerImage;
        //     this.storeForm.storeName = this.userInfo[0].storeProfile.storeName;
        //     this.storeForm.storeEmail = this.userInfo[0].storeProfile.storeEmail;
        //     this.storeForm.storePhoneNumber = this.userInfo[0].storeProfile.storePhoneNumber;
        //     this.storeForm.storeBio = this.userInfo[0].storeProfile.storeBio;
        //     this.storeForm.storeLocation = this.userInfo[0].storeProfile.storeLocation;
        // }
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
