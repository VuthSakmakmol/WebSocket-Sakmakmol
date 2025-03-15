import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia"; // ✅ Import Pinia
import vuetify from "./plugins/vuetify"; // ✅ Import Vuetify

const pinia = createPinia(); // ✅ Create Pinia instance

const app = createApp(App);
app.use(router);
app.use(pinia); // ✅ Ensure Pinia is used before any component loads
app.use(vuetify);
app.mount("#app");
