<template>
    <!-- NOTIFICATION SETTINGS -->
    <section>
        <h3 class="subtitle is-3">NOTIFICATION SETTINGS</h3>
        <hr />

        <label class="d-block mb-0">Security Alerts</label>
        <div class="small text-muted mb-3">
            Receive security alert notifications via email
        </div>
        <b-field>
            <b-switch>Email each time a vulnerability is found</b-switch>
        </b-field>
        <b-field>
            <b-switch v-model="isSwitched">
                Email a digest summary of vulnerability
            </b-switch>
        </b-field>
        <label class="d-block">SMS Notifications</label>
        <div class="small text-muted mb-3">
            Receive mobile alert notifications via sms
        </div>
        <b-field>
            <b-switch
                v-model="isSwitchedCustom"
                true-value="Yes"
                false-value="No"
            >
                Comments
            </b-switch>
        </b-field>
        <b-field>
            <b-switch disabled>Updates From People</b-switch>
        </b-field>
        <label class="d-block">SMS Notifications</label>
        <div class="small text-muted mb-3">
            Receive notification alert to your phone
        </div>
        <b-field>
            <b-switch
                v-model="isSwitchedCustom"
                true-value="Yes"
                false-value="No"
            >
                Events
            </b-switch>
        </b-field>
    </section>
    <!-- NOTIFICATION SETTINGS END -->
</template>

<script>
export default {
    data() {
        return {
            isSwitched: false,
            isSwitchedCustom: 'Yes'
        };
    }
};
</script>

<style lang="sass" scoped></style>
