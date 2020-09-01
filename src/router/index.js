import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import UserList from '../components/User/UserList/UserList.vue'
import Jobs from '../components/Jobs/Jobs.vue'
import Jobtype from '../components/Jobtype/Jobtype.vue'
import status from '@/components/status/status.vue'
import flags from '@/components/flags/flags.vue'
import covid19 from '@/components/c19/c19.vue'
import take5 from '@/components/t5/t5.vue'
import picupload from '@/components/img/img.vue'
import pdfupload from '@/components/pdf/pdf.vue'
import Middlewares from "../middlewares/";

Vue.use(VueRouter)
const routes = [
  {path:'/index.html',name:'home',component: Home, alias:'/',meta: {middleware: [Middlewares.auth]},
    redirect: '/dashboard' } , 
  {path:'/login',name:'login',component: Login,meta: {middleware: [Middlewares.guest]}  } ,
  {path:'/dashboard',name:'dashboard',component: Dashboard,meta: {middleware: [Middlewares.auth]}  },
  {path:'/userlist',name:'userlist',component: UserList,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/joblist',name:'joblist',component: Jobs,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/jobtype',name:'jobtype',component: Jobtype,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/status',name:'status',component: status,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/flags',name:'flags',component: flags,meta: {middleware: [Middlewares.auth]}  } , 
  {path:'/covid19',name:'covid19',component: covid19,meta: {middleware: [Middlewares.auth]}  } , 
  {path:'/take5',name:'take5',component: take5 ,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/picupload',name:'picupload',component: picupload ,meta: {middleware: [Middlewares.auth]}  } , 
  {path:'/pdfupload',name:'pdfupload',component: pdfupload ,meta: {middleware: [Middlewares.auth]}  } ,   
]
const router = new VueRouter({
  mode: 'history', base: process.env.BASE_URL, routes
})


function nextCheck(context, middleware, index) {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) return context.next;
  return (...parameters) => {
      context.next(...parameters);
      const nextMidd = nextCheck(context, middleware, index + 1);
      nextMiddleware({...context, next: nextMidd});
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {//if meta tag exist on route do this else return next
      const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
      const ctx = { from,next,router,to};
      const nextMiddleware = nextCheck(ctx, middleware, 1);
      return middleware[0]({...ctx, next: nextMiddleware});
  }
  return next();
});
export default router
