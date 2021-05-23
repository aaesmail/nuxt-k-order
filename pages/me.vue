<template>
  <v-container class="d-flex flex-column justify-start">
    <v-container
      class="d-flex flex-column align-center justify-center text-center"
    >
      <h1 class="display-2">Hi, {{ name }}!</h1>
    </v-container>
    <v-container
      class="d-flex flex-column align-center justify-center text-center"
    >
      <h1 class="display-1">Address: {{ address }}</h1>
    </v-container>
    <v-container
      class="d-flex flex-column align-center justify-center text-center"
    >
      <h1 class="display-1">Phone Number: {{ phone }}</h1>
    </v-container>
    <v-container
      class="d-flex mt-15 flex-column flex-md-row align-center align-md-baseline justify-space-around text-center"
    >
      <v-btn class="mb-5 mb-md-0" to="/my-orders">My Orders</v-btn>
      <v-btn @click="changeContact">Edit Contact Info</v-btn>
    </v-container>
    <ChangeContact v-if="changingContact" @done="changeDone" />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      changingContact: false,
      name: 'Ali',
      address: '12, street 12, mokkattam, cairo, egypt',
      phone: '01231231232131',
    }
  },

  methods: {
    changeContact() {
      this.changingContact = true
    },
    changeDone() {
      this.changingContact = false
    },
  },
}
</script>
