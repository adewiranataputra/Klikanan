<template>
    <div>
        <div class="card" style="width:362px; position:fixed; bottom: 10px; left:auto; right:24px; display: block; z-index: 100; border-radius:2px">
            <div class="card-header">
                <p class="card-header-title has-background-black2 has-text-white" style="font-weight:300; border-radius:5px 0 0 0">
                    {{uploadedFile.length}} files uploaded
                </p>
                <a href="#" class="card-header-icon has-background-black2" aria-label="more options" style="border-radius:0 5px 0 0">
                    <span :class="'mdi ' + chevron + ' has-text-white mdi-24px'" @click="collapse"></span>
                    <span class="mdi mdi-close has-text-white mdi-18px" style="padding-left:10px" @click="$parent.closeListUpload"></span>
                </a>
            </div>
            <div class="card-content" style="padding-left:0; padding-right:0; padding-top:15px; padding-bottom:15px; max-height: 190px; overflow-y: auto" v-if="openList">
                <div v-for="(file, index) in uploadedFile" :key="index">
                    <div class="media" style="margin-bottom:0px;" v-if="index===0">
                        <div class="media-left" style="margin: 0 18px 0 16px;">
                            <img src="@/assets/file.png" alt="Placeholder image" style="height:34px">
                        </div>
                        <div class="media-content" style="margin-right:16px; padding-bottom:6px">
                            <div class="level">
                                <div class="item-left has-text-elip-list-upload">
                                    <small>{{file.name}}</small>
                                </div>
                                <div class="item-right">
                                    <div class="mdi mdi-loading mdi-24px has-text-light-blue loaderUpload" v-if="file.status === false"></div>
                                    <div class="mdi mdi-close mdi-24px has-text-danger loaderUpload" v-else-if="file.status === 'failed'"></div>
                                    <div class="mdi mdi-check-bold mdi-24px has-text-success" v-else></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="media" style="margin-bottom:0px; margin-top:10px; padding-top:10px" v-else>
                        <div class="media-left" style="margin: 0 18px 0 16px;">
                            <img src="@/assets/file.png" alt="Placeholder image" style="height:34px">
                        </div>
                        <div class="media-content" style="margin-right:16px; padding-bottom:6px">
                            <div class="level">
                                <div class="item-left has-text-elip-list-upload">
                                    <small>{{file.name}}</small>
                                </div>
                                <div class="item-right">
                                    <div class="mdi mdi-loading mdi-24px has-text-light-blue loaderUpload" v-if="file.status === false"></div>
                                    <div class="mdi mdi-check-bold mdi-24px has-text-success" v-else></div>
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
    export default {
        props: {
            uploadedFile: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                openList: true,
                chevron: "mdi-chevron-down"
            }
        },
        methods: {
            collapse() {
                this.openList = !this.openList
                if (!this.openList) {
                    return this.chevron = "mdi-chevron-up"
                } else {
                    return this.chevron = "mdi-chevron-down"
                }
            }
        }
    }
</script>