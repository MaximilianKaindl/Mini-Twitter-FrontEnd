<template>
    <b-card
    title="User Settings"
    bg-variant="default"
    >

    <h1>Unsubscribed Users</h1>
    <div v-for="subUser in subscribedUsers" :key="subUser">             
            <div v-for="(user, index) in subUser.subscribedUsers" :key="user.username">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{user.username}}</h5>
                        <b-button v-on:click="unsubscribeUser(user.username, index)">Unsubscribe</b-button>
                    </div>
                </div>
            </div>
        </div>
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="moveToSearch()">Search</b-button>
            </b-col>
        </b-row> 
         <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="moveToHome()">Home</b-button>
            </b-col>
        </b-row> 
    </b-card>          
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
            async unsubscribeUser(searchUsername, index){
                await this.$apollo.mutate({
                    mutation: gql`mutation($token:String,$userToUnsubscribe:String){
                        unsubcribeUser (token: $token, userToUnsubscribe:$userToUnsubscribe) {
                            ok
                        }
                    }`,
                    variables: {
                        token: localStorage.getItem(constants.token),
                        userToUnsubscribe : searchUsername
                    },
                })   
                
                constants.subscribedUsers.splice(index);
            },   
            moveToHome(){
                this.$router.replace({ name: "home" });
            },
            moveToSearch(){
                this.$router.replace({ name: "searchUser" });
            }
        },
    }
</script>

<style scoped>
</style>