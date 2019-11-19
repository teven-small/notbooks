import Loadable from 'react-loadable'
//简易的react-loadable原理
// import Loadable from './loadable'
import { Loading } from '../components'
// import Dashboard from './Dashboard'
// import Article from './Article'
// import ArticleEdit from './Article/ArticleEdit'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'

const Dashboard = Loadable({
   loader: () => import('./Dashboard'),
   loading: Loading
})
const Login = Loadable({
   loader: () => import('./Login'),
   loading: Loading
})
const Article = Loadable({
   loader: () => import('./Article'),
   loading: Loading
})
const ArticleEdit = Loadable({
   loader: () => import('./Article/Edit'),
   loading: Loading
})
const NotFound = Loadable({
   loader: () => import('./NotFound'),
   loading: Loading
})
const Settings = Loadable({
   loader: () => import('./Settings'),
   loading: Loading
})
const NoticeCenter = Loadable({
   loader: () => import('./NoticeCenter'),
   loading: Loading
})
const NotAuth = Loadable({
   loader: () => import('./NotAuth'),
   loading: Loading
})
const PerSetting = Loadable({
   loader: () => import('./PerSetting'),
   loading: Loading
})

export {
   Dashboard,
   Login,
   Article,
   ArticleEdit,
   NotFound,
   Settings,
   NoticeCenter,
   NotAuth,
   PerSetting
}