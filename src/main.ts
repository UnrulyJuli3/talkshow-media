import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import messages from "./messages.json";

const i18n = createI18n({
    locale: "en",
    fallbackLocale: "en",
    messages
});

const app = createApp(App);
app.use(i18n);
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