<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      elevation="1"
      elevate-on-scroll
      app
      height="80"
    >
      <v-tab v-if="$vuetify.breakpoint.mdAndUp" :ripple="false">
        <router-link to="/">
          <v-img
            :src="require('@/assets/logo.png')"
            class="ml-12"
            contain
            max-width="140"
          />
        </router-link>
      </v-tab>
      <v-spacer />

      <div>
        <v-tabs optional background-color="transparent">
          <template v-if="$store.state.auth.admin">
            <v-tab
              to="/admin"
              :ripple="false"
              class="white--text"
              min-width="96"
              text
            >
              <span class="grey darken-1"> K-Admin </span>
              &nbsp;{{ $store.state.auth.admin.name }}
            </v-tab>
            <v-tab
              v-for="(item, i) in loggedin_items"
              :key="i"
              :to="item.route"
              :ripple="false"
              class="font-weight-bold"
              min-width="96"
              text
            >
              {{ item.title }}
            </v-tab>
            <v-tab
              :ripple="false"
              class="font-weight-bold"
              min-width="96"
              text
              @click="logout"
              >Logout</v-tab
            >
          </template>
          <template v-else>
            <v-tab
              to="/admin"
              :ripple="false"
              class="white--text"
              min-width="96"
              text
            >
              <span class="grey darken-1"> K-Admin </span>
            </v-tab>
            <v-tab
              v-for="(item, i) in loggedout_items"
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
  name: 'AdminAppBar',

  data: () => ({
    loggedin_items: [
      { title: 'Pending Restaurants', route: '/admin/pending-restaurants' },
      { title: 'Active Restaurants', route: '/admin/active-restaurants' },
    ],
    loggedout_items: [{ title: 'Login', route: '/admin/login' }],
  }),
  methods: {
    logout() {
      this.$router.push('/admin')
      this.$store.dispatch('auth/logout_admin')
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
