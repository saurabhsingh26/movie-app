import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import './styles/index.css';
import App from './components/App';
import rootReducer from './reducers';

const store = createStore(rootReducer); // pass the reducer which is movie
// createStore funx internally call the reducer to get initial state
// dispatch function will pass the action to reducer
// console.log('state',store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store = {store} />
  </React.StrictMode>
);


