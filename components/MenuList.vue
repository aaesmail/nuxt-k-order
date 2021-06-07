<template>
  <v-container class="d-flex flex-column justify-center align-center">
    <h1 class="primary--text mb-5">Menu</h1>

    <MenuListItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :image="item.image"
      :description="item.description"
      :price="item.price"
    />

    <v-pagination class="mt-5" v-model="page" :length="pagesNum"></v-pagination>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],

  data() {
    return {
      page: 1,

      pagesNum: 1,

      items: [],
    }
  },

  watch: {
    page: function(newPage) {
      this.getMenuItems(newPage)
    },
  },

  methods: {
    async getMenuItems(page) {
      const response = await axios.get(
        `restaurants/${this.id}/menu-items?page=${page}&limit=10`
      )

      this.pagesNum = Math.ceil(response.data.totalSize / 10)

      this.items = response.data.menu_items.map(item => ({
        id: item._id,
        name: item.name,
        ingredients: item.ingredients,
        image: item.image,
        description: item.description,
        price: item.price,
      }))
    },
  },

  mounted() {
    this.getMenuItems(this.page)
  },
}
</script>
