<template>
    <v-container>
        <h1>Login</h1>

        <UserAuthForm buttonText="Login" :submitForm="loginUser" />
    </v-container>

    
</template>

<script>
    export default {
        methods: {
            loginUser(loginInfo) {
                // this.$auth.loginWith('local', {
                //     data: loginInfo
                // })
                //  alert('loggedin!')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>