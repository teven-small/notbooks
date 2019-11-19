import React from 'react'
import { render } from 'react-dom'
import zhCN from 'antd/es/locale/zh_CN';
import { LocaleProvider, ConfigProvider } from 'antd'
import App from './App'

render(
   <LocaleProvider locale={zhCN}>
      <ConfigProvider prefixCls="teven">
         <App />
      </ConfigProvider>
   </LocaleProvider>,
   document.querySelector("#root")
)