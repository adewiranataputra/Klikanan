<template>
    <section id="vapp" class="contentPage">
        <section class="hero is-light is-bold">
            <div class="hero-body">
                <nav class="level">
                    <div class="level-left">
                        <h1 class="title is-marginless has-text-right font-hero-small">
                            <span>Dashboard</span>
                        </h1>
                    </div>
                </nav>
            </div>
        </section>
        <section class="section">
            <div id="contentApp" class="container">
                <div class="columns">
                    <div class="column">
                        <div class="card dashboard-rounded">
                            <p class="panel-heading">Pending Revenue</p>
                            <div class="card-content">
                               <p class="title is-3">Rp. {{ Value | currency}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card dashboard-rounded">
                            <p class="panel-heading">Pending Invoice</p>
                            <div class="card-content">
                               <p class="title is-3">Rp. {{ Value | currency}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card dashboard-rounded">
                            <p class="panel-heading">Revenue Achieved</p>
                            <div class="card-content">
                               <p class="title is-3">Rp. {{ Value | currency}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card dashboard-rounded">
                            <p class="panel-heading">Invoice Achieved</p>
                            <div class="card-content">
                               <p class="title is-3">Rp. {{ Value | currency}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="card dashboard-rounded">
                            <p class="panel-heading">Activations</p>
                            <div class="card-content" v-if="isValidation">
                                <chart :chart="activation"></chart>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card dashboard-rounded">
                            <p class="panel-heading">BAST</p>
                            <div class="card-content" v-if="isValidation">
                                <chart :chart="cbats"></chart>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card dashboard-rounded">
                            <p class="panel-heading">Project Running</p>
                            <div class="card-content">
                                <!-- <activation-chart></activation-chart> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="card dashboard-rounded">
                                <p class="panel-heading">IWO - 2020</p>
                                <div class="card-content">
                                    <!-- <iwo-chart></iwo-chart> -->
                                </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    </section>
</template>

<script>
import chart from '@/components/AM/Dashboard/Chart'
import axios from 'axios'

export default {
    components: {
        chart,
    },
    data() {
        return {
            Value:13131331,
            activation: {},
            cbats: {},
            isLoading: true,
            isValidation: false,
        }
    },
    methods: {
        getActivation() {
            this.isLoading = true;
            this.isValidation=false;
            let self = this;
            axios
                .get("http://localhost:3000/Activations")
                .then(function(response) {
                    self.activation = response.data
                    self.isValidation = true
                })
                .catch(function(error) {
                    console.log(error);
                })
                .finally(() => (self.isLoading = false));
        },
        getBAST() {
            this.isLoading = true;
            this.isValidation = false;
            let self = this;
            axios
                .get("http://localhost:3000/BAST")
                .then(function(response) {
                    self.cbats = response.data
                    self.isValidation = true
                })
                .catch(function(error) {
                    console.log(error);
                })
                .finally(() => (self.isLoading = false));
        }
    },
    mounted() {
        this.getActivation()
        this.getBAST()
    }
}
</script>