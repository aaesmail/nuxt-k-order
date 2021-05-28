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
export default {
  data() {
    return {
      page: 1,

      restaurants: [
        {
          id: '609f16ee5248a8788cadc171',
          name: 'KFC-',
          rating: 3,
        },
        {
          id: '609ffe1de1136dc606c44d83',
          name: 'KFC',
          rating: 4.5,
        },
      ],
    }
  },

  computed: {
    pagesNum() {
      return 4
    },
  },
}
</script>
