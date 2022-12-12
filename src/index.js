import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import './styles/index.css';
import App from './components/App';
import rootReducer from './reducers';

// Curried form of function logger(obj,next,action)
// logger(obj)(next)(action)
// const logger = function (obj){ // this object will contain 2 properties dispatch and getState properties. Redux willautomatically pass the two prop in logger function.
//   const {dispatch,getState} = obj  // {dispatch,getState} - this is not store object this is simple object with two parameters.
//   return function(next){
//     return function(action){
//       // Middleware
//       console.log('ACTION_TYPE',action.type);
//       next(action);
//     }
//   }
// }

const logger = ({dispatch,getState}) => (next) => (action) => {
  console.log('ACTION_TYPE',action.type);
  next(action);
}

const store = createStore(rootReducer, applyMiddleware(logger)); // pass the reducer which is movie
// createStore funx internally call the reducer to get initial state
// dispatch function will pass the action to reducer
// console.log('state',store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store = {store} />
  </React.StrictMode>
);


