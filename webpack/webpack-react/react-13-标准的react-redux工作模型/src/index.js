// createContext是react提供的一个用于夸组件传值的方法
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './App'

import store from './store'

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);

