<template>
    <b-card
    title="Search User"
    bg-variant="default"
    >
        <b-row>
            <b-col>
                <b-input type="text" name="username" v-model="input.username" placeholder="MiniTwitter durchsuchen" />
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="searchUser()">Search</b-button>
            </b-col>
        </b-row> 

        <li v-for="user in users" :key="user.username">
            {{ user.username }}
            <b-button v-on:click="subscribeUser(user.username)">Follow</b-button>
        </li>

        <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="moveToHome()">Home</b-button>
            </b-col>
        </b-row> 
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="moveToSettings()">Settings</b-button>
            </b-col>
        </b-row> 
    </b-card>          
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
                users: {
                    username: ""
                }
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