<template>
  <v-container class="d-flex flex-column justify-center align-center">
    <v-card class="mx-auto mb-5 text-center" width="100%">
      <v-card-text>
        <p class="title primary--text">
          {{ name }}
        </p>
        <div class="subtitle-1 font-weight-bold">
          <v-rating
            v-model="rating"
            readonly
            half-increments
            icon-label="custom icon label text {0} of {1}"
          ></v-rating>
        </div>
        <p class="body-2 primary--text">
          {{ email }}
        </p>
        <v-divider></v-divider>
        <p class="body-1 primary--text font-weight-bold">Addresses</p>
        <p
          class="body-2 primary--text"
          v-for="address in addresses"
          :key="address"
        >
          {{ address }}
        </p>
        <v-divider></v-divider>
        <p class="body-1 primary--text font-weight-bold">Phones</p>
        <p class="body-2 primary--text" v-for="phone in phones" :key="phone">
          {{ phone }}
        </p>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            :to="'/restaurants/' + id + '/review'"
            class="mx-auto"
            text
            color="deep-purple accent-4"
          >
            Add Review
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
    <MenuList :id="id" />
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      id: this.$route.params.id,
      name: '',
      rating: 0,
      email: '',
      phones: [],
      addresses: [],
    }
  },

  methods: {
    async fetchRestaurant() {
      const response = await axios.get(`restaurants/${this.$route.params.id}`)
      const restaurant = response.data.restaurant

      this.name = restaurant.name
      this.rating = restaurant.rating
      this.email = restaurant.email
      this.phones = restaurant.branches.map(branch => branch.phone)
      this.addresses = restaurant.branches.map(branch => branch.address)
    },
  },

  mounted() {
    this.fetchRestaurant()
  },
}
</script>
