<template>
    <b-card
    title="Home"
    bg-variant="default"
    >
        <b-row>
            <b-col>
                <b-input type="text" name="tweet" v-model="input.tweet" placeholder="Was passiert gerade?" />
            </b-col>
        </b-row>
        <b-row>
            {{message}}
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="sendTweet()">Twittern</b-button>
            </b-col>
        </b-row> 
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="getTweets()">Sync</b-button>
            </b-col>
        </b-row> 
         <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="moveToSearchUser()">Search User</b-button>
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
    import gql from "graphql-tag"
import constants from '../constants';

    export default {
        name: 'Home',
        data() {        
            return {
                message: '',
                input: {
                    tweet: ""
                },
                users : []
            };
        },
         methods: {
            async sendTweet() {
                if(this.input.tweet != ""){
                    const result = await this.$apollo.mutate({
                    mutation: gql`mutation($content:String!,$token:String!){
                            tweets (content: $content, token:$token) {
    	                        ok
                            }
                        }`,
                        variables: {
                            content: this.input.tweet,
                            token : localStorage.getItem(constants.token)
                        }
                    })
                    if(!result.data.tweets.ok)
                    {
                        this.message = "Tweet konnte nicht gesendet werden!"
                    }                 
                }
            },
            async getTweets(){
                const token = localStorage.getItem(constants.token);
                const result = await this.$apollo.query({
                    query: gql`query{
                        users (token : "${token}") {
                            ... on UserField {
  		                        username
                                tweets {
                                    content
                                }
                            }
                        }
                    }`
                });  
                this.tweets = result.data;  
                console.log(this.tweets)
            },
            moveToSearchUser(){
                 this.$router.replace({ name: "searchUser" });
            },
            moveToSettings(){
                this.$router.replace({ name: "userSettings" });
            }
         }
    }
</script>

<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>