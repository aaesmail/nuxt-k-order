<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <Cart v-if="showCart" />
    <div class="d-flex flex-column align-center justify-center" v-else>
      <h1>No items in cart yet!</h1>
      <p class="mt-5">Go to restaurants and add some items!</p>
      <v-btn to="/restaurants" class="mt-5">Go!</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    data() {
      return {}
    },

    showCart() {
      return true
    },
  },
}
</script>
