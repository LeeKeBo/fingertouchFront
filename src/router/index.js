import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/home',
                    component: () => import('../components/page/Index.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/bookAdd',
                    component: () => import('../components/page/bookAdd.vue'),
                    meta: { title: '添加书籍' }
                },
                {
                    path: '/bookManage',
                    component: () => import('../components/page/bookManage.vue'),
                    meta: { title: '书籍管理' }
                },
                {
                    path: '/resourceManage',
                    component: () => import('../components/page/resourceManage.vue'),
                    meta: { title: '资源管理' }
                }, {
                    path: '/test',
                    component: () => import('../components/page/Test.vue'),
                    meta: { title: '测试页面' }
                }, {
                    path: '/adminManage',
                    component: () => import('../components/page/adminManage'),
                    meta: { title: '管理员列表' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录界面' }
        },
        {
            path: '*',
            redirect: '/404',
            meta: { title: '错误界面' }
        }
    ]
});
