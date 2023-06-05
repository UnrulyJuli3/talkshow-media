<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data(): {
        input: string;
        shouldAddBrackets: boolean;
        reader: FileReader;
    } {
        return {
            input: "",
            shouldAddBrackets: true,
            reader: new FileReader()
        };
    },
    computed: {
        output() {
            const res = JSON.stringify(this.input.split(/\r?\n/g).map(s => s.trim()).filter(s => s));
            if (this.shouldAddBrackets) return res;
            return res.replace(/^\[/, "").replace(/\]$/, "");
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
    <br>
    <input type="checkbox" id="should-add-brackets-checkbox-bc-i-forgot-to-add-this-b4" v-model="shouldAddBrackets" />
    <label for="should-add-brackets-checkbox-bc-i-forgot-to-add-this-b4">bracket lol</label>
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