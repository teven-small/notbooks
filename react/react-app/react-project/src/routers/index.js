import {
   Dashboard,
   Login,
   Article,
   ArticleEdit,
   NotFound,
   Settings,
   NoticeCenter,
   NotAuth,
   PerSetting
} from '../views'

export const mainRouter = [{
      pathname: '/login',
      component: Login
   },
   {
      pathname: '/404',
      component: NotFound
   },
]

export const adminRoutes = [{
      pathname: '/admin/dashboard',
      component: Dashboard,
      title: "仪表盘",
      isNav: true,
      icon: "dashboard",
      roles: ['001', '002', '003']
   },
   {
      pathname: '/admin/article',
      component: Article,
      exact: true,
      title: "文章列表",
      isNav: true,
      icon: "menu-fold",
      roles: ['001', '002', '003']
   },
   {
      pathname: '/admin/article/edit/:id',
      component: ArticleEdit,
      title: "文章编辑",
      isNav: false,
      icon: "",
      roles: ['001', '002', '003']
   },
   {
      pathname: '/admin/settings',
      component: Settings,
      title: "设置",
      isNav: true,
      icon: "setting",
      roles: ['001', '002', '003']
   },
   {
      pathname: '/admin/noticeCenter',
      component: NoticeCenter,
      roles: ['001', '002', '003']
   },
   {
      pathname: '/admin/notAuth',
      component: NotAuth,
      roles: ['001', '002', '003']
   },
   {
      pathname: '/admin/personSetting',
      component: PerSetting,
      roles: ['001', '002', '003']
   },
]