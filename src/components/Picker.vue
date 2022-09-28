<script lang="ts">
import { defineComponent } from "vue";
import BundleList, { BundleItem, GameItem } from "../games";
import PickerGame from "./PickerGame.vue";

export default defineComponent({
    data() {
        return {
            bundleList: BundleList
        };
    },
    methods: {
        select(bundle: BundleItem, game: GameItem) {
            this.$emit("select", bundle, game);
        }
    },
    components: { PickerGame }
});
</script>
    
<template>
    <div class="picker">
        <div class="py-4" v-for="bundle in bundleList" :key="bundle.id">
            <h1 class="text-center py-4">{{ bundle.name }}</h1>
            <div class="card-group">
                <PickerGame v-for="game in bundle.games" :info="game" @select="select(bundle, game)" />
            </div>
        </div>
    </div>
</template>