<template>
  <v-row justify="center">
    <v-col cols="12" md="4" sm="6">
      <v-card>
        <v-form v-model="valid">
          <v-card-text>
            <v-text-field
              v-model="userInfo.name"
              class="shrink"
              label="Name"
              :rules="[required('name')]"
              v-if="hasName"
            />

            <v-text-field
              v-model="userInfo.email"
              label="Email"
              :rules="[required('email'), emailFormat()]"
            />

            <v-text-field
              v-model="userInfo.password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              counter="true"
              :rules="[required('password'), minLength('password', 8)]"
            />
            <v-text-field
              v-for="field in extraFields"
              :key="field.label"
              v-model="userInfo[field.label.toLowerCase()]"
              :label="field.label"
              :rules="field.rules"
            />

            <section v-if="branchesInput">
              <!-- Adding Branches -->
              <v-col cols="12" sm="6" md="6">
                <v-btn
                  class="ma-2"
                  outlined
                  x-small
                  fab
                  color="red"
                  :disabled="branchesCount < 1"
                  @click="branchesCount -= 1"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                {{ branchesCount }} Branches
                <v-btn
                  class="ma-2"
                  outlined
                  x-small
                  fab
                  color="green"
                  @click="branchesCount += 1"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>

              <v-row v-for="(i, idx) in userInfo.branches" :key="idx">
                <v-col cols="12" sm="7" md="7">
                  <v-text-field
                    :label="`Branch ${idx + 1} Address`"
                    v-model="userInfo.branches[idx].address"
                    :rules="[required(`branch ${idx + 1} address`)]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="5" md="5">
                  <v-text-field
                    :label="`Branch ${idx + 1} Phone`"
                    v-model="userInfo.branches[idx].phone"
                    :rules="[
                      required(`branch ${idx + 1} phone`),
                      phoneFormat(),
                    ]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </section>
            <!--  -->
            <v-layout class="my-3">
              <v-spacer />
              <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{
                buttonText
              }}</v-btn>
            </v-layout>

            <!-- <v-card-title v-if="message != ''" class="indigo lighten-2">{{
              
            }}</v-card-title> -->
          </v-card-text>
        </v-form>
      </v-card>
      <v-snackbar
        :timeout="-1"
        :value="true"
        absolute
        top
        color="deep-purple accent-4"
        elevation="24"
        v-if="message != ''"
      >
        {{ message }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
import validations from '@/utils/validations'
export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        email: '',
        password: '',
      },
      branchesCount: 0,
      ...validations,
    }
  },
  props: {
    submitForm: Function,
    buttonText: String,
    hasName: Boolean,
    extraFields: {
      type: Array,
      default: () => [],
    },
    message: {
      type: String,
      default: '',
    },
    branchesInput: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    branchesCount(newValue, oldValue) {
      if (newValue < 0) return
      const difference = newValue - oldValue
      if (!this.userInfo.branches) this.userInfo.branches = []
      if (difference > 0)
        while (this.userInfo.branches.length < newValue)
          this.userInfo.branches.push({})
      else this.userInfo.branches = this.userInfo.branches.slice(0, newValue)
    },
  },
}
</script>

<style lang="scss" scoped></style>
