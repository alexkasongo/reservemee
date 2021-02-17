<template>
    <div>bookings</div>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'Service',
                align: 'start',
                sortable: false,
                value: 'name'
            },
            // { text: 'Service', value: 'calories' },
            { text: 'Booking Date', value: 'date' },
            { text: 'Booking Time', value: 'time' },
            { text: 'Price', value: 'price' },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            date: 0,
            time: 0,
            price: 0
        },
        defaultItem: {
            name: '',
            calories: 0,
            date: 0,
            time: 0,
            price: 0
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        }
    },

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            this.desserts = [
                {
                    name: 'Service one',
                    calories: 159,
                    date: '12-07-20',
                    time: '07:00',
                    price: '$15'
                },
                {
                    name: 'Service two',
                    calories: 237,
                    date: '12-07-20',
                    time: '09:00',
                    price: '$25'
                },
                {
                    name: 'Service three',
                    calories: 262,
                    date: '12-07-20',
                    time: '13:00',
                    price: '$45'
                },
                {
                    name: 'Service four',
                    calories: 305,
                    date: '12-07-20',
                    time: '15:00',
                    price: '$15'
                },
                {
                    name: 'Service five',
                    calories: 356,
                    date: '12-07-20',
                    time: '09:00',
                    price: '$15'
                },
                {
                    name: 'Service six',
                    calories: 375,
                    date: '12-07-20',
                    time: '11:00',
                    price: '$20'
                },
                {
                    name: 'Service six',
                    calories: 375,
                    date: '12-07-20',
                    time: '08:00',
                    price: '$25'
                }
            ];
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
                this.desserts.push(this.editedItem);
            }
            this.close();
        }
    }
};
</script>

<style scoped></style>
