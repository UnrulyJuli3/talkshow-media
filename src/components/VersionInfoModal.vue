<script lang="ts">
import { Modal } from "bootstrap";
import { defineComponent, PropType } from "vue";
import { IMedia, IMediaVersion } from "../talkshow/api";

export default defineComponent({
    props: {
        media: {
            type: Object as PropType<IMedia>,
            required: true
        },
        version: {
            type: Object as PropType<IMediaVersion>,
            required: true
        },
        audioPath: {
            type: String,
            required: true
        }
    },
    data(): {
        modal?: Modal;
    } {
        return {

        };
    },
    methods: {
        hide() {
            this.modal?.hide();
        }
    },
    mounted() {
        this.$nextTick(() => {
            const element = this.$refs.modal as HTMLDivElement;
            this.modal = new Modal(element);
            this.modal.show();
            element.addEventListener("hidden.bs.modal", () => this.$emit("hidden"));
        });
    }
});
</script>

<template>
    <div class="modal fade" ref="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ version.id }}</h5>
                    <button class="btn-close" @click="hide"></button>
                </div>
                <div class="modal-body">
                    <ul>
                        <li>Version {{ version.idx + 1 }} of media <strong>{{ media.id }}</strong> ({{ media.type }})</li>
                        <li v-if="version.locale">Locale: {{ version.locale }}</li>
                        <li v-if="version.tag">Tag(s): <code>{{ version.tag }}</code></li>
                        <li>
                            Raw text:
                            <pre class="my-2">{{ version.source }}</pre>
                        </li>
                        <li v-if="version.metadata.size">
                            Metadata:
                            <table class="table table-striped table-bordered table-sm my-2">
                                <tbody>
                                    <tr v-for="[key, value] in version.metadata.entries()">
                                        <th scope="row"><code>{{ key }}</code></th>
                                        <td><code v-if="value">{{ value }}</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
pre {
    padding: 8px;
    white-space: pre-wrap;
    background: #f0f0f0;
    border-radius: 4px;
}
</style>