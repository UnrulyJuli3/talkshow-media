<script lang="ts">
import { defineComponent } from "vue";
import Picker from "./components/Picker.vue";
import { BundleItem, GameItem } from "./games";
import Viewer from "./components/Viewer.vue";

export default defineComponent({
    data(): {
        hasSelected: boolean;
        selected?: {
            bundle: BundleItem;
            game: GameItem;
        }
    } {
        return {
            hasSelected: false
        };
    },
    methods: {
        select(bundle: BundleItem, game: GameItem) {
            this.selected = { bundle, game };
            this.hasSelected = true;
        },
        exit() {
            delete this.selected;
            this.hasSelected = false;
        }
    },
    components: { Picker, Viewer }
});
</script>

<template>
    <div class="container-lg">
        <Viewer v-if="hasSelected" :bundle="selected!.bundle" :game="selected!.game" @exit="exit" />
        <Picker v-else @select="select" />
    </div>
</template>