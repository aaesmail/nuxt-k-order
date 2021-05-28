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
          <template v-if="$store.state.auth.admin">
            <v-tab
              :ripple="false"
              class="font-weight-bold"
              min-width="96"
              text
              >{{ $store.state.auth.admin.name }}</v-tab
            >
            <v-tab
              :ripple="false"
              class="font-weight-bold"
              min-width="96"
              text
              @click="logout"
              >Logout</v-tab
            >
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
      { title: 'Pending Resaurants', route: '/admin/pending-restaurants' },
      { title: 'Active Restaurants', route: '/admin/active-restaurants' },
    ],
  }),
  methods: {
    logout() {
      this.$router.push('/')
      this.$store.dispatch('auth/logout_admin')
    }
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
