<template>
  <v-card class="mx-auto mb-5 text-center" max-width="50%">
    <v-card-text>
      <p
        class="title"
        :class="{ 'green--text': delivered, 'red--text': !delivered }"
      >
        {{ delivered ? 'Delivered' : 'Not Delivered' }}
      </p>
      <div class="subtitle-1 font-weight-bold">{{ restaurantName }}</div>
      <div class="mt-5 d-flex flex-column flex-md-row justify-space-around">
        <p class="d-md-inline mt-4 mt-md-0">Items: {{ menu.length }}</p>
        <div class=" d-md-inlineprimary--text">$ {{ price.toFixed(2) }}</div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn :to="'my-orders/' + id" text color="deep-purple accent-4">
        Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['id', 'date', 'delivered', 'restaurant', 'menu', 'price'],

  data() {
    return {
      restaurantName: '',
    }
  },

  created() {
    // fetch restaurant name here
    this.restaurantName = 'Cook Door'
  },
}
</script>
