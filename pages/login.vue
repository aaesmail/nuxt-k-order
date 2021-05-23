<template>
  <v-container class="mt-12">
    <UserAuthForm buttonText="Log in" :submitForm="loginUser" />
  </v-container>
</template>

<script>
export default {
  methods: {
    loginUser(loginInfo) {
      this.$store
        .dispatch('auth/login_user', {
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
