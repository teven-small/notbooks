// import Loadable from 'react-loadable'
import Loadable from './Loadable'
import { Loading } from '../components'
// import ArticlList from './Articl'
// import ArticlEdit from './Articl/ArticlEdit'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'
// import Dash from './Dash'

const ArticlList = Loadable({
    loader: () => import('./Articl'),
    loading: Loading,
})
const ArticlEdit = Loadable({
    loader: () => import('./Articl/ArticlEdit'),
    loading: Loading,
})
const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading,
})
const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading,
})
const Settings = Loadable({
    loader: () => import('./Settings'),
    loading: Loading,
})
const Dash = Loadable({
    loader: () => import('./Dash'),
    loading: Loading,
});

export {
    ArticlList,
    ArticlEdit,
    Login,
    NotFound,
    Settings,
    Dash
}