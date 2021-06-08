<template>
  <v-container class="mt-12">
    <UserAuthForm
      buttonText="Sign Up"
      :submitForm="signup"
      :hasName="true"
      :branchesInput="true"
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
      next: false,
      branches: [{}],
      restaurantInfo: null,
    }
  },
  methods: {
    signup(userInfo) {
      this.$store
        .dispatch('auth/signup_restaurant', userInfo)
        .then(res => {
          console.log(res.data.message)
          this.message = res.data.message
        })
        .catch(error => {
          this.loading = false
          if (error.response && error.response.data) {
            if (error.response.data.error.code == 11000)
              this.message = 'Already Registered, please login.'
            else {
              this.message = error.response.data.message.split(':')
              this.message = this.message[this.message.length - 1]
            }
          }
          console.log(this.message)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
