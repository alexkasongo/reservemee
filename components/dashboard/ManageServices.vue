<template>
    <v-data-table
        :headers="headers"
        :items="categories"
        :items-per-page="5"
        sort-by="calories"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>My Categories</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            dark
                            class="teal darken-1 mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            New Category
                        </v-btn>
                    </template>

                    <!-- NEW CATEGORY -->
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="editedItem.name"
                                            label="Category name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea
                                            v-model="editedItem.description"
                                            label="Description"
                                        ></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="teal darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn
                                v-if="formTitle === 'New Category'"
                                color="teal darken-1"
                                text
                                @click="save"
                            >
                                Create
                            </v-btn>
                            <v-btn
                                v-else
                                color="teal darken-1"
                                text
                                @click="update"
                            >
                                Update
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <!-- NEW CATEGORY END -->
                </v-dialog>

                <!-- DELETE DIALOG -->
                <v-dialog v-model="dialogDelete" max-width="500px">
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
                </v-dialog>
                <!-- DELETE DIALOG -->
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:[`item.services`]="{ item }">
            <v-btn
                elevation="0"
                small
                class="mr-2"
                @click="goToService(item.name)"
            >
                View Services
            </v-btn>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
    </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ManageServices',
    data: () => ({
        item: '',
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'Categories',
                sortable: false,
                align: 'start',
                value: 'name'
            },
            { text: 'Services', value: 'services', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false },
            { text: 'Description', value: 'description' }
        ],
        editedIndex: -1,
        editedItem: {
            name: '',
            description: ''
        },
        defaultItem: {
            name: '',
            description: ''
        }
    }),
    computed: {
        ...mapGetters({
            categories: 'dashboard/categories',
            services: 'dashboard/services',
            loading: 'loaders/loading',
            user: 'user'
        }),
        formTitle() {
            return this.editedIndex === -1 ? 'New Category' : 'Edit Category';
        }
    },
    methods: {
        ...mapActions({
            createCategory: 'dashboard/createCategory',
            loadCategories: 'dashboard/loadCategories',
            deleteCategory: 'dashboard/deleteCategory',
            updateCategory: 'dashboard/updateCategory',
            loadServices: 'dashboard/loadServices'
        }),
        onCreateService() {
            this.$router.push('/service/create-service');
        },
        onCreateCategory() {
            this.$router.push('/service/create-category');
        },
        goToService(service) {
            this.$router.push({
                name: 'service-id',
                params: {
                    id: service
                }
            });
        },
        updCategory(id) {
            this.$router.push({
                name: 'update-category-id',
                params: {
                    id: id
                }
            });
        },
        removeCategory(id) {
            const payload = {
                userId: this.user.uid,
                id: id
            };
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteCategory(payload);
                    this.loadCategories(this.user.uid);
                    this.$swal(
                        'Deleted!',
                        'Category has been Deleted.',
                        'success'
                    );
                }
            });
        },

        editItem(item) {
            this.editedItem = Object.assign({}, item);
            this.editedIndex = item.id;
            this.dialog = true;
            this.item = item;
        },

        deleteItem(item) {
            // this.editedIndex = item.id;
            // this.editedItem = Object.assign({}, item);
            this.item = item;
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            const payload = {
                userId: this.user.uid,
                id: this.item.id
            };

            this.loadCategories(this.user.uid);
            this.deleteCategory(payload);
            this.$swal({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Deleted',
                showConfirmButton: false,
                timer: 2500
            });

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

        async save() {
            // category with dashes
            let res = this.editedItem.name.replace(/\s+/g, '-').toLowerCase();

            let data = {
                category: res,
                description: this.editedItem.description,
                userId: this.user.uid
            };
            await this.createCategory(data);
            // this.loadCategories();
            this.close();
        },
        async update() {
            let categoryName = this.editedItem.name
                .replace(/\s+/g, '-')
                .toLowerCase();

            let data = {
                description: this.editedItem.description,
                userId: this.user.uid,
                name: categoryName,
                id: this.item.id
            };

            await this.updateCategory(data).then(() => {
                this.loadCategories(this.user.uid);
            });

            this.close();
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

    mounted() {
        this.loadCategories(this.user.uid);
    }
};
</script>

<style lang="scss" scoped></style>
