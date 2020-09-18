<template>
    <!-- StoreSummary -->
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
    <!-- StoreSummary -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'StoreSummary',
    computed: {
        ...mapGetters({
            user: 'user'
        })
    }
};
</script>

<style lang="scss" scoped>
</style>