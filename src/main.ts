import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import MediaRouteLegacy from "./components-legacy/MediaRoute.vue";
import DetailsPicker from "./components/DetailsPicker.vue";
import DetailsRoute from "./components/DetailsRoute.vue";
import DetailsView from "./components/DetailsView.vue";
import ListToArrayUtil from "./components/ListToArrayUtil.vue";
import MediaPicker from "./components/MediaPicker.vue";
import MediaRoute from "./components/MediaRoute.vue";
import messages from "./messages.json";
import "./style.scss";

const i18n = createI18n({
    locale: "en",
    fallbackLocale: "en",
    messages
});

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/media"
        },
        {
            path: "/media-legacy",
            component: MediaRouteLegacy
        },
        {
            path: "/media",
            component: MediaRoute,
            children: [
                {
                    path: "",
                    component: MediaPicker
                },
            ]
        },
        {
            path: "/details",
            component: DetailsRoute,
            children: [
                {
                    path: "",
                    component: DetailsPicker
                },
                {
                    path: ":bundle/:game",
                    component: DetailsView
                }
            ]
        },
        {
            path: "/array-gen",
            component: ListToArrayUtil
        }
    ]
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount("#app");

// <table><tr><th>Media ID</th><th>Text</th></tr><tr><td style="font-size:14pt;font-weight:bold;white-space:nowrap;border-top:2px solid #000;">123456</td><td>bar</td></tr></table>

/* document.body.addEventListener("paste", e => {
    e.preventDefault();
    e.clipboardData?.types.forEach(type => {
        console.log(type, "/", e.clipboardData?.getData(type));
    });
    // console.log(e.clipboardData?.types);
    // const sheetsData = JSON.parse(e.clipboardData?.getData("application/x-vnd.google-docs-embedded-grid_range_clip+wrapped")!);
    // console.log(sheetsData);
    // const sepData = JSON.parse(sheetsData.data);
    // console.log(JSON.parse(sepData.cid));
    // console.log(JSON.parse(sepData.csm));
    // console.log(sepData.grh);
}); */