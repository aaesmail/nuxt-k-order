<template>
  <v-container class="mt-12">
    <UserAuthForm
      buttonText="Login"
      :submitForm="loginAdmin"
      :message="message"
    />
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      message: '',
    }
  },
  methods: {
    loginAdmin(loginInfo) {
      this.$store
        .dispatch('auth/login_admin', {
          email: loginInfo.email,
          password: loginInfo.password,
        })
        .then(result => {
          this.$router.push('/admin')
        })
        .catch(error => {
          this.loading = false
          if (error.response && error.response.data) {
            this.message = error.response.data.message
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
