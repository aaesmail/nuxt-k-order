<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="80%">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title
      ><nuxt-link :to="'/restaurants/' + restaurant">{{
        restaurantName
      }}</nuxt-link></v-card-title
    >

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
        :class="{ 'green--text': delivered, 'red--text': !delivered }"
      >
        {{ delivered ? 'Delivered' : 'Not Delivered' }}
      </v-row>

      <div class="my-4 subtitle-1">$ {{ totalPrice.toFixed(2) }}</div>

      <div>Order Time: {{ formatedDate }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Menu Items ({{ menuItems.length }})</v-card-title>

    <v-list three-line>
      <MenuItem
        v-for="item in menuItems"
        :key="item.id"
        :name="item.name"
        :quantity="item.quantity"
        :ingredients="item.ingredients"
        :description="item.description"
        :price="item.price"
      />
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      date: '2021-05-23T16:22:13.760Z',
      delivered: true,
      restaurant: '609ffe1de1136dc606c44d83',
      restaurantName: 'Cook Door',
      menuItems: [
        {
          quantity: 4,
          id: '60a00df1687756dd400b69ef',
          ingredients: ['chicken', 'sauce'],
          name: 'New Flavour',
          description: 'Tasty Chicken with new Flavour',
          price: 80,
        },
        {
          quantity: 2,
          id: '60aa71a176b1dcf302a8b34a',
          ingredients: ['chicken', 'sauce'],
          name: 'New Flavour',
          description: 'Tasty Chicken with new Flavour',
          price: 80,
        },
        {
          quantity: 1,
          id: '60aa71df7kb1dcf30da8b34b',
          ingredients: ['chicken', 'sauce'],
          name: 'New Flavour',
          description: 'Tasty Chicken with new Flavour',
          price: 80,
        },
      ],
      totalPrice: 365,
    }
  },

  computed: {
    formatedDate() {
      return new Date(this.date).toLocaleString()
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
