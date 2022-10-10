<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IMedia, IMediaVersion } from "../talkshow/api";
import VersionPlayer from "./VersionPlayer.vue";
import VersionInfoModal from "./VersionInfoModal.vue";

export default defineComponent({
    props: {
        hasLocales: Boolean,
        hasTags: Boolean,
        media: {
            type: Object as PropType<IMedia>,
            required: true
        },
        version: {
            type: Object as PropType<IMediaVersion>,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        audioPath: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            viewingInfo: false,
            isPlaying: false,
            audioDuration: 0
        };
    },
    computed: {
        textCellStyle() {
            if (this.isPlaying) return {
                "animation-duration": `${this.audioDuration}s`
            };
        }
    },
    methods: {
        showInfo() {
            this.viewingInfo = true;
        },
        hideInfo() {
            this.viewingInfo = false;
        },
        startPlaying(duration: number) {
            this.isPlaying = true;
            this.audioDuration = duration;
        },
        stopPlaying() {
            this.isPlaying = false;
        }
    },
    components: { VersionPlayer, VersionInfoModal }
});
</script>
    
<template>
    <tr :class="{ 'media-separator': !index }">
        <th scope="row">{{ version.id }}</th>
        <td v-if="hasLocales" class="locale">{{ version.locale }}</td>
        <td v-if="hasTags"><code v-if="version.tag">{{ version.tag }}</code></td>
        <td :class="{ 'text': true, 'playing': isPlaying }" :style="textCellStyle">{{ version.displayText || version.text }}</td>
        <td class="controls">
            <VersionPlayer v-if="media.type === 'audio'" :audio-path="audioPath" @play="startPlaying" @stop="stopPlaying" />
            <a class="text-decoration-none" href="#" @click.prevent="showInfo">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
            </a>
            <a v-if="media.type === 'audio'" class="text-decoration-none ms-1" :href="audioPath" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                </svg>
            </a>
        </td>
        <VersionInfoModal v-if="viewingInfo" :media="media" :version="version" :audio-path="audioPath" @hidden="hideInfo" />
    </tr>
</template>

<style scoped lang="scss">
td.text {
    &.playing {
        background: linear-gradient(#0075f733, #0075f733) no-repeat 0 / 0;
        animation: progress linear forwards;
    }

    @keyframes progress {
        0% {
            background-size: 0;
        }

        100% {
            background-size: 100%;
        }
    }
}

td.controls {
    white-space: nowrap;
}
</style>