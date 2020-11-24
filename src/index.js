import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 读取local中的user,保存到内存中
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

import store from './redux/store'
import {Provider} from 'react-redux'

const user = storageUtils.getUser()
memoryUtils.user = user;
ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
  document.getElementById('root')
);

