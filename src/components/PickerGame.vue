<script lang="ts">
import { defineComponent, PropType } from "vue";
import { GameItem, Status } from "../games";

export default defineComponent({
    props: {
        info: {
            type: Object as PropType<GameItem>,
            required: true
        }
    },
    methods: {
        select() {
            if (this.canView) this.$emit("select");
        }
    },
    computed: {
        nameKey() {
            return `picker.game.names.${this.info.id.toLowerCase()}`;
        },
        canView() {
            return !this.info.status;
        },
        viewText() {
            switch (this.info.status) {
                case Status.Unsupported: return this.$t("picker.game.unsupported");
                case Status.Incomplete: return this.$t("picker.game.incomplete");
                default: return this.$t("picker.game.view");
            }
        }
    }
});
</script>
    
<template>
    <div class="card">
        <img v-if="info.banner" :src="info.banner" :class="{ 'card-img-top': true, 'unavailable': !canView }" />
        <div class="card-body">
            <h5 class="card-title mb-3">{{ $te(nameKey) ? $t(nameKey) : info.name }}</h5>
            <div class="d-grid">
                <button :class="`btn btn-${canView ? 'primary' : 'secondary' }`" :disabled="!canView" @click="select">{{ viewText }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
img.unavailable {
    filter: grayscale(1);
    -webkit-filter: grayscale(1);
    opacity: 0.5;
}

.card-body {
    display: flex;
    flex-direction: column;

    &>.d-grid {
        margin-top: auto;
    }
}
</style>