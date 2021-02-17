<template>
    <!-- ACCOUNT -->
    <div class="tab-pane" id="account">
        <h6>ACCOUNT SETTINGS</h6>
        <hr />
        <form>
            <div class="mb-5">
                <label>Delete Account</label>
                <p class="text-muted font-size-sm">
                    Once you delete your account, there is no going back. Please
                    be certain.
                </p>
            </div>
            <b-button
                label="Delete Account"
                aria-label="Delete account"
                @click="deleteAccount"
                type="is-danger"
            >
                Delete Account
            </b-button>
        </form>
    </div>
    <!-- ACCOUNT END -->
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
            currentUser: {
                name: []
            },
            error: null
        };
    },
    computed: {
        ...mapGetters({
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
            loadUser: 'loadUser',
            closeAlert: 'closeAlert'
        }),
        async signout() {
            await firebase
                .auth()
                .signOut()
                .then(() => {
                    this.user = '';
                    if (process.browser) {
                        localStorage.removeItem('email');
                        localStorage.removeItem('vuex');
                    }
                });
            this.$router.push('/signin');
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
                            this.error = error;
                        });
                    this.signout;
                }
            });
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

<style lang="scss" scoped></style>
