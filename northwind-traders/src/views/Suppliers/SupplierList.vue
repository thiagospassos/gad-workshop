<template>
  <div>
    <h1>
      Suppliers
      <router-link tag="button" id="addSupplier" class="btn btn-primary float-right" :to="{ name: 'suppliers-new' }">
        <i class="fas fa-plus"></i>
      </router-link>
    </h1>
    <b-table striped hover :items="suppliers" :fields="fields">
      <template v-slot:cell(actions)="data">
        <router-link tag="button" :to="{ name: 'suppliers-edit', params: { id: data.item.id.toString(), supplier: data.item } }" class="btn btn-secondary btn-sm">
          <i class="fas fa-edit"></i>
        </router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import { SuppliersService } from "@/services/NorthwindServices.js";

export default {
  data() {
    return {
      fields: ["companyName", "contactName", "contactTitle", "actions"],
      suppliers: []
    };
  },
  created() {
    SuppliersService.getAll()
      .then(r => (this.suppliers = r.data))
      .catch(error => console.error(error));
  }
};
</script>

<style lang="scss" scoped></style>
