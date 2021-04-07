import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Layout from '@/layout'

export const constantRoutes = [{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: {
        title: '首页',
        affix: true,
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/user/login'),
    meta: {
      title: '登录',
    },
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
        hidden:true
      }
    ]
  },
  {
    path: '/TaxAdmin',
    component: Layout,
    redirect: '/TaxAdmin/TaxSearch',
    name: '进项发票管理',
    meta: {
      title: '进项发票管理',
      icon: 'excel',
    }, // you can set roles in root nav 
    children: [{
        path: '/TaxAdmin/TaxSearch',
        component: () => import('@/views/TaxAdmin/TaxSearch'),
        name: 'TaxSearch',
        meta: {
          title: '录入查询',
          affix: true
        }
      },
      {
        path: '/TaxAdmin/BatchInspection',
        component: () => import('@/views/TaxAdmin/BatchInspection'),
        name: 'BatchInspection',
        meta: {
          title: '发票检验',
          affix: false
        },
        hidden: true,
      },
      {
        path: '/TaxAdmin/DeductionResults',
        component: () => import('@/views/TaxAdmin/DeductionResults'),
        name: 'DeductionResults',
        meta: {
          title: '抵扣认证',
          affix: true
        },
      },
      {
        path: '/TaxAdmin/BatchCertification',
        component: () => import('@/views/TaxAdmin/BatchCertification'),
        name: 'BatchCertification',
        meta: {
          title: '发票认证',
          affix: true
        },
        hidden: true,
      },
      {
        path: '/TaxAdmin/TaxVehicle',
        component: () => import('@/views/TaxAdmin/TaxVehicle/TaxVehicle'),
        name: 'TaxVehicle',
        meta: {
          title: '机动车',

          affix: true
        }
      }, {
        path: '/TaxAdmin/TaxToll',
        component: () => import('@/views/TaxAdmin/TaxToll/TaxToll'),
        name: 'TaxToll',
        meta: {
          title: '通行费',
          affix: true
        }
      },
      {
        path: '/TaxAdmin/TaxAbnormity',
        component: () => import('@/views/TaxAdmin/TaxAbnormity'),
        name: 'TaxAbnormity',
        meta: {
          title: '风险预警',

          affix: true
        }
      }
    ]
  },
  {
    path: '/statisticalChart',
    name: 'statisticalChart',
    meta: {
      title: '统计分析',
      icon: 'chart',
    }, // you can set roles in root nav 
    component: Layout,
    children: [{
      path: '/statisticalChart/taxChart',
      component: () => import('@/views/statisticalChart/TaxChart'),
      name: 'taxChart',
      meta: {
        title: '进项统计',
        affix: true
      }
    }, ]
  },
  {
    name: '权限管理',
    path: '/taxAutn',
    redirect: '/taxAutn/user',
    meta: {
      title: '权限管理',
      icon: 'user',
    }, // you can set roles in root nav 
    component: Layout,
    children: [{
      path: '/taxAutn/user',
      component: () => import('@/views/taxAutn/user'),
      name: 'user',
      meta: {
        title: '用户管理',
        affix: true
      }
    },{
      path: '/userinfo',
      component:()=>import ('@/layout/components/Userinfo/index.vue'),
      name:'个人中心',
      meta: {
        title: '个人中心',
        affix: true
      },
      hidden:true
    },
  ]
  },
  {
    path: '/changepwdS',
    meta: {
      title: '修改密码',
      icon: 'lock',
    },
    component: Layout,
    redirect: '/changepwd',
    children: [{
      path: '/changepwd',
      component: () => import('@/views/user/changepwd.vue'),
      meta: {
        title: '修改密码',
        affix: true
      }
    }]
  },
  {
    path: '*',
    component: () => import('../views/404.vue'),
    hidden: true
  },
]


const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;