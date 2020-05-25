<template>
    <div id="Register">
        <h1>Register</h1>
        <h2>Please enter your username and password to register!</h2>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="register()">Register</button>
        <button type="button" v-on:click="moveToLogin()">You have an account? Get to login here!</button>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            register() {
                console.log(this.input.username + " : " + this.input.password)
            },
            moveToLogin(){
                this.$router.replace({ name: "login" });
            }
        }
    }
</script>

<style scoped>
    #register {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>