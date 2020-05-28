import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "./components/login.vue"
import HomeComponent from "./components/home.vue"
import RegisterComponent from "./components/register.vue"
import SearchUserComponent from "./components/searchuser.vue"
import UserSettingsComponent from "./components/usersettings.vue"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/home",
            name: "home",
            component: HomeComponent
        },
        {
            path: "/register",
            name: "register",
            component: RegisterComponent

        },
        {
            path: "/searchUser",
            name: "searchUser",
            component: SearchUserComponent

        },
        {
            path: "/userSettings",
            name: "userSettings",
            component: UserSettingsComponent

        }

    ]
})
