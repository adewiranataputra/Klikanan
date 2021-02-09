<template>
    <div>
        <div class="columns is-marginless">
            <div class="column is-8 content is-marginless is-paddingless is-hidden-touch">
                <h3 class="is-small has-text-weight-light is-reduced-margin is-uppercase" style="padding-top:2%">{{detail.project_name}}</h3>
            </div>
            <div class="column is-8 content is-marginless is-paddingless is-hidden-desktop">
                <h3 class="is-small has-text-weight-light is-reduced-margin is-uppercase has-text-centered" style="padding-top:2%">{{detail.project_name}}</h3>
            </div>
            <div class="column" style="padding-left:0px; padding-right:0px">
                <a class="button is-red is-long is-pulled-right is-hidden-touch" @click="$parent.detailActivation">
                    Back
                </a>
                <a class="button is-red is-fullwidth is-hidden-desktop" @click="$parent.detailActivation">
                    Back
                </a>
            </div>
        </div>

        <hr style="margin-top:0px">

        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <span class="button is-warning-blend is-static is-small is-fullwidth">
                        <span style="margin-right:.35em;">Kode Request</span><b>{{ detail.kode_request }}</b>
                    </span>
                </div>
                <div class="level-item">
                    <span class="button is-warning-blend is-static is-small is-fullwidth">
                        <!-- <span class="icon is-small">
                            <span class="mdi mdi-calendar-clock"></span>
                        </span> -->
                        <span style="margin-right:.35em;">Contact Person</span><b>{{ detail.nama_person }}</b>
                    </span>
                </div>
            </div>
        </div>

        <div class="columns is-multiline">
            <div class="column is-5-desktop add-border-right">
                <div class="content">
                    <h4 class="is-small has-text-weight-light">Pelanggan Akhir / <i>End Customer</i></h4>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-6">
                        <p class="label">Nama Perusahaan / <i>Company Name</i></p>
                        <b-field>
                            {{detail.nama_perusahaan_customer}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">NPWP / <i>Tax Registration No</i></p>
                        <b-field>
                            {{detail.npwp_customer}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Alamat / <i>Address</i></p>
                        <b-field>
                            {{detail.alamat_customer}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Kode Pos / <i>Post Code</i></p>
                        <b-field>
                            {{detail.kode_pos_customer}}
                        </b-field>
                    </div>
                </div>

                <hr style="margin-top:12px">

                <div class="content">
                    <h4 class="is-small has-text-weight-light">Personal Kontak / <i>Contact Person</i></h4>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-6">
                        <p class="label">Nama / <i>Name</i></p>
                        <b-field>
                            {{detail.nama_person}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Jabatan / <i>Position</i></p>
                        <b-field>
                            {{detail.jabatan_person}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Alamat / <i>Address</i></p>
                        <b-field>
                            {{detail.alamat_person}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Email / <i>Email</i></p>
                        <b-field>
                            {{detail.email_person}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Telp. Seluler / <i>Mobile Phone</i></p>
                        <b-field>
                            {{detail.no_hp_person}}
                        </b-field>
                    </div>
                </div>

                <hr style="margin-top:12px">

                <div class="content">
                    <h4 class="is-small has-text-weight-light">Kontak Teknis / <i>Technical Contact</i></h4>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-6">
                        <p class="label">Nama / <i>Name</i></p>
                        <b-field>
                            {{detail.nama_teknis}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Jabatan / <i>Position</i></p>
                        <b-field>
                            {{detail.jabatan_teknis}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Alamat / <i>Address</i></p>
                        <b-field>
                            {{detail.alamat_teknis}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Email / <i>Email</i></p>
                        <b-field>
                            {{detail.email_teknis}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Telp. Seluler / <i>Mobile Phone</i></p>
                        <b-field>
                            {{detail.no_hp_teknis}}
                        </b-field>
                    </div>
                </div>

            </div>

            <hr style="margin-top:12px">

            <div class="column add-border-right">
                <div class="content">
                    <h4 class="is-small has-text-weight-light">Rincian Project / <i>Project Detail</i></h4>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-6">
                        <p class="label">Jenis Layanan / <i>Type of Services</i></p>
                        <b-field>
                            {{detail.jenis_layanan}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Progress Administrasi / <i>Administration Progress</i></p>
                        <b-field>
                            <p><span v-if="detail.tipe_id_project!==''">{{detail.tipe_id_project}} : </span> <span v-if="detail.id_project!==''">{{detail.id_project}}</span></p>
                        </b-field>
                    </div>
                    <template v-if="detail.tipe_project ==='TGU'">
                        <div class="column is-6">
                            <p class="label">Tipe Project / <i>Project Type</i></p>
                            <b-field>
                                Synergy TELKOMGROUP / <i>TGU</i>
                            </b-field>
                        </div>
                        <div class="column is-6">
                            <p class="label">Pelanggan / <i>Customer</i></p>
                            <b-field>
                                {{detail.customer_tgu}}
                            </b-field>
                        </div>
                        <div class="column is-6">
                            <p class="label">Segmen / <i>Segment</i></p>
                            <b-field>
                                {{detail.segment}}
                            </b-field>
                        </div>
                    </template>
                    <template v-else-if="detail.tipe_project ==='NON TGU'">
                        <div class="column is-6">
                            <p class="label">Tipe Project / <i>Project Type</i></p>
                            <b-field>
                                Direct Customer / <i>Non-TGU</i>
                            </b-field>
                        </div>
                    </template>
                    <template v-else>
                        <div class="column is-6">
                            <p class="label">Tipe Project / <i>Project Type</i></p>
                        </div>
                    </template>

                </div>

                <hr style="margin-top:12px">

                <div class="content">
                    <h4 class="is-small has-text-weight-light">Rincian Produk / <i>Detail of Product</i></h4>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-6">
                        <p class="label">Tipe Produk / <i>Product Type</i></p>
                        <b-field>
                            {{detail.tipe_produk}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Waktu Aktivasi / <i>Target Delivery</i></p>
                        <b-field>
                            {{detail.tanggal_aktivasi | moment}}
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Periode Layanan / <i>Service Periode</i></p>
                        <b-field>
                            <p>
                                <span v-if="detail.tanggal_awal!=='0000-00-00'">{{detail.tanggal_awal | moment}}</span>
                                <span v-if="detail.tanggal_akhir!=='0000-00-00'"> <small> s.d </small> {{detail.tanggal_akhir | moment}}</span>
                            </p>
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <p class="label">Waktu Sisa / <i>Time Remaining</i></p>
                        <b-field>
                            <span v-if="!isNaN(waktu_sisa)">{{waktu_sisa}} Hari / <i>Days</i></span>
                        </b-field>
                    </div>
                </div>

                <hr style="margin-top:12px">

                <div class="content">
                    <h4 class="is-small has-text-weight-light">Data Pelengkap / <i>Complementary Data</i></h4>
                </div>

                <div class="field is-floating-label">
                    <p class="has-text-centered label has-text-red" style="font-size:16px;left:5%">BAST</p>
                    <div style="border:1px solid red;border-radius:25px;position:relative">
                        <span class="spacing-small"></span>
                        <div class="columns is-multiline" style="margin-left:1px;margin-right:1px">
                            <div class="column is-6">
                                <p style="margin-bottom:8px"><b>Nama Lengkap / <i>Fullname</i></b></p>
                                <b-field>
                                    {{detail.nama_lengkap_bast_bapp}}
                                </b-field>
                            </div>
                            <div class="column is-6">
                                <p style="margin-bottom:8px"><b>Jabatan / <i>Occupation</i></b></p>
                                <b-field>
                                    {{detail.jabatan_lengkap_bast_bapp}}
                                </b-field>
                            </div>
                        </div>
                        <span class="spacing-small"></span>
                    </div>
                </div>

                <span class="spacing-normal"></span>

                <div class="field is-floating-label">
                    <p class="has-text-centered label has-text-red" style="font-size:16px;left:5%">BAUT / BASO</p>
                    <div style="border:1px solid red;border-radius:25px;position:relative">
                        <span class="spacing-small"></span>
                        <div class="columns is-multiline" style="margin-left:1px;margin-right:1px">
                            <div class="column is-6">
                                <p style="margin-bottom:8px"><b>Nama Lengkap / <i>Fullname</i></b></p>
                                <b-field>
                                    {{detail.nama_lengkap_baut_baso}}
                                </b-field>
                            </div>
                            <div class="column is-6">
                                <p style="margin-bottom:8px"><b>Jabatan / <i>Occupation</i></b></p>
                                <b-field>
                                    {{detail.jabatan_lengkap_baut_baso}}
                                </b-field>
                            </div>
                        </div>
                        <span class="spacing-small"></span>
                    </div>
                </div>

            </div>
        </div>

        <hr>

        <div class="columns is-multiline">
            <div class="column is-5-desktop add-border-right">
                <div class="content">
                    <h3 class="is-small has-text-weight-light">Document</h3>
                </div>
                <ul>
                    <li v-for="(data, idx) in detail.file" :key="idx">
                        <a :href="data.link" target="_blank" class="button is-small is-info" v-if="data.nama_file!==''">
                            <span class="icon is-small">
                                <i class="mdi mdi-file-download-outline"></i>
                            </span>
                            <span class="has-text-elip-detail-activation">{{data.nama_file}}</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="column add-border-right">
                <hr class="is-hidden-desktop">
                <div class="content">
                    <h3 class="is-small has-text-weight-light">Status Request</h3>
                </div>
                <div class="columns is-multiline is-hidden-touch">
                    <div class="column is-12" v-for="(data,idx) in detail.status_request" :key="idx">
                        <div class="columns">
                            <div class="column is-5">
                                {{data.title}}
                            </div>
                            <div class="column">
                                <span v-if="data.status===0">: Permintaan Belum di proses</span>
                                <span v-else-if="data.status===1" class="has-text-warning">: Permintaan Sedang di proses</span>
                                <span v-else-if="data.status===2" class="has-text-red">: Permintaan di tolak</span>
                                <span v-else class="has-text-success">: Permintaan di setujui</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns is-multiline is-hidden-desktop">
                    <div class="column is-12" v-for="(data,idx) in detail.status_request" :key="idx">
                        <div class="columns">
                            <div class="column is-5">
                                {{data.title}}
                            </div>
                            <div class="column">
                                <span v-if="data.status===0">Permintaan Belum di proses</span>
                                <span v-else-if="data.status===1" class="has-text-warning">Permintaan Sedang di proses</span>
                                <span v-else-if="data.status===2" class="has-text-red">Permintaan di tolak</span>
                                <span v-else class="has-text-success">Permintaan di setujui</span>
                            </div>
                            <hr class="is-hidden-desktop" style="margin-top:0px;margin-bottom:0px">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from "axios";
    export default {
        props: {
            kodeRequest: {
                type: String
            }
        },
        data() {
            return {
                detail: "",
                waktu_sisa: ""
            }
        },
        methods: {
            getDetail() {
                this.$parent.isLoading = true;
                let formData = new FormData();
                formData.append('kode_request', this.kodeRequest);
                let diffTime
                let diffDays
                let self = this;
                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/getdetailserv", formData, {
                            headers: {
                                token: localStorage.getItem('token'),
                                nik: localStorage.getItem('nik')
                            }
                        }
                    )
                    .then(function(response) {
                        self.detail = response.data.data
                        // console.log(self.detail.status_request)
                        if (self.detail.tanggal_awal !== "" && self.detail.tanggal_akhir !== "") {
                            diffTime = Math.abs(new Date(self.detail.tanggal_akhir) - new Date(self.detail.tanggal_awal));
                            diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            self.waktu_sisa = diffDays
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    .finally(() => (self.$parent.isLoading = false));
            },
        },
        mounted() {
            this.getDetail()
        }

    }
</script>