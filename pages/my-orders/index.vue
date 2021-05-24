<template>
  <v-container>
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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
}
</script>
