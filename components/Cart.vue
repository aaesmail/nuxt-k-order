<template>
  <v-card class="mx-auto" width="100%">
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
          Total Price: ${{ totalPrice.toFixed(2) }}
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-list class="transparent">
      <CartItem
        v-for="item in items"
        :key="item.id"
        :name="item.name"
        :price="item.price"
        :description="item.description"
        v-model="item.amount"
      />
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn class="mx-auto" @click="checkout" text>
        Checkout
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Burger',
          description: 'A tasty burger!',
          amount: 1,
          price: 20,
        },
        {
          id: 2,
          name: 'Burger',
          description: 'A tasty burger!',
          amount: 3,
          price: 20,
        },
        {
          id: 3,
          name: 'Burger',
          description: 'A tasty burger!',
          amount: 2,
          price: 20,
        },
      ],
    }
  },

  computed: {
    totalPrice() {
      return this.items.reduce(
        (accumulatedPrice, item) => item.price * item.amount + accumulatedPrice,
        0
      )
    },
  },

  methods: {
    checkout() {
      this.$router.push('/')
    },

    changeAmount(id, amount) {},
  },
}
</script>
