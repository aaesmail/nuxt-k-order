<template>
  <v-container>
    <h1>Login</h1>
    <UserAuthForm
      buttonText="Login"
      :submitForm="loginRestaurant"
      :message="message"
    />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    }
  },
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
          if (error.response && error.response.data)
            this.message = error.response.data.message
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
