import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import store from '@/store'
import Middlewares from "../middlewares/";

Vue.use(VueRouter)
const routes = [
  {path:'/index.html',name:'home',component: Home, alias:'/',meta: {middleware: [Middlewares.auth]} } ,
  {path:'/login',name:'login',component: Login,meta: {middleware: [Middlewares.guest]}  } ,
  {path:'/dashboard',name:'dashboard',component: Dashboard,meta: {middleware: [Middlewares.auth]}
  } 
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
