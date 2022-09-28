<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IMediaVersion } from "../talkshow/api";

export default defineComponent({
    props: {
        version: {
            type: Object as PropType<IMediaVersion>,
            required: true
        },
        showLocales: Boolean
    }
});
</script>

<template>
    <tr>
        <th scope="row">
            <strong>{{ version.id }}</strong>
        </th>
        <td v-if="showLocales" class="locale">{{ version.locale }}</td>
        <td>
            <code v-if="version.tag">{{ version.tag }}</code>
        </td>
        <td>{{ version.text }}</td>
    </tr>
</template>

<style scoped lang="scss">
.locale {
    white-space: nowrap;
}
</style>