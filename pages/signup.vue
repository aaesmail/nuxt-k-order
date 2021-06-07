<template>
  <v-container class="mt-12">
    <UserAuthForm
      buttonText="Sign Up"
      :submitForm="signupUser"
      :hasName="true"
      :extraFields="extraFormFields"
      :message="message"
    />
  </v-container>
</template>

<script>
import validations from '@/utils/validations'

export default {
  methods: {
    signupUser(signupinfo) {
      this.$store
        .dispatch('auth/signup_user', signupinfo)
        .then(result => {
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error.response.data)
          this.loading = false
          if (error.response && error.response.data) {
            if (error.response.data.error.code == 11000)
              this.message = 'Already Registered, please login.'
            else {
              this.message = error.response.data.message.split(':')
              this.message = this.message[this.message.length - 1]
            }
          }
        })
    },
  },
  data() {
    return {
      ...validations,
      message: '',
    }
  },
  computed: {
    extraFormFields() {
      return [
        {
          label: 'Phone',
          rules: [this.required('phone'), this.phoneFormat()],
        },
        {
          label: 'Address',
          rules: [this.required('address')],
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped></style>
