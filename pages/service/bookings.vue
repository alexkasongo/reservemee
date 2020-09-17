<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-white mb-5">
                    <div class="card-heading clearfix border-bottom mb-4">
                        <h4 class="card-title">Booking Requests</h4>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled">
                            <li class="position-relative booking">
                                <div class="media">
                                    <div class="msg-img">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                            alt
                                        />
                                    </div>
                                    <div class="media-body">
                                        <h5 class="mb-4">
                                            Sunny Apartment
                                            <span
                                                class="badge badge-primary mx-3"
                                            >Pending</span>
                                            <span class="badge badge-danger">Unpaid</span>
                                        </h5>
                                        <div class="mb-3">
                                            <span
                                                class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0"
                                            >Booking Date:</span>
                                            <span class="bg-light-blue">02.03.2020 - 04.03.2020</span>
                                        </div>
                                        <div class="mb-3">
                                            <span
                                                class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0"
                                            >Booking Details:</span>
                                            <span class="bg-light-blue">2 Adults</span>
                                        </div>
                                        <div class="mb-3">
                                            <span
                                                class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0"
                                            >Price:</span>
                                            <span class="bg-light-blue">$147</span>
                                        </div>
                                        <div class="mb-5">
                                            <span
                                                class="mr-2 d-block d-sm-inline-block mb-1 mb-sm-0"
                                            >Clients:</span>
                                            <span class="border-right pr-2 mr-2">John Inoue</span>
                                            <span class="border-right pr-2 mr-2">john@example.com</span>
                                            <span>123-563-789</span>
                                        </div>
                                        <a href="#" class="btn-gray">Send Message</a>
                                    </div>
                                </div>
                                <div class="buttons-to-right">
                                    <a href="#" class="btn-gray mr-2">Reject</a>
                                    <a href="#" class="btn-gray">Approve</a>
                                </div>
                            </li>

                            <li class="position-relative booking">
                                <div class="media">
                                    <div class="msg-img">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                            alt
                                        />
                                    </div>
                                    <div class="media-body">
                                        <h5 class="mb-4">
                                            Burger House
                                            <span
                                                class="badge badge-success ml-3"
                                            >Approved</span>
                                        </h5>
                                        <div class="mb-3">
                                            <span
                                                class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0"
                                            >Booking Date:</span>
                                            <span class="bg-light-green">06.03.2020 - 07.03.2020</span>
                                        </div>
                                        <div class="mb-3">
                                            <span
                                                class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0"
                                            >Booking Details:</span>
                                            <span class="bg-light-green">2 Adults, 2 Children</span>
                                        </div>

                                        <div class="mb-5">
                                            <span
                                                class="mr-2 d-block d-sm-inline-block mb-1 mb-sm-0"
                                            >Clients:</span>
                                            <span class="border-right pr-2 mr-2">Jaime Cressey</span>
                                            <span class="border-right pr-2 mr-2">jaime@example.com</span>
                                            <span>355-456-789</span>
                                        </div>
                                        <a href="#" class="btn-gray">Send Message</a>
                                    </div>
                                </div>
                                <div class="buttons-to-right">
                                    <a href="#" class="btn-gray mr-2">Cancle</a>
                                </div>
                            </li>

                            <li class="position-relative booking">
                                <div class="media">
                                    <div class="msg-img">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                            alt
                                        />
                                    </div>
                                    <div class="media-body">
                                        <h5 class="mb-4">
                                            Modern Hotel
                                            <span
                                                class="badge badge-danger ml-3"
                                            >Cancled</span>
                                        </h5>
                                        <div class="mb-3">
                                            <span
                                                class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0"
                                            >Booking Date:</span>
                                            <span class="btn-gray">20.03.2020 - 24.03.2020</span>
                                        </div>
                                        <div class="mb-3">
                                            <span
                                                class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0"
                                            >Booking Details:</span>
                                            <span class="btn-gray">2 Adults</span>
                                        </div>
                                        <div>
                                            <span
                                                class="mr-2 d-block d-sm-inline-block mb-1 mb-sm-0"
                                            >Clients:</span>
                                            <span class="border-right pr-2 mr-2">Tesha Stovall</span>
                                            <span class="border-right pr-2 mr-2">tesha@example.com</span>
                                            <span>123-456-684</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
body {
    background: #f6f9fc;
    margin-top: 20px;
}
/* booking */

.bg-light-blue {
    background-color: #e9f7fe !important;
    color: #3184ae;
    padding: 7px 18px;
    border-radius: 4px;
}

.bg-light-green {
    background-color: rgba(40, 167, 69, 0.2) !important;
    padding: 7px 18px;
    border-radius: 4px;
    color: #28a745 !important;
}

.buttons-to-right {
    position: absolute;
    right: 0;
    top: 40%;
}

.btn-gray {
    color: #666;
    background-color: #eee;
    padding: 7px 18px;
    border-radius: 4px;
}

.booking:hover .buttons-to-right .btn-gray {
    opacity: 1;
    transition: 0.3s;
}

.buttons-to-right .btn-gray {
    opacity: 0;
    transition: 0.3s;
}

.btn-gray:hover {
    background-color: #36a3f5;
    color: #fff;
}

.booking {
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 30px;
}

.booking:last-child {
    margin-bottom: 0px;
    border-bottom: none;
    padding-bottom: 0px;
}

@media screen and (max-width: 575px) {
    .buttons-to-right {
        top: 10%;
    }
    .buttons-to-right a {
        display: block;
        margin-bottom: 20px;
    }
    .buttons-to-right a:last-child {
        margin-bottom: 0px;
    }
    .bg-light-blue,
    .bg-light-green,
    .btn-gray {
        padding: 7px;
    }
}

.card {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    box-shadow: none;
    border: none;
    padding: 25px;
}
.mb-5,
.my-5 {
    margin-bottom: 3rem !important;
}
.msg-img {
    margin-right: 20px;
}
.msg-img img {
    width: 60px;
    border-radius: 50%;
}
img {
    max-width: 100%;
    height: auto;
}
</style>