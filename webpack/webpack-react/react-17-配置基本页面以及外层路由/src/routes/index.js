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
    component: Dash
}, {
    pathname: '/admin/settings',
    component: Settings
}, {
    pathname: '/admin/articl',
    component: ArticlList,
    exact: true
}, {
    pathname: '/admin/articl/edit/:id',
    component: ArticlEdit
}]