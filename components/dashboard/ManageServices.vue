<template>
    <div class="service">
        <!-- <v-data-table
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
                    
                    <div v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <div
                                dark
                                class="teal darken-1 mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                New Category
                            </div>
                        </template>


                        <div>
                            <div-title>
                                <span class="headline">{{ formTitle }}</span>
                            </div-title>

                            <div-text>
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
                            </div-text>

                            <div>
                                
                                <div
                                    color="teal darken-1"
                                    text
                                    @click="close"
                                >
                                    Cancel
                                </div>
                                <div
                                    v-if="formTitle === 'New Category'"
                                    color="teal darken-1"
                                    text
                                    @click="save"
                                >
                                    Create
                                </div>
                                <div
                                    v-else
                                    color="teal darken-1"
                                    text
                                    @click="update"
                                >
                                    Update
                                </div>
                            </div>
                        </div>
                    </div>


                    <div v-model="dialogDelete" max-width="500px">
                        <div>
                            <div-title class="headline"
                                >Are you sure you want to delete this
                                item?</div-title
                            >
                            <div>
                                
                                <div
                                    color="teal darken-1"
                                    text
                                    @click="closeDelete"
                                    >Cancel</div
                                >
                                <div
                                    color="teal darken-1"
                                    text
                                    @click="deleteItemConfirm"
                                    >OK</div
                                >
                                
                            </div>
                        </div>
                    </div>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:[`item.services`]="{ item }">
                <div
                    elevation="0"
                    small
                    class="mr-2"
                    @click="goToService(item.name)"
                >
                    View Services
                </div>
            </template>
        </v-data-table> -->

        <!-- BEUFY -->

        <section class="service__border">
            <b-field>
                <b-button @click="onCreateCategory" class="is-primary mb-5"
                    >Create Service</b-button
                >
            </b-field>
            <b-table
                :data="categories"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :pagination-simple="isPaginationSimple"
                :pagination-position="paginationPosition"
                :default-sort-direction="defaultSortDirection"
                :pagination-rounded="isPaginationRounded"
                :sort-icon="sortIcon"
                :sort-icon-size="sortIconSize"
                default-sort="user.first_name"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
            >
                <!-- <b-table-column
                    field="id"
                    label="ID"
                    width="40"
                    sortable
                    numeric
                    v-slot="props"
                >
                    {{ props.row.id }}
                </b-table-column> -->

                <b-table-column
                    field="name"
                    label="Name"
                    sortable
                    v-slot="props"
                >
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column
                    field="description"
                    label="Description"
                    sortable
                    v-slot="props"
                >
                    {{ props.row.description }}
                </b-table-column>

                <b-table-column
                    field="name"
                    label="Services"
                    sortable
                    centered
                    v-slot="props"
                >
                    <span
                        class="tag is-success"
                        style="cursor: pointer"
                        @click="goToService(props.row.name)"
                    >
                        View Services
                    </span>
                </b-table-column>

                <b-table-column label="Actions">
                    <span>
                        <b-icon icon="pencil" style="cursor: pointer"> </b-icon>
                        <b-icon icon="delete" style="cursor: pointer"> </b-icon>
                    </span>
                </b-table-column>
            </b-table>
        </section>

        <section>
            <b-modal
                v-model="isCardModalActive"
                :width="960"
                scroll="keep"
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-label="Events Modal"
                aria-modal
            >
                <section class="card">
                    <div class="field card-content dialog">
                        <div class="field">
                            <b-field label="Details">
                                <b-input
                                    maxlength="200"
                                    type="textarea"
                                ></b-input>
                            </b-field>
                        </div>
                        <div class="field">
                            <button class="button is-primary">Update</button>
                        </div>
                    </div>
                </section>
            </b-modal>
        </section>
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
                sortable: false,
                align: 'start',
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
        },
        // NEW
        data: [
            {
                id: 1,
                user: { first_name: 'Jesse', last_name: 'Simmons' },
                date: '2016/10/15 13:43:27',
                gender: 'Male'
            },
            {
                id: 2,
                user: { first_name: 'John', last_name: 'Jacobs' },
                date: '2016/12/15 06:00:53',
                gender: 'Male'
            },
            {
                id: 3,
                user: { first_name: 'Tina', last_name: 'Gilbert' },
                date: '2016/04/26 06:26:28',
                gender: 'Female'
            },
            {
                id: 4,
                user: { first_name: 'Clarence', last_name: 'Flores' },
                date: '2016/04/10 10:28:46',
                gender: 'Male'
            },
            {
                id: 5,
                user: { first_name: 'Anne', last_name: 'Lee' },
                date: '2016/12/06 14:38:38',
                gender: 'Female'
            },
            {
                id: 6,
                user: { first_name: 'Sara', last_name: 'Armstrong' },
                date: '2016/09/23 18:50:04',
                gender: 'Female'
            },
            {
                id: 7,
                user: { first_name: 'Anthony', last_name: 'Webb' },
                date: '2016/08/30 23:49:38',
                gender: 'Male'
            },
            {
                id: 8,
                user: { first_name: 'Andrew', last_name: 'Greene' },
                date: '2016/11/20 14:57:47',
                gender: 'Male'
            },
            {
                id: 9,
                user: { first_name: 'Russell', last_name: 'White' },
                date: '2016/07/13 09:29:49',
                gender: 'Male'
            },
            {
                id: 10,
                user: { first_name: 'Lori', last_name: 'Hunter' },
                date: '2016/12/09 01:44:05',
                gender: 'Female'
            },
            {
                id: 11,
                user: { first_name: 'Ronald', last_name: 'Wood' },
                date: '2016/12/04 02:23:48',
                gender: 'Male'
            },
            {
                id: 12,
                user: { first_name: 'Michael', last_name: 'Harper' },
                date: '2016/07/27 13:28:15',
                gender: 'Male'
            },
            {
                id: 13,
                user: { first_name: 'George', last_name: 'Dunn' },
                date: '2017/03/07 12:26:52',
                gender: 'Male'
            },
            {
                id: 14,
                user: { first_name: 'Eric', last_name: 'Rogers' },
                date: '2016/06/07 05:41:52',
                gender: 'Male'
            },
            {
                id: 15,
                user: { first_name: 'Juan', last_name: 'Meyer' },
                date: '2017/02/01 04:56:34',
                gender: 'Male'
            },
            {
                id: 16,
                user: { first_name: 'Silvia', last_name: 'Rosa' },
                date: '2017/01/26 11:50:04',
                gender: 'Female'
            },
            {
                id: 17,
                user: { first_name: 'Lori', last_name: 'Cunningham' },
                date: '2016/05/01 10:00:56',
                gender: 'Female'
            },
            {
                id: 18,
                user: { first_name: 'Charles', last_name: 'Graham' },
                date: '2016/05/31 06:43:30',
                gender: 'Male'
            },
            {
                id: 19,
                user: { first_name: 'Henry', last_name: 'Morrison' },
                date: '2016/09/27 16:15:44',
                gender: 'Male'
            },
            {
                id: 20,
                user: { first_name: 'Albert', last_name: 'Mendoza' },
                date: '2016/08/08 05:29:24',
                gender: 'Male'
            },
            {
                id: 21,
                user: { first_name: 'Ruby', last_name: 'Snyder' },
                date: '2017/04/01 12:04:39',
                gender: 'Female'
            },
            {
                id: 22,
                user: { first_name: 'Jesse', last_name: 'Warren' },
                date: '2016/08/20 01:36:38',
                gender: 'Male'
            },
            {
                id: 23,
                user: { first_name: 'Carlos', last_name: 'Ferguson' },
                date: '2016/05/31 10:40:29',
                gender: 'Male'
            },
            {
                id: 24,
                user: { first_name: 'Melissa', last_name: 'Peters' },
                date: '2016/07/23 00:41:54',
                gender: 'Female'
            },
            {
                id: 25,
                user: { first_name: 'Arthur', last_name: 'Garza' },
                date: '2017/03/11 14:11:37',
                gender: 'Male'
            },
            {
                id: 26,
                user: { first_name: 'Joe', last_name: 'Berry' },
                date: '2016/07/09 15:16:56',
                gender: 'Male'
            },
            {
                id: 27,
                user: { first_name: 'Joseph', last_name: 'Bishop' },
                date: '2016/10/04 19:44:54',
                gender: 'Male'
            },
            {
                id: 28,
                user: { first_name: 'Sarah', last_name: 'Harper' },
                date: '2016/09/23 05:09:11',
                gender: 'Female'
            },
            {
                id: 29,
                user: { first_name: 'Christopher', last_name: 'Fuller' },
                date: '2016/04/12 00:05:35',
                gender: 'Male'
            },
            {
                id: 30,
                user: { first_name: 'Alan', last_name: 'Mendoza' },
                date: '2016/04/22 10:48:02',
                gender: 'Male'
            },
            {
                id: 31,
                user: { first_name: 'James', last_name: 'Davis' },
                date: '2017/01/16 15:17:03',
                gender: 'Male'
            },
            {
                id: 32,
                user: { first_name: 'Scott', last_name: 'Welch' },
                date: '2016/10/04 23:31:51',
                gender: 'Male'
            },
            {
                id: 33,
                user: { first_name: 'Mildred', last_name: 'Myers' },
                date: '2016/11/23 13:46:18',
                gender: 'Female'
            },
            {
                id: 34,
                user: { first_name: 'Victor', last_name: 'Martinez' },
                date: '2016/04/06 17:05:07',
                gender: 'Male'
            },
            {
                id: 35,
                user: { first_name: 'Susan', last_name: 'Medina' },
                date: '2016/12/09 10:33:37',
                gender: 'Female'
            },
            {
                id: 36,
                user: { first_name: 'Judy', last_name: 'Long' },
                date: '2016/07/26 16:19:04',
                gender: 'Female'
            },
            {
                id: 37,
                user: { first_name: 'Joan', last_name: 'Myers' },
                date: '2016/09/22 04:55:54',
                gender: 'Female'
            },
            {
                id: 38,
                user: { first_name: 'Rachel', last_name: 'Gonzales' },
                date: '2016/07/15 13:56:38',
                gender: 'Female'
            },
            {
                id: 39,
                user: { first_name: 'Roger', last_name: 'Hunt' },
                date: '2016/08/14 10:43:11',
                gender: 'Male'
            },
            {
                id: 40,
                user: { first_name: 'Dorothy', last_name: 'Howard' },
                date: '2016/06/19 05:34:49',
                gender: 'Female'
            },
            {
                id: 41,
                user: { first_name: 'Eugene', last_name: 'Lynch' },
                date: '2016/12/24 08:19:24',
                gender: 'Male'
            },
            {
                id: 42,
                user: { first_name: 'Kathy', last_name: 'Webb' },
                date: '2017/04/01 21:09:05',
                gender: 'Female'
            },
            {
                id: 43,
                user: { first_name: 'Antonio', last_name: 'White' },
                date: '2017/02/10 06:51:20',
                gender: 'Male'
            },
            {
                id: 44,
                user: { first_name: 'Louis', last_name: 'Spencer' },
                date: '2016/10/08 02:20:22',
                gender: 'Male'
            },
            {
                id: 45,
                user: { first_name: 'Andrea', last_name: 'Marshall' },
                date: '2016/09/04 10:59:57',
                gender: 'Female'
            },
            {
                id: 46,
                user: { first_name: 'Eugene', last_name: 'Sims' },
                date: '2017/03/15 06:39:48',
                gender: 'Male'
            },
            {
                id: 47,
                user: { first_name: 'Mildred', last_name: 'Gibson' },
                date: '2016/04/18 06:43:54',
                gender: 'Female'
            },
            {
                id: 48,
                user: { first_name: 'Joan', last_name: 'Arnold' },
                date: '2016/12/16 04:52:23',
                gender: 'Female'
            },
            {
                id: 49,
                user: { first_name: 'Jesse', last_name: 'Schmidt' },
                date: '2016/06/11 02:44:33',
                gender: 'Male'
            },
            {
                id: 50,
                user: { first_name: 'David', last_name: 'Frazier' },
                date: '2017/02/15 21:46:30',
                gender: 'Male'
            },
            {
                id: 51,
                user: { first_name: 'Nicholas', last_name: 'Howell' },
                date: '2016/11/01 15:08:31',
                gender: 'Male'
            },
            {
                id: 52,
                user: { first_name: 'Douglas', last_name: 'Chapman' },
                date: '2017/02/08 03:33:24',
                gender: 'Male'
            },
            {
                id: 53,
                user: { first_name: 'Bruce', last_name: 'Simmons' },
                date: '2016/07/14 12:11:17',
                gender: 'Male'
            },
            {
                id: 54,
                user: { first_name: 'Antonio', last_name: 'George' },
                date: '2016/11/07 19:12:55',
                gender: 'Male'
            },
            {
                id: 55,
                user: { first_name: 'Chris', last_name: 'Marshall' },
                date: '2016/07/03 12:11:45',
                gender: 'Male'
            },
            {
                id: 56,
                user: { first_name: 'Ashley', last_name: 'Hudson' },
                date: '2016/10/14 21:08:05',
                gender: 'Female'
            },
            {
                id: 57,
                user: { first_name: 'Alan', last_name: 'Edwards' },
                date: '2017/03/22 21:10:25',
                gender: 'Male'
            },
            {
                id: 58,
                user: { first_name: 'George', last_name: 'Clark' },
                date: '2016/04/28 03:15:05',
                gender: 'Male'
            },
            {
                id: 59,
                user: { first_name: 'Frank', last_name: 'Porter' },
                date: '2016/09/08 00:48:14',
                gender: 'Male'
            },
            {
                id: 60,
                user: { first_name: 'Christopher', last_name: 'Palmer' },
                date: '2016/05/24 08:58:12',
                gender: 'Male'
            }
        ],
        isPaginated: true,
        isPaginationSimple: true,
        isPaginationRounded: true,
        paginationPosition: 'bottom',
        defaultSortDirection: 'asc',
        sortIcon: 'arrow-up',
        sortIconSize: 'is-small',
        currentPage: 1,
        perPage: 5,
        // MODAL
        isCardModalActive: false
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
            this.isCardModalActive = true;
            // this.$router.push('/service/create-category');
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

<style lang="scss" scoped>
.service {
    &__border {
        border: 1px solid #ffdd57;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        color: rgba(0, 0, 0, 0.7);
        padding: 1.5rem;
    }
}
</style>
