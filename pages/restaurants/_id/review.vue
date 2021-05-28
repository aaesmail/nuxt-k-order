<template>
  <v-container>
    <v-textarea
      v-model="details"
      filled
      label="Write your review here!"
      rows="5"
      auto-grow
    ></v-textarea>

    <div class="subtitle-1 font-weight-bold mb-5">
      <v-rating
        v-model="rating"
        half-increments
        icon-label="custom icon label text {0} of {1}"
      ></v-rating>
    </div>

    <v-btn :disabled="!valid" color="success" @click="submit">
      Submit Review
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      details: '',
      rating: 2.5,
    }
  },

  computed: {
    valid() {
      return this.details
    },
  },

  methods: {
    submit() {
      const requestBody = {
        restaurantId: this.$route.params.id,
        rate: this.rating,
        details: this.details,
      }

      // submit request here

      this.$router.push('/restaurants/' + this.$route.params.id)
    },
  },
}
</script>
