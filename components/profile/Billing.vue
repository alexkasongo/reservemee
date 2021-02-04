<template>
    <!-- BILLING -->
    <div class="tab-pane" id="billing">
        <h6>BILLING SETTINGS</h6>
        <hr />
        <form>
            <div class="form-group">
                <label class="d-block mb-0">Payment Method</label>
                <div class="small text-muted mb-3">
                    You have not added a payment method
                </div>
                <div dark class="teal darken-1" type="button">
                    Add Payment Method
                </div>
            </div>
            <div class="form-group mb-0">
                <label class="d-block">Payment History</label>
                <div
                    class="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm"
                >
                    You have not made any payment.
                </div>
            </div>
        </form>
    </div>
    <!-- BILLING END -->
</template>

<script>
export default {};
</script>

<style lang="sass" scoped></style>
