<template>
  <v-card
    :to="'/restaurants/' + id"
    class="mx-auto mb-5 text-center"
    width="100%"
  >
    <v-card-text>
      <p class="title primary--text">
        {{ name }}
      </p>
      <div class="subtitle-1 font-weight-bold">
        <v-rating
          v-model="rating"
          readonly
          half-increments
          icon-label="custom icon label text {0} of {1}"
        ></v-rating>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['id', 'name', 'rating'],
}
</script>
