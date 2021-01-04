<template>
    <div class="cart">
        <v-data-table
            :headers="headers"
            :items="orders"
            :items-per-page="5"
            sort-by="calories"
            class="elevation-1"
        >
            <template v-slot:top> </template>
            <template v-slot:[`item.serviceImage`]="{ item }">
                <div class="p-3">
                    <v-img
                        class="cart__image"
                        lazy-src="https://picsum.photos/id/11/10/6"
                        :src="item.serviceImage"
                    ></v-img>
                </div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:[`item.quantity`]>
                <v-text-field label="1"></v-text-field>
            </template>
        </v-data-table>

        <div class="pt-10 pr-10 cart__total-container">
            <v-row class="cart__totals">
                <v-col class="cart__totals-item">
                    <div class="cart__totals-label">Subtotal</div>
                    <div class="cart__totals-label">Tax (5%)</div>
                    <div class="cart__totals-grand-label">Grand Total</div>
                </v-col>
                <v-col class="cart__totals-item">
                    <div class="cart__totals-value" id="cart-tax">
                        {{ subTotal }}
                    </div>
                    <div class="cart__totals-value" id="cart-shipping">
                        15.00
                    </div>
                    <div class="cart__totals-value" id="cart-total">
                        <!-- {{ grandTotal }} -->
                    </div>
                </v-col>
            </v-row>
            <div class="cart__checkout-btn pt-5 pr-0 pb-10">
                <v-btn color="teal darker-1" dark x-large class="cart__checkout"
                    >Checkout</v-btn
                >
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        item: '',
        orders: [],
        headers: [
            {
                text: 'Shopping Cart',
                align: 'start',
                sortable: false,
                value: 'serviceImage'
            },
            {
                text: 'Description',
                sortable: false,
                value: 'serviceDescription'
            },
            { text: 'Price', sortable: false, value: 'servicePrice' },
            { text: 'Quantity', sortable: false, value: 'quantity' },
            { text: 'Actions', sortable: false, value: 'actions' },
            { text: 'Total', sortable: false, value: 'servicePrice' }
        ],
        subTotal: 0,
        grandTotal: 0
    }),
    computed: {
        ...mapState({
            ordersState: 'cart'
        })
        // orders() {
        //     return this.ordersState.order;
        // }
    },
    methods: {
        deleteItem(ev) {}
    },
    mounted() {
        this.orders = this.ordersState.order;

        // WORK OUT CART TOTAL
        const orders = this.ordersState.order;
        let total = 0;
        orders.forEach((order) => {
            total += parseInt(order.servicePrice);
        });
        this.subTotal = total;
        // Tex inclusive
        this.grandTotal = (6.5 / 100) * total + total;
        // WORK OUT CART TOTAL END
    }
};
</script>

<style lang="scss" scoped></style>
