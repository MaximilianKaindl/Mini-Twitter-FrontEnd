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

        <div v-for="(user, index) in users" :key="user.username">
            <div v-if="user != username">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{user}}</h5>
                        <b-button v-on:click="subscribeUser(user, index)">Follow</b-button>
                    </div>
                </div>                   
            </div>
        </div>


        <h1>Recommended Users</h1>
        <div v-for="(recUser, index) in recommendedUser" :key="recUser">             
            <div v-if="recUser != username">              
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{recUser}}</h5>
                        <b-button v-on:click="subscribeRecommended(recUser,index)">Follow</b-button>
                    </div>
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
                users: [],
                recommendedUser : [],
                username : "",
                bysubscribeUser : []         
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
                
                this.users = result.data.users.map(x => x.username) 
                this.filterSubscribedFromUsers();
            },
            async getSubscribedUser() {
                const token = localStorage.getItem(constants.token);
                 const result = await this.$apollo.query({
                     query: gql`query{
                        users (token : "${token}", username : "${constants.username}") {
                            ... on UserField {
                                subscribedUsers {
                                    username
                                }
                            }
                        }
                    }`
                }); 
    
                this.bysubscribeUser = result.data.users.map(x => x.subscribedUsers)[0].map(x => x.username);
            },
            async subscribeUser(subscribeName, index ){
                await this.$apollo.mutate({
                    mutation: gql`mutation($token:String,$userToSubscribe:String){
                        subscribeUser (token: $token, userToSubscribe:$userToSubscribe) {
                            ok
                        }
                    }`,
                    variables: {
                        token: localStorage.getItem(constants.token),
                        userToSubscribe : subscribeName
                    },
                });
                this.users.splice(index, 1);
                this.getSubscribedUser();
                this.filterSubscribedFromUsers();
            },
            async subscribeRecommended(subscribeName,index){
                this.subscribeUser(subscribeName);
                this.recommendedUser.splice(index,1);
                this.users.splice(this.users.indexOf(subscribeName),1);
            },
            async getRecommendedUser(){
                const token = localStorage.getItem(constants.token);

                const result = await this.$apollo.query({
                    query: gql`query{
                        users (token : "${token}" , username : "${constants.username}") {
                            ... on UserField {
                                recommendedUsers{
                                    username
                                }
                            }
                        }
                    }`
                }); 
                this.recommendedUser = result.data.users.map(x => x.recommendedUsers)[0].map(x => x.username);
            },           
            moveToHome(){
                this.$router.replace({ name: "home" });
            },
            moveToSettings(){
                this.$router.replace({ name: "userSettings" });
            },
            filterSubscribedFromUsers() {
                this.users = this.users.filter(value => !this.bysubscribeUser.includes(value)) 
            }
            
        },
        created(){
            this.getRecommendedUser();
            this.getSubscribedUser();
            this.filterSubscribedFromUsers();

            this.username = constants.username;
        }
    
    }
</script>