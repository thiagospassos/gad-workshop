<template>
  <button @click="increase()" @contextmenu.prevent="counter--" :class="{ positive: positive }"></button>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    increase() {
      this.counter++;
    }
  },
  computed: {
    positive() {
      return this.counter > 0;
    }
  }
};
</script>

<style lang="scss" scoped></style>
