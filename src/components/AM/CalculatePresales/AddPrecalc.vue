<template>
    <div>
        <div class="columns is-marginless">
            <div class="column is-8 content is-marginless is-paddingless">
                <h3 class="is-small has-text-weight-light is-reduced-margin is-uppercase" style="padding-top:2%">Add New Calculate Presales</h3>
            </div>
            <div class="column" style="padding-left:0px; padding-right:0px">
                <a class="button is-red is-long is-pulled-right is-hidden-touch" @click="$parent.addPrecalc">
                    Back
                </a>
                <a class="button is-red is-long is-hidden-desktop" @click="$parent.addPrecalc">
                    Back
                </a>
            </div>
        </div>

        <hr style="margin-top:0px">

        <div class="content">
            <h3 class="is-small has-text-weight-light">Data Customer</h3>
        </div>
        <span class="spacing-normal"></span>
        <form @submit="doSubmit" onsubmit="return false;">
            <!-- <b-input type="hidden" v-model="dataForm.nik" required></b-input> -->
            <div class="columns is-multiline">
                <div class="column is-6">
                    <b-field label="Nama Customer">
                        <b-input type="text" placeholder="ex: name" v-model="dataForm.nama_customer" required></b-input>
                    </b-field>
                </div>
                <div class="column is-6">
                    <b-field label="Nomor HP Customer">
                        <b-input type="text" placeholder="ex: 08xxxxx" pattern="[0-9]+" v-model="dataForm.no_hp" required></b-input>
                    </b-field>
                </div>
                <div class="column is-6">
                    <b-field label="Email Customer">
                        <b-input type="email" placeholder="ex: name@domain.com" v-model="dataForm.emailCustomer" required></b-input>
                    </b-field>
                </div>
                <div class="column is-6">
                    <b-field label="Nama PIC">
                        <b-input type="text" placeholder="Ex: name" v-model="dataForm.nama_pic" required></b-input>
                    </b-field>
                </div>
                <div class="column is-6">
                    <p class="label">Masukan Margin</p>
                    <b-field>
                        <b-input placeholder="%" expanded v-model="dataForm.margin" type="number" required>
                        </b-input>
                        <p class="control">
                            <span class="button is-static is-light-blue-blend" style="min-width:30px;">%</span>
                        </p>
                    </b-field>
                </div>
                <div class="column is-6">
                    <p class="label">Document Spek Teknis</p>
                    <b-upload v-model="selectedDocument" name="evidDoc" required style="width:100%;">
                        <a class="button is-light-blue is-fullwidth">
                            <b-icon icon="upload"></b-icon>
                            <span>Browse File</span>
                        </a>
                    </b-upload>
                    <p :class="'help ' + determineFieldStatus">
                        File yang dibolehkan: doc, docx,
                        pdf, xls, xlsx, csv, ppt, pptx ;
                        <span v-if="!fileValidation">
                            <br>
                            File yang anda masukan tidak sesuai dengan format yang di izinkan
                        </span>
                    </p>
                    <article class="media" v-if="selectedDocument.length !== 0">
                        <div class="media-content">
                            <div class="content">
                                <div class="white-space"></div>
                                <span class="tag is-info">
                                    {{ selectedDocument.name }}
                                    <button class="delete is-small" type="button" @click="deleteFile()">
                                    </button>
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            <hr style="margin-top:0px">

            <div class="content">
                <h3 class="is-small has-text-weight-light">Pilih Paket Untuk Dihitung</h3>
                <!-- <span class="spacing-normal"></span> -->
            </div>
            <b-collapse class="card is-shadowless is-light-blue" :open="true">
                <div slot="trigger" slot-scope="props" class="card-header" role="button">
                    <p class="card-header-title has-text-light">
                        Virtual Machine
                    </p>
                    <a class="card-header-icon">
                        <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>

                <span class="spacing-normal"></span>

                <div class="columns is-multiline has-text-centered" style="margin-left:1px;margin-right:1px">
                    <div class="column is-2" style="border:1px solid grey; background-color:#e6e6e6">
                        <p class="label"><small>Item DC</small></p>
                    </div>
                    <div class="column is-2" style="border:1px solid grey; background-color:#e6e6e6">
                        <p class="label"><small>Banyak Item</small></p>
                    </div>
                    <div class="column is-2" style="border:1px solid grey; background-color:#e6e6e6">
                        <p class="label"><small>Tarif</small></p>
                    </div>
                    <div class="column is-2" style="border:1px solid grey; background-color:#e6e6e6">
                        <p class="label"><small>Total Price (Month)</small></p>
                    </div>
                    <div class="column is-1" style="border:1px solid grey; background-color:#e6e6e6">
                        <p class="label"><small>Period (Month)</small></p>
                    </div>
                    <div class="column is-2" style="border:1px solid grey; background-color:#e6e6e6">
                        <p class="label"><small>Total (Year)</small></p>
                    </div>
                    <div class="column is-1" style="border:1px solid grey; background-color:#e6e6e6">
                        <p class="label"><small>Tambah</small></p>
                    </div>
                </div>

                <span class="spacing-normal"></span>

                <p class="label is-medium">1. TelkomCLoud vMachine</p>
                <p>Setup & Annual Fee</p>

                <span class="spacing-normal"></span>

                <div class="columns is-multiline">
                    <div class="column is-2">
                        <b-field label="Initial Setup">
                            <b-input placeholder="Initial Setup" type="text" pattern="[0-9]+" v-model="dataForm.initialSetup" expanded min="0"></b-input>
                        </b-field>
                    </div>
                </div>

                <p class="label">Compute</p>
                <div class="columns is-multiline" v-for="(data, index) in compute" :key="index">
                    <div class="column is-2-widescreen is-2-fullhd">
                        <b-field>
                            <b-select placeholder="Pilih Layanan" v-model="data.id_list_precall">
                                <option v-for="(comp, index) in listCompute" :key="index" :value="comp.id_list_precall">
                                    {{ comp.package }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <div class="column is-2-widescreen is-2-fullhd">
                        <b-field>
                            <b-input type="number" placeholder="Banyak Item" expanded min="1" v-model="data.banyak_item"></b-input>
                            <p class="control">
                                <span class="button is-static is-light-blue-blend" style="min-width:30px;">VM</span>
                            </p>
                        </b-field>
                    </div>
                    <div class="column is-2-widescreen is-2-fullhd content is-marginless">
                        <b-message type="is-light-blue" size="is-small" expanded>
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.tarif | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-2-widescreen is-2-fullhd content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_mounth | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1-widescreen is-1-fullhd content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">12</h4>
                        </b-message>
                    </div>
                    <div class="column is-2-widescreen is-2-fullhd content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_year | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1-widescreen is-1-fullhd">
                        <b-button type="is-light-blue is-fullwidth" @click="addCompute()" icon-right="plus" v-if="index==0" />
                        <b-button type="is-danger is-fullwidth" @click="deleteCompute(index)" icon-right="minus" v-if="index!==0" />
                    </div>
                </div>


                <p class="label">Storage</p>
                <div class="columns is-multiline" v-for="(data, index) in storage" :key="index+'storage'">
                    <div class="column is-2">
                        <b-field>
                            <b-select placeholder="Pilih Layanan" expanded v-model="data.id_list_precall">
                                <option v-for="(stor, index) in listStorage" :key="index" :value="stor.id_list_precall">
                                    {{ stor.package }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <div class="column is-2">
                        <b-field>
                            <b-input type="number" placeholder="Banyak Item" expanded min="1" v-model="data.banyak_item"></b-input>
                            <p class="control">
                                <span class="button is-static is-light-blue-blend" style="min-width:30px;">GB</span>
                            </p>
                        </b-field>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right" style="max-height: 40px;">Rp. {{data.tarif | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_mounth | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">12</h4>
                        </b-message>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_year | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1">
                        <b-button type="is-light-blue is-fullwidth" @click="addStorage()" icon-right="plus" v-if="index==0" />
                        <b-button type="is-danger is-fullwidth" @click="deleteStorage(index)" icon-right="minus" v-if="index!==0" />
                    </div>
                </div>

                <p class="label">Operating System</p>
                <div class="columns is-multiline" v-for="(data, index) in operatingSystem" :key="index+'operatingSystem'">
                    <div class="column is-2">
                        <b-field>
                            <b-select placeholder="Pilih Layanan" expanded v-model="data.id_list_precall">
                                <option v-for="(os, index) in listOs" :key="index" :value="os.id_list_precall">
                                    {{ os.detail_layanan }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <div class="column is-2">
                        <b-field>
                            <b-input type="number" placeholder="Banyak Item" expanded min="1" v-model="data.banyak_item"></b-input>
                            <p class="control">
                                <span class="button is-static is-light-blue-blend" style="min-width:30px;">Lic</span>
                            </p>
                        </b-field>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right" style="max-height: 40px;">Rp. {{data.tarif | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_mounth | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">12</h4>
                        </b-message>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_year | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1">
                        <b-button type="is-light-blue is-fullwidth" @click="addOperatingSystem()" icon-right="plus" v-if="index==0" />
                        <b-button type="is-danger is-fullwidth" @click="deleteOperatingSystem(index)" icon-right="minus" v-if="index!==0" />
                    </div>
                </div>

                <p class="label is-medium">2. Internet Access</p>
                <span class="spacing-normal"></span>
                <p class="label">IP Public</p>
                <div class="columns is-multiline" v-for="(data, index) in ipPublic" :key="index+'ipPublic'">
                    <div class="column is-2">
                        <b-field>
                            <b-select placeholder="Pilih Layanan" expanded v-model="data.id_list_precall">
                                <option v-for="(ip, index) in listIp" :key="index" :value="ip.id_list_precall">
                                    {{ ip.detail_layanan }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <div class="column is-2">
                        <b-field>
                            <b-input type="number" placeholder="Banyak Item" expanded min="1" v-model="data.banyak_item"></b-input>
                            <p class="control">
                                <span class="button is-static is-light-blue-blend" style="min-width:30px;">Ls</span>
                            </p>
                        </b-field>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right" style="max-height: 40px;">Rp. {{data.tarif | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_mounth | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">12</h4>
                        </b-message>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_year | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1">
                        <b-button type="is-light-blue is-fullwidth" @click="addIpPublic()" icon-right="plus" v-if="index==0" />
                        <b-button type="is-danger is-fullwidth" @click="deleteIpPublic(index)" icon-right="minus" v-if="index!==0" />
                    </div>
                </div>

                <p class="label">VNS</p>
                <div class="columns is-multiline" v-for="(data, index) in vns" :key="index+'vns'">
                    <div class="column is-2">
                        <b-field>
                            <b-select placeholder="Pilih Layanan" expanded v-model="data.id_list_precall">
                                <option v-for="(v, index) in listVns" :key="index" :value="v.id_list_precall">
                                    {{ v.detail_layanan }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <div class="column is-2">
                        <b-field>
                            <b-input type="number" placeholder="Banyak Item" expanded min="1" v-model="data.banyak_item"></b-input>
                            <p class="control">
                                <span class="button is-static is-light-blue-blend" style="min-width:30px;">Ls</span>
                            </p>
                        </b-field>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right" style="max-height: 40px;">Rp. {{data.tarif | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_mounth | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">12</h4>
                        </b-message>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_year | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1">
                        <b-button type="is-light-blue is-fullwidth" @click="addVns()" icon-right="plus" v-if="index==0" />
                        <b-button type="is-danger is-fullwidth" @click="deleteVns(index)" icon-right="minus" v-if="index!==0" />
                    </div>
                </div>

                <p class="label is-medium">3. Database</p>
                <span class="spacing-normal"></span>
                <p class="label">Database</p>
                <div class="columns is-multiline" v-for="(data, index) in database" :key="index+'database'">
                    <div class="column is-2">
                        <b-field>
                            <b-select placeholder="Pilih Layanan" expanded v-model="data.id_list_precall">
                                <option v-for="(db, index) in listDatabase" :key="index" :value="db.id_list_precall">
                                    {{ db.detail_layanan }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <div class="column is-2">
                        <b-field>
                            <b-input type="number" placeholder="Banyak Item" min="1" v-model="data.banyak_item"></b-input>
                            <p class="control">
                                <span class="button is-static is-light-blue-blend" style="min-width:30px;">Unit</span>
                            </p>
                        </b-field>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right" style="max-height: 40px;">Rp. {{data.tarif | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_mounth | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">12</h4>
                        </b-message>
                    </div>
                    <div class="column is-2 content is-marginless">
                        <b-message type="is-light-blue" size="is-small">
                            <h4 class="is-marginless has-text-weight-light has-text-right">Rp. {{data.total_price_year | currency}}</h4>
                        </b-message>
                    </div>
                    <div class="column is-1">
                        <b-button type="is-light-blue is-fullwidth" @click="addDatabase()" icon-right="plus" v-if="index==0" />
                        <b-button type="is-danger is-fullwidth" @click="deleteDatabase(index)" icon-right="minus" v-if="index!==0" />
                    </div>
                </div>

            </b-collapse>

            <hr>

            <div class="buttons is-right">
                <button class="button is-success is-long" type="submit">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "addPrecalc",
        props: {
            listCompute: {
                type: Array,
                required: true
            },
            listStorage: {
                type: Array,
                required: true
            },
            listDatabase: {
                type: Array,
                required: true
            },
            listIp: {
                type: Array,
                required: true
            },
            listOs: {
                type: Array,
                required: true
            },
            listVns: {
                type: Array,
                required: true
            }
        },
        watch: {
            compute: {
                handler: function(newQuery, oldQuery) {
                    this.calculateCompute();
                },
                deep: true
            },
            storage: {
                handler: function(newQuery, oldQuery) {
                    this.calculateStorage();
                },
                deep: true
            },
            operatingSystem: {
                handler: function(newQuery, oldQuery) {
                    this.calculateOperatingSystem();
                },
                deep: true
            },
            ipPublic: {
                handler: function(newQuery, oldQuery) {
                    this.calculateIpPublic();
                },
                deep: true
            },
            vns: {
                handler: function(newQuery, oldQuery) {
                    this.calculateVns();
                },
                deep: true
            },
            database: {
                handler: function(newQuery, oldQuery) {
                    this.calculateDatabase();
                },
                deep: true
            }
        },
        data() {
            return {
                tempComp: null,
                selectedDocument: [],
                docName: [],
                fileValidation: true,
                allowedFile: "doc|docx|pdf|xls|xlsx|csv|ppt|pptx",
                dataForm: {
                    "initialSetup": 0,
                    "nik": "",
                    "nama_customer": "",
                    "no_hp": "",
                    "emailCustomer": "",
                    "nama_pic": "",
                    "margin": null,
                },
                compute: [{
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "detail_layanan": null,
                    "package": "",
                    "banyak_item": null,
                    "unit": "VM",
                    "tarif": 0,
                    "total_price_mounth": 0,
                    "total_price_year": 0
                }],
                storage: [{
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "detail_layanan": null,
                    "package": "",
                    "banyak_item": null,
                    "unit": "GB",
                    "tarif": 0,
                    "total_price_mounth": 12,
                    "total_price_year": 0
                }],
                operatingSystem: [{
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "detail_layanan": null,
                    "package": "",
                    "banyak_item": null,
                    "unit": "Lic",
                    "tarif": 0,
                    "total_price_mounth": 12,
                    "total_price_year": 0
                }],
                ipPublic: [{
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "detail_layanan": null,
                    "package": "",
                    "banyak_item": null,
                    "unit": "LS",
                    "tarif": 0,
                    "total_price_mounth": 12,
                    "total_price_year": 0
                }],
                vns: [{
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "detail_layanan": null,
                    "package": "",
                    "banyak_item": null,
                    "unit": "Port",
                    "tarif": 0,
                    "total_price_mounth": 12,
                    "total_price_year": 0
                }],
                database: [{
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "package": "",
                    "detail_layanan": null,
                    "banyak_item": null,
                    "unit": "Unit",
                    "tarif": 0,
                    "total_price_mounth": 12,
                    "total_price_year": 0
                }]
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
            doSubmit() {
                let tampungDataForm = JSON.stringify(this.dataForm)
                // console.log(tampungDataForm)
                let tampungCompute = JSON.stringify(this.compute)
                let tampungStorage = JSON.stringify(this.storage)
                let tampungOperatingSystem = JSON.stringify(this.operatingSystem)
                let tampungIpPublic = JSON.stringify(this.ipPublic)
                let tampungVns = JSON.stringify(this.vns)
                let tampungDatabase = JSON.stringify(this.database)
                let formData = new FormData();
                formData.append('file', this.selectedDocument);
                // var sendData = '{"dataForm":' + tampungDataForm + ',"compute":' + tampungCompute + '}'
                // var sendData = '{"dataForm":' + tampungDataForm + ',initialSetup":' + this.initialSetup + ',"compute":' + tampungCompute + ',"storage":' + tampungStorage + ',"operatingSystem":' + tampungOperatingSystem + ',"ipPublic":' + tampungIpPublic + ',"vns":' + tampungVns + ',"database":' + tampungDatabase + '}'

                // var sendData = '{"dataForm":' + tampungDataForm + ',"vMachine": {"initialSetup":' + this.initialSetup + ',"compute":' + tampungCompute + ',"storage":' + tampungStorage + ',"operatingSystem":' + tampungOperatingSystem + '},"internetAccess": {"ipPublic":' + tampungIpPublic + ',"vns":' + tampungVns + ',"database":' + tampungDatabase + '}}'
                var sendData = '{"dataForm":' + tampungDataForm + ',"detailListPrecalc": {"compute":' + tampungCompute + ',"storage":' + tampungStorage + ',"operatingSystem":' + tampungOperatingSystem + ',"ipPublic":' + tampungIpPublic + ',"vns":' + tampungVns + ',"database":' + tampungDatabase + '}}'
                // var sendData = '{"vMachine": {"initialSetup":' + this.initialSetup + ',"compute":' + tampungCompute + ',"storage":' + tampungStorage + ',"operatingSystem":' + tampungOperatingSystem + '},"internetAccess": {"ipPublic":' + tampungIpPublic + ',"vns":' + tampungVns + ',"database":' + tampungDatabase + '}}'
                var sendData = JSON.parse(sendData)
                this.$parent.isLoading = true
                let self = this
                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/precalam/inprecal", sendData, {
                            headers: {
                                "token": localStorage.getItem('token'),
                                "nik": localStorage.getItem('nik')
                            }
                        }
                    )
                    .then(function(response) {
                        // console.log(response.data.data)
                        axios
                            .post(
                                "https://www.api-fab-cds.rumahcomp.com/fab/api/precalam/updatedoc", formData, {
                                    headers: {
                                        "token": localStorage.getItem('token'),
                                        "nik": localStorage.getItem('nik'),
                                        "id_precalc": response.data.data
                                    }
                                }
                            )
                            .then(function(response) {
                                // console.log(response)
                                self.$parent.showTable = !self.$parent.showTable
                                self.$parent.showAdd = !self.$parent.showAdd
                                self.$parent.getData();
                            })
                            .catch(function(error) {
                                console.log(error);
                            }).finally(() => (self.$parent.isLoading = false));
                    })
                    .catch(function(error) {
                        console.log(error);
                    }).finally(() => (self.$parent.isLoading = false));
                // axios
                //     .post(
                //         "http://localhost:5501/demo/axios_check.php", sendData, {
                //             headers: {
                //                 "Content-Type": 'application/x-www-form-urlencoded'
                //             }
                //         }
                //     )
                //     .then(function(response) {
                //         console.log(response)
                //     })
                //     .catch(function(error) {
                //         console.log(error);
                //     }).finally(() => (self.$parent.isLoading = false));
            },
            addCompute() {
                var computed = {
                    // "tempComp": {},
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "detail_layanan": null,
                    "package": "",
                    "banyak_item": null,
                    "unit": "VM",
                    "tarif": 0,
                    "total_price_mounth": 0,
                    "total_price_year": 0
                }
                this.compute.push(computed)
            },
            deleteCompute(index) {
                this.compute.splice(index, 1);
            },
            calculateCompute() {
                // console.log(this.compute)
                for (let i = 0; i < this.compute.length; i++) {
                    this.tempComp = this.listCompute.find(found => found.id_list_precall === this.compute[i].id_list_precall);
                    // console.log(this.tempComp)
                    if (this.tempComp !== undefined) {
                        this.compute[i].jenis_layanan = this.tempComp.jenis_layanan
                        this.compute[i].detail_layanan = this.tempComp.detail_layanan
                        this.compute[i].package = this.tempComp.package
                        this.compute[i].tarif = this.tempComp.tarif
                        this.compute[i].total_price_mounth = this.compute[i].tarif * this.compute[i].banyak_item
                        this.compute[i].total_price_year = this.compute[i].total_price_mounth * 12
                    }
                }
            },
            addStorage() {
                var storage = {
                    // "tempStor": {},
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "detail_layanan": null,
                    "package": "",
                    "banyak_item": null,
                    "unit": "GB",
                    "tarif": 0,
                    "total_price_mounth": 0,
                    "total_price_year": 0
                }
                this.storage.push(storage)
            },
            deleteStorage(index) {
                this.storage.splice(index, 1);
            },
            calculateStorage() {
                for (let i = 0; i < this.storage.length; i++) {
                    this.tempComp = this.listStorage.find(found => found.id_list_precall === this.storage[i].id_list_precall);
                    if (this.tempComp !== undefined) {
                        this.storage[i].jenis_layanan = this.tempComp.jenis_layanan
                        this.storage[i].detail_layanan = this.tempComp.detail_layanan
                        this.storage[i].package = this.tempComp.package
                        this.storage[i].tarif = this.tempComp.tarif
                        this.storage[i].total_price_mounth = this.storage[i].tarif * this.storage[i].banyak_item
                        this.storage[i].total_price_year = this.storage[i].total_price_mounth * 12
                    }
                }
            },
            addOperatingSystem() {
                var operatingSystem = {
                    // "tempOS": {},
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "detail_layanan": null,
                    "package": "",
                    "banyak_item": null,
                    "unit": "Lic",
                    "tarif": 0,
                    "total_price_mounth": 12,
                    "total_price_year": 0
                }
                this.operatingSystem.push(operatingSystem)
            },
            deleteOperatingSystem(index) {
                this.operatingSystem.splice(index, 1);
            },
            calculateOperatingSystem() {
                for (let i = 0; i < this.operatingSystem.length; i++) {
                    this.tempComp = this.listOs.find(found => found.id_list_precall === this.operatingSystem[i].id_list_precall);
                    if (this.tempComp !== undefined) {
                        this.operatingSystem[i].jenis_layanan = this.tempComp.jenis_layanan
                        this.operatingSystem[i].detail_layanan = this.tempComp.detail_layanan
                        this.operatingSystem[i].package = this.tempComp.package
                        this.operatingSystem[i].tarif = this.tempComp.tarif
                        this.operatingSystem[i].total_price_mounth = this.operatingSystem[i].tarif * this.operatingSystem[i].banyak_item
                        this.operatingSystem[i].total_price_year = this.operatingSystem[i].total_price_mounth * 12
                    }
                }
            },
            addIpPublic() {
                var ipPublic = {
                    // "tempIP": {},
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "detail_layanan": null,
                    "package": "",
                    "banyak_item": null,
                    "unit": "LS",
                    "tarif": 0,
                    "total_price_mounth": 12,
                    "total_price_year": 0
                }
                this.ipPublic.push(ipPublic)
            },
            deleteIpPublic(index) {
                this.ipPublic.splice(index, 1);
            },
            calculateIpPublic() {
                for (let i = 0; i < this.ipPublic.length; i++) {
                    this.tempComp = this.listIp.find(found => found.id_list_precall === this.ipPublic[i].id_list_precall);
                    if (this.tempComp !== undefined) {
                        this.ipPublic[i].jenis_layanan = this.tempComp.jenis_layanan
                        this.ipPublic[i].detail_layanan = this.tempComp.detail_layanan
                        this.ipPublic[i].package = this.tempComp.package
                        this.ipPublic[i].tarif = this.tempComp.tarif
                        this.ipPublic[i].total_price_mounth = this.ipPublic[i].tarif * this.ipPublic[i].banyak_item
                        this.ipPublic[i].total_price_year = this.ipPublic[i].total_price_mounth * 12
                    }
                }
            },
            addVns() {
                var vns = {
                    // "tempVNS": {},
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "detail_layanan": null,
                    "package": "",
                    "banyak_item": null,
                    "unit": "Port",
                    "tarif": 0,
                    "total_price_mounth": 12,
                    "total_price_year": 0
                }
                this.vns.push(vns)
            },
            deleteVns(index) {
                this.vns.splice(index, 1);
            },
            calculateVns() {
                for (let i = 0; i < this.vns.length; i++) {
                    this.tempComp = this.listVns.find(found => found.id_list_precall === this.vns[i].id_list_precall);
                    if (this.tempComp !== undefined) {
                        this.vns[i].jenis_layanan = this.tempComp.jenis_layanan
                        this.vns[i].detail_layanan = this.tempComp.detail_layanan
                        this.vns[i].package = this.tempComp.package
                        this.vns[i].tarif = this.tempComp.tarif
                        this.vns[i].total_price_mounth = this.vns[i].tarif * this.vns[i].banyak_item
                        this.vns[i].total_price_year = this.vns[i].total_price_mounth * 12
                    }
                }
            },
            addDatabase() {
                var database = {
                    // "tempDatabase": {},
                    "id_list_precall": null,
                    "jenis_layanan": "",
                    "detail_layanan": null,
                    "package": "",
                    "banyak_item": null,
                    "unit": "Unit",
                    "tarif": 0,
                    "total_price_mounth": 12,
                    "total_price_year": 0
                }
                this.database.push(database)
            },
            deleteDatabase(index) {
                this.database.splice(index, 1);
            },
            calculateDatabase() {
                for (let i = 0; i < this.database.length; i++) {
                    this.tempComp = this.listDatabase.find(found => found.id_list_precall === this.database[i].id_list_precall);
                    if (this.tempComp !== undefined) {
                        this.database[i].jenis_layanan = this.tempComp.jenis_layanan
                        this.database[i].detail_layanan = this.tempComp.detail_layanan
                        this.database[i].package = this.tempComp.package
                        this.database[i].tarif = this.tempComp.tarif
                        this.database[i].total_price_mounth = this.database[i].tarif * this.database[i].banyak_item
                        this.database[i].total_price_year = this.database[i].total_price_mounth * 12
                    }
                }
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
                    return "is-danger";
                }

                if (this.selectedDocument === null) {
                    return "";
                }

                return "is-success";
            },
            allowedArray() {
                return this.allowedFile.split("|");
            }
        }
    }
</script>