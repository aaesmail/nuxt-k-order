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
        icon-label="custom icon label text {0} of {1}"
      ></v-rating>
    </div>

    <v-btn :disabled="!valid" color="success" @click="submit">
      Submit Review
    </v-btn>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'login_user_only',
  data() {
    return {
      details: '',
      rating: 3,
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

      axios.post('users/me/reviews', requestBody)

      this.$router.push('/restaurants/' + this.$route.params.id)
    },
  },
}
</script>
