<template>
  <div>
    <button
      @click="increase()"
      @contextmenu.prevent="decrease()"
      :class="{ positive: counter > 0, negative: counter < 0 }"
    >
      {{ counter }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    },
  },
};
</script>

<style scoped>
.positive {
  background-color: blue;
}
.negative {
  background-color: red;
}
</style>
