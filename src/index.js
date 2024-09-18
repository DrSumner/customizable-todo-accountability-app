import React from 'react';
import ReactDOM from 'react-dom';
import  './style/index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './state/reducers/reducers';
import { BrowserRouter as Router } from 'react-router-dom';
const store = configureStore({ reducer: reducer })

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
