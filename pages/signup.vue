<template>
    <v-container>
        <h1>Login</h1>

        <UserAuthForm buttonText="Sign Up" :submitForm="loginUser" hasName="true"/>
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