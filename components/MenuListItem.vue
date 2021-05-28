<template>
  <v-card class="mx-auto mb-5" width="100%" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          {{ name }}
        </div>
        <v-list-item-title class="headline mb-1">
          {{ description }}
        </v-list-item-title>
        <v-list-item-subtitle
          >Price: ${{ price.toFixed(2) }}</v-list-item-subtitle
        >
      </v-list-item-content>

      <v-list-item-avatar rounded="5" size="80" color="grey">
        <v-img alt="Menu Item Image" :src="image"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <NumberPicker
        :value="amount"
        @increment="increment"
        @decrement="decrement"
      />
      <v-btn
        @click="addToCart"
        :disabled="amount === 0"
        class="ml-5"
        outlined
        rounded
        text
      >
        Add to cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['id', 'name', 'image', 'description', 'price'],

  data() {
    return {
      amount: 1,
    }
  },

  methods: {
    increment() {
      this.amount++
    },
    decrement() {
      this.amount--
    },

    addToCart() {
      this.$store.dispatch('cart/addNewItem', {
        id: this.id,
        amount: this.amount,
        name: this.name,
        description: this.description,
        price: this.price,
      })
    },
  },
}
</script>
