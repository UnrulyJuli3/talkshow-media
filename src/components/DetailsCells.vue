<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Flowchart } from "../talkshow/export/flowchart";

export default defineComponent({
    props: {
        flowchart: {
            type: Object as PropType<Flowchart>,
            required: true
        }
    },
    mounted() {
        console.log(this.flowchart);
    },
});
</script>

<template></template>

<style scoped lang="scss"></style>