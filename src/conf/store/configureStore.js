/**
 * Created by qq2575896094 on 19/12/2017.
 */


import {createStore} from 'redux'

import reducers from '../reducers'

export default function configureStore(preloadState) {
    return createStore(reducers, preloadState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}