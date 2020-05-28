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
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="sendTweet()">Twittern</b-button>
            </b-col>
        </b-row> 
         <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="moveToSearchUser()">Search User</b-button>
            </b-col>
        </b-row> 
         <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="moveToSettings()">Search User</b-button>
            </b-col>
        </b-row> 
    </b-card>          
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                input: {
                    tweet: ""
                }
            };
        },
         methods: {
            async sendTweet() {
                
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