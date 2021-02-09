<template>
    <div>
        <div class="columns is-marginless" v-if="action==='add'">
            <div class="column is-8 content is-marginless is-paddingless is-hidden-touch">
                <h3 class="is-small has-text-weight-light is-reduced-margin is-uppercase" style="padding-top:2%">Add New Activation</h3>
            </div>
            <div class="column is-8 content is-marginless is-paddingless is-hidden-desktop">
                <h3 class="is-small has-text-weight-light is-reduced-margin is-uppercase has-text-centered" style="padding-top:2%">Add New Activation</h3>
            </div>
            <div class="column" style="padding-left:0px; padding-right:0px" v-if="action==='add'">
                <a class="button is-red is-long is-pulled-right is-hidden-touch" @click="$parent.addActivation">
                    Back
                </a>
                <a class="button is-red is-fullwidth is-hidden-desktop" @click="$parent.addActivation">
                    Back
                </a>
            </div>
        </div>

        <div class="columns is-marginless" v-if="action==='edit'">
            <div class="column is-8 content is-marginless is-paddingless">
                <h3 class="is-small has-text-weight-light is-reduced-margin is-uppercase" style="padding-top:2%">Edit Activation</h3>
            </div>
            <div class="column" style="padding-left:0px; padding-right:0px" v-if="action==='edit'">
                <a class="button is-danger is-long is-pulled-right is-hidden-touch" @click="$parent.editActivation">
                    Back
                </a>
                <a class="button is-danger is-long is-hidden-desktop" @click="$parent.editActivation">
                    Back
                </a>
            </div>
        </div>

        <hr style="margin-top:0px">

        <b-message id="is-alert-message" class="animated" type="is-info" style="margin-bottom:0px">
            <div class="columns is-multiline">
                <div class="column is-7">
                    <p style="padding-top:8px;"><b>Rincian Layanan / <i>Detail of Service</i></b></p>
                </div>
                <div class="column">
                    <b-steps class="test1" v-model="activeStep" :animated="isAnimated" :rounded="isRounded" :has-navigation="hasNavigation1" :icon-prev="prevIcon" :icon-next="nextIcon" :label-position="labelPosition" :mobile-mode="mobileMode">
                        <b-step-item step="1" type="is-light-green" icon="numeric-1"></b-step-item>
                        <b-step-item step="2" type="is-light-green" icon="numeric-2"></b-step-item>
                        <b-step-item step="3" type="is-light-green" icon="numeric-3"></b-step-item>
                    </b-steps>
                </div>
            </div>
        </b-message>

        <b-steps class="test" v-model="activeStep" :animated="isAnimated" :rounded="isRounded" :has-navigation="hasNavigation" :icon-prev="prevIcon" :icon-next="nextIcon" :label-position="labelPosition" :mobile-mode="mobileMode">

            <b-step-item step="1" icon="numeric-1">
                <!-- <form @submit="doSubmit" onsubmit="return false;"> -->
                <p class="label">Jenis Layanan / <i>Type of Services</i></p>
                <span class="spacing-small"></span>
                <div class="field">
                    <b-radio v-model="dataAdd.jenis_layanan" native-value="Baru" type="is-info">
                        Baru / <i>New</i>
                    </b-radio>
                </div>
                <div class="field">
                    <b-radio v-model="dataAdd.jenis_layanan" native-value="Perpanjangan" type="is-info">
                        Perpanjangan / <i>Reneval</i>
                    </b-radio>
                </div>
                <div class="field">
                    <b-radio v-model="dataAdd.jenis_layanan" native-value="Modif" type="is-info">
                        Modifikasi / <i>Modification</i> (Termasuk peningkatan atau penurunan layanan / <i>Including upgrade or downgrade of service)</i>
                    </b-radio>
                </div>

                <p class="label">Progress Administrasi / <i>Administration Progress</i></p>
                <span class="spacing-small"></span>

                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd block" style="margin-bottom:0px;padding-bottom:0px">
                        <b-radio v-model="dataAdd.tipe_id_project" native-value="Oppty" type="is-info">ID Kans / <i>Opportunity ID</i></b-radio>
                    </div>
                    <div class="column is-4-widescreen is-3-fullhd block" style="margin-bottom:0px;padding-bottom:0px">
                        <b-radio v-model="dataAdd.tipe_id_project" native-value="IWO" type="is-info">Perintah Kerja Internal / <i>IWO</i></b-radio>
                    </div>
                    <div class="column is-4-widescreen is-3-fullhd block" style="margin-bottom:0px;padding-bottom:0px">
                        <b-radio v-model="dataAdd.tipe_id_project" native-value="Others" type="is-info">Lainnya / <i>Others</i></b-radio>
                    </div>
                    <div class="column is-12-widescreen is-7-fullhd" style="margin-left:30px;padding-right:40px">
                        <b-input type="text" :disabled="dataAdd.disabledtipe_id_project" v-model="dataAdd.id_project"></b-input>
                    </div>
                </div>

                <p class="label">Tipe Proyek / <i>Project Type</i></p>
                <span class="spacing-small"></span>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <b-radio v-model="dataAdd.tipe_project" type="is-info" name="name" native-value="TGU">
                            Synergy TELKOMGROUP / <i>TGU</i>
                        </b-radio>
                    </div>
                    <div class="column is-4-widescreen is-3-fullhd">
                        <b-radio v-model="dataAdd.tipe_project" type="is-info" name="name" native-value="NON TGU">
                            Direct Customer / <i>Non-TGU</i>
                        </b-radio>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p style="margin-left:30px">Pelanggan / <i>Customer</i></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-select :disabled="dataAdd.disabledtipe_project" v-model="dataAdd.customer_tgu" expanded>
                            <option :value="row.nama_customer" v-for="(row, idx) in listTgu" :key="idx">{{ row.nama_customer }}</option>
                        </b-select>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p style="margin-left:30px">Segmen / <i>Segment</i></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-select :disabled="dataAdd.disabledtipe_project" expanded v-model="dataAdd.segment">
                            <option value="DBS">DBS</option>
                            <option value="DGS">DGS</option>
                            <option value="DES">DES</option>
                            <option value="Witel">Witel</option>
                        </b-select>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Nama Proyek / <i>Project Name </i> <span>*</span></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-field :type="message.type_project_name" :message="message.message_project_name">
                            <b-input type="text" expanded required v-model="dataAdd.project_name"></b-input>
                        </b-field>
                    </div>
                </div>
                <span class="spacing-normal"></span>
                <div class="field is-floating-label is-hidden-touch">
                    <p class="has-text-centered label has-text-red" style="font-size:16px;left:37%">Formulir Berlangganan / <i>Subscription Form</i></p>
                    <div style="border:1px solid #b5b5b5;position:relative"></div>
                </div>
                <p class="has-text-centered label has-text-red is-hidden-desktop">Formulir Berlangganan / <i>Subscription Form</i></p>
                <!-- <div style="border-top:1px solid black; position:relative"></div> -->
                <span class="spacing-normal"></span>

                <p class="label">Pelanggan Akhir / <i>End Customer</i></p>
                <span class="spacing-small"></span>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Nama Perusahaan / <i>Company Name </i> <span>*</span></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-field :type="message.type_nama_perusahaan_customer" :message="message.message_nama_perusahaan_customer">
                            <b-input type="text" expanded required v-model="dataAdd.nama_perusahaan_customer"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns is-multiline" style="margin-bottom:0px">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Alamat / <i>Address </i> <span>*</span></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-field :type="message.type_alamat_customer" :message="message.message_alamat_customer">
                            <b-input maxlength="200" type="textarea" required v-model="dataAdd.alamat_customer"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>NPWP / <i>Tax Registration No</i></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-input type="text" expanded v-model="dataAdd.npwp_customer"></b-input>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Kode Pos / <i>Post Code</i></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-field>
                            <b-input type="text" expanded v-model="dataAdd.kode_pos_customer" pattern="[0-9]+"></b-input>
                        </b-field>
                    </div>
                </div>

                <!-- </form> -->

            </b-step-item>

            <b-step-item step="2" icon="numeric-2">
                <p class="label">Personal Kontak / <i>Contact Person</i></p>
                <span class="spacing-small"></span>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Nama / <i>Name</i> <span>*</span></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-field :type="message.type_nama_person" :message="message.message_nama_person">
                            <b-input type="text" expanded required v-model="dataAdd.nama_person"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Jabatan / <i>Position</i> <span>*</span></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-field :type="message.type_jabatan_person" :message="message.message_jabatan_person">
                            <b-input type="text" expanded required v-model="dataAdd.jabatan_person"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns is-multiline" style="margin-bottom:0px">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Alamat / <i>Address</i> <span>*</span></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-field :type="message.type_alamat_person" :message="message.message_alamat_person">
                            <b-input maxlength="200" type="textarea" required v-model="dataAdd.alamat_person"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Email / <i>Email</i> <span>*</span></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-field :type="message.type_email_person" :message="message.message_email_person">
                            <b-input type="email" expanded required v-model="dataAdd.email_person"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Telp. Seluler / <i>Mobile Phone</i> <span>*</span></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-field :type="message.type_no_hp_person" :message="message.message_no_hp_person">
                            <b-input type="text" expanded required v-model="dataAdd.no_hp_person"></b-input>
                        </b-field>
                    </div>
                </div>

                <p class="label">Kontak Teknis / <i>Technical Contact</i></p>
                <span class="spacing-small"></span>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Nama / <i>Name</i></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-input type="text" expanded required v-model="dataAdd.nama_teknis"></b-input>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Jabatan / <i>Position</i></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-input type="text" expanded v-model="dataAdd.jabatan_teknis"></b-input>
                    </div>
                </div>
                <div class="columns is-multiline" style="margin-bottom:0px">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Alamat / <i>Address</i></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd" style="padding-bottom:0px">
                        <b-input maxlength="200" type="textarea" v-model="dataAdd.alamat_teknis"></b-input>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Email / <i>Email</i></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-field>
                            <b-input type="email" expanded v-model="dataAdd.email_teknis" pattern="[a-z0-9._%+-]+@[a-z0-9.-]"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Telp. Seluler / <i>Mobile Phone</i></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd">
                        <b-field>
                            <b-input type="text" expanded v-model="dataAdd.no_hp_teknis" pattern="[0-9]+"></b-input>
                        </b-field>
                    </div>
                </div>

            </b-step-item>

            <b-step-item step="3" icon="numeric-3">
                <p class="label">Rincian Produk / <i>Detail of Product</i></p>
                <span class="spacing-small"></span>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Tipe Produk / <i>Product Type</i></p>
                    </div>
                    <div class="column is-3-widescreen is-2-fullhd">
                        <b-radio v-model="dataAdd.tipe_produk" native-value="IaaS" type="is-info">IaaS / <i>Infra as a Service</i></b-radio>
                    </div>
                    <div class="column is-3-widescreen is-3-fullhd">
                        <b-radio v-model="dataAdd.tipe_produk" native-value="SaaS" type="is-info">SaaS / <i>Software as a Service</i></b-radio>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Waktu Aktivasi / <i>Target Delivery</i></p>
                    </div>
                    <div class="column is-4-widescreen is-4-fullhd">
                        <!-- <b-field :type="message.type_tanggal_aktivasi" :message="message.message_tanggal_aktivasi"> -->
                        <crud-input type="datepicker" input-style="margin-bottom:0px;" :required="true" name="start" :min-date="dateNow" using-type v-model="tanggal_aktivasi" placeholder="Date" datePosition="is-bottom-right" :tipe="message.type_tanggal_aktivasi" :message="message.message_tanggal_aktivasi"></crud-input>
                        <!-- </b-field> -->
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Periode Layanan / <i>Service Periode</i></p>
                    </div>
                    <div class="column is-8-widescreen is-8-fullhd">
                        <b-field grouped>
                            <b-field expanded style="margin-bottom:0px;" v-if="tanggal_aktivasi !== null">
                                <crud-input type="datepicker" input-style="margin-bottom:0px;" required name="start" placeholder="Start Date" :min-date="minDateStart" v-model="tanggal_awal"></crud-input>
                            </b-field>
                            <b-field expanded style="margin-bottom:0px;" v-if="tanggal_aktivasi === null">
                                <b-input placeholder="Start Date" icon="calendar" disabled>
                                </b-input>
                            </b-field>
                            <p class="control" style="padding-top: .5em;" >
                                <span class="mdi mdi-arrow-right-bold"></span>
                            </p>
                            <b-field expanded v-if="tanggal_awal !== null">
                                <crud-input type="datepicker" input-style="margin-bottom:0px;" name="end" placeholder="End Date" :min-date="minDateEnd" v-model="tanggal_akhir">
                                </crud-input>
                            </b-field>
                            <b-field expanded style="margin-bottom:0px;" v-if="tanggal_awal === null">
                                <b-input placeholder="End Date" icon="calendar" disabled>
                                </b-input>
                            </b-field>
                        </b-field>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Waktu Sisa / <i>Time Remaining</i></p>
                    </div>
                    <div class="column is-2-widescreen is-2-fullhd">
                        <b-field expanded>
                            <p class="control">
                                <span class="button is-static is-white-blend">{{waktu_sisa}}</span>
                            </p>
                            <span class="button is-static is-light-blue-blend" style="justify-content:left">Hari / Days</span>
                        </b-field>
                        <!-- <b-field>
                            <b-input type="text" expanded v-model="waktu_sisa" v-if="!isNaN(waktu_sisa)"></b-input>
                            <b-input type="text" expanded v-else></b-input>
                            <p class="control">
                                <span class="button is-static is-info-blend" style="min-width:40px;">Hari / Days</span>
                            </p>
                        </b-field> -->
                    </div>
                </div>

                <p class="label">Data Pelengkap / <i>Complementary Data</i></p>
                <span class="spacing-normal"></span>
                <div class="field is-floating-label" style="margin-left:-10px;margin-right:-10px">
                    <p class="has-text-centered label has-text-red" style="font-size:16px;left:5%">BAST</p>
                    <div style="border:1px solid red;border-radius:25px;position:relative">
                        <span class="spacing-small"></span>
                        <div class="columns is-multiline" style="margin-left:1px;margin-right:1px">
                            <div class="column is-4-widescreen is-3-fullhd">
                                <p>Nama Lengkap / <i>Fullname</i> <span>*</span></p>
                            </div>
                            <div class="column is-8-widescreen is-4-fullhd">
                                <b-field :type="message.type_nama_lengkap_bast_bapp" :message="message.message_nama_lengkap_bast_bapp">
                                    <b-input type="text" expanded required v-model="dataAdd.nama_lengkap_bast_bapp"></b-input>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns is-multiline" style="margin-left:1px;margin-right:1px">
                            <div class="column is-4-widescreen is-3-fullhd">
                                <p>Jabatan / <i>Occupation</i> <span>*</span></p>
                            </div>
                            <div class="column is-8-widescreen is-4-fullhd">
                                <b-field :type="message.type_jabatan_lengkap_bast_bapp" :message="message.message_jabatan_lengkap_bast_bapp">
                                    <b-input type="text" expanded required v-model="dataAdd.jabatan_lengkap_bast_bapp"></b-input>
                                </b-field>
                            </div>
                        </div>
                        <span class="spacing-small"></span>
                    </div>
                </div>

                <span class="spacing-normal"></span>

                <div class="field is-floating-label" style="margin-left:-10px;margin-right:-10px">
                    <p class="has-text-centered label has-text-red" style="font-size:16px;left:5%">BAUT / BASO</p>
                    <div style="border:1px solid red;border-radius:25px;position:relative">
                        <span class="spacing-small"></span>
                        <div class="columns is-multiline" style="margin-left:1px;margin-right:1px">
                            <div class="column is-4-widescreen is-3-fullhd">
                                <p>Nama Lengkap / <i>Fullname</i> <span>*</span></p>
                            </div>
                            <div class="column is-8-widescreen is-4-fullhd">
                                <b-field :type="message.type_nama_lengkap_baut_baso" :message="message.message_nama_lengkap_baut_baso">
                                    <b-input type="text" expanded required v-model="dataAdd.nama_lengkap_baut_baso"></b-input>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns is-multiline" style="margin-left:1px;margin-right:1px">
                            <div class="column is-4-widescreen is-3-fullhd">
                                <p>Jabatan / <i>Occupation</i> <span>*</span></p>
                            </div>
                            <div class="column is-8-widescreen is-4-fullhd">
                                <b-field :type="message.type_jabatan_lengkap_baut_baso" :message="message.message_jabatan_lengkap_baut_baso">
                                    <b-input type="text" expanded required v-model="dataAdd.jabatan_lengkap_baut_baso"></b-input>
                                </b-field>
                            </div>
                        </div>
                        <span class="spacing-small"></span>
                    </div>
                </div>

                <span class="spacing-small"></span>

                <div class="columns is-multiline" style="margin-bottom:0px">
                    <div class="column is-4-widescreen is-3-fullhd">
                        <p>Catatan / <i>Remaks</i></p>
                    </div>
                    <div class="column is-8-widescreen is-4-fullhd" style="padding-bottom:0px">
                        <b-input maxlength="200" type="textarea" v-model="dataAdd.catatan"></b-input>
                    </div>
                </div>
                <!-- <div class="buttons is-right">
                                <button class="button is-info is-long is-hidden-touch" type="submit">Submit</button>
                                <button class="button is-info is-fullwidth is-hidden-desktop" type="submit">Submit</button>
                            </div> -->
            </b-step-item>

            <template slot="navigation" slot-scope="{previous, next}">
                <span class="spacing-medium"></span>
                <hr>
                <div class="buttons is-right is-hidden-touch" style="margin-right:20px">
                    <b-button type="is-danger" class="is-long" :disabled="previous.disabled" @click.prevent="previous.action">
                        Previous
                    </b-button>
                    <b-button type="is-info" class="is-long" style="margin-right:0px" v-if="activeStep === 0" :disabled="disableNext0" @click.prevent="next.action">
                        Next
                    </b-button>

                    <b-button type="is-info" class="is-long" style="margin-right:0px" v-if="activeStep === 1" :disabled="disableNext1" @click.prevent="next.action">
                        Next
                    </b-button>

                    <b-button type="is-info" class="is-long" style="margin-right:0px" v-if="next.disabled && action=='add'" :disabled="disableSubmit" @click="doSubmit">
                        Submit
                    </b-button>
                    <b-button type="is-info" class="is-long" style="margin-right:0px" v-if="next.disabled && action=='edit'" :disabled="disableSubmit" @click="doUpdate">
                        Update
                    </b-button>
                </div>
                <div class="buttons is-right is-hidden-desktop" style="margin-right:20px">
                    <b-button type="is-danger" class="is-fullwidth" :disabled="previous.disabled" @click.prevent="previous.action">
                        Previous
                    </b-button>
                    <b-button type="is-info" class="is-fullwidth" style="margin-right:0px" v-if="activeStep === 0" :disabled="disableNext0" @click.prevent="next.action">
                        Next
                    </b-button>
                    <b-button type="is-info" class="is-fullwidth" style="margin-right:0px" v-if="activeStep === 1" :disabled="disableNext1" @click.prevent="next.action">
                        Next
                    </b-button>
                    <b-button type="is-info" class="is-fullwidth" style="margin-right:0px" v-if="next.disabled && action=='add'" :disabled="disableSubmit" @click="doSubmit">
                        Submit
                    </b-button>
                    <b-button type="is-info" class="is-fullwidth" style="margin-right:0px" v-if="next.disabled && action=='edit'" :disabled="disableSubmit" @click="doUpdate">
                        Update
                    </b-button>
                </div>
                <!-- <div class="buttons is-right">
                                <b-button :disabled="previous.disabled" @click.prevent="previous.action">
                                    <span class="mdi mdi-chevron-left mdi-24px"></span>
                                </b-button>
                                <b-button  :disabled="next.disabled" @click.prevent="test(steps)">
                                    <span class="mdi mdi-chevron-right mdi-24px"></span>
                                </b-button>
                            </div> -->
            </template>
        </b-steps>
    </div>
