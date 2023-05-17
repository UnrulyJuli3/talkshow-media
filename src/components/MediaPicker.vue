<script lang="ts">
import { defineComponent } from "vue";
import Picker from "./Picker.vue";
import { BundleItem, GameItem } from "../games";

export default defineComponent({
    methods: {
        select(bundle: BundleItem, game: GameItem) {
            this.$router.push(`/media/${bundle.id}/${game.id}`);
        }
    },
    components: { Picker }
});
</script>

<template>
    <Picker @select="select" />
</template>