<template>
    <div id="side-main" class="sidebar">
        <div class="brand animated slideInLeft fast">
            <span>KlikKanan</span>
        </div>
        <div class="side-list animated slideInLeft faster">
            <div class="parent-list">
                <div class="list-title">
                    <!-- <label style="text-transform:unset">Welcome,</label> -->
                    <!-- <span class="spacing-small"></span> -->
                    <label style="font-size:11px"><strong>Presales</strong></label>
                    <!-- <hr> -->
                    <!-- <label><b>Account Manager</b></label> -->
                </div>
            </div>
        </div>
        <!-- <div class="side-list animated slideInLeft faster">
            <div class="parent-list">
                <div class="list-title">
                    <label style="color:black"><b>{{ $parent.dataUser.username }}</b></label>
                    <label style="color:black">Account Manager</label>
                </div>
            </div>
        </div> -->
        <sidelist label="Dashboard" name="dashboard">
            <sideitem menu="dashboard" MenuID="/am/dashboard"><span class="mdi mdi-view-dashboard-outline"></span>Dashboard</sideitem>
        </sidelist>
        <sidelist label="Request" name="request">
            <sideitem menu="newcalculatepresales" MenuID="/am/newcalculatepresales"><span class="mdi mdi-star-outline"></span>New Calculate Presales</sideitem>
            <sideitem menu="serviceActivation" MenuID="/am/serviceActivation"><span class="mdi mdi-shield-check-outline"></span>Service Activation</sideitem>
            <sideitem menu="trial" MenuID="/am/trial"><span class="mdi mdi-alarm"></span>Trial / POC IAAS</sideitem>
            <sideitem menu="vvip" MenuID="/am/vvip"><span class="mdi mdi-account-tie"></span>VVIP</sideitem>
        </sidelist>
        <sidelist label="Report" name="report">
            <sideitem menu="internalusage" MenuID="/am/internalusage"><span class="mdi mdi-account-box-outline"></span>Internal Usage</sideitem>
        </sidelist>
    </div>
</template>

<script>
    import Sidelist from './List.vue'
    import Sideitem from './Item.vue'
    import axios from "axios"
    const querystring = require("querystring");

    export default {
        components: {
            Sidelist,
            Sideitem
        },
        mounted() {
            // this.dataUser = localStorage
            // console.log(this.$parent.dataUser.organisasi)
        }
    }
</script>

<style lang="scss" scoped>
    .mdi {
        padding-right: 15px;
        display: inline-flex;
        vertical-align: middle;
        padding-bottom: 4px
    }
</style>