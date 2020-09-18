<template>
    <!-- BusinessInfo -->
    <div class="mb-5">
        <h4 class="header-title mt-0">Store Bio</h4>
        <div class="panel-body">
            <p
                class="text-muted font-13"
            >Hello, quis Aristidem non mortuum diligit? Quid sequatur, quid repugnet, vident. Avaritiamne minuis? Iam id ipsum absurdum, maximum malum neglegi. Sed quod proximum fuit non vidit. Nunc agendum est subtilius.</p>
            <hr />
            <div class="text-left">
                <p class="text-muted font-13">
                    <strong>Store Name :</strong>
                    <span class="m-l-15">Sista Joy Braids</span>
                </p>
                <p class="text-muted font-13">
                    <strong>Mobile :</strong>
                    <span class="m-l-15">(+12) 123 1234 567</span>
                </p>
                <p class="text-muted font-13">
                    <strong>Email :</strong>
                    <span class="m-l-15">sistajoybraids@gmail.com</span>
                </p>
                <p class="text-muted font-13">
                    <strong>Location :</strong>
                    <span class="m-l-15">USA</span>
                </p>
                <p class="text-muted font-13">
                    <strong>Services :</strong>
                    <span class="m-l-5">
                        <span class="flag-icon flag-icon-us m-r-5 m-t-0" title="us"></span>
                        <span>Box Braids</span>
                    </span>
                    <span class="m-l-5">
                        <span class="flag-icon flag-icon-de m-r-5" title="de"></span>
                        <span>Cornrows</span>
                    </span>
                    <span class="m-l-5">
                        <span class="flag-icon flag-icon-es m-r-5" title="es"></span>
                        <span>Braids</span>
                    </span>
                    <span class="m-l-5">
                        <span class="flag-icon flag-icon-fr m-r-5" title="fr"></span>
                        <span>Dreadlocks</span>
                    </span>
                </p>
            </div>
            <ul class="social-links list-inline mt-4 mb-0">
                <li class="list-inline-item">
                    <a
                        title
                        data-placement="top"
                        data-toggle="tooltip"
                        class="tooltips"
                        href
                        data-original-title="Facebook"
                    >
                        <i class="fa text-dark fa-facebook"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a
                        title
                        data-placement="top"
                        data-toggle="tooltip"
                        class="tooltips"
                        href
                        data-original-title="Twitter"
                    >
                        <i class="fa text-dark fa-twitter"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a
                        title
                        data-placement="top"
                        data-toggle="tooltip"
                        class="tooltips"
                        href
                        data-original-title="Skype"
                    >
                        <i class="fa text-dark fa-skype"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <!-- BusinessInfo -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'BusinessInfo',
    computed: {
        ...mapGetters({
            user: 'user'
        })
    }
};
</script>

<style lang="scss" scoped>
</style>