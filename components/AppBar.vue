<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      elevation="1"
      elevate-on-scroll
      app
      height="80"
    >
      <v-tab v-if="$vuetify.breakpoint.mdAndUp" to="/" :ripple="false">
        <v-img
          :src="require('@/assets/logo.png')"
          class="ml-12"
          contain
          max-width="140"
        />
      </v-tab>
      <v-spacer />

      <div>
        <v-tabs optional background-color="transparent">
          <template v-if="$store.state.auth.user">
            <v-badge
              offset-x="30"
              offset-y="10"
              class="align-self-center"
              color="blue"
              :content="cartItemsNum"
              :value="cartItemsNum"
            >
              <v-tab
                :ripple="false"
                class="font-weight-bold"
                min-width="96"
                text
                to="/my-cart"
                ><v-icon>mdi-cart</v-icon></v-tab
              >
            </v-badge>
            <v-tab
              :ripple="false"
              class="font-weight-bold"
              min-width="96"
              text
              to="/me"
              >{{ $store.state.auth.user.name }}</v-tab
            >
            <v-tab
              :ripple="false"
              class="font-weight-bold"
              min-width="96"
              text
              @click="$store.dispatch('auth/logout_user')"
              >Logout</v-tab
            >
          </template>

          <template v-else>
            <v-tab
              v-for="(item, i) in other_items"
              :key="i"
              :to="item.route"
              :ripple="false"
              class="font-weight-bold"
              min-width="96"
              text
            >
              {{ item.title }}
            </v-tab>
          </template>
        </v-tabs>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'HomeAppBar',

  data: () => ({
    other_items: [
      { title: 'Homepage', route: '/' },
      { title: 'Log in', route: '/login' },
      { title: 'Sign up', route: '/signup' },
    ],
  }),

  computed: {
    cartItemsNum() {
      return 2
    },
  },
}
</script>

<style lang="sass">
#home-app-bar
  .v-tabs-slider
    max-width: 24px
    margin: 0 auto

  .v-tab
    &::before
      display: none
</style>
