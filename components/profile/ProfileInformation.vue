<template>
    <!-- USER PROFILE -->
    <div>
        <h1 class="title">PROFILE INFORMATION</h1>

        <form>
            <b-field label="Image upload">
                <div class="file has-name is-fullwidth">
                    <label class="file-label">
                        <input
                            class="file-input"
                            type="file"
                            name="resume"
                            @change="
                                onUploadProfileImage($event.target.files[0])
                            "
                            accept="image/*"
                        />
                        <span class="file-cta">
                            <b-icon icon="upload"> </b-icon>
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
                        'background-image':
                            'url(' + storeForm.storeOwnerImage + ')',
                        display: storeOwnerImageDisplay
                    }"
                ></div>
            </b-field>
            <b-field label="Name">
                <b-input
                    v-model="profileForm.name"
                    placeholder="Enter your fullname"
                ></b-input>
            </b-field>
            <p class="subtitle is-6 mb-3">
                Your name may appear around here where you are mentioned. You
                can change or remove it at any time.
            </p>
            <b-button
                @click="onUpdprofileForm"
                :loading="loading"
                type="is-primary"
                expanded
            >
                Update Profile
            </b-button>
        </form>
    </div>
    <!-- USER PROFILE END -->
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
            loggedInUser: [],
            storeOwnerImageDisplay: [],
            currentUser: {
                name: ''
            },
            profileForm: {
                name: ''
            },
            storeForm: {
                storeOwnerImage: []
            },
            previewImgName: '' || 'no image uploaded'
        };
    },
    computed: {
        ...mapGetters({
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
            loadUserIdData: 'dashboard/loadUserIdData',
            updateUserProfile: 'dashboard/updateUserProfile',
            loadUser: 'loadUser'
        }),
        // Profile Form start
        onUpdprofileForm() {
            const payload = {
                rawStoreOwnerImage: this.storeForm.rawStoreOwnerImage || null,
                storeOwnerImage: this.storeForm.storeOwnerImage,
                name: this.profileForm.name,
                userId: this.user.uid
            };
            // store image as binary in database
            this.updateUserProfile(payload);
        },
        // Profile Form End

        // Pick and Upload Image
        // profileImagePickFile() {
        //     this.$refs.fileInputOne.$refs.input.click();
        // },
        onUploadProfileImage(event) {
            this.previewImgName = event.name;
            // if a file is inserted or a logo exists then show it
            if (event || this.storeForm.profileImage) {
                this.storeOwnerImageDisplay = 'block';
            }
            // if user removes file, clear local state and revert back to uploaded image
            let profileImageState = null;
            this.userInfo.forEach((res) => {
                if (res.storeProfile === undefined) {
                    profileImageState = null;
                    return;
                }

                if (res.storeProfile.storeOwnerImage) {
                    profileImageState = true;
                } else {
                    profileImageState = null;
                }
            });
            // if no image then do this
            if (event === undefined) {
                this.storeOwnerImageDisplay = 'none';
                this.storeForm.storeOwnerImage = '';
                if (
                    this.userInfo[0] === undefined ||
                    profileImageState === null
                ) {
                    return;
                }
                this.storeForm.storeOwnerImage = this.userInfo[0].storeProfile.storeOwnerImage;
                this.storeForm.rawStoreOwnerImage = null;
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
                this.storeForm.storeOwnerImage = fileReader.result;
            });
            fileReader.readAsDataURL(files);
            // raw file to be used on storeForm submit
            this.storeForm.rawStoreOwnerImage = files;
        }
        // Pick and Upload Image End
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

        // if storeOwnerImage does not exist do not disply their containers
        if (
            (this.storeForm.storeOwnerImage =
                '' || this.userData === undefined || profileImageState === null)
        ) {
            this.storeOwnerImageDisplay = 'none';
        } else {
            this.storeOwnerImageDisplay = 'block';
        }

        // if the state is undfined or the object does not exist, return null
        if (this.userInfo.length <= 0 || !this.userInfo[0].storeProfile) {
            return null;
        } else {
            this.storeForm.storeOwnerImage = this.userInfo[0].storeProfile.storeOwnerImage;
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
