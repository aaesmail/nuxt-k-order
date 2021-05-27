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
          icon-label="custom icon label text {0} of {1}"
        ></v-rating>
      </div>
      <p class="mt-5">{{ details }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['restaurant', 'rate', 'details'],

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
