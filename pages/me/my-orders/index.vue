<template>
  <v-container>
    <v-container v-if="showOrders">
      <OrderListItem
        v-for="order in orders"
        :key="order.id"
        :id="order.id"
        :date="order.date"
        :delivered="order.delivered"
        :restaurant="order.restaurant"
        :menu="order.menuItems"
        :price="order.totalPrice"
      />
      <v-pagination v-model="page" :length="pagesNum"></v-pagination>
    </v-container>

    <h1 v-else class="text-center primary--text">No Orders Yet!</h1>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'login_user_only',
  data() {
    return {
      page: 1,
      pagesNum: 1,
      orders: [
        {
          date: '2021-05-23T16:22:13.760Z',
          delivered: true,
          restaurant: '609ffe1de1136dc606c44d83',
          menuItems: [
            {
              quantity: 4,
              menuItem: '60a00df1687756dd400b69ef',
            },
            {
              quantity: 2,
              menuItem: '60aa71a176b1dcf30da8b34a',
            },
            {
              quantity: 1,
              menuItem: '60aa71df76b1dcf30da8b34b',
            },
          ],
          totalPrice: 365,
          id: '60aa81386ba3fafde998545c',
        },
        {
          date: '2021-05-23T16:22:13.760Z',
          delivered: false,
          restaurant: '609ffe1de1136dc606c44d83',
          menuItems: [
            {
              quantity: 10,
              menuItem: '60a00df1687756dd400b69ef',
            },
          ],
          totalPrice: 550,
          id: '60aa81fe6ba3fafde998545d',
        },
      ],
    }
  },

  watch: {
    page: function(newPage) {
      this.getOrders(newPage)
    },
  },

  computed: {
    showOrders() {
      return this.orders.length > 0
    },
  },

  methods: {
    async getOrders(page) {
      const response = await axios.get(`users/me/orders?page=${page}&limit=10`)

      this.pagesNum = Math.ceil(response.data.totalSize / 10)

      this.orders = response.data.orders.map(order => ({
        date: order.date,
        delivered: order.delivered,
        restaurant: order.restaurant,
        menuItems: order.menuItems,
        totalPrice: order.totalPrice,
        id: order.id,
      }))
    },
  },

  created() {
    this.getOrders(this.page)
  },
}
</script>
