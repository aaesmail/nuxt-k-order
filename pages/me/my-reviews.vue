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
export default {
  data() {
    return {
      page: 1,
      reviews: [
        {
          id: '60a95b77ad298392c09bb116',
          restaurant: '609ffe1de1136dc606c44d83',
          rate: 5,
          details: 'Your meals are great',
        },
        {
          id: '60a95b77ad29839Ac09bb116',
          restaurant: '609ffe1de1136dc606c44d83',
          rate: 3,
          details: 'Your meals are great',
        },
      ],
    }
  },

  computed: {
    showReviews() {
      return this.reviews.length > 0
    },

    pagesNum() {
      return 8
    },
  },
}
</script>
