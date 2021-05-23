<template>
  <v-container class="mt-12">
        <UserAuthForm buttonText="Sign Up" :submitForm="signupUser" hasName="true"/>
    </v-container>

    
</template>

<script>
    export default {
        methods: {
            signupUser(signupinfo) {
                alert('loggedin!')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>