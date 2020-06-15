<template>
    <div>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="primary">
                <b-navbar-brand href="#">NavBar</b-navbar-brand>

                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item @click="moveToHome()">Home</b-nav-item>
                    <b-nav-item class="nav item active">Search User</b-nav-item>
                    <b-nav-item @click="moveToSettings()">Settings</b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div> 
        
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="searchUser()">Search</b-button>
            </b-col>
        </b-row> 

        <div v-for="user in users" :key="user.username">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{user.username}}</h5>
                    <b-button v-on:click="subscribeUser(user.username)">Follow</b-button>
                </div>
            </div>
        </div>
    </div>         
</template>

<script>
    import gql from 'graphql-tag'
    import constants from '../constants'

    export default {
        name: 'SearchUser',
        data() {
            return {
                input: {
                    username: ""
                },
                users: []               
            };
        },
         methods: {
            async searchUser() {
                const token = localStorage.getItem(constants.token);
                const result = await this.$apollo.query({
                    query: gql`query{
                        users (token : "${token}") {
                            ... on UserField {
                                username
                            }
                        }
                    }`
                }); 
                
                var parsedobj = JSON.parse(JSON.stringify(result.data.users));
                this.users = parsedobj;  
            },
            async subscribeUser(searchUsername){
                await this.$apollo.mutate({
                    mutation: gql`mutation($token:String,$userToSubscribe:String){
                        subscribeUser (token: $token, userToSubscribe:$userToSubscribe) {
                            ok
                        }
                    }`,
                    variables: {
                        token: localStorage.getItem(constants.token),
                        userToSubscribe : searchUsername
                    },
                })
            },
            moveToHome(){
                this.$router.replace({ name: "home" });
            },
            moveToSettings(){
                this.$router.replace({ name: "userSettings" });
            }
        }
    }
</script>

<style scoped>
</style>