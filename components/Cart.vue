<template>
  <v-container class="text-center">
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>

    <div v-else-if="checkedOut">
      <v-icon large color="primary">
        mdi-check-circle
      </v-icon>
      <p class="text-h3 mt-5 font-weight-bold primary--text">Ordered!</p>
    </div>

    <v-card v-else class="mx-auto" width="100%">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline text-center">
            Your Cart
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="text-md-h4 text-center" cols="12">
            Total Price: ${{ totalPrice }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-list class="transparent">
        <CartItem
          v-for="item in items"
          :key="item.id"
          :id="item.id"
          :name="item.name"
          :description="item.description"
          :price="item.price"
          :amount="item.amount"
        />
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn class="mx-auto" @click="checkout" text>
          Checkout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  emits: ['checkout'],

  data() {
    return {
      loading: false,
      checkedOut: false,
    }
  },

  computed: {
    items() {
      return this.$store.getters['cart/items']
    },

    totalPrice() {
      return this.$store.getters['cart/totalPrice'].toFixed(2)
    },
  },

  methods: {
    async checkout() {
      this.$emit('checkout')

      this.loading = true

      await this.$store.dispatch('cart/checkout')

      this.checkedOut = true
      this.loading = false

      await new Promise(resolve => setTimeout(resolve, 1000))

      this.$router.push('/')
    },
  },
}
</script>
