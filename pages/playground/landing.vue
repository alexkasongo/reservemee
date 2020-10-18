<template>
    <div class="store margin">
        <Chat />
    </div>
</template>

<script>
import Chat from '@/components/chat/Chat';
import * as firebase from 'firebase/app';
import 'firebase/database';
import NewMessage from '@/components/chat/NewMessage';

export default {
    components: {
        Chat
    },
    data: () => ({}),
    computed: {}
};
</script>

<style lang="scss" scoped>
.store {
    &__grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    &__list {
        list-style-type: none;
    }
    &__banner {
        background-image: url('https://via.placeholder.com/250');
        background-position: center;
        background-size: cover;
    }
}
</style>