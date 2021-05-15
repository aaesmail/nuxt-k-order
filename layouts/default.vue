<template>
  <v-app dark>
    <v-app-bar app>
      <v-app-bar-title>K-Order!</v-app-bar-title>
      <v-spacer />
      <template v-if="$store.state.auth.user">
        <v-card-subtitle v-if="$store.state.auth.admin"> admin logged: {{$store.state.auth.admin.name}} </v-card-subtitle>
        <v-btn text to="/">{{$store.state.auth.user.name}}</v-btn>
        <v-btn text @click="$store.dispatch('auth/logout_user')">Logout</v-btn>
      </template>

      <template v-else>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/signup">Sign up</v-btn>
      </template> 
    </v-app-bar>
    
    <v-main>
      <nuxt />
    </v-main>

    <v-footer app>
      <span>Copyright &copy; {{ new Date().getFullYear() }} K-Order</span>
    </v-footer>
  </v-app>
</template

<script>
export default {
  data() {
    return {
    }
  },
}
</script>
