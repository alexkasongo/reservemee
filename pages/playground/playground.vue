<template>
    <div id="app">
        <v-app id="inspire">
            <v-app id="keep">
                <v-app-bar app clipped-left color="teal darker-1">
                    <v-app-bar-nav-icon
                        @click="drawer = !drawer"
                    ></v-app-bar-nav-icon>
                    <span class="title ml-3 mr-5">Google</span>
                    <v-text-field
                        solo-inverted
                        flat
                        hide-details
                        label="Search"
                    ></v-text-field>

                    <v-spacer></v-spacer>
                </v-app-bar>

                <v-navigation-drawer
                    v-model="drawer"
                    app
                    clipped
                    color="grey lighten-4"
                    :mini-variant.sync="mini"
                >
                    <v-btn icon @click.stop="mini = !mini">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-list dense class="grey lighten-4">
                        <template v-for="(item, i) in items">
                            <!-- <v-row v-if="item.heading" :key="i" align="center">
                                <v-col cols="6">
                                    <v-subheader v-if="item.heading">
                                        {{ item.heading }}
                                    </v-subheader>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <v-btn small text>edit</v-btn>
                                </v-col>
                            </v-row> -->
                            <v-divider
                                v-if="item.divider"
                                :key="i"
                                dark
                                class="my-4"
                            ></v-divider>
                            <v-list-item v-else :key="i" link>
                                <v-list-item-action>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title class="grey--text">
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-navigation-drawer>

                <v-main>
                    <v-container fluid class="grey lighten-4 fill-height">
                        <v-row justify="center" align="center">
                            <v-col class="shrink">
                                <v-tooltip right>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            :href="source"
                                            icon
                                            large
                                            target="_blank"
                                            v-on="on"
                                        >
                                            <v-icon large>mdi-code-tags</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Source</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-main>
            </v-app>
        </v-app>
    </div>
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
            newPassword: [],
            loggedInUser: [],
            bannerDisplay: [],
            currentPassword: [],
            confirmNewPassword: [],
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
            drawer: null,
            items: [
                { icon: 'mdi-account', text: 'Profile Information' },
                { icon: 'mdi-cart', text: 'Store Settings' },
                { divider: true },
                { icon: 'mdi-shield', text: 'Security' },
                { divider: true },
                { icon: 'mdi-bell', text: 'Notifications' },
                { divider: true },
                { icon: 'mdi-credit-card', text: 'Billing' },
                { icon: 'mdi-cog', text: 'Account Settings' },
                { icon: 'mdi-help-circle', text: 'Help' }
            ],
            mini: false,
            source: 'https://via.placeholder.com/500',
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
        changePassword() {
            if (this.newPassword !== this.confirmNewPassword) {
                // FIXME manage error
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Passwords do not match.',
                    showConfirmButton: false,
                    timer: 3000
                });
            } else {
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, change it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (this.newPassword === this.confirmNewPassword) {
                            const currentPassword = this.currentPassword;
                            const newPassword = this.confirmNewPassword;

                            this.reauthenticate(currentPassword);
                            this.changePasswordNow(
                                currentPassword,
                                newPassword
                            );
                        }
                    }
                });
            }
        },
        reauthenticate(currentPassword) {
            const user = firebase.auth().currentUser;
            const cred = firebase.auth.EmailAuthProvider.credential(
                this.user.email,
                currentPassword
            );
            return user.reauthenticateWithCredential(cred);
        },
        changePasswordNow(currentPassword, newPassword) {
            this.reauthenticate(currentPassword)
                .then(() => {
                    var user = firebase.auth().currentUser;
                    user.updatePassword(newPassword)
                        .then(() => {
                            this.$swal({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Password changed.',
                                showConfirmButton: false,
                                timer: 3000
                            });
                            this.signout();
                        })
                        .catch((error) => {
                            this.errors = error;
                        });
                })
                .catch((error) => {
                    this.errors = error;
                });
            this.signout();
        },
        async deleteAccount() {
            var user = await firebase.auth().currentUser;
            const userData = firebase
                .database()
                .ref('users')
                .child(`${this.user.uid}`);
            userData.remove();

            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    user.delete()
                        .then(function () {})
                        .catch(function (error) {
                            // FIXME
                            console.log(`_id.vue - 989 - 🥶`, error);
                        });
                    this.signout;
                }
            });
        },

        // Profile Form start
        onUpdprofileForm() {
            // TODO should be able to upload image
            // if (!this.profileForm.rawImage) {
            //     return;
            // }
            const payload = {
                rawStoreOwnerImage: this.storeForm.rawStoreOwnerImage,
                storeOwnerImage: this.storeForm.storeOwnerImage,
                name: this.profileForm.name,
                userId: this.user.uid
            };
            // store image as binary in database
            this.updateUserProfile(payload);
        },
        closeAlert() {
            this.closeAlert();
        },
        // Profile Form End

        // Store Info start
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
        profileImagePickFile() {
            this.$refs.fileInputOne.$refs.input.click();
        },
        onUploadProfileImage(event) {
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
#keep .v-navigation-drawer__border {
    display: none;
}
</style>