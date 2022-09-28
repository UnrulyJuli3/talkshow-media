import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";

createApp(App).mount("#app");

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