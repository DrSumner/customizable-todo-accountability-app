import React from 'react';
import ReactDOM from 'react-dom';
import  './style/index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './state/reducers/reducers';
const store = configureStore({ reducer: reducer })

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
