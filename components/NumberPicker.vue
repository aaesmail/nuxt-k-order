<template>
  <div class="d-inline-flex align-center">
    <v-btn @click="decrement" :disabled="amount === 0" icon color="red">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <p>{{ amount }}</p>
    <v-btn @click="increment" icon color="green">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ['value'],

  emits: ['input'],

  data() {
    return {
      amount: this.value,
    }
  },

  methods: {
    increment() {
      this.amount++
      this.$emit('input', this.amount)
    },
    decrement() {
      if (this.amount > 0) this.amount--
      this.$emit('input', this.amount)
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
