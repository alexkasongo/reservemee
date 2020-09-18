<template>
    <!-- Messages -->
    <div class="ribbon-box">
        <div class="ribbon ribbon-primary">Messages</div>
        <div class="clearfix"></div>
        <div class="inbox-widget">
            <a href="#">
                <div class="inbox-item">
                    <div class="inbox-item-img">
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar2.png"
                            class="rounded-circle"
                            alt
                        />
                    </div>
                    <p class="inbox-item-author">Tomaslau</p>
                    <p class="inbox-item-text">I've finished it! See you so...</p>
                    <p class="inbox-item-date">
                        <button
                            type="button"
                            class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                        >Reply</button>
                    </p>
                </div>
            </a>
            <a href="#">
                <div class="inbox-item">
                    <div class="inbox-item-img">
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            class="rounded-circle"
                            alt
                        />
                    </div>
                    <p class="inbox-item-author">Stillnotdavid</p>
                    <p class="inbox-item-text">This theme is awesome!</p>
                    <p class="inbox-item-date">
                        <button
                            type="button"
                            class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                        >Reply</button>
                    </p>
                </div>
            </a>
            <a href="#">
                <div class="inbox-item">
                    <div class="inbox-item-img">
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar4.png"
                            class="rounded-circle"
                            alt
                        />
                    </div>
                    <p class="inbox-item-author">Kurafire</p>
                    <p class="inbox-item-text">Nice to meet you</p>
                    <p class="inbox-item-date">
                        <button
                            type="button"
                            class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                        >Reply</button>
                    </p>
                </div>
            </a>
            <a href="#">
                <div class="inbox-item">
                    <div class="inbox-item-img">
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar5.png"
                            class="rounded-circle"
                            alt
                        />
                    </div>
                    <p class="inbox-item-author">Shahedk</p>
                    <p class="inbox-item-text">Hey! there I'm available...</p>
                    <p class="inbox-item-date">
                        <button
                            type="button"
                            class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                        >Reply</button>
                    </p>
                </div>
            </a>
            <a href="#">
                <div class="inbox-item">
                    <div class="inbox-item-img">
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                            class="rounded-circle"
                            alt
                        />
                    </div>
                    <p class="inbox-item-author">Adhamdannaway</p>
                    <p class="inbox-item-text">This theme is awesome!</p>
                    <p class="inbox-item-date">
                        <button
                            type="button"
                            class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                        >Reply</button>
                    </p>
                </div>
            </a>
            <a href="#">
                <div class="inbox-item">
                    <div class="inbox-item-img">
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar2.png"
                            class="rounded-circle"
                            alt
                        />
                    </div>
                    <p class="inbox-item-author">Tomaslau</p>
                    <p class="inbox-item-text">I've finished it! See you so...</p>
                    <p class="inbox-item-date">
                        <button
                            type="button"
                            class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                        >Reply</button>
                    </p>
                </div>
            </a>
            <a href="#">
                <div class="inbox-item">
                    <div class="inbox-item-img">
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            class="rounded-circle"
                            alt
                        />
                    </div>
                    <p class="inbox-item-author">Stillnotdavid</p>
                    <p class="inbox-item-text">This theme is awesome!</p>
                    <p class="inbox-item-date">
                        <button
                            type="button"
                            class="btn btn-icon btn-sm waves-effect waves-light btn-success"
                        >Reply</button>
                    </p>
                </div>
            </a>
        </div>
    </div>
    <!-- Messages -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Messages',
    computed: {
        ...mapGetters({
            user: 'user'
        })
    }
};
</script>

<style lang="scss" scoped>
</style>