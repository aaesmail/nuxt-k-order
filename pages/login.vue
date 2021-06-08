<template>
  <v-container class="mt-12">
    <UserAuthForm
      buttonText="Log in"
      :submitForm="loginUser"
      :message="message"
    />
  </v-container>
</template>

<script>
export default {
  middleware: 'not_login_user_only',
  data() {
    return {
      message: '',
    }
  },
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
          if (error.response && error.response.data)
            this.message = error.response.data.message
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
