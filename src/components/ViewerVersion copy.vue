<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IMediaVersion } from "../talkshow/api";

export default defineComponent({
    props: {
        version: {
            type: Object as PropType<IMediaVersion>,
            required: true
        }
    }
});
</script>

<template>
    <li class="list-group-item">
        <div class="card-title d-flex justify-content-between">
            <strong>{{ version.id }}</strong>
            <span v-if="version.tag">{{ version.tag }}</span>
        </div>
        <div class="card-text">{{ version.text }}</div>
    </li>
</template>