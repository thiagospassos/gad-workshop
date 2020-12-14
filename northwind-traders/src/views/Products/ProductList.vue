<template>
  <div>
    <div class="clearfix">
      <h1 class="float-left">Products</h1>
      <router-link tag="button" class="btn btn-primary float-right" :to="{ name: 'products-new' }">
        <i class="fas fa-plus"></i>
      </router-link>
    </div>
    <b-table striped hover :items="products" :fields="fields">
      <template v-slot:cell(actions)="data">
        <router-link tag="button" :to="{ name: 'products-edit', params: { id: data.item.id.toString(), product: data.item } }" class="btn btn-secondary btn-sm">
          <i class="fas fa-edit"></i>
        </router-link>
        <button class="btn btn-danger btn-sm" @click="deleteRequested(data.item)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </template>
      <template v-slot:cell(unitPrice)="data">
        <div>
          {{ data.item.unitPrice | toCurrency }}
        </div>
      </template>
    </b-table>
    <b-pagination :total-rows="productCount" :per-page="10" v-model="page" @input="fetchAll()" />

    <b-modal id="deleteModal" ref="deleteModal" title="Delete Product?" centered ok-title="Delete" size="md" ok-variant="danger" @ok="deleteConfirmed">
      <p class="my-4">Are you sure you want to delete '{{ productToDelete.name }}'?</p>
    </b-modal>
  </div>
</template>
<script>
import { ProductsService } from "@/services/NorthwindService.js";

export default {
  data() {
    return {
      fields: [{ key: "name", sortable: true }, { key: "unitPrice", label: "Price" }, { key: "unitsInStock", label: "Stock" }, { key: "actions" }],
      products: [],
      page: 1,
      productCount: 0,
      productToDelete: {}
    };
  },
  created() {
    this.fetchAll();
  },
  methods: {
    fetchAll() {
      ProductsService.getAllPaged(this.page)
        .then(result => {
          this.productCount = parseInt(result.headers["x-total-count"]);
          this.products = result.data;
        })
        .catch(error => console.error(error));
    },
    deleteRequested(product) {
      this.productToDelete = product;
      this.$refs.deleteModal.show();
    },
    deleteConfirmed() {
      ProductsService.delete(this.productToDelete.id)
        .then(() => {
          this.products = this.products.filter(p => p.id !== this.productToDelete.id);
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
