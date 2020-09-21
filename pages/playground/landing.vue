<template>
    <div>
        <!-- start event block -->
        <div class="row align-items-center event-block no-gutters margin-40px-bottom">
            <div class="col-lg-7 order-2 order-lg-1">
                <div
                    class="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all"
                >
                    <h5
                        class="md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500"
                    >
                        <a href="event-details.html" class="text-theme-color">Craft Workshops</a>
                    </h5>
                    <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore</p>
                    <a
                        class="butn small margin-10px-top md-no-margin-top"
                        href="event-details.html"
                    >
                        Read More
                        <i class="fas fa-long-arrow-alt-right margin-10px-left"></i>
                    </a>
                </div>
            </div>
            <div class="col-lg-5 order-1 order-lg-2">
                <div class="position-relative">
                    <!-- <img src="https://via.placeholder.com/450x280/87CEFA/000000" alt /> -->
                    <div class="events-date">
                        <div class="font-size28">25</div>
                        <div class="font-size14">Feb</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end event block -->
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.events-date {
    text-align: center;
    position: absolute;
    right: 30px;
    top: 30px;
    background-color: rgba(25, 47, 89, 0.9);
    color: #fff;
    padding: 12px 20px 8px 20px;
    text-transform: uppercase;
}

.event-time li {
    display: inline-block;
    margin-right: 20px;
}

.event-time li:last-child {
    margin-right: 0;
}

.event-time li i {
    color: #59c17a;
}

.event-block {
    box-shadow: 0px 0px 16px 0px rgba(187, 187, 187, 0.48);
}

.event-block ul li i {
    color: #59c17a;
}

@media screen and (max-width: 1199px) {
    .event-date {
        padding: 10px 18px 6px 18px;
    }
}

@media screen and (max-width: 575px) {
    .event-date {
        padding: 8px 15px 4px 15px;
    }
    .events-date {
        padding: 10px 15px 6px 15px;
    }
}

.position-relative {
    position: relative !important;
    height: 130px;
}

.margin-40px-bottom {
    margin-bottom: 40px;
}
.padding-60px-lr {
    padding-left: 60px;
    padding-right: 60px;
}

.margin-10px-bottom {
    margin-bottom: 10px;
}
.margin-10px-right {
    margin-right: 10px;
}
</style>