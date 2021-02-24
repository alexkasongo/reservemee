<template>
    <div>
        <section class="hero is-white is-fullh">
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-vcentered reverse-columns">
                        <div
                            class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen is-5-fullhd is-offset-1-fullhd"
                            data-aos="fade-down"
                        >
                            <h1 class="title titled is-1 mb-6">
                                Multi-tenant SaaS Scheduling and Management
                                Nuxt.js boilerplate
                            </h1>
                            <h2
                                class="subtitled subtitle has-text-grey is-4 has-text-weight-normal is-family-sans-serif"
                            >
                                Reservemee is an open source project that serves
                                as a scalable starting point for small to medium
                                sized business. The app is Server Side Rendered
                                (SSR) via Firebase Cloud Functions and hosted on
                                Google Firebase.
                            </h2>
                            <div class="buttons">
                                <button
                                    v-if="!user"
                                    class="button is-primary"
                                    @click="$router.push('/signin')"
                                >
                                    Login
                                </button>
                                <button
                                    @click="$router.push('/signup-admin')"
                                    class="button"
                                >
                                    Signup
                                </button>
                            </div>
                        </div>
                        <div
                            data-aos="fade-right"
                            class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-4-desktop is-offset-1-desktop is-4-widescreen is-offset-1-widescreen is-4-fullhd is-offset-1-fullhd"
                        >
                            <figure>
                                <img :src="offer" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

import offer from 'assets/images/logo.png';

export default {
    data() {
        return {
            offer: offer,
            user: '',
            loading: true,
            email: '',
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram'
            ]
        };
    },
    head: {},
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            // show loading when mounted
            this.loading = true;
            this.user = user;
            // stop loading when all content is loaded
            this.loading = false;
            if (user !== null) {
                this.loading = false;
                // No user is signed in.
                if (process.browser) {
                    localStorage.removeItem('email');
                    localStorage.removeItem('vuex');
                }
            }
        });
    },
    methods: {
        onSubmit() {
            if (process.browser) {
                localStorage.setItem('email', this.email);
            }
            this.$router.push('/signup');
        },
        clearStorage() {
            if (process.browser) {
                localStorage.clear();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@media (max-width: 500px) {
    .reverse-columns {
        flex-direction: column-reverse;
        display: flex;
    }
}

.titled {
    font-family: 'Merriweather', serif !important;
    font-size: 30px !important;
    @media (min-width: 768px) {
        font-size: 54px !important;
        font-weight: 400 !important;
        line-height: 64px !important;
    }
}

.subtitled {
    font-family: 'Merriweather', serif !important;
    font-size: 16px !important;
    @media (min-width: 768px) {
        font-size: 22px !important;
        font-weight: 400 !important;
        line-height: 36px !important;
    }
}
.is-fullh {
    height: calc(100vh - 56px);
}

.hero-body {
    display: flex;
    align-items: center;
}
</style>
