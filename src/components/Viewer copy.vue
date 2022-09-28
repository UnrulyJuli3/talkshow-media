<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BundleItem, GameItem } from "../games";
import Export from "../talkshow/export/export";
import ViewerPagination from "./ViewerPagination.vue";
import ViewerMedia from "./ViewerMedia.vue";
import Masonry from "masonry-layout";

const itemsPerPage = 100;

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
        masonry?: Masonry;
        searchQuery: string;
        activeSearchQuery: string;
        filters: {
            locales: string[];
            search: {
                id: string;
                text: string;
            };
        };
    } {
        return {
            export: new Export(this.bundle, this.game),
            loaded: false,
            page: 0,
            searchQuery: "",
            activeSearchQuery: "",
            filters: {
                locales: [],
                search: {
                    id: "",
                    text: ""
                }
            }
        };
    },
    computed: {
        possibleLocales() {
            const list: string[] = [];

            this.export.media?.forEach(media => media.versions.forEach(version => {
                if (version.locale && !list.includes(version.locale)) list.push(version.locale);
            }));

            return list;
        },
        visibleMedia() {
            const strip = (t: string) => t.toString().replace(/ /g, "").toLowerCase();
            const query = strip(this.activeSearchQuery);
            return this.export.media!.filter(m => {
                if (!query) return true;
                const searchParams: any[] = [m.id];
                m.versions.forEach(v => {
                    searchParams.push(v.id, strip(v.text));
                });
                return searchParams.some(p => p.toString().includes(query));
            });
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
            this.updateMasonry();
        },
        updateSearch(e: Event) {
            this.searchQuery = (e.target as HTMLInputElement).value;
        },
        search() {
            this.activeSearchQuery = this.searchQuery.trim();
            this.navigate(Math.max(Math.min(this.page, this.numPages - 1), 0));
        },
        clearSearch() {
            this.searchQuery = "";
            this.search();
        },
        updateMasonry() {
            this.$nextTick(() => {
                this.masonry!.reloadItems!();
                this.masonry!.layout!();
            });
        },
        toggleLocale(locale: string) {
            if (this.filters.locales.includes(locale)) this.filters.locales.splice(this.filters.locales.indexOf(locale), 1);
            else this.filters.locales.push(locale);
            this.updateMasonry();
        }
    },
    async mounted() {
        await this.export.load();
        this.loaded = true;
        console.log(this.export.media);

        this.filters.locales = Array.from(this.possibleLocales);

        this.$nextTick(() => {
            this.masonry = new Masonry(this.$refs.mainLayout as HTMLDivElement, {
                percentPosition: true
            });
        });
    },
    components: { ViewerPagination, ViewerMedia }
});
</script>

<template>
    <h4 class="text-dark text-center mb-0 mt-5" :style="{ '--bs-text-opacity': 0.5 }">{{ bundle.name }}</h4>
    <h1 class="display-5 text-center">{{ game.name }}</h1>
    <div v-if="loaded" class="py-5">
        <!-- <form class="input-group mb-3" @submit.prevent="search">
            <input type="text" class="form-control" placeholder="Enter query&hellip;" :value="searchQuery" @input="updateSearch" />
            <button v-if="activeSearchQuery" class="btn btn-secondary" type="button" @click.prevent="clearSearch">&times;</button>
            <button class="btn btn-primary" type="submit">Search</button>
        </form> -->
        <div class="row g-3 align-items-center">
            <div class="col-auto" v-if="possibleLocales.length">
                <label class="form-label">Filter by Locales</label>
                <div class="form-check" v-for="locale in possibleLocales">
                    <input class="form-check-input" :id="`filter-locale-${locale}`" type="checkbox" :checked="filters.locales.includes(locale)" @input="toggleLocale(locale)" />
                    <label class="form-check-label" :for="`filter-locale-${locale}`">{{ locale }}</label>
                </div>
            </div>
        </div>
        <ViewerPagination :num-pages="numPages" :page="page" @navigate="navigate" />
        <div class="row" ref="mainLayout">
            <ViewerMedia v-for="media in pageItems" :media="media" :filters="filters" />
        </div>
        <ViewerPagination :num-pages="numPages" :page="page" @navigate="navigate" />
    </div>
</template>