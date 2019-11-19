// createContext是react提供的一个用于夸组件传值的方法
import React from 'react';
import ReactDOM from 'react-dom';
import { ConterProvider } from './counterStore'
import App from './App'


ReactDOM.render(
    <ConterProvider>
        <App />
    </ConterProvider>, document.getElementById('root'));

