<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="primary">
            <b-navbar-brand href="#">NavBar</b-navbar-brand>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item @click="moveToHome()">Home</b-nav-item>
                <b-nav-item @click="moveToSearch()">Search User</b-nav-item>
                <b-nav-item class="nav item active">Settings</b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
     
        <div v-for="subUser in subscribedUsers" :key="subUser">             
            <div v-for="user in subUser.subscribedUsers" :key="user.username">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{user.username}}</h5>
                        <b-button v-on:click="unsubscribeUser(user.username)">Unfollow</b-button>
                    </div>
                </div>
            </div>
        </div>   
    </div>       
</template>

<script>
    import constants from '../constants';
    import gql from "graphql-tag";

    export default {
        name: 'UserSettings',
        data() {
            return {
                subscribedUsers : constants.subscribedUsers
            };
        },
         methods: {
            async unsubscribeUser(unsubUser){
                await this.$apollo.mutate({
                    mutation: gql`mutation($token:String,$userToUnsubscribe:String){
                        unsubcribeUser (token: $token, userToUnsubscribe:$userToUnsubscribe) {
                            ok
                        }
                    }`,
                    variables: {
                        token: localStorage.getItem(constants.token),
                        userToUnsubscribe : unsubUser
                    },
                })   
                this.getSubscribedUser();
            },   
            async getSubscribedUser(){
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
                this.subscribedUsers = result.data.users;
                constants.subscribedUsers = this.subscribedUsers;
            },
            moveToHome(){
                this.$router.replace({ name: "home" });
            },
            moveToSearch(){
                this.$router.replace({ name: "searchUser" });
            }
        },
        created(){
            this.getSubscribedUser();
        }
    }
</script>

<style scoped>
</style>