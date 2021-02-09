<template>
    <nav id="nav-main" class="navbar main is-light-green" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a id="toggle-sidebar" class="navbar-item">
                <span class="mdi mdi-chevron-left mdi-24px"></span>
            </a>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu main-navbar" id="navbarBasicExample">
            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                    <div class="navbar-link is-arrowless">
                        <span class="mdi mdi-account-outline"></span>
                    </div>
                    <div class="navbar-dropdown is-boxed is-right">
                        <a href="../maintenance.html" class="navbar-item">Account Profile</a>
                        <a href="../maintenance.html" class="navbar-item">Need Help ?</a>
                        <hr class="navbar-divider">
                        <a href="#" class="navbar-item">
                            <span>Sign Out</span>
                            <span class="mdi mdi-logout-variant"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
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
                localStorage.clear();
                location.reload();
            }
        }
    }
</script>