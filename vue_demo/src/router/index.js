import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import Home from '@/views/Home'
import Index from '@/views/Index'
import Test1 from '@/views/test/Test1'
import Test2 from '@/views/test/Test2'
import Test3 from '@/views/test/Test3'



Vue.use(Router)

const router=new Router({
  routes: [
    {
      path:'/login',
      name:'Login',
      component:Login,
      hidden:true
    },
    {
      path:'/register',
      name:'Register',
      component:Register,
      hidden:true
    },
    {
      path:'/',
      name:'',
      component:Home,
      leaf: true,//只有一个节点
      iconCls:'el-icon-menu',
      children: [
        { path: '/Index', component: Index, name: '首页' }
      ]
    },

    {
      path: '/',
      component: Home,
      name: '',
      iconCls: 'el-icon-menu',
      leaf:true,
      children: [
        { path: '/Test1', component: Test1, name: '测试1' },
      ]
    },
    {
      path: '/',
      component: Home,
      name: '测试',
      iconCls: 'el-icon-menu',
      // leaf:true,
      children: [
        { path: '/Test2', component: Test2, name: '测试2' },
        { path: '/Test3', component: Test3, name: '测试3' },
      ]
    },

  ]
});
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path === '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user) {
    if (to.path !== '/login'&&to.path!=='/register'){
        next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
  // if (!user && to.path !== '/login'&&to.path!=='register') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
});
export default router;
