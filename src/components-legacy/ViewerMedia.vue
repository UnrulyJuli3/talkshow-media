<script lang="ts">
import { defineComponent, PropType, Ref } from "vue";
import { IMedia, IMediaVersion } from "../talkshow/api";
import ViewerVersion from "./ViewerVersion.vue";

export default defineComponent({
    props: {
        media: {
            type: Object as PropType<IMedia>,
            required: true
        }
    },
    computed: {
        showLocales() {
            return this.media.versions.some(version => version.locale);
        },
        hasVersions() {
            return this.media.numVersions > 0;
        }
    },
    components: { ViewerVersion }
});
</script>

<template>
    <tr>
        <th scope="row">{{ media.id }}</th>
        <td>{{ media.type }}</td>
    </tr>
    <tr>
        <td :colspan="2">
            <table class="table table-bordered table-striped mb-0">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col" v-if="showLocales">Locale</th>
                        <th scope="col">Tags</th>
                        <th scope="col">Text</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <ViewerVersion v-for="version in media.versions" :version="version" :show-locales="showLocales" /> -->
                </tbody>
            </table>
        </td>
    </tr>
</template>