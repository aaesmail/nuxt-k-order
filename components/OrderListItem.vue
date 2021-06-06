<template>
  <v-card class="mx-auto mb-5 text-center" max-width="100%">
    <v-card-text>
      <p
        class="title"
        :class="{ 'green--text': delivered, 'red--text': !delivered }"
      >
        {{ delivered ? 'Delivered' : 'Not Delivered' }}
      </p>
      <div class="subtitle-1 font-weight-bold">{{ restaurantName }}</div>
      <div class="mt-5 d-flex flex-column flex-md-row justify-space-around">
        <p class="d-md-inline mt-4 mt-md-0">Items: {{ itemsLength }}</p>
        <div class=" d-md-inlineprimary--text">$ {{ price.toFixed(2) }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id', 'date', 'delivered', 'restaurant', 'menu', 'price'],

  data() {
    return {
      restaurantName: '',
    }
  },

  methods: {
    async getRestaurant() {
      const response = await axios.get(`restaurants/${this.restaurant}`)

      this.restaurantName = response.data.restaurant.name
    },
  },

  computed: {
    itemsLength() {
      return this.menu.reduce((total, item) => total + item.quantity, 0)
    },
  },

  mounted() {
    this.getRestaurant()
  },
}
</script>
