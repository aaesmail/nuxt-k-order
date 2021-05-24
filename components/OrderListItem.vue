<template>
  <v-card class="mx-auto mb-5 text-center" max-width="50%">
    <v-card-text>
      <p
        class="display-1"
        :class="{ 'green--text': delivered, 'red--text': !delivered }"
      >
        {{ delivered ? 'Delivered' : 'Not Delivered' }}
      </p>
      <div>{{ restaurantName }}</div>
      <p>Items: {{ menu.length }}</p>
      <div class="primary--text">$ {{ price.toFixed(2) }}</div>
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
