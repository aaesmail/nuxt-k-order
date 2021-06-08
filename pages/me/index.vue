<template>
  <v-container class="d-flex flex-column justify-start">
    <v-container
      class="d-flex flex-column align-center justify-center text-center"
    >
      <h1 class="display-2">Hi, {{ name }}!</h1>
    </v-container>
    <v-container
      v-if="address"
      class="d-flex flex-column align-center justify-center text-center"
    >
      <h1 class="display-1">Address: {{ address }}</h1>
    </v-container>
    <v-container
      v-if="phone"
      class="d-flex flex-column align-center justify-center text-center"
    >
      <h1 class="display-1">Phone Number: {{ phone }}</h1>
    </v-container>
    <v-container
      class="d-flex mt-15 flex-column flex-md-row align-center align-md-baseline justify-space-around text-center"
    >
      <v-btn class="mb-5 mb-md-0" to="/me/my-orders">My Orders</v-btn>
      <v-btn class="mb-5 mb-md-0" to="/me/my-reviews">My Reviews</v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  middleware: 'login_user_only',
  data() {
    return {
      name: '',
      address: '',
      phone: '',
    }
  },

  mounted() {
    const user = this.$store.state.auth.user
    this.name = user.name
    this.address = user.address
    this.phone = user.phone
  },
}
</script>
