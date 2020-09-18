<template>
    <div class="mt-3">
        <div v-if="!user" class="mt-2">
            <p>loading...</p>
        </div>
        <div v-if="user" class="content">
            <div>
                <!-- START HERE -->

                <!-- Header -->
                <Header />
                <!-- Header End-->

                <div class="row">
                    <div class="col-xl-4">
                        <div v-if="user">
                            <div v-if="!loading">
                                <div v-if="categories.length <= 0">
                                    <!-- CategoryCheck -->
                                    <CategoryCheck />
                                    <!-- CategoryCheck -->
                                </div>
                            </div>
                            <div v-if="!user.emailVerified" class="w-100">
                                <div class="card">
                                    <div class="card-body">
                                        <h3 v-if="user">Your email address is not verified.</h3>
                                        <p>Verified: {{ user.emailVerified }}</p>
                                        <button
                                            @click="verifyEmail"
                                            type="button"
                                            class="btn btn-block btn-success"
                                        >Verify Email</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Personal-Information -->
                        <div class="mb-5">
                            <h4 class="header-title mt-0">Store Bio</h4>
                            <div class="panel-body">
                                <p
                                    class="text-muted font-13"
                                >Hello, quis Aristidem non mortuum diligit? Quid sequatur, quid repugnet, vident. Avaritiamne minuis? Iam id ipsum absurdum, maximum malum neglegi. Sed quod proximum fuit non vidit. Nunc agendum est subtilius.</p>
                                <hr />
                                <div class="text-left">
                                    <p class="text-muted font-13">
                                        <strong>Store Name :</strong>
                                        <span class="m-l-15">Sista Joy Braids</span>
                                    </p>
                                    <p class="text-muted font-13">
                                        <strong>Mobile :</strong>
                                        <span class="m-l-15">(+12) 123 1234 567</span>
                                    </p>
                                    <p class="text-muted font-13">
                                        <strong>Email :</strong>
                                        <span class="m-l-15">sistajoybraids@gmail.com</span>
                                    </p>
                                    <p class="text-muted font-13">
                                        <strong>Location :</strong>
                                        <span class="m-l-15">USA</span>
                                    </p>
                                    <p class="text-muted font-13">
                                        <strong>Services :</strong>
                                        <span class="m-l-5">
                                            <span
                                                class="flag-icon flag-icon-us m-r-5 m-t-0"
                                                title="us"
                                            ></span>
                                            <span>Box Braids</span>
                                        </span>
                                        <span class="m-l-5">
                                            <span class="flag-icon flag-icon-de m-r-5" title="de"></span>
                                            <span>Cornrows</span>
                                        </span>
                                        <span class="m-l-5">
                                            <span class="flag-icon flag-icon-es m-r-5" title="es"></span>
                                            <span>Braids</span>
                                        </span>
                                        <span class="m-l-5">
                                            <span class="flag-icon flag-icon-fr m-r-5" title="fr"></span>
                                            <span>Dreadlocks</span>
                                        </span>
                                    </p>
                                </div>
                                <ul class="social-links list-inline mt-4 mb-0">
                                    <li class="list-inline-item">
                                        <a
                                            title
                                            data-placement="top"
                                            data-toggle="tooltip"
                                            class="tooltips"
                                            href
                                            data-original-title="Facebook"
                                        >
                                            <i class="fa text-dark fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li class="list-inline-item">
                                        <a
                                            title
                                            data-placement="top"
                                            data-toggle="tooltip"
                                            class="tooltips"
                                            href
                                            data-original-title="Twitter"
                                        >
                                            <i class="fa text-dark fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li class="list-inline-item">
                                        <a
                                            title
                                            data-placement="top"
                                            data-toggle="tooltip"
                                            class="tooltips"
                                            href
                                            data-original-title="Skype"
                                        >
                                            <i class="fa text-dark fa-skype"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- Personal-Information -->
                        <div class="ribbon-box">
                            <div class="ribbon ribbon-primary">Messages</div>
                            <div class="clearfix"></div>
                            <div class="inbox-widget">
                                <a href="#">
                                    <div class="inbox-item">
                                        <div class="inbox-item-img">
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                class="rounded-circle"
                                                alt
                                            />
                                        </div>
                                        <p class="inbox-item-author">Tomaslau</p>
                                        <p class="inbox-item-text">I've finished it! See you so...</p>
                                        <p class="inbox-item-date">
                                            <button
                                                type="button"
                                                class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                                            >Reply</button>
                                        </p>
                                    </div>
                                </a>
                                <a href="#">
                                    <div class="inbox-item">
                                        <div class="inbox-item-img">
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                                class="rounded-circle"
                                                alt
                                            />
                                        </div>
                                        <p class="inbox-item-author">Stillnotdavid</p>
                                        <p class="inbox-item-text">This theme is awesome!</p>
                                        <p class="inbox-item-date">
                                            <button
                                                type="button"
                                                class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                                            >Reply</button>
                                        </p>
                                    </div>
                                </a>
                                <a href="#">
                                    <div class="inbox-item">
                                        <div class="inbox-item-img">
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                                class="rounded-circle"
                                                alt
                                            />
                                        </div>
                                        <p class="inbox-item-author">Kurafire</p>
                                        <p class="inbox-item-text">Nice to meet you</p>
                                        <p class="inbox-item-date">
                                            <button
                                                type="button"
                                                class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                                            >Reply</button>
                                        </p>
                                    </div>
                                </a>
                                <a href="#">
                                    <div class="inbox-item">
                                        <div class="inbox-item-img">
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                                class="rounded-circle"
                                                alt
                                            />
                                        </div>
                                        <p class="inbox-item-author">Shahedk</p>
                                        <p class="inbox-item-text">Hey! there I'm available...</p>
                                        <p class="inbox-item-date">
                                            <button
                                                type="button"
                                                class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                                            >Reply</button>
                                        </p>
                                    </div>
                                </a>
                                <a href="#">
                                    <div class="inbox-item">
                                        <div class="inbox-item-img">
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                class="rounded-circle"
                                                alt
                                            />
                                        </div>
                                        <p class="inbox-item-author">Adhamdannaway</p>
                                        <p class="inbox-item-text">This theme is awesome!</p>
                                        <p class="inbox-item-date">
                                            <button
                                                type="button"
                                                class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                                            >Reply</button>
                                        </p>
                                    </div>
                                </a>
                                <a href="#">
                                    <div class="inbox-item">
                                        <div class="inbox-item-img">
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                class="rounded-circle"
                                                alt
                                            />
                                        </div>
                                        <p class="inbox-item-author">Tomaslau</p>
                                        <p class="inbox-item-text">I've finished it! See you so...</p>
                                        <p class="inbox-item-date">
                                            <button
                                                type="button"
                                                class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                                            >Reply</button>
                                        </p>
                                    </div>
                                </a>
                                <a href="#">
                                    <div class="inbox-item">
                                        <div class="inbox-item-img">
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                                class="rounded-circle"
                                                alt
                                            />
                                        </div>
                                        <p class="inbox-item-author">Stillnotdavid</p>
                                        <p class="inbox-item-text">This theme is awesome!</p>
                                        <p class="inbox-item-date">
                                            <button
                                                type="button"
                                                class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                                            >Reply</button>
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8">
                        <div class="row mb-5">
                            <div class="col-sm-4">
                                <div class="tilebox-one">
                                    <i class="icon-layers float-right text-muted"></i>
                                    <h6 class="text-muted text-uppercase mt-0">Orders</h6>
                                    <h2 class data-plugin="counterup">1,587</h2>
                                    <span class="badge badge-custom">+11%</span>
                                    <span class="text-muted">From previous period</span>
                                </div>
                            </div>
                            <!-- end col -->
                            <div class="col-sm-4">
                                <div class="tilebox-one">
                                    <i class="icon-paypal float-right text-muted"></i>
                                    <h6 class="text-muted text-uppercase mt-0">Revenue</h6>
                                    <h2 class>
                                        $
                                        <span data-plugin="counterup">46,782</span>
                                    </h2>
                                    <span class="badge badge-danger">-29%</span>
                                    <span class="text-muted">From previous period</span>
                                </div>
                            </div>
                            <!-- end col -->
                            <div class="col-sm-4">
                                <div class="tilebox-one">
                                    <i class="icon-rocket float-right text-muted"></i>
                                    <h6 class="text-muted text-uppercase mt-0">Product Sold</h6>
                                    <h2 class data-plugin="counterup">1,890</h2>
                                    <span class="badge badge-custom">+89%</span>
                                    <span class="text-muted">Last year</span>
                                </div>
                            </div>
                            <!-- end col -->
                        </div>
                        <!-- end row -->

                        <div v-if="categories.length !== 0" class="row">
                            <div class="col-md-12">
                                <div class="card-manage services">
                                    <div class="card-body">
                                        <h5 class="card-title text-uppercase mb-0">Manage Services</h5>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table no-wrap user-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        class="border-0 text-uppercase font-medium pl-4"
                                                    >#</th>
                                                    <th
                                                        scope="col"
                                                        class="border-0 text-uppercase font-medium"
                                                    >Category</th>
                                                    <th
                                                        scope="col"
                                                        class="border-0 text-uppercase font-medium"
                                                    >Description</th>
                                                    <th
                                                        scope="col"
                                                        class="border-0 text-uppercase font-medium"
                                                    >Services</th>
                                                    <th
                                                        scope="col"
                                                        class="border-0 text-uppercase font-medium"
                                                    >Manage</th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                v-for="category in categories"
                                                :key="category.id"
                                            >
                                                <tr>
                                                    <td class="pl-4">1</td>
                                                    <td>
                                                        <p class="m-0">{{ category.name }}</p>
                                                        <span
                                                            class="text-muted"
                                                        >Texas, United states</span>
                                                    </td>
                                                    <td>
                                                        <span class="text-muted">Visual Designer</span>
                                                        <br />
                                                        <span class="text-muted">Past : teacher</span>
                                                    </td>
                                                    <td style="vertical-align:middle">
                                                        <button
                                                            @click="goToService(category.name)"
                                                            type="button"
                                                            class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                                                        >View Services</button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            class="btn btn-outline-dark btn-circle btn-lg btn-circle ml-2"
                                                        >
                                                            <i class="fa fa-pencil"></i>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            class="btn btn-outline-dark btn-circle btn-lg btn-circle ml-2"
                                                        >
                                                            <i class="fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="categories.length > 0" class="d-flex justify-content-start mt-3">
                            <div class="w-100">
                                <div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
                                    <label class="btn btn-success" @click="onCreateCategory">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option2"
                                            autocomplete="off"
                                        /> Create Category
                                    </label>
                                    <label class="btn btn-secondary" @click="onCreateService">
                                        <input
                                            type="radio"
                                            name="options"
                                            id="option3"
                                            autocomplete="off"
                                        /> Create Service
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-5" v-if="!loading">
                            <div class="col-xl-12">
                                <Bookings class="services" />
                            </div>
                        </div>
                    </div>

                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- container -->
        </div>
    </div>
