import { SuppliersService } from "@/services/NorthwindService.js";

export default {
    state: {
        suppliers: [],
        loading: false
    },
    mutations: {
        SET_SUPPLIERS(state, payload) {
            state.suppliers = payload;
        },
        LOADING_SUPPLIERS(state, payload) {
            state.loading = payload;
        }
    },
    actions: {
        fetchSuppliers({ state, commit }, force) {
            if (state.suppliers.length > 0 && !force) return;
            commit("LOADING_SUPPLIERS", true);
            SuppliersService.getAll()
                .then(r => {
                    commit("SET_SUPPLIERS", r.data);
                    commit("LOADING_SUPPLIERS", false);
                })
                .catch(err => console.error(err));
        }
    },
    getters: {}
};