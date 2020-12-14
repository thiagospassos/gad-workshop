<template>
  <div>
    <div class="clearfix">
      <h1 class="float-left">Products</h1>
      <router-link
        tag="button"
        class="btn btn-primary float-right"
        :to="{ name: 'products-new' }"
      >
        <i class="fas fa-plus"></i>
      </router-link>
    </div>
    <b-table
      striped
      hover
      @sort-changed="sortingChanged"
      :items="products"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template v-slot:cell(actions)="data">
        <router-link
          tag="button"
          :to="{
            name: 'products-edit',
            params: { id: data.item.id.toString(), product: data.item },
          }"
          class="btn btn-secondary btn-sm"
        >
          <i class="fas fa-edit"></i>
        </router-link>
        <button
          class="btn btn-danger btn-sm"
          @click="deleteRequested(data.item)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </template>
      <template v-slot:cell(unitPrice)="data">
        <div>
          {{ data.item.unitPrice | toCurrency }}
        </div>
      </template>
    </b-table>
    <b-pagination
      :total-rows="productCount"
      :per-page="10"
      v-model="page"
      @input="fetchAll()"
    />
    <b-modal
      id="deleteModal"
      ref="deleteModal"
      title="Delete Product?"
      centered
      ok-title="Delete"
      ok-variant="danger"
      @ok="deleteConfirmed"
    >
      <p class="my-4">
        Are you sure you want to delete '{{ productToDelete.name }}'?
      </p>
    </b-modal>
  </div>
</template>

<script>
import { ProductsService } from "@/services/NorthwindService.js";

export default {
  data() {
    return {
      productToDelete: {},
      fields: [
        { key: "id", sortable: true },
        { key: "name", sortable: true },
        { key: "unitPrice", sortable: true, label: "Price" },
        { key: "unitsInStock", sortable: true, label: "Stock" },
        { key: "actions" },
      ],
      products: [],
      productCount: 0,
      page: 1,
      sortBy: "id",
      sortDesc: true,
    };
  },
  created() {
    this.fetchAll();
  },
  methods: {
    sortingChanged(ctx) {
      this.sortBy = ctx.sortBy;
      this.sortDesc = ctx.sortDesc;
      this.fetchAll();
    },
    deleteConfirmed() {
      ProductsService.delete(this.productToDelete.id)
        .then(() => {
          this.products = this.products.filter(
            (p) => p.id !== this.productToDelete.id
          );
        })
        .catch((error) => console.error(error));
    },

    deleteRequested(product) {
      this.productToDelete = product;
      this.$refs.deleteModal.show();
    },

    fetchAll() {
      ProductsService.getAllPaged(
        this.page,
        this.sortBy,
        this.sortDesc ? "desc" : "asc"
      )
        .then((result) => {
          this.productCount = parseInt(result.headers["x-total-count"]);
          this.products = result.data;
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>

<style lang="scss" scoped></style>
