// createContext是react提供的一个用于夸组件传值的方法
import React from 'react';
import ReactDOM from 'react-dom';

//Provider是react-redux提供的一个组件
import { Provider } from 'react-redux'

import App from './App'

import store from './store'

ReactDOM.render(
    //一般就直接把组件放在应用程序的最顶层，这个组件必须有一个store属性，这个store的值就是创建的stroe
    //只要在最外层包裹这个provider，那么所有的后台组件都可以使用Redux.connect做链接
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

