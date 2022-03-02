import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from "@/views/Login";


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    //使用父子路由实现Home页的Header和Aside锁定在子页面中
    children:[
      {
        path:'/reportandrepair',
        name: 'ReportAndRepair',
        component: () => import( '../views/adminViews/ReportAndRepair.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  }
]



const router = new VueRouter({
  routes
})
//路由守卫函数，若beforeEach判断到未登陆，则跳转到Login页面
router.beforeEach((to, from ,next) => {
  const { isLogin } = localStorage;
  (isLogin === '1'|| to.name === "Login") ? next() : next({ name: 'Login'});
})


export default router

