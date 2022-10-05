<script lang="ts">
import { clamp } from "lodash";
import { defineComponent, PropType } from "vue";
import { BundleItem, GameItem } from "../games";
import { IMedia } from "../talkshow/api";
import Export from "../talkshow/export/export";
import ViewerPagination from "./ViewerPagination.vue";
import ViewerVersion from "./ViewerVersion.vue";

const itemsPerPage = 150;

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
        searchQuery: string;
        searchParams: string[];
    } {
        return {
            export: new Export(this.bundle, this.game),
            loaded: false,
            page: 0,
            searchQuery: "",
            searchParams: ["id", "tag", "text"]
        };
    },
    computed: {
        exportObject() {
            return this.export!;
        },
        visibleMedia() {
            return this.export.media!.filter(media => media.filteredVersions(this.searchQuery, this.searchParams).length);
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
        },
        exit() {
            this.$emit("exit");
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
    <div class="text-center pt-5">
        <button class="btn btn-secondary" @click="exit">Back to Selection</button>
    </div>
    <h4 class="text-dark text-center mb-0 mt-5" :style="{ '--bs-text-opacity': 0.5 }">{{ bundle.name }}</h4>
    <h1 class="display-5 text-center">{{ game.name }}</h1>
    <div v-if="loaded" class="py-5">
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Enter query&hellip;" :value="searchQuery" @input="updateSearch" />
            <button v-if="searchQuery.trim().length" class="btn btn-secondary" type="button" @click.prevent="clearSearch">&times;</button>
        </div>
        <template v-if="pages.length">
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
        <p v-else class="text-muted text-center mt-5 mb-0">No items to show</p>
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