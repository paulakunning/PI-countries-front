import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:3001/'; 
axios.defaults.baseURL = 'https://pi-countries-back-production-db8b.up.railway.app/';

ReactDOM.render(
    <Provider store={ store }>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
