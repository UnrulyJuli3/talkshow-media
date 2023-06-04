<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data(): {
        input: string;
        reader: FileReader;
    } {
        return {
            input: "",
            reader: new FileReader()
        };
    },
    computed: {
        output() {
            return this.input.split(/\r?\n/g).map(s => s.trim()).filter(s => s).map(s => `"${s.replace(/"/g, '\\"')}"`).join(",");
        },
        onUpload() {
            const input = (this.$refs.upload as HTMLInputElement);
            if (input.files && input.files.length) this.reader.readAsText(input.files[0]);
            return undefined;
        }
    },
    mounted() {
        this.reader.addEventListener("load", () => this.input = this.reader.result as string);
    }
});
</script>

<template>
    <h2>input:</h2>
    <input type="file" accept="text/*" ref="upload" @input="onUpload" />
    <textarea :rows="20" :cols="60" v-model="input"></textarea>
    <h2>output:</h2>
    <textarea :rows="20" :cols="60" :value="output" readonly></textarea>
</template>

<style scoped lang="scss">
h2 {
    font-family: sans-serif;
    margin: 0;
    padding: 10px;
}

textarea {
    resize: none;
    display: block;
}
</style>