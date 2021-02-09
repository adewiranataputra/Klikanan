<template>
    <section class="section home-grey">
        <span class="spacing-extra-large"></span>
        <div class="container has-text-centered" style="padding-top: 6em; min-height:50vh">
            <p class="is-font-medium">
                <b>404<br>
                Laman yang Anda cari tidak ditemukan</b>
            </p>
        </div>
    </section>
</template>

<script>
export default {
    mounted() {
        document.title = "Page Not found • CloudSME";
        this.$parent.$data.loading = false
        this.$parent.$data.showHome = true
    }
}
</script>