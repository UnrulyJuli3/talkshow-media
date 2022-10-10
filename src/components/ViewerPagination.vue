<script lang="ts">
import { defineComponent } from "vue";
import { chunk, first, last, range, uniq } from "lodash";

export default defineComponent({
    props: {
        numPages: {
            type: Number,
            required: true
        },
        page: {
            type: Number,
            required: true
        }
    },
    computed: {
        /* pageSets() {
            const set = uniq(range(1, 1 + 3).concat(range(this.numPages - 2, this.numPages + 1))).filter(n => n > 0 && n < (this.numPages + 1));
            const start = set.slice(0, 3);
            const end = set.slice(-3);
            const page = this.page + 1;
            const insert = [page];
            const current = !start.includes(page) && !end.includes(page);
            return (first(end)! - last(start)!) > 1 ? current ? [start, insert, end] : [start, end] : current ? [set, insert] : [set];
        }, */
        pageSets() {
            return chunk(["prev", ...range(this.numPages), "next"], 10);
        },
        canPrev() {
            return this.page > 0;
        },
        canNext() {
            return this.page < (this.numPages - 1);
        }
    },
    methods: {
        /* prev() {
            if (this.canPrev) this.goto(this.page - 1);
        },
        next() {
            if (this.canNext) this.goto(this.page + 1);
        }, */
        /* goto(page: number) {
            this.$emit("navigate", page);
        } */
        goto(page: string | number) {
            switch (page) {
                case "prev":
                    if (this.canPrev) this.$emit("navigate", this.page - 1);
                    break;
                case "next":
                    if (this.canNext) this.$emit("navigate", this.page + 1);
                    break;
                default:
                    this.$emit("navigate", page);
            }
        }
    }
});
</script>

<template>
    <!-- <ul class="pagination pagination-sm justify-content-center">
        <li :class="{ 'page-item': true, 'disabled': !canPrev }">
            <button class="page-link" @click="prev">Previous</button>
        </li>
        <template v-for="set in pageSets">
            <li v-for="n in set" :class="{ 'page-item': true, 'active': page === (n as number), 'disabled': !(n === 'prev' ? canPrev : n === 'next' ? canNext : true) }">
                <button class="page-link" @click="goto(n as number)">{{ n }}</button>
            </li>
        </template>
        <li v-for="n in numPages" :class="{ 'page-item': true, 'active': page === (n - 1) }">
            <button class="page-link" @click="goto(n - 1)">{{ n }}</button>
        </li>
        <li :class="{ 'page-item': true, 'disabled': !canNext }">
            <button class="page-link" @click="next">Next</button>
        </li>
    </ul> -->
    <div>
        <ul v-for="set in pageSets" class="pagination pagination-sm justify-content-center">
            <li v-for="n in set" :class="{ 'page-item': true, 'active': page === (n as number), 'disabled': !(n === 'prev' ? canPrev : n === 'next' ? canNext : true) }">
                <button class="page-link" @click="goto(n)">{{ n === "prev" ? $t("viewer.pages.previous") : n === "next" ? $t("viewer.pages.next") : (n as number) + 1 }}</button>
            </li>
        </ul>
    </div>
</template>