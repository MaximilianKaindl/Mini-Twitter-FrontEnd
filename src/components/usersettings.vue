<template>
    <b-card
    title="User Settings"
    bg-variant="default"
    >
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
    export default {
        name: 'UserSettings',
        data() {
            return {
            };
        },
         methods: {
            moveToHome(){
                this.$router.replace({ name: "home" });
            },
            moveToSearch(){
                this.$router.replace({ name: "searchUser" });
            }
        }
    }
</script>

<style scoped>
</style>