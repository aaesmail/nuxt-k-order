<template>
  <v-container class="mt-12">
    <UserAuthForm
      buttonText="Login"
      :submitForm="loginRestaurant"
      :message="message"
    />
  </v-container>
</template>

<script>
export default {
  layout: 'restaurant',
  middleware: 'not_login_restaurant_only',

  data() {
    return {
      message: '',
    }
  },
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
