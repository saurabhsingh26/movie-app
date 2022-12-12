import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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
  if(typeof action !== 'function'){
    console.log('ACTION_TYPE',action.type);
  }
  next(action);
}

// const thunk = ({dispatch,getState}) => (next) => (action) => {
//   if (typeof action === 'function'){
//     action(dispatch);  // if an action is a function  we are just calling a function passing the dispatch value if not then passing the action object to the reducer
//     return;
//   }
//   next(action); // we are using thunk package
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk)); // pass the reducer which is movie
// createStore funx internally call the reducer to get initial state
// dispatch function will pass the action to reducer
// console.log('state',store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store = {store} />
  </React.StrictMode>
);