</template>

<script>
    import axios from "axios";
    import Moment from "@/helper/moment.js";
    import CrudInput from '@/components/crud/crudInput.vue'
    export default {
        components: {
            CrudInput
        },
        props: {
            listTgu: {
                type: Array,
                required: true
            },
            action: {
                type: String,
                required: true
            },
            kodeRequest: {
                type: String
            }
        },
        data() {
            return {
                activeStep: 0,
                showSocial: false,
                isAnimated: true,
                isRounded: true,
                isStepsClickable: true,

                hasNavigation1: false,
                hasNavigation: true,
                customNavigation: true,
                isProfileSuccess: false,

                prevIcon: 'chevron-left',
                nextIcon: 'chevron-right',
                labelPosition: 'bottom',
                mobileMode: 'minimalist',

                tanggal_aktivasi: null,
                tanggal_awal: null,
                tanggal_akhir: null,
                waktu_sisa: 0,
                dateNow: null,
                patternNumber: /^[0-9]+/,
                patternEmail: /[a-z0-9._%+-]+@[a-z0-9.-]/,
                disablePatternKodePost: false,
                disablePatternNoHpPerson: false,
                disablePatternEmailPerson: false,
                disablePatternNoHpTeknis: false,
                disablePatternEmailTeknis: false,
                minDateStart: null,
                minDateEnd: null,

                message: {
                    // REQUIRED STEP 1
                    type_project_name: "",
                    message_project_name: "",
                    type_nama_perusahaan_customer: "",
                    message_nama_perusahaan_customer: "",
                    type_alamat_customer: "",
                    message_alamat_customer: "",

                    // REQUIRED STEP 2
                    type_nama_person: "",
                    message_nama_person: "",
                    type_jabatan_person: "",
                    message_jabatan_person: "",
                    type_alamat_person: "",
                    message_alamat_person: "",
                    type_email_person: "",
                    message_email_person: "",
                    type_no_hp_person: "",
                    message_no_hp_person: "",

                    // REQUIRED STEP 3
                    type_tanggal_aktivasi: "",
                    message_tanggal_aktivasi: "",
                    type_nama_lengkap_bast_bapp: "",
                    message_nama_lengkap_bast_bapp: "",
                    type_jabatan_lengkap_bast_bapp: "",
                    message_jabatan_lengkap_bast_bapp: "",
                    type_nama_lengkap_baut_baso: "",
                    message_nama_lengkap_baut_baso: "",
                    type_jabatan_lengkap_baut_baso: "",
                    message_jabatan_lengkap_baut_baso: ""
                },

                dataAdd: {
                    jenis_layanan: "",

                    tipe_id_project: "",
                    disabledtipe_id_project: true,

                    tipe_project: "",
                    disabledtipe_project: true,

                    id_project: "",

                    segment: "",
                    npwp_customer: "",
                    kode_pos_customer: "",

                    nama_teknis: "",
                    jabatan_teknis: "",
                    alamat_teknis: "",
                    email_teknis: "",
                    no_hp_teknis: "",
                    tipe_produk: "",
                    tanggal_awal: null,
                    tanggal_akhir: null,
                    catatan: "",
                    // status: 0,

                    // REQUIRED STEP 1
                    project_name: "",
                    nama_perusahaan_customer: "",
                    nama_customer: "a",
                    alamat_customer: "",

                    // REQUIRED STEP 2
                    nama_person: "",
                    jabatan_person: "",
                    alamat_person: "",
                    email_person: "",
                    no_hp_person: "",

                    // REQUIRED STEP 3
                    tanggal_aktivasi: "",
                    nama_lengkap_bast_bapp: "",
                    jabatan_lengkap_bast_bapp: "",
                    nama_lengkap_baut_baso: "",
                    jabatan_lengkap_baut_baso: "",

                    customer_tgu: ""
                }
            }
        },
        watch: {
            codePos() {
                this.checkKodePost();
            },
            noHpPerson() {
                this.checkNoHpPerson();
            },
            emailPerson() {
                this.checkNoEmailPerson();
            },
            noHpTeknis() {
                this.checkNoHpTeknis();
            },
            emailTeknis() {
                this.checkNoEmailTeknis();
            },
            tipeIdProject() {
                this.checkTipeIdProject();
            },
            tipeProject() {
                this.checkTipeProject();
            },
            tanggal_aktivasi: function(newQuery) {
                if (this.tanggal_aktivasi !== null) {
                    this.dataAdd.tanggal_aktivasi = Moment(this.tanggal_aktivasi).format("YYYY/MM/DD");
                    if(this.action === "add") {
                        this.minDateStart = new Date(Moment(this.tanggal_aktivasi).format("YYYY/MM/DD"))
                        this.minDateStart.setDate(this.minDateStart.getDate())
                    } else {
                        this.minDateStart = new Date(Moment(this.tanggal_aktivasi).format("YYYY/MM/DD"))
                        this.minDateStart.setDate(this.minDateStart.getDate())
                    }
                } else {
                    this.dataAdd.tanggal_aktivasi = null
                    this.tanggal_awal = null
                    this.tanggal_akhir = null
                }
            },
            tanggal_awal: function(newQuery) {
                if (this.tanggal_awal !== null) {
                    this.dataAdd.tanggal_awal = Moment(this.tanggal_awal).format("YYYY/MM/DD");
                    this.minDateEnd = new Date(Moment(this.tanggal_awal).format("YYYY/MM/DD"))
                    this.minDateEnd.setDate(this.minDateEnd.getDate() + 1)
                } else {
                    this.dataAdd.tanggal_awal = null
                    this.tanggal_awal = null
                    this.tanggal_akhir = null
                }

                if (this.tanggal_awal !== null && this.tanggal_akhir !== null) {
                    let diffTime = Math.abs(this.tanggal_akhir - this.tanggal_awal);
                    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    this.waktu_sisa = diffDays
                } else {
                    this.waktu_sisa = 0
                }

            },
            tanggal_akhir: function(newQuery) {
                if (this.tanggal_akhir !== null) {
                    this.dataAdd.tanggal_akhir = Moment(this.tanggal_akhir).format("YYYY/MM/DD");
                } else {
                    this.dataAdd.tanggal_akhir = null
                }

                if (this.tanggal_awal !== null && this.tanggal_akhir !== null) {
                    let diffTime = Math.abs(this.tanggal_akhir - this.tanggal_awal);
                    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    this.waktu_sisa = diffDays
                } else {
                    this.waktu_sisa = 0
                }
            }
        },
        methods: {
            checkKodePost() {
                if (this.dataAdd.kode_pos_customer !== "") {
                    let a = this.patternNumber.test(this.dataAdd.kode_pos_customer)
                    if (a) {
                        this.disablePatternKodePost = false
                    } else {
                        this.disablePatternKodePost = true
                    }
                }
            },
            checkNoHpPerson() {
                if (this.dataAdd.no_hp_person !== "") {
                    let a = this.patternNumber.test(this.dataAdd.no_hp_person)
                    if (a) {
                        this.disablePatternNoHpPerson = false
                    } else {
                        this.disablePatternNoHpPerson = true
                    }
                }
            },
            checkNoEmailPerson() {
                if (this.dataAdd.email_person !== "") {
                    let a = this.patternEmail.test(this.dataAdd.email_person)
                    if (a) {
                        this.disablePatternEmailPerson = false
                    } else {
                        this.disablePatternEmailPerson = true
                    }
                }
            },
            checkNoHpTeknis() {
                if (this.dataAdd.no_hp_person !== "") {
                    let a = this.patternNumber.test(this.dataAdd.no_hp_teknis)
                    if (a) {
                        this.disablePatternNoHpTeknis = false
                    } else {
                        this.disablePatternNoHpTeknis = true
                    }
                }
            },
            checkNoEmailTeknis() {
                if (this.dataAdd.email_person !== "") {
                    let a = this.patternEmail.test(this.dataAdd.email_teknis)
                    if (a) {
                        this.disablePatternEmailTeknis = false
                    } else {
                        this.disablePatternEmailTeknis = true
                    }
                }
            },
            checkTipeIdProject() {
                if (this.dataAdd.tipe_id_project !== "") {
                    this.dataAdd.disabledtipe_id_project = false
                } else {
                    this.dataAdd.disabledtipe_id_project = true
                }
            },
            checkTipeProject() {
                if (this.dataAdd.tipe_project === "TGU") {
                    this.dataAdd.disabledtipe_project = false
                } else {
                    this.dataAdd.disabledtipe_project = true
                }
            },
            getDataEdit() {
                this.$parent.isLoading = true;
                let formData = new FormData();
                formData.append('kode_request', this.kodeRequest);
                let self = this;
                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/getedtserv", formData, {
                            headers: {
                                token: localStorage.getItem('token'),
                                nik: localStorage.getItem('nik')
                            }
                        }
                    )
                    .then(function(response) {
                        // console.log(response.data.data[0])
                        self.tanggal_aktivasi = new Date(response.data.data[0].tanggal_aktivasi)
                        self.tanggal_awal = new Date(response.data.data[0].tanggal_awal)
                        self.tanggal_akhir = new Date(response.data.data[0].tanggal_akhir)
                        if(isNaN(self.tanggal_awal.getTime())) {
                            self.tanggal_awal = null
                        }
                        if(isNaN(self.tanggal_akhir.getTime())) {
                            self.tanggal_akhir = null
                        }
                        self.dataAdd = response.data.data[0]
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    .finally(() => (self.$parent.isLoading = false));
            },
            doSubmit() {
                this.$parent.isLoading = true
                let formData = new FormData();
                for (const [key, value] of Object.entries(this.dataAdd)) {
                    formData.append(`${key}`, `${value}`);
                }

                let self = this

                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/inservice", formData, {
                            headers: {
                                token: localStorage.getItem('token'),
                                nik: localStorage.getItem('nik')
                            }
                        }
                    )
                    .then(function(response) {
                        self.$parent.addActivation()
                        self.$parent.getData();

                    })
                    .catch(function(error) {
                        console.log(error);
                        self.$parent.statUploadWO = false
                    }).finally(() => (self.$parent.isLoading = false));

                // for (var pair of formData.entries()) {
                //     console.log(pair);
                // }
            },
            doUpdate() {
                this.$parent.isLoading = true
                let formData = new FormData();
                formData.append('kode_request', this.kodeRequest);
                for (const [key, value] of Object.entries(this.dataAdd)) {
                    formData.append(`${key}`, `${value}`);
                }

                let self = this

                axios
                    .post(
                        "https://www.api-fab-cds.rumahcomp.com/fab/api/service/edtservice", formData, {
                            headers: {
                                token: localStorage.getItem('token'),
                                nik: localStorage.getItem('nik')
                            }
                        }
                    )
                    .then(function(response) {
                        self.$parent.editActivation()
                        self.$parent.getData();

                    })
                    .catch(function(error) {
                        console.log(error);
                        self.$parent.statUploadWO = false
                    }).finally(() => (self.$parent.isLoading = false));


            },

        },
        computed: {
            codePos() {
                return this.dataAdd.kode_pos_customer
            },
            noHpPerson() {
                return this.dataAdd.no_hp_person
            },
            emailPerson() {
                return this.dataAdd.email_person
            },
            noHpTeknis() {
                return this.dataAdd.no_hp_teknis
            },
            emailTeknis() {
                return this.dataAdd.email_teknis
            },
            tipeIdProject() {
                return this.dataAdd.tipe_id_project
            },
            tipeProject() {
                return this.dataAdd.tipe_project
            },
            disableNext0() {

                if (this.dataAdd.project_name === "" || this.dataAdd.nama_perusahaan_customer === "" || this.dataAdd.alamat_customer === "" || this.disablePatternKodePost === true) {
                    if (this.dataAdd.project_name === "") {
                        this.message.type_project_name = "is-danger"
                        this.message.message_project_name = "Please fill out this field."
                    } else {
                        this.message.type_project_name = ""
                        this.message.message_project_name = ""
                    }

                    if (this.dataAdd.nama_perusahaan_customer === "") {
                        this.message.type_nama_perusahaan_customer = "is-danger"
                        this.message.message_nama_perusahaan_customer = "Please fill out this field."
                    } else {
                        this.message.type_nama_perusahaan_customer = ""
                        this.message.message_nama_perusahaan_customer = ""
                    }

                    if (this.dataAdd.alamat_customer === "") {
                        this.message.type_alamat_customer = "is-danger"
                        this.message.message_alamat_customer = "Please fill out this field."
                    } else {
                        this.message.type_alamat_customer = ""
                        this.message.message_alamat_customer = ""
                    }

                    return true
                } else {
                    this.message.type_project_name = ""
                    this.message.message_project_name = ""
                    this.message.type_nama_perusahaan_customer = ""
                    this.message.message_nama_perusahaan_customer = ""
                    this.message.type_alamat_customer = ""
                    this.message.message_alamat_customer = ""
                    return false
                }
            },
            disableNext1() {
                if (this.dataAdd.nama_person === "" || this.dataAdd.jabatan_person === "" || this.dataAdd.alamat_person === "" || this.dataAdd.email_person === "" || this.dataAdd.no_hp_person === "" || this.disablePatternNoHpPerson === true || this.disablePatternEmailPerson === true || this.disablePatternNoHpTeknis === true || this.disablePatternEmailTeknis === true) {
                    if (this.dataAdd.nama_person === "") {
                        this.message.type_nama_person = "is-danger"
                        this.message.message_nama_person = "Please fill out this field."
                    } else {
                        this.message.type_nama_person = ""
                        this.message.message_nama_person = ""
                    }
                    if (this.dataAdd.jabatan_person === "") {
                        this.message.type_jabatan_person = "is-danger"
                        this.message.message_jabatan_person = "Please fill out this field."
                    } else {
                        this.message.type_jabatan_person = ""
                        this.message.message_jabatan_person = ""
                    }
                    if (this.dataAdd.alamat_person === "") {
                        this.message.type_alamat_person = "is-danger"
                        this.message.message_alamat_person = "Please fill out this field."
                    } else {
                        this.message.type_alamat_person = ""
                        this.message.message_alamat_person = ""
                    }
                    if (this.dataAdd.email_person === "") {
                        this.message.type_email_person = "is-danger"
                        this.message.message_email_person = "Please fill out this field."
                    } else {
                        if (this.disablePatternEmailPerson) {
                            this.message.type_email_person = "is-danger"
                            this.message.message_email_person = "Please match the requested format."
                        } else {
                            this.message.type_email_person = ""
                            this.message.message_email_person = ""
                        }
                    }
                    if (this.dataAdd.no_hp_person === "") {
                        this.message.type_no_hp_person = "is-danger"
                        this.message.message_no_hp_person = "Please fill out this field."
                    } else {
                        if (this.disablePatternNoHpPerson) {
                            this.message.type_no_hp_person = "is-danger"
                            this.message.message_no_hp_person = "Please match the requested format."
                        } else {
                            this.message.type_no_hp_person = ""
                            this.message.message_no_hp_person = ""
                        }

                    }

                    return true
                } else {
                    this.message.type_nama_person = ""
                    this.message.message_nama_person = ""
                    this.message.type_jabatan_person = ""
                    this.message.message_jabatan_person = ""
                    this.message.type_alamat_person = ""
                    this.message.message_alamat_person = ""
                    this.message.type_email_person = ""
                    this.message.message_email_person = ""
                    this.message.type_no_hp_person = ""
                    this.message.message_no_hp_person = ""
                    return false
                }
            },
            disableSubmit() {
                if (this.tanggal_aktivasi === "" || this.tanggal_aktivasi === null || this.dataAdd.nama_lengkap_bast_bapp === "" || this.dataAdd.jabatan_lengkap_bast_bapp === "" || this.dataAdd.nama_lengkap_baut_baso === "" || this.dataAdd.jabatan_lengkap_baut_baso === "") {
                    if (this.tanggal_aktivasi === "" || this.tanggal_aktivasi === null) {
                        this.message.type_tanggal_aktivasi = "is-danger"
                        this.message.message_tanggal_aktivasi = "Please fill out this field."
                    } else {
                        this.message.type_tanggal_aktivasi = ""
                        this.message.message_tanggal_aktivasi = ""
                    }

                    if (this.dataAdd.nama_lengkap_bast_bapp === "") {
                        this.message.type_nama_lengkap_bast_bapp = "is-danger"
                        this.message.message_nama_lengkap_bast_bapp = "Please fill out this field."
                    } else {
                        this.message.type_nama_lengkap_bast_bapp = ""
                        this.message.message_nama_lengkap_bast_bapp = ""
                    }

                    if (this.dataAdd.jabatan_lengkap_bast_bapp === "") {
                        this.message.type_jabatan_lengkap_bast_bapp = "is-danger"
                        this.message.message_jabatan_lengkap_bast_bapp = "Please fill out this field."
                    } else {
                        this.message.type_jabatan_lengkap_bast_bapp = ""
                        this.message.message_jabatan_lengkap_bast_bapp = ""
                    }

                    if (this.dataAdd.nama_lengkap_baut_baso === "") {
                        this.message.type_nama_lengkap_baut_baso = "is-danger"
                        this.message.message_nama_lengkap_baut_baso = "Please fill out this field."
                    } else {
                        this.message.type_nama_lengkap_baut_baso = ""
                        this.message.message_nama_lengkap_baut_baso = ""
                    }

                    if (this.dataAdd.jabatan_lengkap_baut_baso === "") {
                        this.message.type_jabatan_lengkap_baut_baso = "is-danger"
                        this.message.message_jabatan_lengkap_baut_baso = "Please fill out this field."
                    } else {
                        this.message.type_jabatan_lengkap_baut_baso = ""
                        this.message.message_jabatan_lengkap_baut_baso = ""
                    }

                    return true
                } else {
                    this.message.type_tanggal_aktivasi = ""
                    this.message.message_tanggal_aktivasi = ""
                    this.message.type_nama_lengkap_bast_bapp = ""
                    this.message.message_nama_lengkap_bast_bapp = ""
                    this.message.type_jabatan_lengkap_bast_bapp = ""
                    this.message.message_jabatan_lengkap_bast_bapp = ""
                    this.message.type_nama_lengkap_baut_baso = ""
                    this.message.message_nama_lengkap_baut_baso = ""
                    this.message.type_jabatan_lengkap_baut_baso = ""
                    this.message.message_jabatan_lengkap_baut_baso = ""
                    return false
                }
            }
        },
        mounted() {
            this.dateNow = new Date()
            this.dateNow.setDate(this.dateNow.getDate() - 1)

            if (this.action === "edit") {
                this.getDataEdit()
            }
        }
    }
</script>