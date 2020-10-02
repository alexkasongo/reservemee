<template>
    <!-- Header -->
    <div class="row">
        <div class="col-sm-12">
            <!-- meta -->
            <div class="profile-user-box card-box bg-custom">
                <div class="row">
                    <div class="col-sm-6">
                        <span class="float-left mr-3">
                            <img
                                src="https://via.placeholder.com/150"
                                alt
                                class="thumb-lg rounded-circle"
                            />
                        </span>
                        <div class="media-body text-white">
                            <h4 class="mt-1 mb-1 font-18">
                                {{ user.displayName }}
                            </h4>
                            <p class="font-13 text-light">Hair Braider</p>
                            <p class="text-light mb-0">
                                Lynnwood, United States
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!--/ meta -->
        </div>
    </div>
    <!-- Header End-->
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { mapGetters } from 'vuex';

export default {
    name: 'Header',
    data() {
        return {
            user: ''
        };
    },
    computed: {
        ...mapGetters({
            // user: 'user'
        })
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.user = user;
            }
        });
    }
};
</script>

<style lang="scss" scoped></style>
