<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <slot>
      <input
        v-bind:id="id"
        :type="type"
        class="form-control"
        v-model.trim="validationModel.$model"
        :class="{ 'is-invalid': validationModel.$error }"
      />
    </slot>
    <invalid-feedback
      :field="label"
      :model="validationModel"
    ></invalid-feedback>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    id: Number,
    label: String,
    validationModel: Object,
    type: {
      type: String,
      default: "text",
    },
  },
};
</script>
