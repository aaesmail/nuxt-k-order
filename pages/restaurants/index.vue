<template>
  <v-container class="d-flex flex-column text-center">
    <h1 class="mb-5">All Restaurants</h1>

    <RestaurantListItem
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :id="restaurant.id"
      :name="restaurant.name"
      :rating="restaurant.rating"
    />

    <v-pagination v-model="page" :length="pagesNum"></v-pagination>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      page: 1,
      pagesNum: 1,

      restaurants: [],
    }
  },

  watch: {
    page: function(newPage) {
      this.getRestaurants(newPage)
    },
  },

  methods: {
    async getRestaurants(page) {
      const response = await axios.get(`restaurants?page=${page}&limit=10`)
      const totalRestaurants = response.data.totalSize
      this.pagesNum = Math.ceil(totalRestaurants / 10)
      this.restaurants = response.data.restaurants.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        rating: restaurant.rating,
      }))
    },
  },

  mounted() {
    this.getRestaurants(this.page)
  },
}
</script>
