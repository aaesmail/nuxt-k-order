<template>
  <v-container>
    <h1>Login</h1>
    <UserAuthForm buttonText="Login" :submitForm="loginRestaurant" />
  </v-container>
</template>

<script>
export default {
  layout: 'restaurant',
  methods: {
    loginRestaurant(loginInfo) {
      this.$store
        .dispatch('auth/login_restaurant', {
          email: loginInfo.email,
          password: loginInfo.password,
        })
        .then(result => {
          this.$router.push('/restaurant')
        })
        .catch(error => {
          this.loading = false
          if (error.response && error.response.data) {
            // todo
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
