<template>
  <v-row justify="center">
    <v-col
      cols="4"
    >
  
  <v-card>
  <v-form v-model="valid">
    <v-card-text>
    <v-text-field v-model="userInfo.name"
                  class="shrink" 
                  label="Name" 
                  :rules="[required('name')]"
                  v-if="hasName" />

    <v-text-field v-model="userInfo.email" 
                  label="Email" 
                  :rules="[required('email'), emailFormat()]"/>

    <v-text-field v-model="userInfo.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'" 
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  counter=true
                  :rules="[required('password'), minLength('password', 8)]"
                  />
      <v-text-field  v-for="field in extraFields" :key="field.label" v-model="userInfo[field.label.toLowerCase()]"
                  :label="field.label" 
                  :rules="field.rules"/>
    <v-layout class="my-3">
      <v-spacer />
    <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
    </v-layout>
    </v-card-text>
  </v-form>
  </v-card>
  </v-col>
  </v-row>
</template>

<script>
  import validations from "@/utils/validations";
  export default {
    data() {
      return { 
        valid: false,
        showPassword: false,
        userInfo: {
          email: '',
          password: ''
        },
        ...validations
      }
    },
    props: {
      submitForm: Function,
      buttonText: String,
      hasName: Boolean,
      extraFields: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
