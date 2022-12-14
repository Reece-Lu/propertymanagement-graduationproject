import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/PropertyManagementHome'
import Login from "@/views/Login";


Vue.use(VueRouter)

const routes = [
  {
    path: '/propertymanagementhome',
    name: 'propertymanagementhome',
    component: Home,
    //使用父子路由实现Home页的Header和Aside锁定在子页面中
    children:[
      {
        path:'/reportandrepair',
        name: 'ReportAndRepair',
        component: () => import( '../views/adminViews/ReportAndRepair.vue')
      },
      {
        path:'/propertyexpressdelivery',
        name: 'PropertyExpressDelivery',
        component: () => import( '../views/adminViews/PropertyExpressDelivery.vue')
      },
      {
        path:'/proprietorarchives',
        name: 'ProprietorArchives',
        component: () => import( '../views/adminViews/ProprietorArchives.vue')
      },
      {
        path:'/propertysearchpet',
        name: 'PropertySearchPet',
        component: () => import( '../views/adminViews/PropertySearchPet.vue')
      },
      {
        path:'/propertycar',
        name: 'Propertycar',
        component: () => import( '../views/adminViews/PropertyCar.vue')
      },
      {
        path:'/propertydecoration',
        name: 'propertydecoration',
        component: () => import( '../views/adminViews/PropertyDecoration.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/proprietorhome',
    name: 'ProprietorHome',
    component: () => import( '../views/ProprietorHome'),
    children: [
      {
        path:'/proprietorbroadcast',
        name: 'proprietorbroadcast',
        component: () => import( '../views/proprietorViews/ProprietorBroadcast.vue')
      }, {
        path: '/proprietorcommunity',
        name: 'proprietorcommunity',
        component: () => import( '../views/proprietorViews/ProprietorCommunity.vue'),
      },{
        path:'/proprietormine',
        name: 'proprietormine',
        component: () => import( '../views/proprietorViews/ProprietorMine.vue')
      }
    ]
  },{
    path: '/proprietorhome/createfixingreport',
    name: 'createfixingreport',
    component: () => import( '../views/proprietorViews/reportRepair/CreateFixingReport.vue')
  },{
    path: '/proprietorhome/checkfixingreport',
    name: 'checkfixingreport',
    component: () => import( '../views/proprietorViews/reportRepair/CheckFixingReport.vue')
  },{
    path: '/proprietorhome/createexpressdelivery',
    name: 'createexpressdelivery',
    component: () => import( '../views/proprietorViews/quarantineAssistant/EntrustExpressDelivery.vue')
  },{
    path: '/proprietorhome/trackexpressdelivery',
    name: 'trackexpressdelivery',
    component: () => import( '../views/proprietorViews/quarantineAssistant/TrackExpressDelivery.vue')
  },{
    path: '/proprietorhome/registerpet',
    name: 'registerpet',
    component: () => import( '../views/proprietorViews/pet/RegisterPet.vue')
  },{
    path: '/proprietorhome/proprietorregistercar',
    name: 'proprietorregistercar',
    component: () => import( '../views/proprietorViews/car/ProprietorRegisterCar.vue')
  },{
    path: '/proprietorhome/proprietorchangecarinfo',
    name: 'proprietorchangecarinfo',
    component: () => import( '../views/proprietorViews/car/ProprietorChangeCarInfo.vue')
  },{
    path: '/proprietorhome/proprietorregisterdecoration',
    name: 'proprietorregisterdecoration',
    component: () => import( '../views/proprietorViews/decoration/ProprietorRegisterDecoration.vue')
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

