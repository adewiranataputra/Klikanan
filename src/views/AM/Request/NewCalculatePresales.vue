<template>
    <section id="vapp" class="contentPage">
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <section class="hero is-light is-bold">
            <div class="hero-body">
                <nav class="level">
                    <div class="level-left">
                        <h1 class="title is-marginless has-text-right font-hero-small">
                            <span>New Calculate Presales</span>
                        </h1>
                    </div>
                </nav>
            </div>
        </section>
        <section class="section">
            <div id="contentApp" class="container">
                <my-table :data="precalc" :fields="[]" ref="widget" striped :per-page="perpage" :showAll="showAll" v-if="showTable">
                    <template slot-scope="props">
                        <b-table-column width="19%" field="nama_customer" label="Nama Customer" sortable>
                            <p>{{ props.row.nama_customer }}</p>
                        </b-table-column>
                        <b-table-column width="13%" field="nama_pic" label="Nama PIC" sortable>
                            <p>{{ props.row.nama_pic }}</p>
                        </b-table-column>
                        <b-table-column field="no_hp" label="No. HP" sortable>
                            <p>{{ props.row.no_hp }}</p>
                        </b-table-column>
                        <b-table-column field="email" label="Email Customer" sortable>
                            <p>{{ props.row.email }}</p>
                        </b-table-column>
                        <b-table-column field="status_request" label="Status Request" sortable>
                            <p>{{ props.row.status_request }}</p>
                        </b-table-column>
                        <b-table-column width="14%" field="date_time" label="Tanggal Pembuatan" sortable>
                            <p>{{ props.row.date_time | moment }}</p>
                        </b-table-column>
                        <b-table-column field="upload" label="Upload" width="70" centered>
                            <b-tooltip type="is-dark" label="Upload Dokumen Teknis" position="is-left" style="cursor:pointer">
                                <b-upload v-model="selectedDocument" name="evidDoc" required style="width:100%;cursor:pointer" @input="updateDoc(props.row.id_precalc)">
                                    <span class="mdi mdi-progress-upload mdi-24px has-text-info"></span>
                                </b-upload>
                            </b-tooltip>
                        </b-table-column>
                        <b-table-column field="action" label="Action" width="70" centered class="align-middle">
                            <!-- <b-tooltip type="is-dark" label="Upload Dokumen Teknis" position="is-left" style="cursor:pointer">
                                <span class="mdi mdi-progress-upload mdi-24px has-text-info"></span>
                            </b-tooltip> -->
                            <b-dropdown aria-role="list" type="is-success" position="is-bottom-left" class="is-small">
                                <span slot="trigger" class="mdi mdi-menu-custom mdi-24px"></span>
                                <div class="dropdown-item dropdown-label" style="padding-bottom:0px;">Download Document Spek Teknis</div>
                                <!-- <hr style="margin-top:0px;margin-bottom:0px"> -->
                                <!-- <span v-for="(data, index) in props.row.dokumen_spek_teknis" :key="index">
                                        <b-dropdown-item has-link>
                                            <a :href="data.link" target="_blank">
                                                <span class="mdi mdi-printer"></span>
                                                {{ data.title }}
                                            </a>
                                        </b-dropdown-item>
                                    </span> -->
                                <b-dropdown-item has-link>
                                    <a :href="props.row.dokumen_spek_teknis" target="_blank">
                                        <span class="mdi mdi-printer"></span>
                                        Dokumen Spek Teknis
                                    </a>
                                </b-dropdown-item>

                                <div class="dropdown-item dropdown-label" style="padding-bottom:0px;" v-if="props.row.file_precalc_presales !== ''">Download File Precalc</div>
                                <div class="dropdown-item dropdown-label" v-else>Download File Precalc</div>
                                <span v-if="props.row.file_precalc_presales !== ''">
                                    <!-- <span v-for="(data, index) in props.row.file_precalc_presales" :key="index">
                                            <b-dropdown-item has-link>
                                                <a :href="data.link" target="_blank">
                                                    <span class="mdi mdi-printer"></span>
                                                    {{ data.title }}
                                                </a>
                                            </b-dropdown-item>
                                        </span> -->
                                    <b-dropdown-item has-link>
                                        <a :href="props.row.file_precalc_presales" target="_blank">
                                            <span class="mdi mdi-printer"></span>
                                            File Precalc Presales
                                        </a>
                                    </b-dropdown-item>
                                </span>
                                <span v-else>
                                    <b-dropdown-item has-link class="has-background-light" style="cursor:no-drop">
                                        <p><i><small>Tidak ada berkas</small></i></p>
                                    </b-dropdown-item>
                                </span>

                                <div class="dropdown-item dropdown-label" style="padding-bottom:0px;">Action</div>
                                <b-dropdown-item has-link>
                                    <!-- <a @click="test(props.row)">
                                        <span class="mdi mdi-upload"></span>
                                        Upload Dokumen teknis
                                    </a> -->
                                    <a @click="detailCustomer(props.row)">
                                        <span class="mdi mdi-information"></span>
                                        Detail
                                    </a>
                                    <a @click="deleteCustomer(props.row)">
                                        <span class="mdi mdi-delete"></span>
                                        Hapus
                                    </a>
                                </b-dropdown-item>
                            </b-dropdown>
                        </b-table-column>
                    </template>

                    <template slot="top-right-before">
                        <div class="level-item">
                            <b-button tag="a" @click="addPrecalc" type="is-info is-light" class="is-fullwidth">
                                <span class="icon">
                                    <span class="mdi mdi-tooltip-plus-outline"></span>
                                </span>
                                <span>Add New Calculate</span>
                            </b-button>
                        </div>
                    </template>

                    <template slot="top-right">
                        <div class="level-item">
                            <b-field>
                                <p class="control">
                                    <span class="button is-static is-light-blue-blend" style="min-width:30px;">Show</span>
                                </p>
                                <b-select v-model="selectedShow">
                                    <!-- <option value="all">All</option> -->
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

                <div v-if="showAdd" class="animated fadeIn faster">
                    <add-precalc :list-compute="listCompute" :list-storage="listStorage" :list-database="listDatabase" :list-ip="listIp" :list-os="listOS" :list-vns="listVNS"></add-precalc>
                </div>

                <div v-if="showDetail" class="animated fadeIn faster">
                    <detail-precalc :detail-list-precalc="detailListPrecalc"></detail-precalc>
                </div>



            </div>
            <span class="spacing-medium"></span>
        </section>
    </section>
