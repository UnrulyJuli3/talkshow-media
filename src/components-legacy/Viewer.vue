<script lang="ts">
import { clamp, cloneDeep } from "lodash";
import { defineComponent, PropType } from "vue";
import { BundleItem, GameItem } from "../games";
import Languages, { Sheet } from "../languages";
import { IMedia } from "../talkshow/api";
import Export from "../talkshow/export/export";
import ViewerPagination from "./ViewerPagination.vue";
import ViewerVersion from "./ViewerVersion.vue";

const itemsPerPage = 150;
// const sheetsClipboardType = "application/x-vnd.google-docs-embedded-grid_range_clip+wrapped";

export default defineComponent({
    props: {
        bundle: {
            type: Object as PropType<BundleItem>,
            required: true
        },
        game: {
            type: Object as PropType<GameItem>,
            required: true
        },
        translator: Boolean
    },
    data(): {
        export: Export;
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
            export: new Export(this.bundle, this.game),
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
        languagesWithSheets() {
            return Languages.filter(lang => lang.sheet);
        },
        gameNameKey() {
            return `picker.game.names.${this.bundle.id}/${this.game.id.toLowerCase()}`;
        },
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
        },
        /* createTableString() {
            const table = document.createElement("table");
            const header = document.createElement("tr");
            let headerCell = document.createElement("th");
            headerCell.innerText = "Media ID";
            header.append(headerCell);
            headerCell = document.createElement("th");
            headerCell.innerText = "Text";
            header.append(headerCell);
            table.append(header);

            this.media.forEach(media => {
                media.versions.forEach((version, index) => {
                    const applyBorder = (cell: HTMLTableCellElement) => {
                        if (!index) cell.style.borderTop = "2px solid black";
                    };

                    const row = document.createElement("tr");
                    let cell = document.createElement("td");
                    cell.style.fontSize = "14pt";
                    cell.style.fontWeight = "bold";
                    cell.style.whiteSpace = "nowrap";
                    applyBorder(cell);
                    cell.innerText = version.id.toString();
                    row.append(cell);
                    cell = document.createElement("td");
                    applyBorder(cell);
                    cell.innerText = version.source;
                    row.append(cell);
                    table.append(row);
                });
            });

            return table.outerHTML;
            // return `<table><tr><th>Media ID</th><th>Text</th></tr>${this.media.map(media => media.versions.map((version, index) => `<tr><td style="font-size:14pt;font-weight:bold;white-space:nowrap;${index ? "border-top:2px solid #000;" : ""}">${version.id}</td><td${index ? " style=\"border-top:2px solid #000;\"" : ""}>${version.source}</td></tr>`).join("")).join("")}</table>`;
        }, */
        copyMedia() {
            const table = document.createElement("table");

            const colgroup = document.createElement("colgroup");
            let col = document.createElement("col");
            col.width = "100";
            colgroup.append(col);
            col = document.createElement("col");
            col.width = "900";
            colgroup.append(col);
            table.append(colgroup);

            const header = document.createElement("tr");
            let headerCell = document.createElement("th");
            headerCell.innerText = "Media ID";
            headerCell.style.width = "1000px";
            header.append(headerCell);
            headerCell = document.createElement("th");
            headerCell.innerText = "Text";
            header.append(headerCell);
            table.append(header);

            const media: IMedia[] = [];
            ["audio", "text"].forEach(type => media.push(...this.media.filter(media => media.type === type)));

            media.forEach((media, mediaIndex) => {
                media.versions.forEach((version, index) => {
                    const applyBorder = (cell: HTMLTableCellElement) => {
                        if (mediaIndex && !index) cell.style.borderTop = "1px solid black";
                    };

                    const row = document.createElement("tr");
                    let cell = document.createElement("td");
                    cell.style.fontSize = "14pt";
                    cell.style.fontWeight = "bold";
                    cell.style.whiteSpace = "nowrap";
                    applyBorder(cell);
                    cell.innerText = version.id.toString();
                    row.append(cell);
                    cell = document.createElement("td");
                    cell.style.wordWrap = "break-word";
                    applyBorder(cell);
                    cell.innerText = version.text;
                    row.append(cell);
                    for (let i = 0; i < 5; i++) {
                        cell = document.createElement("td");
                        applyBorder(cell);
                        row.append(cell);
                    }
                    table.append(row);
                });
            });

            navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([table.outerHTML], { type: "text/html" }) })]);
            /* if (this.copies.has(type)) window.clearTimeout(this.copies.get(type));
            this.copies.set(type, window.setTimeout(() => this.copies.delete(type), 1000)); */
            window.clearTimeout(this.mediaCopyTimeout);
            this.mediaCopied = true;
            this.mediaCopyTimeout = window.setTimeout(() => this.mediaCopied = false, 1500);
        },
        async fetchSheet(sheet: Sheet) {
            if (this.sheetFetched) this.undoSheet();
            this.sheetFetching = true;

            const url = new URL(`https://docs.google.com/spreadsheets/d/${sheet.id}/gviz/tq`);
            url.searchParams.set("tqx", "out:json");
            url.searchParams.set("sheet", this.game.id.toLowerCase());

            const response = await fetch(url);
            const raw = await response.text();

            type Column = { id: string; label: string; type: string; pattern?: string; };
            type Cell = { v: any; f?: string; };
            type Row = { c: Cell[]; };
            type Table = { cols: Column[]; rows: Row[]; parsedNumHeaders: number; };
            type Response = {
                reqId: string;
                sig: string;
                status: string;
                table: Table;
                version: string;
            };

            const data = JSON.parse(/^google.visualization.Query.setResponse\((.+)\);$/m.exec(raw)![1]) as Response;
            if (data.sig == sheet.first) {
                this.sheetFetching = false;
                return;
            }

            // console.log(data);

            const { table: { cols, rows } } = data;

            let lastColIndex = -1;
            const getColIndex = (type: string, fallback: number) => {
                let index = cols.findIndex((col, index) => index > lastColIndex && col.type === type);
                if (index < 0) index = fallback;
                lastColIndex = index;
                return index;
            };

            const columnId = getColIndex("number", 0);
            // const columnText = getColIndex("string", 1);
            getColIndex("string", 1);
            const columnDisplay = getColIndex("string", 2);

            this.sheetFetching = false;
            rows.forEach(row => {
                // console.log(row);
                const cells = row.c;
                const idCell = cells[columnId];
                // const textCell = cells[columnText];
                const displayCell = cells[columnDisplay];
                if (idCell && displayCell) {
                    this.media.forEach(media => {
                        const version = media.versions.find(version => version.id == idCell.v);
                        if (version) {
                            version.displayText = displayCell.v;
                        }
                    });
                }
            });

            this.sheetFetched = true;
        },
        undoSheet() {
            this.media.forEach(media => media.versions.forEach(version => delete version.displayText));
            this.sheetFetched = false;
        }
    },
    async mounted() {
        await this.export.load();
        this.media = cloneDeep(this.export.media!);
        this.loaded = true;
        // console.log(this.export.media);
    },
    components: { ViewerPagination, ViewerVersion }
});
</script>

