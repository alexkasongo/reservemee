<template>
    <div>
        <!-- <div v-if="loading">
            <p>loading...</p>
        </div>
        Masthead
        <div v-if="!loading">
            <div align="center" justify="center" no-gutters>
                <div v-if="!user" class="masthead text-white text-center">
                    <div class="overlay"></div>
                    <div elevation="0" max-width="800">
                        <form @submit.prevent="onSubmit">
                            <div>
                                <div align="center" justify="center" no-gutters>
                                    <div cols="12" sm="8">
                                        <v-text-field
                                            solo-inverted
                                            flat
                                            hide-details
                                            label="Search"
                                            type="email"
                                            placeholder="Enter your email..."
                                            required
                                            v-model="email"
                                            height="52"
                                            class="rounded-br-sm rounded-tr-sm"
                                        ></v-text-field>
                                    </div>

                                    <div cols="12" md="4">
                                        <div
                                            elevation="0"
                                            type="submit"
                                            block
                                            class="teal darker-1 rounded-tl-sm rounded-bl-sm"
                                            dark
                                            x-large
                                        >
                                            Get started!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <section class="showcase margin">
                <div class="container-fluid p-0">
                    <div class="row no-gutters">
                        <div
                            class="col-lg-6 order-lg-2 text-white showcase-img"
                            :style="{ backgroundImage: `url(${create})` }"
                        ></div>
                        <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                            <h2>Create</h2>
                            <p class="lead mb-0">
                                Prioris generis est docilitas, memoria; Si enim
                                ad populum me vocas, eum. Non est ista, inquam,
                                Piso, magna dissensio. Prioris generis est
                                docilitas, memoria; Si enim ad populum me vocas,
                                eum. Non est ista, inquam, Piso, magna
                                dissensio.
                            </p>
                        </div>
                    </div>
                    <div class="row no-gutters">
                        <div
                            class="col-lg-6 text-white showcase-img"
                            :style="{ backgroundImage: `url(${offer})` }"
                        ></div>
                        <div class="col-lg-6 my-auto showcase-text">
                            <h2>Offer</h2>
                            <p class="lead mb-0">
                                Prioris generis est docilitas, memoria; Si enim
                                ad populum me vocas, eum. Non est ista, inquam,
                                Piso, magna dissensio.Prioris generis est
                                docilitas, memoria; Si enim ad populum me vocas,
                                eum. Non est ista!
                            </p>
                        </div>
                    </div>
                    <div class="row no-gutters">
                        <div
                            class="col-lg-6 order-lg-2 text-white showcase-img"
                            :style="{ backgroundImage: `url(${sell})` }"
                        ></div>
                        <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                            <h2>Sell</h2>
                            <p class="lead mb-0">
                                Prioris generis est docilitas, memoria; Si enim
                                ad populum me vocas, eum. Non est ista, inquam,
                                Piso, magna dissensio. Prioris generis est
                                docilitas, memoria; Si enim ad populum me vocas,
                                eum. Non est ista, inquam, Piso, magna
                                dissensio!
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section class="testimonials text-center bg-light">
                <div class="container">
                    <h2>What people are saying...</h2>
                    <div class="row">
                        <div class="col-lg-4">
                            <div>
                                <div class="user mb-3">
                                    <div class="user__container"></div>
                                </div>
    
                                <h5>Margaret E.</h5>
                                <p class="font-weight-light mb-0">
                                    "This is fantastic! Thanks so much guys!"
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div>
                                <div class="user mb-3">
                                    <div class="user__container"></div>
                                </div>
                                <h5>Fred S.</h5>
                                <p class="font-weight-light mb-0">
                                    "Bookme is amazing. I've been using it to
                                    create lots of super nice services."
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div>
                                <div class="user mb-3">
                                    <div class="user__container"></div>
                                </div>
                                <h5>Sarah W.</h5>
                                <p class="font-weight-light mb-0">
                                    "Thanks so much for making and thinking of
                                    the small guy!"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="!user" class="call-to-action text-white text-center">
                <div class="overlay"></div>
                <div class="container">
                    <div class="row">
                        <div>
                            <h2 class="mb-4">
                                Ready to get started? Sign up now!
                            </h2>
                        </div>
                        <div>
                            <form>
                                <div class="form-row">
                                    <div class="col-12 col-md-9 mb-2 mb-md-0">
                                        <input
                                            type="email"
                                            class="form-control form-control-lg"
                                            placeholder="Enter your email..."
                                        />
                                    </div>
                                    <div class="col-12 col-md-3">
                                        <button
                                            type="submit"
                                            class="btn btn-block btn-lg btn-dark"
                                        >
                                            Get started!
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div> -->

        <section class="hero is-white is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-vcentered reverse-columns">
                        <div
                            class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen is-5-fullhd is-offset-1-fullhd"
                            data-aos="fade-down"
                        >
                            <h1 class="title titled is-1 mb-6">
                                absurd illustrations that make sense
                            </h1>
                            <h2
                                class="subtitled subtitle has-text-grey is-4 has-text-weight-normal is-family-sans-serif"
                            >
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Laborum cupiditate dolorum
                                vitae dolores nesciunt totam magni quas.
                            </h2>
                            <div class="buttons">
                                <button class="button is-black">
                                    Download
                                </button>
                                <button class="button">Subscribe</button>
                            </div>
                        </div>
                        <div
                            data-aos="fade-right"
                            class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-4-desktop is-offset-1-desktop is-4-widescreen is-offset-1-widescreen is-4-fullhd is-offset-1-fullhd"
                        >
                            <figure class="image is-square">
                                <img :src="create" />
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

import headerImage from 'assets/images/e-commerce.png';
import create from 'assets/images/create.png';
import offer from 'assets/images/offer.png';
import sell from 'assets/images/sell.png';

import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            image: headerImage,
            create: create,
            offer: offer,
            sell: sell,
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
                window.localStorage.removeItem('email');
                window.localStorage.removeItem('vuex');
            }
        });
    },
    methods: {
        onSubmit() {
            localStorage.setItem('email', this.email);
            this.$router.push('/signup');
        },
        clearStorage() {
            localStorage.clear();
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
    font-size: 58px !important;
    font-weight: 400 !important;
    line-height: 64px !important;
}

.subtitled {
    font-family: 'Merriweather', serif !important;
    font-size: 22px !important;
    font-weight: 400 !important;
    line-height: 36px !important;
}
</style>
