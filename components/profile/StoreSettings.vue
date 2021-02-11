<template>
    <!-- STORE SETTINGS -->
    <div>
        <!-- <v-row>
            <v-col class="col-md-6"> -->
        <h1 class="title">STORE SETTINGS</h1>
        <form>
            <!-- Logo image upload -->
            <b-field label="Image upload">
                <div class="file has-name is-fullwidth">
                    <label class="file-label">
                        <input
                            class="file-input"
                            type="file"
                            name="resume"
                            @change="onUploadLogo($event.target.files[0])"
                            accept="image/*"
                        />
                        <span class="file-cta">
                            <b-icon icon="upload"> </b-icon>
                            <span class="file-label"> Choose a file… </span>
                        </span>
                        <span class="file-name">
                            {{ previewLogoName }}
                        </span>
                    </label>
                </div>
            </b-field>

            <b-field>
                <div
                    class="form-group imgPreview"
                    v-bind:style="{
                        'background-image': 'url(' + storeForm.storeLogo + ')',
                        display: logoDisplay
                    }"
                ></div>
            </b-field>
            <!-- Logo image upload End-->
            <b-field label="Store Name">
                <b-input
                    required
                    type="text"
                    aria-describedby="storeNameHelp"
                    placeholder="Enter your store name"
                    v-model="storeForm.storeName"
                ></b-input>
                <!-- <div class="caption font-weight-light mb-">
                    Your name may appear around here where you are mentioned.
                    You can change or remove it at any time.
                </div> -->
            </b-field>
            <b-field label="Store Email">
                <b-input
                    required
                    type="email"
                    aria-describedby="storeEmailHelp"
                    placeholder="Enter your store email"
                    v-model="storeForm.storeEmail"
                ></b-input>
            </b-field>
            <b-field label="Store phone number">
                <b-input
                    required
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    class="form-control"
                    aria-describedby="storeEmailHelp"
                    placeholder="Enter your store phone number"
                    v-model="storeForm.storePhoneNumber"
                ></b-input>
                <!-- <small class="form-text text-muted">Format: 123-456-7890</small> -->

                <!-- <select
                        v-model="storeForm.cat1"
                        :items="beauty"
                        label="Select"
                        multiple
                        hint="Beauty"
                        persistent-hint
                        color="teal darker-1"
                    >
                        <div>
                            <div v-if="index === 0" color="teal darker-1" dark>
                                <span>{{ item }}</span>
                            </div>
                            <span v-if="index === 1" class="grey--text caption">
                                (+{{ storeForm.cat1.length - 1 }}
                                others)
                            </span>
                        </div>
                    </select> -->
                <!-- <optgroup v-for="(item, id) in beauty" :key="id">
                        <option value="flint">{{ item }}</option>
                    </optgroup> -->
            </b-field>

            <h6 class="title is-6">Store Service Category</h6>
            <p class="text-muted">
                Select a category that best describes your service.
            </p>
            <b-field class="colums">
                <div class="column">
                    <b-select
                        placeholder="Select a category"
                        multiple
                        native-size="8"
                        v-model="storeForm.cat1"
                    >
                        <option v-for="(item, id) in beauty" :key="id">
                            {{ item }}
                        </option>
                    </b-select>
                </div>
                <div class="column">
                    <b-select
                        placeholder="Select a category"
                        multiple
                        native-size="8"
                        v-model="storeForm.cat1"
                    >
                        <option v-for="(item, id) in wellness" :key="id">
                            {{ item }}
                        </option>
                    </b-select>
                </div>
                <div class="column">
                    <b-select
                        placeholder="Select a category"
                        multiple
                        native-size="8"
                        v-model="storeForm.cat1"
                    >
                        <option v-for="(item, id) in fitness" :key="id">
                            {{ item }}
                        </option>
                    </b-select>
                </div>

                <!-- <div cols="12" sm="6">
                    <select
                        v-model="storeForm.cat2"
                        :items="wellness"
                        label="Select"
                        multiple
                    >
                        <div>
                            <div v-if="index === 0" color="teal darker-1" dark>
                                <span>{{ item }}</span>
                            </div>
                            <span v-if="index === 1" class="grey--text caption">
                                (+{{ storeForm.cat2.length - 1 }}
                                others)
                            </span>
                        </div>
                    </select>
                </div> -->

                <!-- <div cols="12" sm="6">
                    <select
                        v-model="storeForm.cat3"
                        :items="fitness"
                        label="Select"
                        multiple
                        hint="Fitness"
                        persistent-hint
                        color="teal darker-1"
                    >
                        <div>
                            <v-chip
                                v-if="index === 0"
                                color="teal darker-1"
                                dark
                            >
                                <span>{{ item }}</span>
                            </v-chip>
                            <span v-if="index === 1" class="grey--text caption">
                                (+{{ storeForm.cat3.length - 1 }}
                                others)
                            </span>
                        </div>
                    </select>
                </div> -->
            </b-field>

            <b-field lang="Your Store Bio">
                <b-input
                    maxlength="200"
                    type="textarea"
                    placeholder="Write a description of your store"
                    v-model="storeForm.storeBio"
                ></b-input>
            </b-field>
            <!-- <div>
                <v-file-input
                    type="file"
                    @change="onUploadBanner"
                    label="Upload Store Banner"
                    outlined
                    truncate-length="50"
                    prepend-icon="mdi-camera"
                    dense
                    accept="image/*"
                    ref="fileInputThree"
                ></v-file-input>
            </div>
            <div
                class="form-group imgPreview"
                v-bind:style="{
                    'background-image': 'url(' + storeForm.storeBanner + ')',
                    display: bannerDisplay
                }"
            ></div> -->

            <b-field label="Image upload">
                <div class="file has-name is-fullwidth">
                    <label class="file-label">
                        <input
                            class="file-input"
                            type="file"
                            name="resume"
                            @change="onUploadBanner($event.target.files[0])"
                            accept="image/*"
                        />
                        <span class="file-cta">
                            <b-icon icon="upload"> </b-icon>
                            <span class="file-label"> Choose a file… </span>
                        </span>
                        <span class="file-name">
                            {{ previewBannerName }}
                        </span>
                    </label>
                </div>
            </b-field>

            <b-field>
                <div
                    class="form-group imgPreview"
                    v-bind:style="{
                        'background-image':
                            'url(' + storeForm.storeBanner + ')',
                        display: bannerDisplay
                    }"
                ></div>
            </b-field>
            <b-field label="Social Media">
                <div class="columns">
                    <div class="column">
                        <b-input
                            v-model="storeForm.facebook"
                            label="Facebook"
                            required
                        ></b-input>
                    </div>

                    <div class="column">
                        <b-input
                            v-model="storeForm.instagram"
                            label="Instagram"
                            required
                        ></b-input>
                    </div>

                    <div class="column">
                        <b-input
                            v-model="storeForm.twitter"
                            label="Twitter"
                            required
                        ></b-input>
                    </div>
                </div>
            </b-field>
            <b-field label="Location">
                <b-input
                    required
                    type="text"
                    class="form-control"
                    placeholder="Enter your location"
                    v-model="storeForm.storeLocation"
                ></b-input>
            </b-field>
            <div class="text-muted mb-5">
                All of the fields on this page are optional and can be deleted
                at any time, and by filling them out, you're giving us consent
                to share this data wherever your user profile appears.
            </div>
            <b-button
                @click="onUpdStoreInfo"
                :loading="loading"
                type="is-primary"
                class="teal darken-1"
                dark
            >
                Save Settings
            </b-button>
        </form>
        <!-- </v-col>
        </v-row> -->
    </div>
    <!-- STORE SETTINGS END -->
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { db } from '@/plugins/firebase';

