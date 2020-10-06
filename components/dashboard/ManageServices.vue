<template>
    <!-- ManageServices -->
    <!-- <div class="row">
        <div class="col-md-12">
            <div class="card-manage services-card">
                <div class="card-body">
                    <h5 class="card-title text-uppercase mb-0">
                        Manage Services
                    </h5>
                </div>
                <div class="table-responsive">
                    <table class="table no-wrap user-table mb-0">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    class="border-0 text-uppercase font-medium pl-4"
                                >
                                    #
                                </th>
                                <th
                                    scope="col"
                                    class="border-0 text-uppercase font-medium"
                                >
                                    Category
                                </th>
                                <th
                                    scope="col"
                                    class="border-0 text-uppercase font-medium"
                                >
                                    Description
                                </th>
                                <th
                                    scope="col"
                                    class="border-0 text-uppercase font-medium"
                                >
                                    Services
                                </th>
                                <th
                                    scope="col"
                                    class="border-0 text-uppercase font-medium"
                                >
                                    Manage
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            v-for="(category, categoryKey) in categories"
                            :key="category.id"
                        >
                            <tr>
                                <td style="vertical-align: middle" class="pl-4">
                                    {{ categoryKey + 1 }}
                                </td>
                                <td style="vertical-align: middle">
                                    <p class="m-0">
                                        {{ category.name | capitalize }}
                                    </p>
                                </td>
                                <td style="vertical-align: middle">
                                    <span class="text-muted">{{
                                        category.description
                                    }}</span>
                                </td>
                                <td style="vertical-align: middle">
                                    <v-btn
                                        outlined
                                        small
                                        dark
                                        elevation="0"
                                        @click="goToService(category.name)"
                                        color="teal darken-1"
                                    >
                                        View Services
                                    </v-btn>
                                </td>
                                <td>
                                    <v-btn
                                        @click="updCategory(category.id)"
                                        type="button"
                                        icon
                                    >
                                        <i class="fa fa-pencil"></i>
                                    </v-btn>
                                    <v-btn
                                        @click="removeCategory(category.id)"
                                        type="button"
                                        icon
                                    >
                                        <i class="fa fa-trash"></i>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div
                v-if="categories.length > 0"
                class="d-flex justify-content-start mt-3"
            >
                <div class="w-100">
                    <div
                        class="btn-group btn-group-toggle w-100"
                        data-toggle="buttons"
                    >
                        <label
                            class="btn btn-success"
                            @click="onCreateCategory"
                        >
                            <input
                                type="radio"
                                name="options"
                                id="option2"
                                autocomplete="off"
                            />
                            Create Category
                        </label>
                        <label
                            class="btn btn-secondary"
                            @click="onCreateService"
                        >
                            <input
                                type="radio"
                                name="options"
                                id="option3"
                                autocomplete="off"
                            />
                            Create Service
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <!-- ManageServices -->

    <!-- <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card-manage services-card">
                    <div class="card-body">
                        <h5 class="card-title text-uppercase mb-0">
                            Manage Services
                        </h5>
                    </div>
                    <div class="table-responsive">
                        <table class="table no-wrap user-table mb-0">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        class="border-0 text-uppercase font-medium pl-4"
                                    >
                                        #
                                    </th>
                                    <th
                                        scope="col"
                                        class="border-0 text-uppercase font-medium"
                                    >
                                        Category
                                    </th>
                                    <th
                                        scope="col"
                                        class="border-0 text-uppercase font-medium"
                                    >
                                        Description
                                    </th>
                                    <th
                                        scope="col"
                                        class="border-0 text-uppercase font-medium"
                                    >
                                        Services
                                    </th>
                                    <th
                                        scope="col"
                                        class="border-0 text-uppercase font-medium"
                                    >
                                        Manage
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                v-for="(category, categoryKey) in categories"
                                :key="category.id"
                            >
                                <tr>
                                    <td
                                        style="vertical-align: middle"
                                        class="pl-4"
                                    >
                                        {{ categoryKey + 1 }}
                                    </td>
                                    <td style="vertical-align: middle">
                                        <p class="m-0">
                                            {{ category.name | capitalize }}
                                        </p>
                                    </td>
                                    <td style="vertical-align: middle">
                                        <span class="text-muted">{{
                                            category.description
                                        }}</span>
                                    </td>
                                    <td style="vertical-align: middle">
                                        <v-btn
                                            outlined
                                            small
                                            dark
                                            elevation="0"
                                            @click="goToService(category.name)"
                                            color="teal darken-1"
                                        >
                                            View Services
                                        </v-btn>
                                    </td>
                                    <td>
                                        <v-btn
                                            @click="updCategory(category.id)"
                                            type="button"
                                            icon
                                        >
                                            <i class="fa fa-pencil"></i>
                                        </v-btn>
                                        <v-btn
                                            @click="removeCategory(category.id)"
                                            type="button"
                                            icon
                                        >
                                            <i class="fa fa-trash"></i>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div
                    v-if="categories.length > 0"
                    class="d-flex justify-content-start mt-3"
                >
                    <div class="w-100">
                        <div
                            class="btn-group btn-group-toggle w-100"
                            data-toggle="buttons"
                        >
                            <label
                                class="btn btn-success"
                                @click="onCreateCategory"
                            >
                                <input
                                    type="radio"
                                    name="options"
                                    id="option2"
                                    autocomplete="off"
                                />
                                Create Category
                            </label>
                            <label
                                class="btn btn-secondary"
                                @click="onCreateService"
                            >
                                <input
                                    type="radio"
                                    name="options"
                                    id="option3"
                                    autocomplete="off"
                                />
                                Create Service
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <v-data-table
            :headers="headers"
            :items="categories"
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
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="close"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn v-if="formTitle === 'New Category'" color="blue darken-1" text @click="save">
                                    Create
                                </v-btn>
                                <v-btn v-else color="blue darken-1" text @click="update">
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
                                    color="blue darken-1"
                                    text
                                    @click="closeDelete"
                                    >Cancel</v-btn
                                >
                                <v-btn
                                    color="blue darken-1"
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
                <v-btn small class="mr-2" @click="goToService(item.name)">
                    View Services
                </v-btn>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
        </v-data-table>
    </div>
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
                align: 'start',
                sortable: false,
                value: 'name'
            },
            { text: 'Description', value: 'description' },
            { text: 'Services', value: 'services', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false }
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
            services: 'services',
            categories: 'categories',
            user: 'user'
        }),
        loading() {
            return this.$store.getters.loading;
        },
        formTitle() {
            return this.editedIndex === -1 ? 'New Category' : 'Edit Category';
        }
    },
    methods: {
        ...mapActions([
            'createCategory',
            'loadCategories',
            'deleteCategory',
            'updateCategory',
            'loadServices'
        ]),
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
            this.editedIndex = item.id;
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
            this.item = item;

            console.log(`ManageServices.vue - 485 - you just clicked`);
        },

        deleteItem(item) {
            // this.editedIndex = item.id;
            // this.editedItem = Object.assign({}, item);
            this.item = item;
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            console.log(`ManageServices.vue - 493 - 🇿🇦`, this.item);
            const payload = {
                userId: this.user.uid,
                id: this.item.id
            };

            this.deleteCategory(payload);
            this.loadCategories(this.user.uid);
            this.$swal({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Deleted',
                showConfirmButton: false,
                timer: 1500
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
            // if (this.editedIndex > -1) {
            //     Object.assign(this.desserts[this.editedIndex], this.editedItem);
            // } else {
            //     this.desserts.push(this.editedItem);
            // }

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
                userId: this.user.uid,
                id: this.item.id,
                name: categoryName,
                description: this.editedItem.description
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
