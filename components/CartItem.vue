<template>
  <div
    class="d-flex mb-5 flex-column align-center flex-md-row align-md-baseline justify-space-between"
  >
    <div class="ml-5 d-inline-flex headline">{{ name }}</div>
    <div class="font-weight-bold blue--text d-inline-flex">
      ${{ itemPrice }}
    </div>
    <div class="d-inline-flex headline">{{ description }}</div>
    <NumberPicker
      :value="amount"
      @increment="addItem"
      @decrement="removeItem"
    />
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'description', 'price', 'amount'],

  methods: {
    addItem() {
      this.$store.dispatch('cart/addItem', this.id)
    },

    removeItem() {
      this.$store.dispatch('cart/removeItem', this.id)
    },
  },

  computed: {
    itemPrice() {
      return (this.price * this.amount).toFixed(2)
    },
  },
}
</script>
