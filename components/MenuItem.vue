<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title v-html="title"></v-list-item-title>
      <v-list-item-subtitle v-html="description"></v-list-item-subtitle>
      <v-card-text>
        <v-chip-group column>
          <v-chip v-for="ing in ingredients" :key="ing">{{ ing }}</v-chip>
        </v-chip-group>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: ['name', 'quantity', 'ingredients', 'description', 'price'],

  computed: {
    title() {
      return (
        this.quantity +
        ' ' +
        this.name +
        ': ' +
        ' $' +
        (this.price * this.quantity).toFixed(2)
      )
    },
  },
}
</script>
