import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue } from "bootstrap-vue";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);
Vue.use(BootstrapVue);

import "@fortawesome/fontawesome-free/css/all.css";
import "nprogress/nprogress.css";

import InvalidFeedback from "@/components/InvalidFeedback.vue";
import BaseInput from "@/components/BaseInput.vue";
import store from "./store";

Vue.component("InvalidFeedback", InvalidFeedback);
Vue.component("BaseInput", BaseInput);

Vue.filter("toCurrency", (value) => {
    if (typeof value !== "number") return;
    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    });
    return formatter.format(value);
})

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");