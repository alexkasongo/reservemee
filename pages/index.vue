<template>
    <div>
        <div v-if="loading" class="col-md-6 mt-2">
            <p>loading...</p>
        </div>
        <!-- Masthead -->
        <div v-if="!loading">
            <header v-if="!user" class="masthead text-white text-center">
                <!-- <header class="masthead text-white text-center" style="background: url("~assets/images/finance-stability.png")"> -->
                <div class="overlay"></div>
                <div class="container">
                    <div class="row">
                        <!-- <div class="col-xl-9 mx-auto">
                        <h1 class="mb-5 text-dark">Create, Offer & Get Paid!</h1>
                        </div>-->
                        <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
                            <form @submit.prevent="onSubmit">
                                <div class="form-row">
                                    <div class="col-12 col-md-9 mb-2 mb-md-0">
                                        <input
                                            type="email"
                                            class="form-control form-control-lg"
                                            placeholder="Enter your email..."
                                            required
                                            v-model="email"
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
            </header>

            <!-- Image Showcases -->
            <section class="showcase">
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

            <!-- Testimonials -->
            <section class="testimonials text-center bg-light">
                <div class="container">
                    <h2 class="mb-5">What people are saying...</h2>
                    <div class="row">
                        <div class="col-lg-4">
                            <div
                                class="testimonial-item mx-auto mb-5 mb-lg-0 user-container"
                            >
                                <div class="user mb-3">
                                    <div class="user__container"></div>
                                </div>
                                <!-- <img
                                class="img-fluid rounded-circle mb-3"
                                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBigHair&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Heather&eyeType=Squint&eyebrowType=UpDown&mouthType=Default&skinColor=Black"
                                alt
                                />-->
                                <h5>Margaret E.</h5>
                                <p class="font-weight-light mb-0">
                                    "This is fantastic! Thanks so much guys!"
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div
                                class="testimonial-item mx-auto mb-5 mb-lg-0 user-container"
                            >
                                <div class="user mb-3">
                                    <div class="user__container"></div>
                                </div>
                                <!-- <img
                                class="img-fluid rounded-circle mb-3"
                                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFroBand&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Red&graphicType=Hola&eyeType=Surprised&eyebrowType=UpDownNatural&mouthType=Twinkle&skinColor=Pale"
                                alt
                                />-->
                                <h5>Fred S.</h5>
                                <p class="font-weight-light mb-0">
                                    "Bookme is amazing. I've been using it to
                                    create lots of super nice services."
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div
                                class="testimonial-item mx-auto mb-5 mb-lg-0 user-container"
                            >
                                <div class="user mb-3">
                                    <div class="user__container"></div>
                                </div>
                                <!-- <img
                                class="img-fluid rounded-circle mb-3"
                                src="https://api.adorable.io/avatars/285/dz@adorable.png"
                                alt
                                />-->
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

            <!-- Call to Action -->
            <section
                v-if="!user"
                class="call-to-action text-white text-center"
                :style="{ backgroundImage: `url(${image})` }"
            >
                <div class="overlay"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-xl-9 mx-auto">
                            <h2 class="mb-4">
                                Ready to get started? Sign up now!
                            </h2>
                        </div>
                        <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
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

            <!-- Footer -->
            <hr />
            <!-- <footer class="footer bg-light">
                <div class="container">
                    <div class="row">
                        <div
                            class="col-lg-6 h-100 text-center text-lg-left my-auto"
                        >
                            <ul class="list-inline mb-2">
                                <li class="list-inline-item">
                                    <a href="#" class="text-dark">About</a>
                                </li>
                                <li class="list-inline-item">&sdot;</li>
                                <li class="list-inline-item">
                                    <a href="#" class="text-dark">Contact</a>
                                </li>
                                <li class="list-inline-item">&sdot;</li>
                                <li class="list-inline-item">
                                    <a href="#" class="text-dark"
                                        >Terms of Use</a
                                    >
                                </li>
                                <li class="list-inline-item">&sdot;</li>
                                <li class="list-inline-item">
                                    <a href="#" class="text-dark"
                                        >Privacy Policy</a
                                    >
                                </li>
                            </ul>
                            <p class="text-muted small mb-4 mb-lg-0">
                                &copy; Aleko: Bookme 2020. All Rights Reserved.
                            </p>
                        </div>
                        <div
                            class="col-lg-6 h-100 text-center text-lg-right my-auto"
                        >
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item mr-3">
                                    <a href="#">
                                        <i
                                            class="fa fa-facebook fa-2x fa-fw text-dark"
                                        ></i>
                                    </a>
                                </li>
                                <li class="list-inline-item mr-3">
                                    <a href="#">
                                        <i
                                            class="fa fa-twitter-square fa-2x fa-fw text-dark"
                                        ></i>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#">
                                        <i
                                            class="fa fa-instagram fa-2x fa-fw text-dark"
                                        ></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer> -->

            <v-footer dark padless>
                <v-card flat tile class="teal darker-1 white--text text-center">
                    <v-card-text>
                        <v-btn
                            v-for="icon in icons"
                            :key="icon"
                            class="mx-4 white--text"
                            icon
                        >
                            <v-icon size="24px">
                                {{ icon }}
                            </v-icon>
                        </v-btn>
                    </v-card-text>

                    <v-card-text class="white--text pt-0">
                        Phasellus feugiat arcu sapien, et iaculis ipsum
                        elementum sit amet. Mauris cursus commodo interdum.
                        Praesent ut risus eget metus luctus accumsan id ultrices
                        nunc. Sed at orci sed massa consectetur dignissim a sit
                        amet dui. Duis commodo vitae velit et faucibus. Morbi
                        vehicula lacinia malesuada. Nulla placerat augue vel
                        ipsum ultrices, cursus iaculis dui sollicitudin.
                        Vestibulum eu ipsum vel diam elementum tempor vel ut
                        orci. Orci varius natoque penatibus et magnis dis
                        parturient montes, nascetur ridiculus mus.
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text class="white--text">
                        {{ new Date().getFullYear() }} —
                        <strong>Vuetify</strong>
                    </v-card-text>
                </v-card>
            </v-footer>
        </div>
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
        }
    }
};
</script>

