<template>
  <v-container class="mt-12">
    <UserAuthForm
      buttonText="Sign Up"
      :submitForm="signupUser"
      :hasName="true"
      :extraFields="extraFormFields"
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
          this.loading = false
          if (error.response && error.response.data) {
            // todo
          }
        })
    },
  },
  data() {
    return {
      ...validations,
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
