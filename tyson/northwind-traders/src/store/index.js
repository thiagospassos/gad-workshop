import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let nextNotificationId = 0;

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
    notifications: [],
  },
  getters: {
    notificationCount: (state) => {
      return state.notifications.length;
    },
    failedHealthCheckCount: (state) => {
      return state.healthChecks.filter((hc) => !hc.passed).length;
    },
  },
  mutations: {
    dismissNotification(state, payload) {
      state.notifications = state.notifications.filter((n) => n.id !== payload);
    },
    clearNotifications(state) {
      state.notifications = [];
    },
    raiseNotification(state, payload) {
      state.notifications.push({
        id: nextNotificationId++,
        context: payload.context,
        message: payload.message,
      });
    },
  },
  actions: {
    raiseSuccessNotification({ commit }, payload) {
      commit("raiseNotification", {
        context: "success",
        message: payload,
      });
    },
    raiseErrorNotification({ commit }, payload) {
      commit("raiseNotification", {
        context: "danger",
        message: payload,
      });
    },
  },
  modules: {},
});
