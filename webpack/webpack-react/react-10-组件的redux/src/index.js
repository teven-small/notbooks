// createContext是react提供的一个用于夸组件传值的方法
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

import store from './store'

window.store = store

ReactDOM.render(<App store={store} />, document.getElementById('root'));

