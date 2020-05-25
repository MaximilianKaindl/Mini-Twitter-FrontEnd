<template>
    <b-card
    title="Login"
    bg-variant="default"
    >
        <b-row>
            <b-col>
                <b-input type="text" name="usernameInput" v-model="input.usernameInput" placeholder="Username" />
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-input type="password" name="passwordInput" v-model="input.passwordInput" placeholder="Password" />
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="login()">Login</b-button>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="outline-primary" v-on:click="moveToRegister()">Registrieren</b-button>
            </b-col>
        </b-row>  
    </b-card>          
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

</style>