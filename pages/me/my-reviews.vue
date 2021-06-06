<template>
  <v-container>
    <v-container v-if="showReviews">
      <h1 class="text-center mb-5 primary--text">My Reviews</h1>
      <ReviewListItem
        v-for="review in reviews"
        :key="review.id"
        :restaurant="review.restaurant"
        :rate="review.rate"
        :details="review.details"
      />
      <v-pagination v-model="page" :length="pagesNum"></v-pagination>
    </v-container>

    <h1 v-else class="text-center primary--text">No Reviews Yet!</h1>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      page: 1,
      pagesNum: 1,
      reviews: [],
    }
  },

  computed: {
    showReviews() {
      return this.reviews.length > 0
    },
  },

  watch: {
    page: function(newPage) {
      this.getReviews(newPage)
    },
  },

  methods: {
    async getReviews(page) {
      const response = await axios.get(`users/me/reviews?page=${page}&limit=10`)

      this.pagesNum = Math.ceil(response.data.totalSize / 10)

      this.reviews = response.data.reviews.map(review => ({
        id: review._id,
        restaurant: review.restaurant,
        rate: review.rate,
        details: review.details,
      }))
    },
  },

  mounted() {
    this.getReviews(this.page)
  },
}
</script>
