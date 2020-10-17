<template>
    <div class="chat container">
        <h2 class="center teal-text">
            {{ $router.history.current.params.profile_slug }}
        </h2>
        <div class="card">
            <div class="card-content">
                <ul class="messages">
                    <!-- <li class="wrap" v-for="message in $store.getters.messages" :key="message.content"> -->
                    <li
                        class="wrap"
                        v-for="message in $store.getters.profilemsg"
                        :key="message.content"
                    >
                        <span class="teal-text name">{{ message.name }}</span>
                        <span class="grey-text text-darken-3 content">{{
                            message.content
                        }}</span>
                        <span class="grey-text time content">{{
                            message.timestamp
                        }}</span>
                        <i
                            class="material-icons btn-delete"
                            v-if="message.name == $store.getters.name"
                            @click="removeMessage(message)"
                            >delete</i
                        >

                        <!-- <div>
                            <button v-if="message.name == $store.getters.name" type="button" class="btn" @click="showModal(message)">Edit</button>
                            <modal v-show="isModalVisible" @close="closeModal"/>
                        </div> -->
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewProfileMsg :name="name" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import NewProfileMsg from '@/components/NewProfileMsg';
import Modal from '@/components/Modal.vue';
import slugify from 'slugify';
// import database from '@/firebase/init'
// import moment from 'moment'

export default {
    name: 'Profile',
    components: {
        NewProfileMsg,
        Modal
    },
    data() {
        return {
            isModalVisible: false
        };
    },
    computed: {
        ...mapState(['name'])
    },
    methods: {
        //This is an ACTION. actions get dispatch
        removeMessage(message) {
            this.$store.dispatch('deleteMessage', message);
        },
        showModal(message) {
            // this.$store.dispatch('currentMessage', message)
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    },
    created() {
        console.log();
        this.$store.dispatch('getProfileDb');
    }
};
</script>

<style>
.chat h2 {
    font-size: 2.6em;
    margin-bottom: 40px;
}
.chat span {
    font-size: 1.4em;
}
.chat .name {
    margin-right: 5px;
}
.chat .time {
    display: block;
    font-size: 0.8em;
}
.messages {
    max-height: 300px;
    overflow: auto;
}
.chat .wrap {
    position: relative;
}
.chat .material-icons {
    position: absolute;
    top: 10px;
    right: 4px;
}
.chat .edit {
    position: absolute;
    top: 10px;
    left: 4px;
}

.chat .btn-delete {
    cursor: pointer;
}

.messages::-webkit-scrollbar {
    width: 3px;
}

.messages::-webkit-scrollbar-track {
    background: #ddd;
}

.messages::-webkit-scrollbar-thumb {
    background: #aaa;
}

.chat .btn {
    position: absolute;
    top: 4px;
    right: 40px;
    font-size: 0.7em;
}
</style>