</template>

<script>
    import DetailPrecalc from '@/components/AM/CalculatePresales/Detail.vue'
    import AddPrecalc from '@/components/AM/CalculatePresales/AddPrecalc.vue'
    import axios from "axios";
    import MyTable from '@/components/datatable/table.vue'
    import {
        notified,
        checkConnection
    } from '@/helper/tools.js'
    export default {
        components: {
            MyTable,
            DetailPrecalc,
            AddPrecalc
        },
        watch: {
            selectedShow: function(newQuery) {
                this.perpage = Number(newQuery)
                this.showAll = false
            },
            selectedDocument: function(newQuery) {
                this.determineFieldStatus
            }
        },
        data() {
            return {
                isLoading: false,
                showAll: false,
                selectedShow: 10,
                perpage: 10,
                showTable: true,
                showAdd: false,
                showDetail: false,
                detailListPrecalc: undefined,
                listCompute: null,
                listDatabase: null,
                listIp: null,
                listOS: null,
                listStorage: null,
                listVNS: null,
                precalc: [],
                selectedDocument: [],
                docName: [],
                fileValidation: true,
                allowedFile: "doc|docx|pdf|xls|xlsx|csv|ppt|pptx",
                id_precalc: ""
            }
        },
        methods: {
            checkExtention(filename) {
                let sliced = filename.split(".");
                let lastEnd = sliced.pop();
                this.fileValidation = this.allowedArray.includes(
                    lastEnd.toLowerCase()
                );
            },
            formatSizeString(size) {
                let counter = 0;
                while (size > 1000) {
                    size = size / 1000;
                    counter++;
                }

                if (counter == 0) {
                    size = size.toFixed(0) + " Byte";
                } else if (counter == 1) {
                    size = size.toFixed(1) + " KB";
                } else if (counter == 2) {
                    size = size.toFixed(1) + " MB";
                } else if (counter == 3) {
                    size = size.toFixed(1) + " GB";
                } else {
                    size = size.toFixed(2);
                }

                return size;
            },
            deleteFile() {
                this.selectedDocument = []
            },
            test(val) {
                console.log(val)
            },
            updateDoc(val) {
                this.id_precalc = val
            },
            getListPrecalc() {
                let self = this;
                axios
                    .get(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/precalam/getlistprecalc", {
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        }
                    )
                    .then(function(response) {
                        // console.log(response.data.data)
                        self.listCompute = response.data.data.Compute
                        self.listDatabase = response.data.data.Database
                        self.listIp = response.data.data.IP_Public
                        self.listOS = response.data.data.Operating_System
                        self.listStorage = response.data.data.Storage
                        self.listVNS = response.data.data.VNS
                        // console.log(self.listOS)
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            getData() {
                this.isLoading = true;
                let self = this;
                axios
                    .get(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/precalam/getprecal", {
                            headers: {
                                token: localStorage.getItem('token'),
                                nik: localStorage.getItem('nik')
                            }
                        }
                    )
                    .then(function(response) {
                        // console.log(response.data.data)
                        self.precalc = response.data.data
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    .finally(() => (self.isLoading = false));
            },
            addPrecalc() {
                this.showTable = !this.showTable
                this.showAdd = !this.showAdd
            },
            detailCustomer(val) {
                this.detailListPrecalc = val
                this.showTable = !this.showTable
                this.showDetail = !this.showDetail
            },
            deleteCustomer(val) {
                this.$buefy.dialog.confirm({
                    title: 'Delete',
                    message: 'Kamu yakin ingin menghapus customer <b>' + val.nama_customer + '</b> ?',
                    confirmText: 'Ok',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.doDelete(val)
                })
            },
            doDelete(val) {
                this.isLoading = true;
                let self = this
                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/precalam/delprecalc", {}, {
                            headers: {
                                token: localStorage.getItem('token'),
                                nik: localStorage.getItem('nik'),
                                id_precalc: String(val.id_precalc)
                            }
                        }
                    )
                    .then(function(response) {
                        // console.log(response)
                        self.getData();
                    })
                    .catch(function(error) {
                        console.log(error);
                    }).finally(() => (self.isLoading = false));
            }

        },
        computed: {
            documentName() {
                if (this.selectedDocument !== []) {
                    this.selectedDocument.forEach(doc => {
                        let size = this.formatSizeString(doc.size);
                        this.checkExtention(doc.name);
                        this.docName.push(doc.name);
                    });
                    return this.docName;
                }

                return "No Document Selected";
            },
            determineFieldStatus() {
                if (this.selectedDocument.length != 0) {
                    this.checkExtention(this.selectedDocument.name);
                }
                if (!this.fileValidation) {
                    this.selectedDocument = [];
                    this.$buefy.toast.open({
                        duration: 1000,
                        message: `File yang anda masukan tidak sesuai dengan format yang di izinkan`,
                        position: 'is-top-right',
                        type: 'is-danger'
                    })
                } else {
                    let formData = new FormData();
                    formData.append('file', this.selectedDocument);
                    this.isLoading = true
                    let self = this
                    axios
                        .post(
                            "https://www.api-fab-cds.rumahcomp.com/fab/api/precalam/updatedoc", formData, {
                                headers: {
                                    "token": localStorage.getItem('token'),
                                    "nik": localStorage.getItem('nik'),
                                    "id_precalc": this.id_precalc
                                }
                            }
                        )
                        .then(function(response) {
                            // console.log(response)
                            self.getData();
                            self.$buefy.toast.open({
                                duration: 3000,
                                message: `Upload Dokumen Berhasil`,
                                position: 'is-top-right',
                                type: 'is-success'
                            })
                        })
                        .catch(function(error) {
                            console.log(error);
                        }).finally(() => (self.$parent.isLoading = false));
                    // return true
                }

                if (this.selectedDocument === null) {
                    return "";
                }

                return "is-success";
            },
            allowedArray() {
                return this.allowedFile.split("|");
            }
        },
        mounted() {
            // console.log(localStorage.getItem('token'))
            // console.log(localStorage.getItem('nik'))
            this.getData()
            this.getListPrecalc()
        }
    }
</script>

// <style lang="scss">
    //     .table.is-striped tbody tr:not(.is-selected):nth-child(2n) {
    //         background-color: #f3f3f3 !important;
    //         // #808080
    //     }

    //     .b-table .table tr:not(:first-child){
    //         background-color: #808080;
    //     }
    // 
    // 
</style>