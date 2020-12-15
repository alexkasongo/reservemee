<template>
    <div class="cart">
        <v-data-table
            :headers="headers"
            :items="orders"
            :items-per-page="5"
            sort-by="calories"
            class="elevation-1"
        >
            <template v-slot:top>
                <!-- <v-toolbar flat> -->
                <!-- <v-toolbar-title>My Orders</v-toolbar-title> -->
                <!-- <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer> -->
                <!-- <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                dark
                                class="teal darken-1 mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                New Order
                            </v-btn>
                        </template>
                    </v-dialog> -->

                <!-- DELETE DIALOG -->
                <!-- <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="headline"
                                >Are you sure you want to delete this
                                item?</v-card-title
                            >
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="teal darken-1"
                                    text
                                    @click="closeDelete"
                                    >Cancel</v-btn
                                >
                                <v-btn
                                    color="teal darken-1"
                                    text
                                    @click="deleteItemConfirm"
                                    >OK</v-btn
                                >
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog> -->
                <!-- DELETE DIALOG -->
                <!-- </v-toolbar> -->
            </template>
            <template v-slot:[`item.serviceImage`]="{ item }">
                <div class="p-3">
                    <v-img
                        lazy-src="https://picsum.photos/id/11/10/6"
                        max-height="150"
                        max-width="250"
                        :src="item.serviceImage"
                    ></v-img>
                    <!-- <p>{{ item.serviceImage }}</p> -->
                </div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:[`item.quantity`]>
                <v-text-field label="1"></v-text-field>
            </template>
            <!-- <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template> -->
        </v-data-table>

        <div class="pt-10 pr-10 cart__total-container">
            <div class="cart__totals">
                <div class="cart__totals-item">
                    <div class="cart__totals-label">Subtotal</div>
                    <div class="cart__totals-label">Tax (5%)</div>
                    <div class="cart__totals-label">Shipping</div>
                    <div class="cart__totals-grand-label display-1">
                        Grand Total
                    </div>
                </div>
                <div class="cart__totals-item">
                    <div class="cart__totals-value" id="cart-subtotal">
                        71.97
                    </div>
                    <div class="cart__totals-value" id="cart-tax">3.60</div>
                    <div class="cart__totals-value" id="cart-shipping">
                        15.00
                    </div>
                    <div
                        class="cart__totals-value display-1"
                        id="cart-total display-1"
                    >
                        90.57
                    </div>
                </div>
            </div>
        </div>
        <div class="cart__checkout-btn pt-5 pr-10">
            <v-btn color="teal darker-1" dark x-large class="cart__checkout"
                >Checkout</v-btn
            >
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
        ]
    }),
    computed: {
        ...mapState({
            ordersState: 'cart'
        })
        // orders() {
        //     return this.ordersState.order;
        // }
    },
    mounted() {
        console.log(`playground.vue - 52 - 💦`, this.ordersState);
        this.orders = this.ordersState.order;
        console.log(`playground.vue - 68 - 🏝`, this.ordersState);
    }
};
</script>

<style lang="scss" scoped>
/* Totals section */
.cart {
    &__total-container {
        // background: darkcyan;
        width: 100%;
    }
    &__totals {
        display: flex;
        justify-content: space-between;
        width: 400px;
        margin: 0 0 0 auto;
        // background: coral;
    }
    &__totals-label {
        margin: 0 0 10px 0;
        text-align: right;
    }
    // &__totals-grand-label {
    //     font-weight: bold;
    // }
    &__totals-value {
        margin: 0 0 10px 0;
        text-align: right;
    }
    &__checkout-btn {
        display: flex;
        justify-content: flex-end;
    }
}
/* Totals section */
</style>