import Vue from "vue";
import VueRouter from "vue-router";
import Login from './../views/login/login'
import Layout from "./../components/Layout";
import Member from './../views/member/member'
import Home from './../views/home/home'
import Supplier from './../views/supplier/supplier'
import Goods from './../views/goods/goods'
import Staff from './../views/staff/staff'
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: '/',
    name: 'layout', //路由名称
    component: Layout, //组件对象
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home,
        meta: {title: '首页'}
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    children: [
      {
        path: '/', // /member/
        component: Member,
        meta: {title: '会员管理'}
      }
    ]
  },
  {
    path: '/supplier',
    component: Layout,
    children: [
      {
        path: '/',
        component: Supplier,
        meta: {title: '供应商管理'}
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    children: [
      {
        path: '/',
        component: Goods,
        meta: {title: '商品管理'}
      }
    ]
  },
  {
    path: '/staff',
    component: Layout,
    children: [
      {
        path: '/',
        component: Staff,
        meta: {title: '员工管理'}
      }
    ]
  }

]

const router = new VueRouter({
  /*mode: "history",*/
  base: process.env.BASE_URL,
  routes
});

export default router;
