<template>
  <v-container class="mt-12">
    <UserAuthForm
      v-show="!next"
      buttonText="Next"
      :submitForm="goNextPage"
      :hasName="true"
    />
    <div v-show="next">
      <v-row justify="center">
        <v-col cols="4">
          <v-card>
            <v-form>
              <v-card-text>
                <v-spacer />
                <v-layout class="my-3">
                  <v-spacer />
                  <v-btn @click="next = false">Previos</v-btn>
                </v-layout>

                <v-card-title>Branches</v-card-title>
                <v-btn @click="addBranch">Add Branch</v-btn>
                <section v-for="(branch, i) in branches" :key="i">
                  <v-text-field
                    v-model="branch.address"
                    label="Address"
                    class="shrink"
                  />
                  <v-text-field
                    v-model="branch.phone"
                    label="Phone"
                    class="shrink"
                  />
                  <v-btn @click="removeBranch(i)">Remove</v-btn>

                  <v-layout class="my-3">
                    <v-spacer />
                    <v-btn @click="signup()">Submit</v-btn>
                  </v-layout>
                  <v-card-title
                    v-show="message != ''"
                    class="indigo lighten-2"
                    >{{ message }}</v-card-title
                  >
                </section>
              </v-card-text>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'restaurant',
  data() {
    return {
      message: '',
      next: false,
      branches: [{}],
      restaurantInfo: null,
    }
  },
  methods: {
    goNextPage(info) {
      this.restaurantInfo = info
      this.next = true
    },
    addBranch() {
      this.branches.push({})
    },
    removeBranch(i) {
      this.branches.splice(i, 1)
    },
    signup() {
      this.restaurantInfo.branches = this.branches
      this.$store
        .dispatch('auth/signup_restaurant', this.restaurantInfo)
        .then(result => {
          // this.$router.push('/')
          this.message = error.response.data.message
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
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
