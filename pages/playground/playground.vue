<template>
    <v-simple-table fixed-header height="300px">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">Shopping Cart</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Description</th>
                    <th class="text-left">Quantity</th>
                    <th class="text-left">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="p-3 product-image">
                            <v-avatar color="primary" size="128">
                                <img src="https:via.placeholder.com/500" />
                            </v-avatar>
                        </div>
                    </td>
                    <td>
                        <div class="product-details">
                            <div class="product-title">Dingo Dog Bones</div>
                            <p class="product-description">
                                The best dog bones of all time. Holy crap. Your
                                dog will be begging for these things! I got
                                curious once and ate one myself. I'm a fan.
                            </p>
                        </div>
                    </td>

                    <td><div class="product-price">12.99</div></td>
                    <td><input type="number" value="2" min="1" /></td>
                    <td><div class="product-line-price">25.98</div></td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
export default {
    data: () => ({
        desserts: [
            {
                name: 'Frozen Yogurt',
                calories: 159
            },
            {
                name: 'Ice cream sandwich',
                calories: 237
            },
            {
                name: 'Eclair',
                calories: 262
            },
            {
                name: 'Cupcake',
                calories: 305
            },
            {
                name: 'Gingerbread',
                calories: 356
            },
            {
                name: 'Jelly bean',
                calories: 375
            },
            {
                name: 'Lollipop',
                calories: 392
            },
            {
                name: 'Honeycomb',
                calories: 408
            },
            {
                name: 'Donut',
                calories: 452
            },
            {
                name: 'KitKat',
                calories: 518
            }
        ]
    })
};
</script>

<style lang="scss" scoped>
</style>