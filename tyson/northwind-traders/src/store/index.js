import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    release: {
      build: "1.0.0",
      environment: "Development",
    },
    healthChecks: [
      { title: "SMTP check", passed: true },
      { title: "Database check", passed: true },
    ],
  },
  getters: {
    failedHealthCheckCount: (state) => {
      return state.healthChecks.filter((hc) => !hc.passed).length;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
