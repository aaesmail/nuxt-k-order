<template>
  <v-app dark>
    <v-app-bar app>
      <v-app-bar-title>K-Order!</v-app-bar-title>
      <v-spacer />
      <div v-if="$auth.loggedIn">
        {{ $auth.user.email }}
        <v-btn text to="/logout">Logout</v-btn>
      </div>

      <div v-else>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/login">Sign up</v-btn>
      </div>


    </v-app-bar>
    <nuxt />
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
    }
  },
}
</script>
