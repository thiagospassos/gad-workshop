<template>
  <div>
    <h1>{{id?`Supplier #${id}`:'New Supplier'}}</h1>
    <form class="form">
      <div class="form-group">
        <label class="form-label">Company Name</label>
        <input class="form-control" type="text" id="companyNameField"
          v-model="model.companyName">
      </div>
      <div class="form-group">
        <label class="form-label">Contact Name</label>
        <input class="form-control" type="text" id="contactNameField"
           v-model="model.contactName">
      </div>
      <div class="form-group">
        <label class="form-label">Contact Title</label>
        <input class="form-control" type="text"  id="contactTitleField"
          v-model="model.contactTitle">
      </div>
    </form>
    <p>
      <router-link class="btn btn-primary" to="/suppliers">Save</router-link>
      <router-link class="btn" to="/suppliers">Cancel</router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    supplier: Object
  },
  data() {
    return {
      model: Object
    };
  },
  created() {
    this.model = this.supplier || { address: {} };
  }
};
</script>
