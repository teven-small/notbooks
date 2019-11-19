//引入react-loadable
// import loadable from 'react-loadable'
//react-loadable的原理
import loadable from './loadable'
//加载页
import { Loading } from '../components'
// import Dashboard from './Dashboard'
// import Article from './Article'
// import ArticleEdit from './Article/ArticleEdit'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'

const Dashboard = loadable({
   loader: () => import('./Dashboard'),
   loading: Loading
})
const Login = loadable({
   loader: () => import('./Login'),
   loading: Loading
})
const Article = loadable({
   loader: () => import('./Article'),
   loading: Loading
})
const ArticleEdit = loadable({
   loader: () => import('./Article/Edit'),
   loading: Loading
})
const NotFound = loadable({
   loader: () => import('./NotFound'),
   loading: Loading
})
const Settings = loadable({
   loader: () => import('./Settings'),
   loading: Loading
})

export {
   Dashboard,
   Login,
   Article,
   ArticleEdit,
   NotFound,
   Settings
}