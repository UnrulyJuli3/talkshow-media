<script lang="ts">
import { defineComponent, PropType, Ref } from "vue";
import { IMedia, IMediaVersion } from "../talkshow/api";
import ViewerVersion from "./ViewerVersion.vue";
import { Collapse } from "bootstrap";

export default defineComponent({
    props: {
        media: {
            type: Object as PropType<IMedia>,
            required: true
        },
        filters: {
            type: Object as PropType<{
                locales: string[],
                search: {
                    id: string,
                    text: string
                }
            }>,
            required: true
        }
    },
    computed: {
        localeGroups() {
            const ungrouped: IMediaVersion[] = [];
            const map = new Map<string, IMediaVersion[]>();
            this.media.versions.forEach(version => {
                if (version.locale) {
                    if (this.filters.locales.includes(version.locale)) {
                        if (map.has(version.locale)) map.get(version.locale)!.push(version);
                        else map.set(version.locale, [version]);
                    }
                } else ungrouped.push(version);
            });

            return {
                ungrouped,
                groups: Array.from(map.entries()).map(entry => ({ locale: entry[0], versions: entry[1] }))
            };
        },
        hasVersions() {
            return this.media.versions.length > 0;
        },
        hasApplicableVersions() {
            if (!this.hasVersions) return false;
            const { ungrouped, groups } = this.localeGroups;
            return ungrouped.length || groups.length;
        }
    },
    components: { ViewerVersion }
});
</script>

<template>
    <div class="col-sm-6 col-lg-4 mb-4" v-if="hasApplicableVersions">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <strong>{{ media.id }}</strong>
                <span>{{ media.type.toUpperCase() }}</span>
            </div>
            <ul class="list-group list-group-flush">
                <ViewerVersion v-for="version in localeGroups.ungrouped" :version="version" />
                <template v-for="group in localeGroups.groups">
                    <li class="list-group-item">
                        <strong class="mb-0 text-muted">{{ group.locale }}</strong>
                    </li>
                    <ViewerVersion v-for="version in group.versions" :version="version" />
                </template>
                <li v-if="!hasVersions" class="list-group-item">
                    <em class="text-muted">No versions</em>
                </li>
            </ul>
        </div>
    </div>
</template>