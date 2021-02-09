<template>
    <div class="loginPage">
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <!-- <section class="banner" style="background-image: url('http://localhost:5501/media/office7.jpg')"></section> -->
        <!-- <section class="banner" :style="{ backgroundImage: 'url(' + require('@/assets/office7.jpg') + ')' }"></section> -->
        <section class="banner add-border-right-login is-hidden-touch">
            <div class="welcoming">
                <div class="has-text-centered" style="padding-top:5%;">

                    <b-carousel :indicator-inside="false" :arrow-hover="false" icon-size="is-large">
                        <b-carousel-item v-for="(item, i) in 6" :key="i">
                            <div class="card" style="border: 2px solid  #DFDFDF; margin-right:10%; margin-left:10%; border-radius:25px">
                                <div class="card-content">
                                    <span>
                                        <img :src="getImgUrl(i)" style="min-height:78vh; max-height:78vh; width:100%">
                                    </span>
                                </div>
                            </div>
                        </b-carousel-item>
                    </b-carousel>
                </div>
            </div>
        </section>

        <section class="banner is-hidden-desktop" :style="{ backgroundImage: 'url(' + require('@/assets/office7.jpg') + ')' }"></section>

        <section class="login-form">
            <img src="@/assets/telkomsigma.png" alt="Logo Telkomsigma" class="logo-app" />
            <p style="font-size:22pt; margin-bottom:20px"><b>Sign in</b></p>
            <article v-if="showError" class="message is-small is-danger animated fadeIn">
                <div class="message-header">
                    <p>Login Failed</p>
                    <a class="is-small">⚠</a>
                </div>
                <div class="message-body">
                    The username and password you entered did not match our records. Please double-check and try again.
                </div>
            </article>
            <form @submit="doLogin" onsubmit="return false;">
                <div class="field no-margin-top">
                    <!-- <p class="label">NIK</p> -->
                    <b-field>
                        <b-input v-model="nik" icon="email" id="nik" placeholder="NIK" required></b-input>
                    </b-field>
                </div>
                <span class="spacing-normal"></span>
                <div class="field">
                    <!-- <p class="label">Password</p> -->
                    <b-field>
                        <b-input v-model="password" icon="lock" id="password" placeholder="Password" required type="password" password-reveal></b-input>
                    </b-field>
                </div>
                <div class="has-text-right has-text-link" style="cursor:pointer">
                    <p>Forgot Password?</p>
                </div>
                <div class="field" style="margin-top:10px; margin-bottom:60px">
                    <button class="button is-fullwidth is-red" style="background-color:#16aea4;; color:#fff; border-radius:5px" type="submit">Log in</button>
                    <!-- <nav class="columns is-mobile">
                        <div class="column is-7">
                            <b-field style="padding-top:4%">
                                <b-checkbox>
                                    <p style="padding-left:10px">Remember me</p>
                                </b-checkbox>
                            </b-field>
                        </div>
                        <div class="column">
                            <button class="button is-fullwidth is-red" style="background-color:#16aea4;; color:#fff; border-radius:8px" type="submit">Log in</button>
                        <button class="button is-fullwidth" style="background-color:#16aea4; color:#fff" type="submit">Log in</button>
                        </div>
                    </nav> -->
                    <span class="spacing-small"></span>
                    <p class="email-us">Don't have an account ? please <span class="has-text-link" style="cursor:pointer">email us</span></p>
                </div>
            </form>
            <!-- <div>
                </div> -->
            <img class="logo-telkomsigma" src="@/assets/telkomsigma.png" alt="Logo Telkomsigma" />
        </section>
    </div>

</template>

<script>
    import '@/styles/main.scss';
    import "@/styles/login.scss";
    import axios from "axios";
    const querystring = require("querystring");

    export default {
        data() {
            return {
                nik: "",
                password: "",
                validation: true,
                showError: false,
                errors: [],
                isLoading: false,
                // level: null,
                window: {
                    width: 0,
                    height: 0
                },
                carousels: [{
                        title: 'Slide 1',
                        color: 'info'
                    },
                    {
                        title: 'Slide 2',
                        color: 'success'
                    },
                    {
                        title: 'Slide 3',
                        color: 'warning'
                    },
                    {
                        title: 'Slide 4',
                        color: 'danger'
                    }
                ]
            };
        },
        created() {
            window.addEventListener("resize", this.handleResize);
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener("resize", this.handleResize);
        },
        methods: {
            getImgUrl(value) {
                if (value === 0) {
                    return `http://nbpstorage.com/development_fab/asset/background/slide_pertama_new.png`
                } else {
                    return `https://picsum.photos/id/43${value}/1230/1230`
                }
            },
            doLogin() {

                this.isLoading = true
                let self = this
                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/auth/login",
                        querystring.stringify({
                            nik: self.nik,
                            password: self.password
                        })
                    )
                    .then(function(response) {
                        // console.log(response.data)
                        localStorage.setItem('email', response.data.data.email)
                        localStorage.setItem('username', response.data.data.username)
                        localStorage.setItem('organisasi', response.data.data.organisasi)
                        localStorage.setItem('level', response.data.data.level)
                        localStorage.setItem('nik', response.data.data.nik)
                        localStorage.setItem('token', response.data.data.token)
                        if (response.data.data.level == 1) {
                            self.$emit('loggedIn')
                            self.$router.push('presales/dashboardPresales')
                        } else if (response.data.data.level == 2) {
                            self.$emit('loggedIn')
                            self.$router.push('am/newcalculatepresales')
                        } else {
                            self.$router.push('/')
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                        self.showError = true
                    }).finally(() => (self.isLoading = false));
            },
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            }
        }
    };
</script>