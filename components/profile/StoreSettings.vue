<template>
    <!-- STORE SETTINGS -->
    <div v-if="role.admin">
        <div class="display-1 mb-5">STORE SETTINGS</div>
        <form @submit.prevent="onUpdStoreInfo">
            <!-- Logo image upload -->
            <div class="form-group">
                <v-file-input
                    type="file"
                    @change="onUploadLogo"
                    label="Upload store logo"
                    outlined
                    truncate-length="50"
                    prepend-icon="mdi-camera"
                    dense
                    accept="image/*"
                    ref="fileInputTwo"
                ></v-file-input>
            </div>
            <div
                class="form-group imgPreview"
                v-bind:style="{
                    'background-image': 'url(' + storeForm.storeLogo + ')',
                    display: logoDisplay
                }"
            ></div>
            <!-- Logo image upload End-->
            <div class="form-group">
                <v-text-field
                    outlined
                    label="Store Name"
                    required
                    type="text"
                    aria-describedby="storeNameHelp"
                    placeholder="Enter your store name"
                    v-model="storeForm.storeName"
                ></v-text-field>
                <div class="caption font-weight-light mb-3">
                    Your name may appear around here where you are mentioned.
                    You can change or remove it at any time.
                </div>
            </div>
            <div class="form-group">
                <label for="fullName">Store Email</label>
                <input
                    required
                    type="email"
                    class="form-control"
                    aria-describedby="storeEmailHelp"
                    placeholder="Enter your store email"
                    v-model="storeForm.storeEmail"
                />
            </div>
            <div class="form-group">
                <label for="fullName">Store phone number</label>
                <input
                    required
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    class="form-control"
                    aria-describedby="storeEmailHelp"
                    placeholder="Enter your store phone number"
                    v-model="storeForm.storePhoneNumber"
                />
                <small class="form-text text-muted">Format: 123-456-7890</small>
            </div>
            <div class="form-group">
                <label for="fullName">Store Service Category</label>
                <v-container fluid>
                    <v-row align="center">
                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="storeForm.cat1"
                                :items="beauty"
                                label="Select"
                                multiple
                                hint="Beauty"
                                persistent-hint
                                color="teal darker-1"
                            >
                                <template v-slot:selection="{ item, index }">
                                    <v-chip
                                        v-if="index === 0"
                                        color="teal darker-1"
                                        dark
                                    >
                                        <span>{{ item }}</span>
                                    </v-chip>
                                    <span
                                        v-if="index === 1"
                                        class="grey--text caption"
                                    >
                                        (+{{ storeForm.cat1.length - 1 }}
                                        others)
                                    </span>
                                </template></v-select
                            >
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="storeForm.cat2"
                                :items="wellness"
                                label="Select"
                                multiple
                                hint="Wellness"
                                persistent-hint
                                color="teal darker-1"
                            >
                                <template v-slot:selection="{ item, index }">
                                    <v-chip
                                        v-if="index === 0"
                                        color="teal darker-1"
                                        dark
                                    >
                                        <span>{{ item }}</span>
                                    </v-chip>
                                    <span
                                        v-if="index === 1"
                                        class="grey--text caption"
                                    >
                                        (+{{ storeForm.cat2.length - 1 }}
                                        others)
                                    </span>
                                </template></v-select
                            >
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="storeForm.cat3"
                                :items="fitness"
                                label="Select"
                                multiple
                                hint="Fitness"
                                persistent-hint
                                color="teal darker-1"
                            >
                                <template v-slot:selection="{ item, index }">
                                    <v-chip
                                        v-if="index === 0"
                                        color="teal darker-1"
                                        dark
                                    >
                                        <span>{{ item }}</span>
                                    </v-chip>
                                    <span
                                        v-if="index === 1"
                                        class="grey--text caption"
                                    >
                                        (+{{ storeForm.cat3.length - 1 }}
                                        others)
                                    </span>
                                </template>
                            </v-select>
                        </v-col>
                    </v-row>
                </v-container>
                <small class="form-text text-muted"
                    >Select a category that best describes your service.</small
                >
            </div>
            <div class="form-group">
                <label for="bio">Your Store Bio</label>
                <v-textarea
                    outlined
                    placeholder="Write a description of your store"
                    v-model="storeForm.storeBio"
                ></v-textarea>
            </div>
            <div class="form-group">
                <label for="exampleFormControlFile1">Store banner</label>
                <v-file-input
                    type="file"
                    @change="onUploadBanner"
                    label="Upload store banner"
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
            ></div>
            <div class="form-group">
                <label for="location">Social Media</label>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="storeForm.facebook"
                                    label="Facebook"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="storeForm.instagram"
                                    label="Instagram"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="storeForm.twitter"
                                    label="Twitter"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </div>
            <div class="form-group">
                <label for="location">Location</label>
                <input
                    required
                    type="text"
                    class="form-control"
                    placeholder="Enter your location"
                    v-model="storeForm.storeLocation"
                />
            </div>
            <div class="form-group small text-muted">
                All of the fields on this page are optional and can be deleted
                at any time, and by filling them out, you're giving us consent
                to share this data wherever your user profile appears.
            </div>
            <v-btn :loading="loading" type="submit" class="teal darken-1" dark>
                Save Settings
            </v-btn>
        </form>
    </div>
    <!-- STORE SETTINGS END -->
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { mapGetters, mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            role: [],
            user: [],
            alert: [],
            errors: [],
            logoDisplay: [],
            loggedInUser: [],
            bannerDisplay: [],
            storeOwnerImageDisplay: [],
            currentUser: {
                name: []
            },
            profileForm: {
                name: []
            },
            storeForm: {
                storeLogo: [], // https://via.placeholder.com/500
                storeName: [],
                storeBio: [],
                storeBanner: [], // https://via.placeholder.com/500
                storeLocation: [],
                storeOwnerImage: [],
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
            ]
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
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                firebase
                    .auth()
                    .currentUser.getIdTokenResult()
                    .then((tokenResult) => {
                        if (tokenResult) {
                            this.role = tokenResult.claims;
                        }
                    });

                this.user = user;
                this.profileForm.name = user.displayName;
                // using the image store in the storeProfile database makes it easier to catch profile image error
            }
        });

        const loadedUserData = this.userData;
        if (
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