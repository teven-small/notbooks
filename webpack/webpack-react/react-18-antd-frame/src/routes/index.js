import {
    Login,
    NotFound,
    ArticlList,
    ArticlEdit,
    Settings,
    Dash
} from '../views'

export const mainRouter = [{
    pathname: '/login',
    component: Login
}, {
    pathname: '/404',
    component: NotFound
}]

export const adminRouter = [{
    pathname: '/admin/dash',
    component: Dash,
    title: '仪表盘',
    icon: 'dashboard',
    isNav: true
}, {
    pathname: '/admin/articl',
    component: ArticlList,
    title: '文章管理',
    icon: 'pic-right',
    isNav: true,
    exact: true
}, {
    pathname: '/admin/articl/edit/:id',
    component: ArticlEdit,
}, {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    icon: 'setting',
    isNav: true
}]