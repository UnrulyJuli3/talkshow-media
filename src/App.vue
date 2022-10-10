<script lang="ts">
import { defineComponent } from "vue";
import Picker from "./components/Picker.vue";
import { BundleItem, GameItem } from "./games";
import Viewer from "./components/Viewer.vue";
import { get, set } from "idb-keyval";

export default defineComponent({
    data(): {
        hasSelected: boolean;
        selected?: {
            bundle: BundleItem;
            game: GameItem;
        };
        languages: { locale: string; name: string; }[];
        translator: boolean;
    } {
        return {
            hasSelected: false,
            languages: [
                { locale: "en", name: "English" },
                // { locale: "de", name: "Deutsch" }
            ],
            translator: false
        };
    },
    computed: {
        language() {
            return this.languages.find(lang => lang.locale === this.$i18n.locale)!;
        }
    },
    methods: {
        select(bundle: BundleItem, game: GameItem) {
            this.selected = { bundle, game };
            this.hasSelected = true;
        },
        exit() {
            delete this.selected;
            this.hasSelected = false;
        },
        async changeLocale(locale: string) {
            this.$i18n.locale = locale;
            await set("locale", this.$i18n.locale);
        },
        async toggleTranslator(e: Event) {
            this.translator = (e.target as HTMLInputElement).checked;
            await set("translator", this.translator);
        }
    },
    async mounted() {
        const locale = await get("locale");
        if (locale) this.$i18n.locale = locale;
        const translator = await get("translator");
        if (translator) this.translator = true;
    },
    components: { Picker, Viewer }
});
</script>

<template>
    <nav class="navbar navbar-expand-lg m-4">
        <div class="container-fluid">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <!-- <li class="nav-item"><a class="nav-link" href="#">Nav link</a></li> -->
                <li class="nav-item dropdown">
                    <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">{{ language.name }}</button>
                    <ul class="dropdown-menu">
                        <li v-for="lang in languages"><button class="dropdown-item" :disabled="lang.locale === $i18n.locale" @click="changeLocale(lang.locale)">{{ lang.name }}</button></li>
                    </ul>
                </li>
            </ul>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="translator-mode" :checked="translator" @change="toggleTranslator" />
                <label class="form-check-label" for="translator-mode">{{ $t("translatorMode") }}</label>
            </div>
        </div>
    </nav>
    <div class="container-lg">
        <Viewer v-if="hasSelected" :bundle="selected!.bundle" :game="selected!.game" @exit="exit" :translator="translator" />
        <Picker v-else @select="select" />
    </div>
</template>