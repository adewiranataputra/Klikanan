<template>
    <section id="vapp" class="contentPage">
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <section class="hero is-light is-bold">
            <div class="hero-body">
                <nav class="level">
                    <div class="level-left">
                        <h1 class="title is-marginless has-text-right font-hero-small">
                            <span>Service Activation</span>
                        </h1>
                    </div>
                </nav>
            </div>
        </section>
        <section class="section">
            <div id="contentApp" class="container">
                <!-- <div class="container"> -->

                <my-table :data="customer" :fields="[]" ref="widget" striped :per-page="perpage" v-if="showTable">
                    <template slot-scope="props">
                        <b-table-column width="140" field="kode_request" label="Kode Request" sortable>
                            {{ props.row.kode_request }}
                        </b-table-column>
                        <b-table-column width="15%" field="project_name" label="Project Name" sortable>
                            {{ props.row.project_name }}
                        </b-table-column>
                        <b-table-column field="nama_perusahaan_customer" label="Customer Name" sortable>
                            <p>{{ props.row.nama_perusahaan_customer }}</p>
                        </b-table-column>
                        <b-table-column field="nama_person" label="Contact Person" sortable>
                            <p>{{ props.row.nama_person }}</p>
                        </b-table-column>
                        <b-table-column field="date_time" label="Subscription Date" sortable>
                            <p>{{ props.row.date_time | moment }}</p>
                        </b-table-column>
                        <b-table-column width="12%" field="uploadDocument" label="Upload Document" centered>
                            <!-- <b-progress type="is-info" :value="props.row.uploadDocument" :max="4" show-value style="margin-right:30px"> {{ props.row.uploadDocument }} out of 4</b-progress> -->
                            <div class="columns is-multiline is-marginless is-centered">
                                <div class="column is-6-widescreen is-3-fullhd" style="padding:0;max-width:34px" v-for="(data, index) in props.row.file" :key="index">
                                    <b-tooltip :label="data.title" position="is-left" type="is-dark">
                                        <button :class="'button ' + determineUploadStatus(data.link)" style="max-height:22px;border-radius:0px;border-color:#ffffff"></button>
                                    </b-tooltip>
                                </div>
                            </div>
                        </b-table-column>
                        <b-table-column width="17%" field="statusOrder" label="Status Request" centered>
                            <!-- <b-progress type="is-info" :value="props.row.statusOrder" format="percent" show-value></b-progress> -->
                            <div class="columns is-multiline is-marginless">
                                <div class="column is-6-widescreen is-3-fullhd" style="padding:0;max-width:34px" v-for="(data, index) in props.row.status_request" :key="index">
                                    <b-tooltip :label="data.title" position="is-left" type="is-dark">
                                        <button :class="'button ' + determineRequestStatus(data.status)" style="max-height:22px;border-radius:0px;border-color:#ffffff"></button>
                                    </b-tooltip>
                                </div>
                            </div>
                        </b-table-column>
                        <b-table-column field="action" label="Action" width="70" centered>
                            <div class="newDropdown">
                                <b-dropdown aria-role="list" type="is-success" position="is-bottom-left" class="is-small">
                                    <span slot="trigger" class="mdi mdi-menu-custom mdi-24px"></span>
                                    <div class="dropdown-item dropdown-label" style="min-width:150px;">Download Document</div>
                                    <span v-for="(data, index) in props.row.file" :key="index">
                                        <b-dropdown-item has-link v-if="data.link !== ''">
                                            <a :href="data.link" target="_blank" class="has-text-elip" style="padding-right:16px">
                                                <span class="mdi mdi-printer"></span>
                                                {{ data.title }}
                                            </a>
                                        </b-dropdown-item>
                                        <span v-else>
                                            <b-dropdown-item has-link class="has-background-light" style="cursor:no-drop" v-if="index===0">
                                                <p><i><small>Tidak ada berkas</small></i></p>
                                            </b-dropdown-item>
                                        </span>
                                    </span>
                                    <div class="dropdown-item dropdown-label">Action</div>
                                    <b-dropdown-item has-link>
                                        <span>
                                            <a @click="uploadDocument(props.row)" v-if="props.row.action === 'true'">
                                                <span class="mdi mdi-upload"></span>
                                                Upload Document
                                            </a>
                                            <a style="cursor:no-drop" class="has-text-grey" v-else><span class="mdi mdi-upload"></span> Upload Document</a>
                                        </span>
                                        <a @click="detailActivation(props.row.kode_request)">
                                            <span class="mdi mdi-information"></span>
                                            Detail
                                        </a>
                                        <hr class="is-marginless">
                                        <span>
                                            <a @click="sendTo(props.row.kode_request)" v-if="props.row.action_sent==='true'">
                                                <span class="mdi mdi-send-circle-outline"></span>
                                                Send to...
                                            </a>
                                            <a style="cursor:no-drop" class="has-text-grey" v-else>
                                                <span class="mdi mdi-send-circle-outline"></span>
                                                Send to...
                                            </a>
                                        </span>
                                        <span>
                                            <a @click="editActivation(props.row.kode_request)" v-if="props.row.action === 'true'">
                                                <span class="mdi mdi-table-edit"></span>
                                                Edit
                                            </a>
                                            <a style="cursor:no-drop" class="has-text-grey" v-else><span class="mdi mdi-table-edit"></span> Edit</a>
                                        </span>
                                        <span>
                                            <a @click="deleteActivation(props.row.project_name,props.row.kode_request)" v-if="props.row.action === 'true'">
                                                <span class="mdi mdi-delete-circle-outline"></span>
                                                Hapus
                                            </a>
                                            <a style="cursor:no-drop" class="has-text-grey" v-else><span class="mdi mdi-delete-circle-outline"></span> Hapus</a>
                                        </span>

                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </b-table-column>
                    </template>

                    <template slot="top-right-before">
                        <div class="level-item">
                            <b-button tag="a" @click="addActivation" type="is-info is-light" class="is-fullwidth">
                                <span class="icon">
                                    <span class="mdi mdi-tooltip-plus-outline"></span>
                                </span>
                                <span>Add New Activation</span>
                            </b-button>
                        </div>
                    </template>

                    <template slot="top-right">
                        <div class="level-item">
                            <b-field>
                                <p class="control">
                                    <span class="button is-static is-info-blend" style="min-width:30px;">Show</span>
                                </p>
                                <b-select v-model="selectedShow">
                                    <option value="10">10 per page</option>
                                    <option value="25">25 per page</option>
                                    <option value="50">50 per page</option>
                                    <option value="100">100 per page</option>
                                </b-select>
                            </b-field>
                        </div>
                    </template>

                    <template slot="empty">
                        <span class="white-space"></span>
                        <b-message type="is-warning">
                            <p class="has-text-centered">Sorry, we can't find any data related</p>
                        </b-message>
                    </template>
                </my-table>


                <div class="animated fadeIn faster" v-if="showAdd">
                    <form-activation :list-tgu="listTgu" action="add"></form-activation>
                </div>

                <div class="animated fadeIn faster" v-if="showUpload">
                    <upload-document :data-document="dataDocument"></upload-document>
                </div>

                <div class="animated fadeIn faster" v-if="showEdit">
                    <form-activation :list-tgu="listTgu" action="edit" :kode-request="kodeRequestEdit"></form-activation>
                </div>

                <div class="animated fadeIn faster" v-if="showDetail">
                    <detail-activation :kode-request="kodeRequestEdit"></detail-activation>
                </div>

                <!-- </div> -->

            </div>
            <span class="spacing-small"></span>


        </section>

        <list-upload :uploaded-file="uploadedFile" v-if="showUploadedFile"></list-upload>

        <b-modal :active.sync="showSend" :width="400" :can-cancel="false">
            <div class="modal-card" has-modal-card style="width:auto">
                <section class="modal-card-body" style="border-radius:5px;">
                    <form>
                        <p class="modal-card-title">
                            Send to
                        </p>
                        <hr>
                        <b-field label="Presales">
                            <b-select v-model="selectedPresales" expanded>
                                <option :value="row.nik" v-for="(row, idx) in listPresales" :key="idx">{{ row.username }} - {{ row.nik }}</option>
                            </b-select>
                        </b-field>
                        <hr>
                        <div class="buttons is-right">
                            <b-button @click="sendTo()">BATAL</b-button>
                            <b-button class="is-info" :disabled="disabledSendModal" @click="doSend">
                                Send
                            </b-button>
                        </div>
                    </form>
                </section>
            </div>
        </b-modal>
    </section>
