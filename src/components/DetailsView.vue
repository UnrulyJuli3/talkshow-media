<script lang="ts">
import { defineComponent } from "vue";
import BundleList from "../games";
import { ActionPackageType } from "../talkshow/actions/actionPackageRef";
import { ParameterType } from "../talkshow/actions/parameter";
import Export from "../talkshow/export/export";
import { FieldType } from "../talkshow/templates/templateField";

export default defineComponent({
    data(): {
        exp: Export | null;
        loaded: boolean;
        pageList: {
            id: string;
            name: string;
        }[];
        currentPage: string;
        showAllPackages: boolean;
        showFilePaths: boolean;
    } {
        return {
            exp: null,
            loaded: false,
            pageList: [
                { id: "packages", name: "Action packages" },
                { id: "flowcharts", name: "Flowcharts" },
                { id: "templates", name: "Templates" }
            ],
            currentPage: "packages",
            showAllPackages: false,
            showFilePaths: true
        };
    },
    computed: {
        packages() {
            if (!this.exp) return [];
            const packages = this.exp.packages!;
            if (!this.showAllPackages) return packages.filter(pkg => pkg.type === ActionPackageType.Swf);
            return packages;
        }
    },
    methods: {
        back() {
            this.$router.replace("/details");
        },
        getPackageTypeName(type: ActionPackageType) {
            switch (type) {
                case ActionPackageType.Internal: return "INTERNAL";
                case ActionPackageType.Swf: return "SWF";
                case ActionPackageType.Code: return "CODE";
            }
        },
        getTemplateFieldTypeName(type: FieldType) {
            switch (type) {
                case FieldType.Audio: return "Audio";
                case FieldType.Boolean: return "Boolean";
                case FieldType.Graphic: return "Graphic";
                case FieldType.Number: return "Number";
                case FieldType.String: return "String";
            }
        },
        getActionParamTypeName(type: ParameterType) {
            switch (type) {
                case ParameterType.Audio: return "Audio";
                case ParameterType.Boolean: return "Boolean";
                case ParameterType.Graphic: return "Graphic";
                case ParameterType.List: return "List";
                case ParameterType.Number: return "Number";
                case ParameterType.String: return "String";
                case ParameterType.Text: return "Text";
            }
        }
    },
    async mounted() {
        const bundle = BundleList.find(bundle => bundle.id === this.$route.params.bundle);
        if (!bundle) { this.back(); return; }
        const game = bundle.games.find(game => game.id === this.$route.params.game);
        if (!game) { this.back(); return; }
        this.exp = new Export(bundle, game);
        await this.exp.load();
        this.loaded = true;
    }
});
</script>

<template>
    <template v-if="loaded">
        <h2 class="my-3">Metadata</h2>
        <table class="table">
            <tbody>
                <tr>
                    <th scope="col">Workspace name</th>
                    <td>{{ exp!.workspaceName }}</td>
                </tr>
                <tr>
                    <th scope="col">Project name</th>
                    <td>{{ exp!.projectName }}</td>
                </tr>
                <tr>
                    <th scope="col">Build timestamp</th>
                    <td>{{ exp!.timestamp?.toLocaleString("en-US") }}</td>
                </tr>
            </tbody>
        </table>
        <ul class="nav nav-pills nav-fill">
            <li class="nav-item" v-for="page in pageList">
                <button :class="{ 'nav-link': true, 'active': currentPage === page.id }" @click="currentPage = page.id" href="#">{{ page.name }}</button>
            </li>
        </ul>
        <template v-if="currentPage === 'packages'">
            <h2 class="mb-3 mt-4">Action packages</h2>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="show-file-paths" v-model="showFilePaths" />
                <label class="form-check-label" for="show-file-paths">Show file paths</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="show-all-packages" v-model="showAllPackages" />
                <label class="form-check-label" for="show-all-packages">Show non-SWF packages<template v-if="showFilePaths"> (hides file paths)</template></label>
            </div>
            <table class="table mt-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col" v-if="showAllPackages">Type</th>
                        <th scope="col" v-if="showFilePaths && !showAllPackages">Path</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pkg in packages">
                        <th scope="row">{{ pkg.id }}</th>
                        <td><a :href="`#package-${pkg.id}-details`">{{ pkg.name }}</a></td>
                        <td v-if="showAllPackages"><code>{{ getPackageTypeName(pkg.type) }}</code></td>
                        <td v-if="showFilePaths && !showAllPackages"><code>project/actions/{{ pkg.id }}.swf</code></td>
                    </tr>
                </tbody>
            </table>
            <h1 class="mb-3 mt-5">Details</h1>
            <template v-for="pkg in packages">
                <h4 class="mb-3 pt-3" :id="`package-${pkg.id}-details`">{{ pkg.name }}</h4>
                <table class="table">
                    <thead>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Parameters</th>
                    </thead>
                    <tbody>
                        <tr v-for="action in pkg.actions">
                            <th scope="row">{{ action.id }}</th>
                            <td>{{ action.name }}</td>
                            <td class="p-0">
                                <table class="table" :style="{ 'margin-bottom': '-1px' }" v-if="action.params.length">
                                    <tbody>
                                        <tr v-for="param in action.params">
                                            <td>{{ param.name }}</td>
                                            <td class="help" :title="getActionParamTypeName(param.type)">{{ param.type }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>
        </template>
        <template v-if="currentPage === 'flowcharts'">
            <h2 class="mb-3 mt-4">Flowcharts</h2>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="show-file-paths" v-model="showFilePaths" />
                <label class="form-check-label" for="show-file-paths">Show file paths</label>
            </div>
            <table class="table mt-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col" v-if="showFilePaths">Path</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="flowchart in exp!.flowcharts">
                        <th scope="row">{{ flowchart.id }}</th>
                        <td>{{ flowchart.name }}</td>
                        <td>{{ flowchart.isSubroutine ? 'Subroutine' : 'Flowchart' }}</td>
                        <td v-if="showFilePaths"><code>project/data/F_{{ flowchart.id }}.swf</code></td>
                    </tr>
                </tbody>
            </table>
        </template>
        <template v-if="currentPage === 'templates'">
            <h2 class="mb-3 mt-4">Templates</h2>
            <table class="table mt-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Parameters</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="template in exp!.templates">
                        <th scope="row">{{ template.id }}</th>
                        <td><a :href="`#template-${template.id}-details`">{{ template.name }}</a></td>
                        <td>{{ template.params.join(", ") }}</td>
                    </tr>
                </tbody>
            </table>
            <h1 class="mb-3 mt-5">Details</h1>
            <template v-for="template in exp!.templates">
                <h4 class="mb-3 pt-3" :id="`template-${template.id}-details`">{{ template.name }}</h4>
                <table class="table">
                    <thead>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Default value</th>
                        <th scope="col">TS variable</th>
                    </thead>
                    <tbody>
                        <tr v-for="field in template.fields">
                            <th scope="row">{{ field.id }}</th>
                            <td>{{ field.name }}</td>
                            <td class="help" :title="getTemplateFieldTypeName(field.type)">{{ field.type }}</td>
                            <td><code v-if="field.def">"{{ field.def }}"</code></td>
                            <td><code v-if="field.var">{{ field.var }}</code></td>
                        </tr>
                    </tbody>
                </table>
            </template>
        </template>
    </template>
</template>

<style lang="scss">
.help {
    cursor: help;
}
</style>