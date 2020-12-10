<template>
  <div v-if="model">
    <div class="form-group">
      <label class="form-label">Street</label>
      <input
        class="form-control"
        type="text"
        id="streetField"
        v-model="model.street"
      />
    </div>
    <div class="form-group">
      <label class="form-label">City</label>
      <input
        class="form-control"
        type="text"
        id="cityField"
        v-model="model.city"
      />
    </div>
    <div class="form-group">
      <label class="form-label">Region</label>
      <input
        class="form-control"
        type="text"
        id="regionField"
        v-model="model.region"
      />
    </div>
    <div class="form-group">
      <label class="form-label">Postal Code</label>
      <input
        class="form-control"
        type="text"
        id="postalCodeField"
        v-model="model.postalCode"
      />
    </div>
    <div class="form-group">
      <label class="form-label">Country</label>
      <input
        class="form-control"
        type="text"
        id="countryField"
        v-model="model.country"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: Object,
  },
  data() {
    return {
      model: Object,
    };
  },
  watch: {
    address(val) {
      this.model = val;
    },
  },
  created() {
    this.model = this.address;
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