<style lang="scss" scoped>
// Mixins
// Background Cover Mixin
@mixin background {
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    -webkit-background-repeat: no-repeat;
    -moz-background-repeat: no-repeat;
    -o-background-repeat: no-repeat;
    background-repeat: no-repeat;
}

.user {
    width: 100%;
    display: flex;
    justify-content: center;

    &__container {
        height: 150px;
        width: 150px;
        border-radius: 50%;
        background-color: #00897b;
    }
}

/* 
** _masterhead.scss 
*/
.masthead {
    position: relative;
    background-color: #00897b;
    @include background;
    background-position: center;
    padding-top: 8rem;
    padding-bottom: 8rem;
    .overlay {
        position: absolute;
        // background-color: black;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        opacity: 0.3;
    }
    h1 {
        font-size: 2rem;
    }
    @media (min-width: 768px) {
        padding-top: 12rem;
        padding-bottom: 12rem;
        h1 {
            font-size: 3rem;
        }
    }
}
/* 
** _showcase.scss 
*/
.showcase {
    .showcase-text {
        padding: 3rem;
    }
    .showcase-img {
        min-height: 30rem;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    @media (min-width: 768px) {
        .showcase-text {
            padding: 7rem;
        }
    }
}
/* 
** _testimonials.scss 
*/
.testimonials {
    padding-top: 7rem;
    padding-bottom: 7rem;
    .testimonial-item {
        max-width: 18rem;
        img {
            max-width: 12rem;
            // box-shadow: 0px 5px 5px 0px gray;
        }
    }
}
/* 
** _footer.scss 
*/
footer.footer {
    padding-top: 4rem;
    padding-bottom: 4rem;
}
/* 
** _call-to-action.scss 
*/
.call-to-action {
    position: relative;
    background-color: gray;
    @include background;
    background-position: center;
    padding-top: 7rem;
    padding-bottom: 7rem;
    .overlay {
        position: absolute;
        background-color: black;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        opacity: 0.3;
    }
}
/* 
** _icons.scss 
*/
.features-icons {
    padding-top: 7rem;
    padding-bottom: 7rem;
    .features-icons-item {
        max-width: 20rem;
        .features-icons-icon {
            height: 7rem;
            i {
                font-size: 4.5rem;
            }
        }
        &:hover {
            .features-icons-icon {
                i {
                    font-size: 5rem;
                }
            }
        }
    }
}
</style>
