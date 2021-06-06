<template>
  <v-card class="mx-auto mb-5 text-center" max-width="100%">
    <v-card-text>
      <p class="title primary--text font-weight-bold">
        {{ restaurantName }}
      </p>
      <div class="subtitle-1 font-weight-bold">
        <v-rating
          v-model="rate"
          readonly
          half-increments
          icon-label="custom icon label text {0} of {1}"
        ></v-rating>
      </div>
      <p class="mt-5">{{ details }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  props: ['restaurant', 'rate', 'details'],

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

  mounted() {
    this.getRestaurant()
  },
}
</script>
