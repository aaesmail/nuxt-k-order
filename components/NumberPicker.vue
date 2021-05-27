<template>
  <div class="d-inline-flex align-center">
    <v-btn @click="decrement" :disabled="value === 0" icon color="red">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <p>{{ value }}</p>
    <v-btn @click="increment" icon color="green">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ['value'],

  emits: ['increment', 'decrement'],

  methods: {
    increment() {
      this.$emit('increment')
    },
    decrement() {
      this.$emit('decrement')
    },
  },
}
</script>

<style scoped>
p {
  width: 20px;
  height: 10px;
  text-align: center;
}
</style>