<template>
    <div class="text-center pt-5">
        <button class="btn btn-secondary" @click="exit">{{ $t("viewer.exit") }}</button>
    </div>
    <h4 class="text-dark text-center mb-0 mt-5" :style="{ '--bs-text-opacity': 0.5 }">{{ bundle.name }}</h4>
    <h1 class="display-5 text-center">{{ $te(gameNameKey) ? $t(gameNameKey) : game.name }}</h1>
    <div v-if="loaded" class="py-5">
        <div v-if="translator || sheetFetched" class="d-grid gap-2 col-6 mx-auto mb-5">
            <template v-if="translator">
                <button class="btn btn-success" @click="copyMedia">{{ $t(mediaCopied ? "viewer.copy.copied" : "viewer.copy.button") }}</button>
                <!-- <button class="btn btn-primary mb-3" :disabled="sheetFetching">{{ $t(sheetFetching ? "viewer.translator.fetching" : "viewer.translator.fetch") }}</button> -->
                <p class="mt-4 mb-0">{{ $t(sheetFetching ? "viewer.translator.fetching" : "viewer.translator.fetch") }}</p>
                <button class="btn btn-primary mb-3" v-for="lang in languagesWithSheets" :disabled="sheetFetching" @click="fetchSheet(lang.sheet!)">{{ lang.name }}</button>
            </template>
            <button type="submit" class="btn btn-secondary" v-if="sheetFetched" @click="undoSheet">{{ $t("viewer.translator.undo") }}</button>
        </div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" :placeholder="$t('viewer.search.placeholder')" :value="searchQuery" @input="updateSearch" />
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