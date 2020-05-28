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
         <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="moveToHome()">Home</b-button>
            </b-col>
        </b-row> 
        <b-row class="mt-3">
            <b-col>
                <b-button block variant="primary" v-on:click="moveToSettings()">Home</b-button>
            </b-col>
        </b-row> 
    </b-card>          
</template>

<script>
    export default {
        name: 'SearchUser',
        data() {
            return {
                input: {
                    username: ""
                }
            };
        },
         methods: {
            async searchUser() {
                
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