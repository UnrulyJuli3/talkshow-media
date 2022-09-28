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
            viewingInfo: false
        };
    },
    methods: {
        showInfo() {
            this.viewingInfo = true;
        },
        hideInfo() {
            this.viewingInfo = false;
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
        <td>{{ version.text }}</td>
        <td>
            <VersionPlayer v-if="media.type === 'audio'" :audio-path="audioPath" />
            <a class="text-decoration-none" href="#" @click.prevent="showInfo">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
            </a>
        </td>
        <VersionInfoModal v-if="viewingInfo" :media="media" :version="version" :audio-path="audioPath" @hidden="hideInfo" />
    </tr>
</template>