<template>
    <b-card
    title="Register"
    bg-variant="default"
    >
        <b-row>
            <b-col>
                <b-input type="text" name="username" v-model="input.username" placeholder="Username" />
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-input type="password" name="password" v-model="input.password" placeholder="Password" />
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="register()">Register</b-button>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="outline-primary" v-on:click="moveToLogin()">Move to Login</b-button>
            </b-col>
        </b-row>  
    </b-card>          
</template>

<script>
    import gql from 'graphql-tag'
    import constants from '../constants'

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
            async register() {
                const result = await this.$apollo.mutate({
                    mutation: gql`mutation($password:String!,$username:String!){
                        register (password: $password, username:$username) {
                            ok
                            accessToken
                        }
                    }`,
                    variables: {
                        password: this.input.password,
                        username : this.input.username
                    },
                })
                if(result.data.register.ok){
                        localStorage.setItem(constants.token,result.data.register.accessToken)
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                }     
                else {
                        console.log("Not ok");
                }
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