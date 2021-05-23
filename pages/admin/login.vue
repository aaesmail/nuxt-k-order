<template>
  <v-container>
    <h1>Login</h1>
    <UserAuthForm buttonText="Login" :submitForm="loginAdmin" />
  </v-container>
</template>

<script>
export default {
  methods: {
    loginAdmin(loginInfo) {
      this.$store
        .dispatch('auth/login_admin', {
          email: loginInfo.email,
          password: loginInfo.password,
        })
        .then(result => {
          this.$router.push('/')
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
