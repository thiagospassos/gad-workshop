import Vue from "vue";
import Vuex from "vuex";
import supplier from "./supplier";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { supplier },
    state: {
        release: {
            build: "1.0.0",
            environment: "Development"
        },
        healthChecks: [
            { title: "SMTP check", passed: true },
            { title: "Database check", passed: true }
        ],
        notifications: []
    },
    getters: {
        failedHealthCheckCount: state => {
            return state.healthChecks.filter(hc => !hc.passed).length;
        },
        notificationCount: state => {
            return state.notifications.length;
        }
    },
    mutations: {
        dismissNotification(state, payload) {
            state.notifications = state.notifications.filter(n => n.id !== payload);
        },
        raiseNotification(state, payload) {
            state.notifications.push({
                id: state.notifications.length + 1,
                context: payload.context,
                message: payload.message
            });
        },
        SET_STATE(state, payload) {
            let keys = Object.keys(state);
            keys.forEach(key => {
                state[key] = payload[key];
            });
        }
    },
    actions: {
        raiseSuccessNotification({ commit }, payload) {
            commit("raiseNotification", {
                context: "success",
                message: payload
            });
        },
        raiseErrorNotification({ commit }, payload) {
            console.error("Error", payload);
            commit("raiseNotification", {
                context: "danger",
                message: payload
            });
        },
        ReadInitialStateFromLocalStorage({ commit }) {
            let state = localStorage.getItem("state");
            if (state) commit("SET_STATE", JSON.parse(state));
        },
        StoreInLocalStorage({ state }) {
            localStorage.setItem("state", JSON.stringify(state));
        }
    }
});