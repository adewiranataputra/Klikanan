<template>
    <nav id="nav-main" class="navbar main is-light-blue" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a id="toggle-sidebar" class="navbar-item">
                <span class="mdi mdi-chevron-left mdi-24px"></span>
            </a>
            <div class="navbar-burger" data-target="navMenu">
                <i class="mdi mdi-dots-vertical mdi-24px" style="top: calc(50% - 18px);position: absolute;left: calc(50% - 4px);" id="ade"></i>
                <span class="is-hidden tes"></span>
                <span class="is-hidden tes"></span>
                <span class="is-hidden tes"></span>
            </div>
        </div>
        <div id="navMenu" class="navbar-menu main-navbar">
            <div class="navbar-end" style="border:none;padding-top:0px;margin-top:0px">
                <div class="navbar-item has-dropdown is-hoverable">
                    <div class="navbar-link is-arrowless is-hidden-touch">
                        <span class="mdi mdi-account-outline"> {{name}}</span>
                    </div>
                    <div class="navbar-dropdown is-boxed is-right">
                        <div class="navbar-item" style="cursor:pointer">Profile</div>
                        <a href="#" class="navbar-item">Help</a>
                        <!-- <span class="spacing-small"></span> -->
                        <hr class="navbar-divider">
                        <div class="navbar-item" @click="logout" style="cursor:pointer">
                            <span>Log Out</span>
                            <span class="mdi mdi-logout-variant"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import axios from "axios";
    const cors = require('cors')
    const querystring = require("querystring");
    export default {
        data() {
            return {
                name: null
            }
        },
        methods: {
            slash(str) {
                if (str !== undefined) {
                    var x = str.split("/");
                    return x[x.length - 1];
                }
            },
            logout() {
                let self = this;
                axios
                    .get(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/auth/logout", {
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        }
                    )
                    .then(function(response) {
                        localStorage.clear();
                        self.$router.push('/')
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            this.name = localStorage.getItem('username')
        }
    }
</script>