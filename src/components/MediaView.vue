<script lang="ts">
import { clamp, cloneDeep } from "lodash";
import { defineComponent, PropType } from "vue";
import BundleList, { BundleItem, GameItem } from "../games";
import Languages, { Sheet } from "../languages";
import { IMedia } from "../talkshow/api";
import Export from "../talkshow/export/export";
import ViewerPagination from "./ViewerPagination.vue";
import ViewerVersion from "./ViewerVersion.vue";

const itemsPerPage = 150;
// const sheetsClipboardType = "application/x-vnd.google-docs-embedded-grid_range_clip+wrapped";

export default defineComponent({
    props: {
        translator: Boolean
    },
    data(): {
        export: Export | null;
        bundle: BundleItem | null;
        game: GameItem | null;
        media: IMedia[];
        loaded: boolean;
        page: number;
        searchQuery: string;
        searchParams: string[];
        mediaCopied: boolean;
        mediaCopyTimeout?: number;
        sheetFetching: boolean;
        sheetFetched: boolean;
    } {
        return {
            export: null,
            bundle: null,
            game: null,
            media: [],
            loaded: false,
            page: 0,
            searchQuery: "",
            searchParams: ["id", "tag", "text"],
            mediaCopied: false,
            sheetFetching: false,
            sheetFetched: false
        };
    },
    computed: {
        exportObject() {
            return this.export!;
        },
        visibleMedia() {
            return this.media.filter(media => (!this.translator || media.type === "audio") && media.filteredVersions(this.searchQuery, this.searchParams).length);
        },
        hasPageItems() {
            return !!this.pageItems;
        },
        hasLocales() {
            return this.hasPageItems && this.pageItems.some(media => media.versions.some(version => version.locale));
        },
        hasTags() {
            return this.hasPageItems && this.pageItems.some(media => media.versions.some(version => version.tag));
        },
        pages() {
            const pages: IMedia[][] = [];
            let page: IMedia[] = [];
            let length = 0;
            this.visibleMedia.forEach(media => {
                page.push(media);
                length += media.numVersions;
                if (length >= itemsPerPage) {
                    pages.push(page);
                    page = [];
                    length = 0;
                }
            });
            if (page.length) pages.push(page);
            return pages;
        },
        numPages() {
            // return Math.ceil(this.visibleMedia.length / itemsPerPage);
            return this.pages.length;
        },
        pageItems() {
            // const start = this.page * itemsPerPage;
            // return this.visibleMedia.slice(start, start + itemsPerPage);
            return this.pages[this.page];
        }
    },
    emits: ["exit"],
    methods: {
        back() {
            this.$router.replace("/media");
        },
        navigate(page: number) {
            this.page = page;
        },
        clampPage() {
            this.page = clamp(this.page, 0, this.pages.length - 1);
        },
        updateSearch(e: Event) {
            this.searchQuery = (e.target as HTMLInputElement).value;
            this.clampPage();
        },
        clearSearch() {
            this.searchQuery = "";
            this.clampPage();
        }
    },
    async mounted() {
        const bundle = BundleList.find(bundle => bundle.id === this.$route.params.bundle);
        if (!bundle) { this.back(); return; }
        const game = bundle.games.find(game => game.id === this.$route.params.game);
        if (!game) { this.back(); return; }

        this.bundle = bundle;
        this.game = game;
        this.export = new Export(bundle, game);

        await this.export.load();
        this.media = cloneDeep(this.export.media!);
        this.loaded = true;
        // console.log(this.export.media);
    },
    components: { ViewerPagination, ViewerVersion }
});
</script>

<template>
    <template v-if="loaded">
        <h4 class="text-center mb-0 mt-5" :style="{ opacity: 0.5 }">{{ bundle!.name }}</h4>
        <h1 class="display-5 text-center">{{ game!.name }}</h1>
        <div class="py-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" :placeholder="$t('viewer.search.placeholder')" :value="searchQuery" @input="updateSearch" />
                <button v-if="searchQuery.trim().length" class="btn btn-secondary" type="button" @click.prevent="clearSearch">&times;</button>
            </div>
            <template v-if="pages.length">
                <ViewerPagination :num-pages="numPages" :page="page" @navigate="navigate" />
                <table class="table table-responsive table-bordered table-striped align-middle">
                    <thead>
                        <tr>
                            <th scope="col">{{ $t("viewer.headers.id") }}</th>
                            <th scope="col" v-if="hasLocales">{{ $t("viewer.headers.locale") }}</th>
                            <th scope="col" v-if="hasTags">{{ $t("viewer.headers.tag") }}</th>
                            <th scope="col">{{ $t("viewer.headers.text") }}</th>
                            <th scope="col">{{ $t("viewer.headers.actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="media in pageItems" :key="media.id">
                            <ViewerVersion v-for="(version, index) in media.filteredVersions(searchQuery, searchParams)"
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
            </template>
            <p v-else class="text-muted text-center mt-5 mb-0">{{ $t("viewer.empty") }}</p>
        </div>
    </template>
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