</template>

<script>
    import axios from "axios";
    import CrudInput from '@/components/crud/crudInput.vue'
    import MyTable from '@/components/datatable/table.vue'
    import FormActivation from '@/components/AM/ServiceActivation/FormActivation.vue'
    import UploadDocument from '@/components/AM/ServiceActivation/UploadDocument.vue'
    import DetailActivation from '@/components/AM/ServiceActivation/DetailActivation.vue'
    import ListUpload from '@/components/upload/listUpload.vue'
    export default {
        components: {
            MyTable,
            CrudInput,
            FormActivation,
            UploadDocument,
            ListUpload,
            DetailActivation
        },
        watch: {
            selectedShow: function(newQuery) {
                this.perpage = Number(newQuery)
            }
        },
        data() {
            return {
                isLoading: false,
                selectedShow: 10,
                perpage: 10,
                showTable: true,
                showAdd: false,
                showEdit: false,
                showUpload: false,
                showDetail: false,
                showSend: false,
                customer: [],
                dataDocument: [],
                showUploadedFile: false,
                uploadedFile: [],
                statUploadSubform: false,
                statUploadKontrak: false,
                statUploadWO: false,
                statUploadNodin: false,
                kodeRequestEdit: "",
                kodeRequestSend: "",
                listTgu: "",
                listPresales: "",
                selectedPresales: ""
            }
        },
        watch: {
            selectedShow: function(newQuery) {
                this.perpage = Number(newQuery)
                this.showAll = false
            }
        },
        methods: {
            getData() {
                this.isLoading = true;
                let self = this;
                axios
                    .get(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/getservice", {
                            headers: {
                                token: localStorage.getItem('token'),
                                nik: localStorage.getItem('nik')
                            }
                        }
                    )
                    .then(function(response) {
                        // console.log(response.data.data)
                        self.customer = response.data.data
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    .finally(() => (self.isLoading = false));
            },
            getTGU() {
                this.isLoading = true;
                let self = this;
                axios
                    .get(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/getcustgu", {
                            headers: {
                                token: localStorage.getItem('token'),
                                nik: localStorage.getItem('nik')
                            }
                        }
                    )
                    .then(function(response) {
                        self.listTgu = response.data.data
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    .finally(() => (self.isLoading = false));
            },
            getPresales() {
                this.isLoading = true;
                let self = this;
                axios
                    .get(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/getlistpresales", {
                            headers: {
                                token: localStorage.getItem('token'),
                                nik: localStorage.getItem('nik')
                            }
                        }
                    )
                    .then(function(response) {
                        self.listPresales = response.data.data
                        // console.log(self.listPresales)
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    .finally(() => (self.isLoading = false));
            },
            deleteActivation(project_name, kode_request) {
                this.$buefy.dialog.confirm({
                    title: 'Delete',
                    message: 'Kamu yakin ingin menghapus project <b>' + project_name + '</b> ?',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.doDelete(kode_request)
                })
            },
            doDelete(kode_request) {
                this.$parent.isLoading = true;
                let formData = new FormData();
                formData.append('kode_request', kode_request);
                let self = this;
                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/delprod", formData, {
                            headers: {
                                token: localStorage.getItem('token'),
                                nik: localStorage.getItem('nik')
                            }
                        }
                    )
                    .then(function(response) {
                        self.getData()
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    .finally(() => (self.$parent.isLoading = false));
            },
            sendTo(val) {
                this.kodeRequestSend = val
                if (this.showSend) {
                    this.selectedPresales = ""
                    this.kodeRequestSend = ""
                }
                this.showSend = !this.showSend
            },
            doSend() {
                // console.log(this.kodeRequestSend)
                // console.log(this.selectedPresales)
                this.$parent.isLoading = true;
                let formData = new FormData();
                formData.append('kode_request', this.kodeRequestSend);
                formData.append('pic_team_presales', this.selectedPresales);
                let self = this;
                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/sendtoapproval", formData, {
                            headers: {
                                token: localStorage.getItem('token'),
                                nik: localStorage.getItem('nik')
                            }
                        }
                    )
                    .then(function(response) {
                        self.showSend = false
                        self.getData()
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    .finally(() => (self.$parent.isLoading = false));
            },
            closeListUpload() {
                this.showUploadedFile = !this.showUploadedFile
                this.uploadedFile = []
            },
            test(val) {
                console.log(val)
            },
            addActivation() {
                this.showTable = !this.showTable
                this.showAdd = !this.showAdd
                if (this.showTable) {
                    this.getData()
                }
            },
            editActivation(val) {
                this.kodeRequestEdit = val
                this.showTable = !this.showTable
                this.showEdit = !this.showEdit
                if (this.showTable) {
                    this.getData()
                }
            },
            detailActivation(val) {
                this.kodeRequestEdit = val
                this.showTable = !this.showTable
                this.showDetail = !this.showDetail
                if (this.showTable) {
                    this.getData()
                }
            },
            uploadDocument(val) {
                this.dataDocument = val
                this.showTable = !this.showTable
                this.showUpload = !this.showUpload
                if (this.showTable) {
                    this.getData()
                }
            },
            determineUploadStatus(val) {
                if (val === "") {
                    return "is-grey2";
                } else {
                    return "is-success";
                }
            },
            determineRequestStatus(val) {
                if (val === 0) {
                    return "is-grey2";
                } else if (val === 1) {
                    return "is-warning";
                } else if (val === 2) {
                    return "is-red";
                } else {
                    return "is-success";
                }
            }
        },
        computed: {
            disabledSendModal() {
                return !(this.selectedPresales !== "")
            }
        },
        mounted() {
            this.getData()
            this.getTGU()
            this.getPresales()
        }
    }
</script>

<style lang="scss">
    // .b-step{
    .test {
        .steps {
            display: none !important;
        }

        [disabled] {
            background-color: #f3f3f3 !important;
        }

        .button.is-info[disabled] {
            background-color: #2793da !important;
        }

        .button.is-danger[disabled] {
            background-color: #f14668 !important;
        }

        .button.is-success[disabled] {
            background-color: #48c774 !important;
        }
    }

    .test1 {
        .steps+.step-content {
            display: none !important;
        }
    }

    .newDropdown {
        .dropdown-menu {
            max-width: 215px !important;
        }
    }

    .loaderUpload {
        -webkit-animation: spin 2s linear infinite;
        /* Safari */
        animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>