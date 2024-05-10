//  importo metodo da vue
import { createApp } from "vue";
// file di partenza styles progetto
import "./assets/scss/general.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// file start Vue
import App from "./App.vue";

// importo apexcharts
import VueApexCharts from "vue3-apexcharts";

createApp(App).use(VueApexCharts).mount("#app");
