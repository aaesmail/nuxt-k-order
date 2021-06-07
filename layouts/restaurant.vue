<template>
  <v-app dark>
    <RestaurantAppBar />
    <v-main>
      <nuxt />
    </v-main>

    <v-footer>
      <span>Copyright &copy; {{ new Date().getFullYear() }} K-Order</span>
    </v-footer>
  </v-app>
</template

<script>
export default {
  data() {
    return {
    }
  },
}
</script>

<style>
html {
  overflow: auto;
}
</style>
