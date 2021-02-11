<template>
    <!-- SECURITY SETTINGS -->
    <div>
        <h3 class="subtitle is-3 mb-5">SECURITY SETTINGS</h3>
        <hr />
        <div>
            <b-field label="Change Password">
                <b-input
                    outlined
                    type="password"
                    class="form-control"
                    v-model="currentPassword"
                    required
                ></b-input>
            </b-field>
            <div v-if="errors" class="form-group text-muted">
                {{ errors.message }}
            </div>
            <b-field label="New password">
                <b-input
                    outlined
                    type="password"
                    class="form-control mt-1"
                    v-model="newPassword"
                    required
                ></b-input>
            </b-field>
            <b-field label="Confirm new password">
                <b-input
                    outlined
                    type="password"
                    class="form-control mt-1 mb-4"
                    v-model="confirmNewPassword"
                    required
                ></b-input>
            </b-field>

            <div v-if="errors" class="form-group text-muted">
                {{ errors.message }}
            </div>
            <b-button
                @click="changePassword"
                type="is-primary"
                class="mb-5"
                expanded
            >
                Change
            </b-button>
        </div>

        <!-- <v-form class="mt-5">
            <div class="form-group mb-0">
                <label class="d-block">Sessions</label>
                <p class="font-size-sm text-secondary">
                    This is a list of devices that have logged into your
                    account. Revoke any sessions that you do not recognize.
                </p>
                <ul class="list-group list-group-sm">
                    <li class="list-group-item has-icon">
                        <div>
                            <h6 class="mb-0">
                                San Francisco City 190.24.335.55
                            </h6>
                            <small class="text-muted"
                                >Your current session seen in United
                                States</small
                            >
                        </div>
                        <div class="btn btn-light btn-sm ml-auto" type="button">
                            More info
                        </div>
                    </li>
                </ul>
            </div>
        </v-form> -->
    </div>
    <!-- SECURITY SETTINGS END -->
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
            currentPassword: [],
            confirmNewPassword: [],
            currentUser: {
                name: []
            }
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
        closeAlert() {
            this.closeAlert();
        }
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
    }
};
</script>