</template>

<script>
import Header from '~/components/dashboard/Header';
import CategoryCheck from '~/components/dashboard/CategoryCheck';
import Bookings from '~/components/dashboard/Bookings';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        Header,
        CategoryCheck,
        Bookings
    },
    data() {
        return {
            user: ''
        };
    },
    computed: {
        ...mapGetters({
            services: 'services',
            categories: 'categories',
            userId: 'userId',
            userData: 'userData'
        }),
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        ...mapActions(['createUserTable']),
        onCreateService() {
            this.$router.push('/service/create-service');
        },
        onCreateInitCat() {
            this.createUserTable(this.userId);
            this.$router.push('/service/create-category');
        },
        onCreateCategory() {
            this.$router.push('/service/create-category');
        },
        verifyEmail() {
            this.$router.push('/verification');
        },
        goToService(service) {
            this.$router.push({
                name: 'service-id',
                params: {
                    id: service
                }
            });
        }
    },
    beforeMount() {},
    mounted() {
        /*
         ** fires each time the page loads, it loads the logged in user object
         */
        firebase.auth().onAuthStateChanged((user) => {
            this.user = user;

            if (!this.user) {
                this.$router.push('/');
            }
        });
    }
};
</script>

<style scoped>
/* manage users */
.services {
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
}
.card-manage {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid transparent;
    border-radius: 0;
}
.btn-circle.btn-lg,
.btn-group-lg > .btn-circle.btn {
    width: 50px;
    height: 50px;
    padding: 14px 15px;
    font-size: 18px;
    line-height: 23px;
}
.text-muted {
    color: #8898aa !important;
}
[type='button']:not(:disabled),
[type='reset']:not(:disabled),
[type='submit']:not(:disabled),
button:not(:disabled) {
    cursor: pointer;
}
.btn-circle {
    border-radius: 100%;
    width: 40px;
    height: 40px;
    padding: 10px;
}
.user-table tbody tr .category-select {
    max-width: 150px;
}
</style>