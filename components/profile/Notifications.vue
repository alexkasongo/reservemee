<template>
    <!-- NOTIFICATION SETTINGS -->
    <div class="tab-pane" id="notification">
        <h6>NOTIFICATION SETTINGS</h6>
        <hr />
        <form>
            <div class="form-group">
                <label class="d-block mb-0">Security Alerts</label>
                <div class="small text-muted mb-3">
                    Receive security alert notifications via email
                </div>
                <div class="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customCheck1"
                        checked
                    />
                    <label class="custom-control-label" for="customCheck1"
                        >Email each time a vulnerability is found</label
                    >
                </div>
                <div class="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customCheck2"
                        checked
                    />
                    <label class="custom-control-label" for="customCheck2"
                        >Email a digest summary of vulnerability</label
                    >
                </div>
            </div>
            <div class="form-group mb-0">
                <label class="d-block">SMS Notifications</label>
                <ul class="list-group list-group-sm">
                    <li class="list-group-item has-icon">
                        Comments
                        <div
                            class="custom-control custom-control-nolabel custom-switch ml-auto"
                        >
                            <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customSwitch1"
                                checked
                            />
                            <label
                                class="custom-control-label"
                                for="customSwitch1"
                            ></label>
                        </div>
                    </li>
                    <li class="list-group-item has-icon">
                        Updates From People
                        <div
                            class="custom-control custom-control-nolabel custom-switch ml-auto"
                        >
                            <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customSwitch2"
                            />
                            <label
                                class="custom-control-label"
                                for="customSwitch2"
                            ></label>
                        </div>
                    </li>
                    <li class="list-group-item has-icon">
                        Reminders
                        <div
                            class="custom-control custom-control-nolabel custom-switch ml-auto"
                        >
                            <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customSwitch3"
                                checked
                            />
                            <label
                                class="custom-control-label"
                                for="customSwitch3"
                            ></label>
                        </div>
                    </li>
                    <li class="list-group-item has-icon">
                        Events
                        <div
                            class="custom-control custom-control-nolabel custom-switch ml-auto"
                        >
                            <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customSwitch4"
                            />
                            <label
                                class="custom-control-label"
                                for="customSwitch4"
                            ></label>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    </div>
    <!-- NOTIFICATION SETTINGS END -->
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
</style>