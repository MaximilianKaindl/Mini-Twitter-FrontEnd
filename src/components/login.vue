<template>
    <div id="login">
        <h1>Login</h1>
            <input type="text" name="usernameInput" v-model="input.usernameInput" placeholder="Username" />
            <input type="password" name="passwordInput" v-model="input.passwordInput" placeholder="Password" />
            <button v-on:click="login()">Login</button>
            <button ariant="danger" v-on:click="moveToRegister()">No account? Get to registration here!</button>
        </div>
</template>

<script>
    import gql from "graphql-tag"
    import constants from '../constants'

    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    usernameInput: "",
                    passwordInput: ""
                }
            }
        },
        methods: {
            async login() {
                if(this.input.usernameInput != "" && this.input.passwordInput != "") {
                    const result = await this.$apollo.mutate({
                    mutation: gql`mutation($password:String!,$username:String!){
                            auth (password: $password, username:$username) {
                                ok
                                accessToken
                            }
                        }`,
                        variables: {
                            password: this.input.passwordInput,
                            username : this.input.usernameInput
                        },
                    })
                    if(result.data.auth.ok){
                        localStorage.setItem(constants.token,result.data.auth.accessToken)
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    }                        
                    else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            },
            moveToRegister(){
                 this.$router.replace({ name: "register" });
            }

        }
    }
</script>

<style scoped>
    login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>