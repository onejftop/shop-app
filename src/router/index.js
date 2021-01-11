import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/account/Login.vue'
import Register from '../views/account/Register.vue'
import Index from '../views/home/Index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Index,
        children: [
            {
                path:'/users',
                component:()=>import("../views/home/pages/User")
            },
            {
                path: '/goods_all',
                component: () => import("../views/home/pages/GoodsAll")
            }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
