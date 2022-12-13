import React, { createContext } from 'react';
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

export const StoreContext = createContext();

class Provider extends React.Component {
  render() {
    const {store} = this.props;
    return (
      <StoreContext.Provider value={store} > {/* whatever we pass in b/w this value ie store changes so all of my app component who are using the values store will get re-Render/ all of the consumer will get re-render   */}
        {this.props.children}        {/* it will render app component */}
      </StoreContext.Provider>
    )
  }
}

// const connectedComponent = connect(callback)(App);
export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBeSentAsProps = callback(state);

        return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
      }
    }

    class ConnectedComponentWrapper extends React.Component {
      render() {
        return (
          <StoreContext.Consumer>
            {(store) => {
              return <ConnectedComponent store={store} />;
            }}
          </StoreContext.Consumer>
        );
      }
    }
    return ConnectedComponentWrapper;
  };
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StoreContext.Provider> */}
    <Provider store = {store}>
      <App/>
    </Provider>
    {/* </StoreContext.Provider> */}
  </React.StrictMode>
);


