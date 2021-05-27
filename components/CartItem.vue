<template>
  <div
    class="d-flex mb-5 flex-column align-center flex-md-row align-md-baseline justify-space-between"
  >
    <div class="ml-5 d-inline-flex headline">{{ name }}</div>
    <div class="font-weight-bold blue--text d-inline-flex">
      ${{ itemPrice }}
    </div>
    <div class="d-inline-flex headline">{{ description }}</div>
    <NumberPicker :value="value" @input="amountChanged" />
  </div>
</template>

<script>
export default {
  props: ['name', 'description', 'price', 'value'],

  emits: ['input'],

  data() {
    return {
      itemAmount: this.value,
    }
  },

  methods: {
    amountChanged(amount) {
      this.itemAmount = amount
      this.$emit('value', amount)
    },
  },

  computed: {
    itemPrice() {
      return this.price * this.itemAmount
    },
  },
}
</script>
