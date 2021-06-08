<template>
  <v-container class="ma-12">
    <v-alert
      prominent
      v-for="(review, idx) in reviews"
      :key="idx"
      :type="review.rate > 2 ? 'success' : 'error'"
      :color="review.rate > 2 ? '' : 'pink darken-1'"
    >
      <v-card-text>
        <v-row align="center">
          <v-col class="grow">
            <v-card-title> {{ review.details }} </v-card-title>
          </v-col>

          <v-col>
            <v-card-title class="text-right">
              <v-spacer></v-spacer>{{ review.rate }} ⭐</v-card-title
            >
          </v-col>

          <!-- <v-col class="shrink"> -->
          <!-- <v-btn outlined>Contact User</v-btn> -->
          <!-- </v-col> -->
        </v-row>
      </v-card-text>
    </v-alert>
  </v-container>
</template>

<script>
import restaurant from '~/api/restaurant'

export default {
  layout: 'restaurant',
  middleware: 'login_restaurant_only',

  data() {
    return {
      reviews: [],
    }
  },
  created() {
    this.initialize()
    setInterval(this.initialize, 1000 * 60 * 5)
  },
  methods: {
    initialize() {
      restaurant
        .get_reviews(localStorage.getItem('restaurant-token'))
        .then(res => {
          this.reviews = res.data.reviews
          console.log(this.reviews)
        })
        .catch(error => console.log(error))
    },
  },
}
</script>

<style lang="scss" scoped></style>