import { mapGetters, mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            role: null,
            user: '',
            alert: '',
            errors: '',
            logoDisplay: '',
            loggedInUser: '',
            bannerDisplay: '',
            storeOwnerImageDisplay: '',
            currentUser: {
                name: ''
            },
            profileForm: {
                name: ''
            },
            storeForm: {
                storeLogo: '', // https://via.placeholder.com/500
                storeName: '',
                storeBio: '',
                storeBanner: '', // https://via.placeholder.com/500
                storeLocation: '',
                storeOwnerImage: '',
                rawStoreLogo: null,
                rawStoreBanner: null,
                rawStoreOwnerImage: null,
                cat1: [],
                cat2: [],
                cat3: [],
                twitter: '',
                facebook: '',
                instagram: ''
            },
            beauty: [
                'Salon',
                'Massage',
                'Nail',
                'Spa',
                'Barber',
                'Tanning',
                'Makeup',
                'Hair Removal'
            ],
            wellness: [
                'Coaching',
                'Acupuncture',
                'Physical Therapy',
                'Nutritionist',
                'Chiropractor',
                'Med Spa'
            ],
            fitness: [
                'Pilates',
                'Yoga',
                'Personal Trainer',
                'Cross Training',
                'Cycling',
                'Dance',
                'Gym',
                'All Fitness'
            ],
            previewLogoName: '' || 'no image uploaded',
            previewBannerName: '' || 'no image uploaded'
        };
    },
    computed: {
        ...mapGetters({
            storeProfile: 'dashboard/storeProfile',
            categories: 'dashboard/categories',
            userData: 'dashboard/userData',
            loading: 'loaders/loading',
            storeAlert: 'alert'
        }),
        ...mapState({
            dashboardStore: 'dashboard'
        }),
        userInfo() {
            return this.dashboardStore.userData;
        }
    },
    methods: {
        ...mapActions({
            updateStoreProfile: 'dashboard/updateStoreProfile',
            loadStoreProfile: 'dashboard/loadStoreProfile',
            loadUserIdData: 'dashboard/loadUserIdData',
            updateUserProfile: 'dashboard/updateUserProfile',
            loadUser: 'loadUser',
            closeAlert: 'closeAlert'
        }),
        async signout() {
            await firebase
                .auth()
                .signOut()
                .then(() => {
                    this.user = '';
                    window.localStorage.removeItem('email');
                    window.localStorage.removeItem('vuex');
                });
            this.$router.push('/signin');
        },
        // Store Settings start
        onUpdStoreInfo() {
            //NOTE replace empty space with a dash and lowercase all uppercases
            let storeName = this.storeForm.storeName
                .replace(/\s+/g, '-')
                .toLowerCase();

            const data = {
                userId: this.user.uid,
                storeName: storeName,
                storeEmail: this.storeForm.storeEmail,
                storePhoneNumber: this.storeForm.storePhoneNumber,
                storeBio: this.storeForm.storeBio,
                storeLogo: this.storeForm.storeLogo,
                storeBanner: this.storeForm.storeBanner,
                rawStoreLogo: this.storeForm.rawStoreLogo,
                rawStoreBanner: this.storeForm.rawStoreBanner,
                storeLocation: this.storeForm.storeLocation,
                beauty: this.storeForm.cat1,
                wellness: this.storeForm.cat2,
                fitness: this.storeForm.cat3,
                twitter: this.storeForm.twitter,
                facebook: this.storeForm.facebook,
                instagram: this.storeForm.instagram
            };
            this.updateStoreProfile(data);
        },
        onUploadLogo(event) {
            this.previewLogoName = event.name;
            // if a file is inserted or a logo exists then show it
            if (event || this.storeForm.storeLogo) {
                this.logoDisplay = 'block';
            }
            // if user removes file, clear local state and revert back to uploaded image
            let logoState = null;
            this.userInfo.forEach((res) => {
                if (res.storeProfile === undefined) {
                    logoState = null;
                    return;
                }

                if (res.storeProfile.storeLogo) {
                    logoState = true;
                } else {
                    logoState = null;
                }
            });
            // if no image then do this
            if (event === undefined) {
                this.logoDisplay = 'none';
                this.storeForm.storeLogo = '';
                if (this.userInfo[0] === undefined || logoState === null) {
                    return;
                }
                this.storeForm.storeLogo = this.userInfo[0].storeProfile.storeLogo;
                this.storeForm.rawStoreLogo = null;
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
                this.storeForm.storeLogo = fileReader.result;
            });
            fileReader.readAsDataURL(files);
            // raw file to be used on storeForm submit
            this.storeForm.rawStoreLogo = files;
        },
        onUploadBanner(event) {
            this.previewBannerName = event.name;
            // if a file is inserted or a logo exists then show it
            if (event || this.storeForm.storeLogo) {
                this.bannerDisplay = 'block';
            }
            // if user removes file, clear local state and revert back to uploaded image
            let bannerState = null;
            this.userInfo.forEach((res) => {
                if (res.storeProfile === undefined) {
                    bannerState = null;
                    return;
                }

                if (res.storeProfile.storeBanner) {
                    bannerState = true;
                } else {
                    bannerState = null;
                }
            });
            //  if no image then do this
            if (event === undefined) {
                this.bannerDisplay = 'none';
                this.storeForm.storeBanner = '';
                if (this.userInfo[0] === undefined || bannerState === null) {
                    return;
                }
                this.storeForm.storeBanner = this.userInfo[0].storeProfile.storeBanner;
                this.storeForm.rawStoreBanner = null;
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
                this.storeForm.storeBanner = fileReader.result;
            });
            fileReader.readAsDataURL(files);
            // raw file to be used on storeForm submit
            this.storeForm.rawStoreBanner = files;
        }
        // Store Info End
    },
    mounted() {
        // observer to keep track of the user's sign-in status.
        // on onUpdprofileForm user details are updated in firebase triggering observer
        // allowing for reactive user update experience
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                this.user = user;
                this.profileForm.name = user.displayName;
            }
        });

        const loadedUserData = this.userData;
        if (
            // if there's no user data or the length is less than = to zero or loaded user
            // is undefined
            !loadedUserData ||
            Object.keys(loadedUserData).length <= 0 ||
            loadedUserData === undefined
        ) {
            this.loadUserIdData(this.user.uid);
        }

        // if logo does not exist do not disply it's containers
        let logoState = null;
        this.userInfo.forEach((res) => {
            if (res.storeProfile === undefined) {
                logoState = null;
                return;
            }

            if (res.storeProfile.storeLogo) {
                logoState = true;
            } else {
                logoState = null;
            }
        });
        // if banner does not exist do not disply it's containers
        let bannerState = null;
        this.userInfo.forEach((res) => {
            if (res.storeProfile === undefined) {
                bannerState = null;
                return;
            }

            if (res.storeProfile.storeBanner) {
                bannerState = true;
            } else {
                bannerState = null;
            }
        });
        // if storeOwnerImage does not exist do not disply it's containers
        let profileImageState = null;
        this.userInfo.forEach((res) => {
            if (res === undefined || res.storeProfile === undefined) {
                profileImageState = null;
                return;
            }

            if (res.storeProfile.storeOwnerImage) {
                profileImageState = true;
            } else {
                profileImageState = null;
            }
        });

        if (
            (this.storeForm.storeLogo =
                '' || this.userData === undefined || logoState === null)
        ) {
            this.logoDisplay = 'none';
        } else {
            this.logoDisplay = 'block';
        }
        // if banner does not exist do not disply their containers
        if (
            (this.storeForm.storeBanner =
                '' || this.userData === undefined || bannerState === null)
        ) {
            this.bannerDisplay = 'none';
        } else {
            this.bannerDisplay = 'block';
        }

        // if the state is undfined or the object does not exist, return null
        if (this.userInfo.length <= 0 || !this.userInfo[0].storeProfile) {
            return null;
        } else {
            this.storeForm.storeLogo = this.userInfo[0].storeProfile.storeLogo;
            this.storeForm.storeBanner = this.userInfo[0].storeProfile.storeBanner;
            this.storeForm.storeOwnerImage = this.userInfo[0].storeProfile.storeOwnerImage;
            this.storeForm.storeName = this.userInfo[0].storeProfile.storeName;
            this.storeForm.storeEmail = this.userInfo[0].storeProfile.storeEmail;
            this.storeForm.storePhoneNumber = this.userInfo[0].storeProfile.storePhoneNumber;
            this.storeForm.storeBio = this.userInfo[0].storeProfile.storeBio;
            this.storeForm.storeLocation = this.userInfo[0].storeProfile.storeLocation;
            // the || sets null in the event that userInfo[0].storeProfile is undefined
            this.storeForm.cat1 = this.userInfo[0].storeProfile.beauty || null;
            this.storeForm.cat2 =
                this.userInfo[0].storeProfile.wellness || null;
            this.storeForm.cat3 = this.userInfo[0].storeProfile.fitness || null;
            // the || sets null in the event that userInfo[0].storeProfile is undefined
            this.storeForm.facebook =
                this.userInfo[0].storeProfile.facebook || null;
            this.storeForm.twitter =
                this.userInfo[0].storeProfile.twitter || null;
            this.storeForm.instagram =
                this.userInfo[0].storeProfile.instagram || null;
        }
    }
};
</script>

<style lang="scss" scoped>
.imgPreview {
    height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 0 0 30px 0;
}
</style>
