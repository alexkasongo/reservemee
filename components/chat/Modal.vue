<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div
                class="modal"
                role="dialog"
                aria-labelledby="modalTitle"
                aria-describedby="modalDescription"
            >
                <header class="modal-header" id="modalTitle">
                    <slot name="header">
                        <!-- Edit  -->

                        <!-- <i type="button" class="btn-close material-icons" @click="close" aria-label="Close modal">close</i> -->
                    </slot>
                </header>
                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                        <form class="formInput" @submit="editedMessage()">
                            <label for="edit">Edit text below</label>
                            <p class="red-text">{{ feedback }}</p>
                            <input
                                type="text"
                                name="edit-message"
                                v-model="$store.getters.currentMessage.content"
                            />
                            <button class="btn teal edit-btn">Edit</button>
                        </form>
                    </slot>
                </section>
                <footer class="modal-footer">
                    <slot name="footer">
                        <!-- I'm the default footer! -->
                        <button
                            type="button"
                            class="btn teal close-btn"
                            @click="close"
                            aria-label="Close modal"
                        >
                            Close me!
                        </button>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Modal',
    data() {
        return {
            content: null,
            feedback: null
        };
    },
    methods: {
        close() {
            this.$emit('close');
        },
        editedMessage() {
            // console.log('working')
            if (this.$store.getters.currentMessage.content) {
                const editedMsg = {
                    name: this.$store.getters.currentMessage.name,
                    content: this.$store.getters.currentMessage.content,
                    id: this.$store.getters.currentMessage.id
                };

                // console.log(ed itedMsg);
                this.$store.dispatch('editMsg', editedMsg);
                // this.content = null
                // this.feedback = null
            } else {
                this.feedback = 'You must enter a message to edit a message';
            }
        }
    }
};
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal {
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4aae9b;
    justify-content: space-between;
}

.modal-footer {
    /* border-top: 1px solid #eeeeee; */
    justify-content: flex-end;
    position: relative;
}

.close-btn {
    position: absolute;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
}

.formInput {
    position: relative;
}
.edit-btn {
    position: absolute;
}
</style>