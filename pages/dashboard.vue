<template>
    <div class="mt-3">
        <div class="content">
            <!-- <h1>DASHBOARD</h1> -->
            <div>
                <div class="row">
                    <div class="col-sm-12">
                        <!-- meta -->
                        <div class="profile-user-box card-box bg-custom">
                            <div class="row">
                                <div class="col-sm-6">
                                    <span class="float-left mr-3">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                            alt
                                            class="thumb-lg rounded-circle"
                                        />
                                    </span>
                                    <div class="media-body text-white">
                                        <h4 class="mt-1 mb-1 font-18">{{user.displayName}}</h4>
                                        <!-- <p class="font-13 text-light">User Experience Specialist</p> -->
                                        <p class="text-light mb-0">Lynnwood, United States</p>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="text-right">
                                        <button type="button" class="btn btn-light waves-effect">
                                            <i class="mdi mdi-account-settings-variant mr-1"></i> Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--/ meta -->
                    </div>
                </div>
                <!-- end row -->
                <div class="row">
                    <div class="col-xl-4">
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
                                            <i class="fa fa-facebook"></i>
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
                                            <i class="fa fa-twitter"></i>
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
                                            <i class="fa fa-skype"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- Personal-Information -->
                        <div class="card-box ribbon-box">
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
                        <div class="mb-5">
                            <div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="widget widget-reminder">
                                            <div class="widget-reminder-header">TODAY, NOV 4</div>
                                            <div class="widget-reminder-container">
                                                <div class="widget-reminder-time">
                                                    09:00
                                                    <br />12:00
                                                </div>
                                                <div class="widget-reminder-divider bg-success"></div>
                                                <div class="widget-reminder-content">
                                                    <h4 class="widget-title">Meeting with HR</h4>
                                                    <div class="widget-desc">
                                                        <i class="fa fa-map-pin"></i> Conference Room
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="widget-reminder-container">
                                                <div class="widget-reminder-time">
                                                    20:00
                                                    <br />23:00
                                                </div>
                                                <div class="widget-reminder-divider bg-primary"></div>
                                                <div class="widget-reminder-content">
                                                    <h4 class="widget-title">Dinner with Richard</h4>
                                                    <div class="widget-desc">
                                                        <i class="fa fa-map-pin"></i> Tom's Too Restaurant
                                                    </div>
                                                    <div class="m-t-15">
                                                        <a href="#" class="pull-right">Contact</a>
                                                        <img
                                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                            width="16"
                                                            class="img-circle pull-left m-r-5"
                                                            alt
                                                        /> Richard Leong
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="widget-reminder-header">TOMORROW, NOV 5</div>
                                            <div class="widget-reminder-container">
                                                <div class="widget-reminder-time">All day</div>
                                                <div class="widget-reminder-divider bg-purple"></div>
                                                <div class="widget-reminder-content">
                                                    <h4 class="widget-title">
                                                        <i class="fa fa-gift text-purple"></i> Terry Birthday
                                                    </h4>
                                                </div>
                                            </div>
                                            <div class="widget-reminder-container">
                                                <div class="widget-reminder-time">
                                                    00:00
                                                    <br />00:30
                                                </div>
                                                <div class="widget-reminder-divider bg-danger"></div>
                                                <div class="widget-reminder-content">
                                                    <h4 class="widget-title">Server Maintenance</h4>
                                                    <div class="widget-desc">
                                                        <i class="ti-pin"></i> Data Centre
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="header-title mb-3">My Services</h4>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <!-- <th></th> -->
                                            <th>Project Name</th>
                                            <th>Start Date</th>
                                            <th>Due Date</th>
                                            <th>Status</th>
                                            <th>Assign</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <!-- <td></td> -->
                                            <td>Adminox Admin</td>
                                            <td>01/01/2015</td>
                                            <td>07/05/2015</td>
                                            <td>
                                                <span class="label label-info">Work in Progress</span>
                                            </td>
                                            <td>Coderthemes</td>
                                        </tr>
                                        <tr>
                                            <!-- <td></td> -->
                                            <td>Adminox Frontend</td>
                                            <td>01/01/2015</td>
                                            <td>07/05/2015</td>
                                            <td>
                                                <span class="label label-success">Pending</span>
                                            </td>
                                            <td>Coderthemes</td>
                                        </tr>
                                        <tr>
                                            <!-- <td></td> -->
                                            <td>Adminox Admin</td>
                                            <td>01/01/2015</td>
                                            <td>07/05/2015</td>
                                            <td>
                                                <span class="label label-pink">Done</span>
                                            </td>
                                            <td>Coderthemes</td>
                                        </tr>
                                        <tr>
                                            <!-- <td></td> -->
                                            <td>Adminox Frontend</td>
                                            <td>01/01/2015</td>
                                            <td>07/05/2015</td>
                                            <td>
                                                <span class="label label-purple">Work in Progress</span>
                                            </td>
                                            <td>Coderthemes</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- container -->
        </div>
        <div>
            <div class="home__grid-left">
                <div class="w-100">
                    <div v-if="loading" class="mt-2">
                        <p>loading...</p>
                    </div>
                    <div v-if="!loading">
                        <div v-if="categories.length == 0">
                            <div class="w-100">
                                <div class="card">
                                    <div class="card-header">Dashboard</div>
                                    <div class="card-body">
                                        <h3 v-if="user">Welcome {{ user.displayName }}</h3>
                                        <p>You currently have no services. Start by creating a category.</p>

                                        <button
                                            @click="onCreateInitCat"
                                            type="button"
                                            class="btn btn-block btn-primary"
                                        >Create Category</button>
                                    </div>
                                </div>
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
                                        class="btn btn-block btn-primary"
                                    >Verify Email</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="categories.length > 0" class="d-flex justify-content-start mt-3">
                        <div class="w-100">
                            <div class="card">
                                <div class="card-header">
                                    <h4>Service Categories</h4>
                                </div>
                                <ul
                                    v-for="category in categories"
                                    :key="category.id"
                                    class="list-group list-group-flush"
                                >
                                    <li
                                        @click="goToService(category.name)"
                                        class="list-group-item list-group-item-action"
                                    >{{ category.name | capitalize }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-if="categories.length > 0" class="d-flex justify-content-start mt-3">
                        <div class="w-100">
                            <div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
                                <label class="btn btn-primary" @click="onCreateCategory">
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
                </div>
            </div>
            <div v-if="!loading">
                <div class="home__grid-right">
                    <Bookings />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bookings from '~/components/dashboard/Bookings';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
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
/*
** DASHBOARD
*/
.thumb-lg {
    height: 88px;
    width: 88px;
}
.profile-user-box {
    position: relative;
    border-radius: 5px;
}
.bg-custom {
    background-color: #82b5a5 !important;
}
.profile-user-box {
    position: relative;
    border-radius: 5px;
}

.card-box {
    padding: 20px;
    border-radius: 3px;
    margin-bottom: 30px;
    background-color: #fff;
}
.inbox-widget .inbox-item img {
    width: 40px;
}

.inbox-widget .inbox-item {
    border-bottom: 1px solid #f3f6f8;
    overflow: hidden;
    padding: 10px 0;
    position: relative;
}

.inbox-widget .inbox-item .inbox-item-img {
    display: block;
    float: left;
    margin-right: 15px;
    width: 40px;
}

.inbox-widget .inbox-item img {
    width: 40px;
}

.inbox-widget .inbox-item .inbox-item-author {
    color: #313a46;
    display: block;
    margin: 0;
}

.inbox-widget .inbox-item .inbox-item-text {
    color: #98a6ad;
    display: block;
    font-size: 14px;
    margin: 0;
}

.inbox-widget .inbox-item .inbox-item-date {
    color: #98a6ad;
    font-size: 11px;
    position: absolute;
    right: 7px;
    top: 12px;
}

.comment-list .comment-box-item {
    position: relative;
}

.comment-list .comment-box-item .commnet-item-date {
    color: #98a6ad;
    font-size: 11px;
    position: absolute;
    right: 7px;
    top: 2px;
}

.comment-list .comment-box-item .commnet-item-msg {
    color: #313a46;
    display: block;
    margin: 10px 0;
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
}

.comment-list .comment-box-item .commnet-item-user {
    color: #98a6ad;
    display: block;
    font-size: 14px;
    margin: 0;
}

.comment-list a + a {
    margin-top: 15px;
    display: block;
}

.ribbon-box .ribbon-primary {
    background: #82b5a5;
}

.ribbon-box .ribbon {
    position: relative;
    float: left;
    clear: both;
    padding: 5px 12px 5px 12px;
    margin-left: -30px;
    margin-bottom: 15px;
    font-family: Rubik, sans-serif;
    box-shadow: 0 0 13px 0 rgba(236, 236, 241, 0.44);
    color: #fff;
    font-size: 13px;
}
.text-custom {
    color: #a0bfff !important;
}

.badge-custom {
    background: #a0bfff;
    color: #fff;
}
.badge {
    font-family: Rubik, sans-serif;
    box-shadow: 0 0 13px 0 rgba(236, 236, 241, 0.44);
    padding: 0.35em 0.5em;
    font-weight: 500;
}
.text-muted {
    color: #98a6ad !important;
}

.font-13 {
    font-size: 13px !important;
}
/*
** ORDERS
*/
.card {
    border: none;
    margin-bottom: 24px;
    box-shadow: 0 0 13px 0 rgba(236, 236, 241, 0.44);
}

.avatar-xs {
    height: 2.3rem;
    width: 2.3rem;
}
/*
** REMINDERS
*/
.widget {
    background: #fff;
    margin-bottom: 0.75rem;
    display: block;
    position: relative;
    box-shadow: 0 0 13px 0 rgba(236, 236, 241, 0.44);
}
.widget .widget-header,
.widget-reminder-content,
.widget-reminder-time,
a.widget-header-title {
    padding: 0.625rem;
}
.widget-chat-message:after,
.widget-chat-message:before,
.widget-reminder-container:after,
.widget-reminder-container:before {
    display: table;
    content: '';
    clear: both;
}
.widget-footer.with-border,
.widget-reminder-container + .widget-reminder-container {
    border-top: 1px solid #efeff4;
}
.widget-footer.with-bg,
.widget-header.with-bg {
    background: #efeff4;
}
.widget-header.with-border {
    border-bottom: 1px solid #efeff4;
}
.widget-reminder-header {
    background: #efeff4;
    padding: 0.625rem;
    font-size: 0.625rem;
    font-weight: 700;
    color: #8a8a8f;
}
.widget-reminder-container {
    position: relative;
}
.inverse-mode .widget-reminder-container + .widget-reminder-container {
    border-color: #333;
}
.inverse-mode .widget-reminder-header {
    background: #212121;
}
.widget-reminder-time {
    width: 5rem;
    float: left;
    text-align: right;
    font-size: 0.625rem;
}
.widget-reminder-divider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 5rem;
    width: 0.125rem;
    background: #efeff4;
}
.widget-reminder-content {
    margin-left: 5.125rem;
}
.widget-header-title {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 500;
}
.widget .widget-title,
.widget .widget-title a {
    font-size: 0.75rem;
    color: #000;
    line-height: 1rem;
}
.widget .widget-title {
    font-weight: 600;
    margin: 0;
}
.widget-desc,
.widget-desc a {
    font-size: 0.6875rem;
    line-height: 1rem;
    color: #8a8a8f;
    font-weight: 500;
}
.img-circle {
    border-radius: 50%;
}

.pull-left {
    float: left !important;
}
.pull-right {
    float: right !important;
}
.m-t-15 {
    margin-top: 15px !important;
}

.m-r-5 {
    margin-right: 5px !important;
}

.widget .widget-header,
.widget-reminder-content,
.widget-reminder-time,
a.widget-header-title {
    padding: 0.625rem;
}
</style>