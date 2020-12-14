import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@fortawesome/fontawesome-free/css/all.css";
import i18n from "./i18n";
import Vuelidate from 'vuelidate'
import InvalidFeedback from '@/components/InvalidFeedback.vue'
import BaseInput from '@/components/BaseInput.vue'

Vue.component('InvalidFeedback', InvalidFeedback)
Vue.component('BaseInput', BaseInput)
Vue.use(Vuelidate)
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount("#app");