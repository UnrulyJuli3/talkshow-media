<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BundleItem, GameItem } from "../games";
import Export from "../talkshow/export/export";
import ViewerPagination from "./ViewerPagination.vue";
import ViewerVersion from "./ViewerVersion.vue";

const itemsPerPage = 20;

export default defineComponent({
    props: {
        bundle: {
            type: Object as PropType<BundleItem>,
            required: true
        },
        game: {
            type: Object as PropType<GameItem>,
            required: true
        }
    },
    data(): {
        export: Export;
        loaded: boolean;
        page: number;
    } {
        return {
            export: new Export(this.bundle, this.game),
            loaded: false,
            page: 0
        };
    },
    computed: {
        exportObject() {
            return this.export!;
        },
        visibleMedia() {
            return this.export.media!;
        },
        hasLocales() {
            return this.pageItems.some(media => media.versions.some(version => version.locale));
        },
        hasTags() {
            return this.pageItems.some(media => media.versions.some(version => version.tag));
        },
        numPages() {
            return Math.ceil(this.visibleMedia.length / itemsPerPage);
        },
        pageItems() {
            const start = this.page * itemsPerPage;
            return this.visibleMedia.slice(start, start + itemsPerPage);
        }
    },
    methods: {
        navigate(page: number) {
            this.page = page;
        }
    },
    async mounted() {
        await this.export.load();
        this.loaded = true;
        // console.log(this.export.media);
    },
    components: { ViewerPagination, ViewerVersion }
});
</script>

<template>
    <h4 class="text-dark text-center mb-0 mt-5" :style="{ '--bs-text-opacity': 0.5 }">{{ bundle.name }}</h4>
    <h1 class="display-5 text-center">{{ game.name }}</h1>
    <div v-if="loaded" class="py-5">
        <ViewerPagination :num-pages="numPages" :page="page" @navigate="navigate" />
        <!-- <table class="table table-responsive table-bordered table-striped align-middle">
            <thead>
                <tr>
                    <th scope="col">Media ID</th>
                    <th scope="col">Media type</th>
                </tr>
            </thead>
            <tbody>
                <ViewerMedia v-for="media in pageItems" :media="media" />
            </tbody>
        </table> -->
        <table class="table table-responsive table-bordered table-striped align-middle">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col" v-if="hasLocales">Locale</th>
                    <th scope="col" v-if="hasTags">Tag(s)</th>
                    <th scope="col">Text</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="media in pageItems" :key="media.id">
                    <ViewerVersion v-for="(version, index) in media.versions"
                        :key="version.id"
                        :has-locales="hasLocales"
                        :has-tags="hasTags"
                        :media="media"
                        :version="version"
                        :index="index"
                        :audio-path="exportObject.getAudioPath(version.id)" />
                </template>
            </tbody>
        </table>
        <ViewerPagination :num-pages="numPages" :page="page" @navigate="navigate" />
    </div>
</template>

<style scoped lang="scss">
table {
    min-width: 900px;
}

tbody>tr.media-separator:not(:first-child) {
    border-top: 2px solid var(--bs-table-color);
}

td.locale {
    white-space: nowrap;
}
</style>