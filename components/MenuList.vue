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
export default {
  props: ['id'],

  data() {
    return {
      page: 1,

      items: [
        {
          id: '60a00d8f687756dd400b69ee',
          name: 'Chicken Spicy',
          ingredients: ['chicken', 'sauce'],
          image: 'http://someimageurl',
          description: 'Tasty Chicken with sauce',
          price: 33.7,
        },
        {
          id: '60a00df1687756dd401b69ef',
          ingredients: ['chicken', 'sauce'],
          name: 'Chicken Spicy',
          image: 'http://someimageurl',
          description: 'Tasty Chicken with sauce',
          price: 76.2,
        },
        {
          id: '60E017ee8c05c7f0b547c6a9',
          ingredients: ['chicken', 'sauce'],
          name: 'Chicken',
          image: 'http://someimageurl',
          description: 'Tasty Chicken',
          price: 100,
        },
        {
          id: '60a019138c05cKf0b547c6aa',
          ingredients: ['chicken', 'sauce'],
          name: 'Chicken Spicy',
          image: 'http://someimageurl',
          description: 'Tasty Chicken with sauce',
          price: 55,
        },
      ],
    }
  },

  computed: {
    pagesNum() {
      return 5
    },
  },
}
</script>
