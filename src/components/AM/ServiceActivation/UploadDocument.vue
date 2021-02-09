<template>
    <div>
        <div class="columns is-marginless">
            <div class="column is-8 content is-marginless is-paddingless is-hidden-touch">
                <h3 class="is-small has-text-weight-light is-reduced-margin is-uppercase" style="padding-top:2%">Upload Document</h3>
            </div>
            <div class="column is-8 content is-marginless is-paddingless is-hidden-desktop">
                <h3 class="is-small has-text-weight-light is-reduced-margin is-uppercase has-text-centered" style="padding-top:2%">Upload Document</h3>
            </div>
            <div class="column" style="padding-left:0px; padding-right:0px">
                <a class="button is-red is-long is-pulled-right is-hidden-touch" @click="$parent.uploadDocument">
                    Back
                </a>
                <a class="button is-red is-fullwidth is-hidden-desktop" @click="$parent.uploadDocument">
                    Back
                </a>
            </div>
        </div>

        <hr style="margin-top:0px">

        <div class="columns is-multiline">
            <div class="column is-6-widescreen is-3-fullhd has-text-centered">
                <div class="card" style="border-radius:15px; background-color:#fffefc">
                    <div class="card-content">
                        <p class="label">UPLOAD DOCUMENT <br> SUBFORM</p>
                        <br>
                        <b-field>
                            <b-upload v-model="selectedSubform" name="subForm" drag-drop>
                                <section class="section has-text-light-blue">
                                    <div class="content has-text-centered">
                                        <p>
                                            <b-icon icon="upload" size="is-large">
                                            </b-icon>
                                        </p>
                                        <p>Drag & Drop your files here <br> OR <br> Click to Upload <br>
                                            <small class="help has-text-success">
                                                {{fileDiizinkan}}
                                                <span class="has-text-danger" v-if="!subValidation"> <br> File yang anda masukan tidak sesuai dengan format yang di izinkan</span>
                                            </small>
                                        </p>
                                    </div>
                                </section>
                            </b-upload>
                        </b-field>
                        <span class="spacing-small"></span>
                        <div class="has-text-left">
                            <p class="has-text-light-blue"><small>Uploaded files</small></p>
                            <span class="spacing-small"></span>
                            <div class="media">
                                <div class="media-left">
                                    <img src="@/assets/file.png" alt="Placeholder image" style="height:48px" v-if="dataDocument.file[0].link === ''">
                                    <img src="@/assets/pdf.png" alt="Placeholder image" style="height:48px" v-else>
                                </div>
                                <div class="media-content">
                                    <p>Dokumen Subform</p>
                                    <div v-if="dataDocument.file[0].link !== ''">
                                        <a :href="dataDocument.file[0].link"><small><small>Lihat dokumen</small></small></a>
                                    </div>
                                    <div v-else>
                                        <p class="has-text-danger"><small><small>Berkas belum di upload</small></small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-6-widescreen is-3-fullhd has-text-centered">
                <div class="card" style="border-radius:15px">
                    <div class="card-content">
                        <p class="label">UPLOAD DOCUMENT <br> KONTRAK LAYANAN / PURCHASE ORDER</p>
                        <br>
                        <b-field>
                            <b-upload v-model="selectedKontrak" name="kontrak" drag-drop>
                                <section class="section has-text-light-blue">
                                    <div class="content has-text-centered">
                                        <p>
                                            <b-icon icon="upload" size="is-large">
                                            </b-icon>
                                        </p>
                                        <p>Drag & Drop your files here <br> OR <br> Click to Upload
                                            <small class="help has-text-success">
                                                {{fileDiizinkan}}
                                                <span class="has-text-danger" v-if="!kontrakValidation"> <br> File yang anda masukan tidak sesuai dengan format yang di izinkan</span>
                                            </small>
                                        </p>
                                    </div>
                                </section>
                            </b-upload>
                        </b-field>
                        <div class="has-text-left">
                            <p class="has-text-light-blue"><small>Uploaded files</small></p>
                            <span class="spacing-small"></span>
                            <div class="media">
                                <div class="media-left">
                                    <img src="@/assets/file.png" alt="Placeholder image" style="height:48px" v-if="dataDocument.file[1].link === ''">
                                    <img src="@/assets/pdf.png" alt="Placeholder image" style="height:48px" v-else>
                                </div>
                                <div class="media-content">
                                    <p>Dokumen Kontrak Layanan</p>
                                    <a :href="dataDocument.file[1].link" v-if="dataDocument.file[1].link !== ''"><small><small>Lihat dokumen</small></small></a>
                                    <p v-else class="has-text-danger"><small><small>Berkas belum di upload</small></small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-6-widescreen is-3-fullhd has-text-centered">
                <div class="card" style="border-radius:15px">
                    <div class="card-content">
                        <p class="label">UPLOAD DOCUMENT <br> WORK ORDER</p>
                        <br>
                        <b-field>
                            <b-upload v-model="selectedWO" name="nodin" drag-drop>
                                <section class="section has-text-light-blue">
                                    <div class="content has-text-centered">
                                        <p>
                                            <b-icon icon="upload" size="is-large">
                                            </b-icon>
                                        </p>
                                        <p>Drag & Drop your files here <br> OR <br> Click to Upload
                                            <small class="help has-text-success">
                                                {{fileDiizinkan}}
                                                <span class="has-text-danger" v-if="!woValidation"> <br> File yang anda masukan tidak sesuai dengan format yang di izinkan</span>
                                            </small>
                                        </p>
                                    </div>
                                </section>
                            </b-upload>
                        </b-field>
                        <div class="has-text-left">
                            <p class="has-text-light-blue"><small>Uploaded files</small></p>
                            <span class="spacing-small"></span>
                            <div class="media">
                                <div class="media-left">
                                    <img src="@/assets/file.png" alt="Placeholder image" style="height:48px" v-if="dataDocument.file[2].link === ''">
                                    <img src="@/assets/pdf.png" alt="Placeholder image" style="height:48px" v-else>
                                </div>
                                <div class="media-content">
                                    <p>Dokumen Work Order</p>
                                    <a :href="dataDocument.file[2].link" v-if="dataDocument.file[2].link !== ''"><small><small>Lihat dokumen</small></small></a>
                                    <p v-else class="has-text-danger"><small><small>Berkas belum di upload</small></small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-6-widescreen is-3-fullhd has-text-centered">
                <div class="card" style="border-radius:15px">
                    <div class="card-content">
                        <p class="label">UPLOAD DOCUMENT <br> NOTA DINAS</p>
                        <br>
                        <b-field>
                            <b-upload v-model="selectedNodin" name="nodin" drag-drop>
                                <section class="section has-text-light-blue">
                                    <div class="content has-text-centered">
                                        <p>
                                            <b-icon icon="upload" size="is-large">
                                            </b-icon>
                                        </p>
                                        <p>Drag & Drop your files here <br> OR <br> Click to Upload
                                            <small class="help has-text-success">
                                                {{fileDiizinkan}}
                                                <span class="has-text-danger" v-if="!nodinValidation"> <br> File yang anda masukan tidak sesuai dengan format yang di izinkan</span>
                                            </small>
                                        </p>
                                    </div>
                                </section>
                            </b-upload>
                        </b-field>
                        <div class="has-text-left">
                            <p class="has-text-light-blue"><small>Uploaded files</small></p>
                            <span class="spacing-small"></span>
                            <div class="media">
                                <div class="media-left">
                                    <img src="@/assets/file.png" alt="Placeholder image" style="height:48px" v-if="dataDocument.file[3].link === ''">
                                    <img src="@/assets/pdf.png" alt="Placeholder image" style="height:48px" v-else>
                                </div>
                                <div class="media-content">
                                    <p>Dokumen Nota Dinas</p>
                                    <a :href="dataDocument.file[3].link" v-if="dataDocument.file[3].link !== ''"><small><small>Lihat dokumen</small></small></a>
                                    <p v-else class="has-text-danger"><small><small>Berkas belum di upload</small></small></p>
                                </div>
                            </div>
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
            dataDocument: {
                type: Object,
                required: true
            }
        },
        watch: {
            selectedSubform: function(newQuery) {
                if (newQuery.name !== undefined) {
                    this.checkExtention(this.selectedSubform.name, "subform")

                    if (!this.subValidation) {
                        this.selectedSubform = []
                    } else {
                        if (!this.$parent.statUploadSubform) {
                            this.$parent.statUploadSubform = true
                            this.uploadDocumentSubform()
                        } else {
                            this.$buefy.toast.open({
                                duration: 3000,
                                message: `Subform sedang di upload, mohon tunggu sampai selesai`,
                                position: 'is-top-right',
                                type: 'is-danger'
                            })
                        }
                    }
                }
            },
            selectedKontrak: function(newQuery) {
                if (newQuery.name !== undefined) {
                    this.checkExtention(this.selectedKontrak.name, "kontrak")

                    if (!this.kontrakValidation) {
                        this.selectedKontrak = []
                    } else {
                        if (!this.$parent.statUploadKontrak) {
                            this.$parent.statUploadKontrak = true
                            this.uploadDocumentKontrak()
                        } else {
                            this.$buefy.toast.open({
                                duration: 3000,
                                message: `Kontrak Layanan / Purchase Order sedang di upload, mohon tunggu sampai selesai`,
                                position: 'is-top-right',
                                type: 'is-danger'
                            })
                        }
                    }
                }
            },
            selectedWO: function(newQuery) {
                if (newQuery.name !== undefined) {
                    this.checkExtention(this.selectedWO.name, "wo")

                    if (!this.woValidation) {
                        this.selectedWO = []
                    } else {
                        if (!this.$parent.statUploadWO) {
                            this.$parent.statUploadWO = true
                            this.uploadDocumentWO()
                        } else {
                            this.$buefy.toast.open({
                                duration: 3000,
                                message: `Work Order sedang di upload, mohon tunggu sampai selesai`,
                                position: 'is-top-right',
                                type: 'is-danger'
                            })
                        }
                    }
                }
            },
            selectedNodin: function(newQuery) {
                if (newQuery.name !== undefined) {
                    this.checkExtention(this.selectedNodin.name, "nodin")

                    if (!this.nodinValidation) {
                        this.selectedNodin = []
                    } else {
                        if (!this.$parent.statUploadNodin) {
                            this.$parent.statUploadNodin = true
                            this.uploadDocumentNodin()
                        } else {
                            this.$buefy.toast.open({
                                duration: 3000,
                                message: `Nota Dinas sedang di upload, mohon tunggu sampai selesai`,
                                position: 'is-top-right',
                                type: 'is-danger'
                            })
                        }
                    }
                }
            }
        },
        data() {
            return {
                selectedDocument1: [],
                dropFiles: [],
                selectedSubform: [],
                selectedKontrak: [],
                selectedWO: [],
                selectedNodin: [],
                subValidation: true,
                kontrakValidation: true,
                woValidation: true,
                nodinValidation: true,
                allowedFile: "pdf",
                fileDiizinkan: "File yang diizinkan: pdf "
            }
        },
        methods: {
            // checkExtention(filename) {
            //     // console.log(filename)
            //     let sliced = filename.split(".");
            //     let lastEnd = sliced.pop();
            //     return lastEnd;
            // },
            checkExtention(filename, jenis) {
                let sliced = filename.split(".");
                let lastEnd = sliced.pop();
                if(jenis === 'subform') {
                    return this.subValidation = this.allowedArray.includes(
                        lastEnd.toLowerCase()
                    );
                } else if(jenis === 'kontrak') {
                    return this.kontrakValidation = this.allowedArray.includes(
                        lastEnd.toLowerCase()
                    );
                } else if(jenis === 'wo') {
                    return this.woValidation = this.allowedArray.includes(
                        lastEnd.toLowerCase()
                    );
                } else if(jenis === 'nodin') {
                    return this.nodinValidation = this.allowedArray.includes(
                        lastEnd.toLowerCase()
                    );
                }
            },
            uploadDocumentSubform() {
                // console.log(this.dataDocument)

                if (this.$parent.showUploadedFile === false) {
                    this.$parent.showUploadedFile = true
                }
                this.selectedSubform.status = false
                let time = new Date().getTime()
                this.selectedSubform.idx = time

                this.$parent.uploadedFile.unshift(this.selectedSubform)
                // console.log(this.selectedSubform)
                let formData = new FormData();
                formData.append('file', this.selectedSubform);
                formData.append('idx', time);
                formData.append('kode_request', this.dataDocument.kode_request);

                let self = this
                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/upsubform", formData, {
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        }
                    )
                    .then(function(response) {
                        for (let i = 0; i < self.$parent.uploadedFile.length; i++) {
                            if (self.$parent.uploadedFile[i].idx === parseInt(response.data.data.idx.toString())) {
                                self.$parent.uploadedFile[i].status = true
                                let temp = self.$parent.uploadedFile[i]

                                self.$parent.uploadedFile.splice(i, 1)
                                self.$parent.uploadedFile.splice(i, 0, temp);
                                self.dataDocument.file[0].link = response.data.data.link
                                self.dataDocument.file[0].title = response.data.data.title

                            }
                        }
                        self.$parent.statUploadSubform = false

                    })
                    .catch(function(error) {
                        console.log(error);
                        for (let i = 0; i < self.$parent.uploadedFile.length; i++) {
                            if (self.$parent.uploadedFile[i].idx === parseInt(response.data.data.idx.toString())) {
                                self.$parent.uploadedFile[i].status = "failed"
                                let temp = self.$parent.uploadedFile[i]

                                self.$parent.uploadedFile.splice(i, 1)
                                self.$parent.uploadedFile.splice(i, 0, temp);

                            }
                        }
                        self.$parent.statUploadSubform = false
                    });
                // axios
                //     .post(
                //         "http://localhost:5501/demo/axios_check.php", formData, {
                //             headers: {
                //                 "Content-Type": 'application/x-www-form-urlencoded'
                //             }
                //         }
                //     )
                //     .then(function(response) {
                //         setTimeout(function() {
                //             for (let i = 0; i < self.$parent.uploadedFile.length; i++) {
                //                 if (self.$parent.uploadedFile[i].idx === parseInt(response.data.data.post.idx.toString())) {
                //                     self.$parent.uploadedFile[i].status = true
                //                     let temp = self.$parent.uploadedFile[i]

                //                     self.$parent.uploadedFile.splice(i, 1)
                //                     self.$parent.uploadedFile.splice(i, 0, temp);

                //                 }

                //             }
                //             self.$parent.statUploadSubform = false
                //         }, 3000);
                //     })
                //     .catch(function(error) {
                //         console.log(error);
                //     }).finally(() => (self.$parent.isLoading = false));

            },
            uploadDocumentKontrak() {

                if (this.$parent.showUploadedFile === false) {
                    this.$parent.showUploadedFile = true
                }
                this.selectedKontrak.status = false
                let time = new Date().getTime()
                this.selectedKontrak.idx = time

                this.$parent.uploadedFile.unshift(this.selectedKontrak)
                let formData = new FormData();
                formData.append('file', this.selectedKontrak);
                formData.append('idx', time);
                formData.append('kode_request', this.dataDocument.kode_request);

                let self = this
                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/upklpo", formData, {
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        }
                    )
                    .then(function(response) {
                        for (let i = 0; i < self.$parent.uploadedFile.length; i++) {
                            if (self.$parent.uploadedFile[i].idx === parseInt(response.data.data.idx.toString())) {
                                self.$parent.uploadedFile[i].status = true
                                let temp = self.$parent.uploadedFile[i]

                                self.$parent.uploadedFile.splice(i, 1)
                                self.$parent.uploadedFile.splice(i, 0, temp);
                                self.dataDocument.file[1].link = response.data.data.link
                                self.dataDocument.file[1].title = response.data.data.title

                            }
                        }
                        self.$parent.statUploadKontrak = false

                    })
                    .catch(function(error) {
                        console.log(error);
                        self.$parent.statUploadKontrak = false
                    });

            },
            uploadDocumentWO() {

                if (this.$parent.showUploadedFile === false) {
                    this.$parent.showUploadedFile = true
                }
                this.selectedWO.status = false
                let time = new Date().getTime()
                this.selectedWO.idx = time

                this.$parent.uploadedFile.unshift(this.selectedWO)
                let formData = new FormData();
                formData.append('file', this.selectedWO);
                formData.append('idx', time);
                formData.append('kode_request', this.dataDocument.kode_request);

                let self = this
                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/upwo", formData, {
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        }
                    )
                    .then(function(response) {
                        for (let i = 0; i < self.$parent.uploadedFile.length; i++) {
                            if (self.$parent.uploadedFile[i].idx === parseInt(response.data.data.idx.toString())) {
                                self.$parent.uploadedFile[i].status = true
                                let temp = self.$parent.uploadedFile[i]

                                self.$parent.uploadedFile.splice(i, 1)
                                self.$parent.uploadedFile.splice(i, 0, temp);
                                self.dataDocument.file[2].link = response.data.data.link
                                self.dataDocument.file[2].title = response.data.data.title

                            }
                        }
                        self.$parent.statUploadWO = false

                    })
                    .catch(function(error) {
                        console.log(error);
                        self.$parent.statUploadWO = false
                    });

            },
            uploadDocumentNodin() {

                if (this.$parent.showUploadedFile === false) {
                    this.$parent.showUploadedFile = true
                }
                this.selectedNodin.status = false
                let time = new Date().getTime()
                this.selectedNodin.idx = time

                this.$parent.uploadedFile.unshift(this.selectedNodin)
                let formData = new FormData();
                formData.append('file', this.selectedNodin);
                formData.append('idx', time);
                formData.append('kode_request', this.dataDocument.kode_request);

                let self = this
                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/upnodin", formData, {
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        }
                    )
                    .then(function(response) {
                        for (let i = 0; i < self.$parent.uploadedFile.length; i++) {
                            if (self.$parent.uploadedFile[i].idx === parseInt(response.data.data.idx.toString())) {
                                self.$parent.uploadedFile[i].status = true
                                let temp = self.$parent.uploadedFile[i]

                                self.$parent.uploadedFile.splice(i, 1)
                                self.$parent.uploadedFile.splice(i, 0, temp);
                                self.dataDocument.file[3].link = response.data.data.link
                                self.dataDocument.file[3].title = response.data.data.title

                            }
                        }
                        self.$parent.statUploadNodin = false

                    })
                    .catch(function(error) {
                        console.log(error);
                        self.$parent.statUploadNodin = false
                    });

            }
        },
        computed: {
            allowedArray() {
                return this.allowedFile.split("|");
            },
            determineFieldSubform() {
                if (!this.subValidation) {
                    this.selectedSubform = [];
                    return "is-danger";
                }

                if (this.selectedSubform === null) {
                    return "";
                }

                return "is-success";
            },
        },
        mounted() {
            // console.log(this.dataDocument.kode_request)
            // console.log(this.dataDocument.file[0].link)
        }
    }
</script>