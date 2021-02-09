<template>
    <div>
        <div class="columns is-marginless">
            <div class="column is-8 content is-marginless is-paddingless">
                <h3 class="is-small has-text-weight-light is-reduced-margin is-uppercase" style="padding-top:2%">Detail New Calculate Presales</h3>
            </div>
            <div class="column" style="padding-left:0px; padding-right:0px">
                <a class="button is-red is-long is-pulled-right is-hidden-touch" @click="$parent.detailCustomer">
                    Back
                </a>
                <a class="button is-red is-long is-hidden-desktop" @click="$parent.detailCustomer">
                    Back
                </a>
            </div>
        </div>

        <hr style="margin-top:0px">

        <div class="content">
            <h3 class="is-small has-text-weight-light">{{detailListPrecalc.id_precalc}}</h3>
        </div>

        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <span class="button is-warning-blend is-static is-small is-fullwidth">
                        <span style="margin-right:.35em;">AM Requester</span><b>{{ detailListPrecalc.nama_pic }}</b>
                    </span>
                </div>
                <div class="level-item">
                    <span class="button is-warning-blend is-static is-small is-fullwidth">
                        <span class="icon is-small">
                            <span class="mdi mdi-calendar-clock"></span>
                        </span>
                        <span style="margin-right:.35em;">Date Create</span><b>{{ detailListPrecalc.date_time | moment }}</b>
                    </span>
                </div>
            </div>
        </div>

        <div class="columns is-multiline">
            <div class="column is-6">
                <b-field expanded>
                    <p class="control">
                        <span class="button is-static is-light-blue-blend" style="min-width:160px;">Nama Customer</span>
                    </p>
                    <span class="button is-static is-white-blend is-fullwidth has-text-left" style="justify-content:left">{{detailListPrecalc.nama_customer}}</span>
                </b-field>
            </div>
            <div class="column is-6">
                <b-field expanded>
                    <p class="control">
                        <span class="button is-static is-light-blue-blend" style="min-width:160px;">No HP Customer</span>
                    </p>
                    <span class="button is-static is-white-blend is-fullwidth" style="justify-content:left">{{detailListPrecalc.no_hp}}</span>
                </b-field>
            </div>
            <div class="column is-6">
                <b-field expanded>
                    <p class="control">
                        <span class="button is-static is-light-blue-blend" style="min-width:160px;">Email Customer</span>
                    </p>
                    <span class="button is-static is-white-blend is-fullwidth" style="justify-content:left">{{detailListPrecalc.email}}</span>
                </b-field>
            </div>
            <div class="column is-6">
                <b-field expanded>
                    <p class="control">
                        <span class="button is-static is-light-blue-blend" style="min-width:160px;">Nama PIC</span>
                    </p>
                    <span class="button is-static is-white-blend is-fullwidth" style="justify-content:left">{{detailListPrecalc.nama_pic}}</span>
                </b-field>
            </div>
            <div class="column is-6">
                <b-field expanded>
                    <p class="control">
                        <span class="button is-static is-light-blue-blend" style="min-width:160px;">Initial Setup</span>
                    </p>
                    <span class="button is-static is-white-blend is-fullwidth" style="justify-content:left">{{detailListPrecalc.initialSetup}}</span>
                </b-field>
            </div>
            <div class="column is-6">
                <b-field expanded>
                    <p class="control">
                        <span class="button is-static is-light-blue-blend" style="min-width:160px;">Margin</span>
                    </p>
                    <span class="button is-static is-white-blend is-fullwidth" style="justify-content:left">{{detailListPrecalc.margin}}</span>
                </b-field>
            </div>
            <div class="column is-6">
                <b-field expanded>
                    <p class="control">
                        <span class="button is-static is-light-blue-blend" style="min-width:160px;">Total Precalc Month</span>
                    </p>
                    <span class="button is-static is-white-blend is-fullwidth" style="justify-content:left">Rp. {{detailListPrecalc.totalPrecalcMonth | currency}}</span>
                </b-field>
            </div>
            <div class="column is-6">
                <b-field expanded>
                    <p class="control">
                        <span class="button is-static is-light-blue-blend" style="min-width:160px;">Total Precalc Year</span>
                    </p>
                    <span class="button is-static is-white-blend is-fullwidth" style="justify-content:left">Rp. {{detailListPrecalc.totalPrecalcYear | currency}}</span>
                </b-field>
            </div>
        </div>

        <span class="spacing-normal"></span>

        <b-collapse class="card is-shadowless is-light-blue" :open="true">
            <div slot="trigger" slot-scope="props" class="card-header" role="button">
                <p class="card-header-title has-text-light">
                    Detail List Precalc
                </p>
                <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <b-table :data="detailListPrecalc.detailListPrecalc" :fields="[]" ref="widget" striped bordered per-page="10">
                <template slot-scope="props">
                    <b-table-column field="jenis_layanan" label="Jenis Layanan">
                        <p>{{ props.row.jenis_layanan }}</p>
                    </b-table-column>
                    <b-table-column field="detail_layanan" label="Detail Layanan">
                        <p>{{ props.row.detail_layanan }}</p>
                    </b-table-column>
                    <b-table-column field="banyak_item" label="Banyak Item" centered>
                        <p>{{ props.row.banyak_item }}</p>
                    </b-table-column>
                    <b-table-column width="60" field="unit" label="Unit" centered>
                        <p>{{ props.row.unit }}</p>
                    </b-table-column>
                    <b-table-column field="tarif" label="Tarif" centered>
                        <p style="text-align:right">Rp. {{ props.row.tarif | currency }}</p>
                    </b-table-column>
                    <b-table-column field="total_price_mounth" label="Total Price Month" centered>
                        <p style="text-align:right">Rp. {{ props.row.total_price_mounth | currency }}</p>
                    </b-table-column>
                    <b-table-column field="total_price_year" label="Total Price Year" centered>
                        <p style="text-align:right">Rp. {{ props.row.total_price_year | currency }}</p>
                    </b-table-column>
                </template>

            </b-table>
        </b-collapse>
    </div>
</template>

<script>
export default {
    name: "detailPrecalc",
    props: {
		detailListPrecalc: {
			type: Object,
			required: true
		}
	},
}
</script>