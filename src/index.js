/**
 * 功能：APP 入口文件
 * 作者：yt
 * 日期：2018-12-21
 */

import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import {Router, Route} from 'react-router-dom'

import createBrowserHistory from 'history/createBrowserHistory'

// import configureStore from '@/conf/store/configureStore'

// const store = configureStore();

const newHistory = createBrowserHistory();

// import './assets/css'

ReactDOM.render(
    <div>Welcome to React App!</div>,
    document.getElementById('root')
);
