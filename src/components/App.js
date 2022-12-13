// import {data} from '../data';
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import {data} from '../data';
import { addMovies, setShowFavourites } from "../actions";
import { StoreContext } from "../";

class App extends React.Component {

  componentDidMount () {  // componentDidMount needs the access of store
    const { store } = this.props
    store.subscribe(() => {
      this.forceUpdate();
    })

    store.dispatch(addMovies(data))
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();
    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      // found the movie
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val))
  }
  render () {
    // const { list, favourites, showFavourites } = this.props.store.getState(); // { list: [], favourite : []}
    const {movies, search} = this.props.store.getState();  // { movies: {}, search: {} }
    const { list, favourites, showFavourites } = movies;
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar search = {search} />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick = {() => this.onChangeTab(false)} >Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick = {() => this.onChangeTab(true)} >Favourite</div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard 
                movie = {movie} 
                key={`movies-${index}`} 
                dispatch = {this.props.store.dispatch}
                isFavourite = {this.isMovieFavourite(movie)} 
              />
            ))}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null }
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store = {store} /> }
//       </StoreContext.Consumer>
//     )
//   }
// }


// This callback function tell the connect that what data we want from the store
function callback (state){  // here we get the whole store state
  return{
    movies: state.movies,
    search: state.search
  }
}

const connectedAppComponent = connect(callback)(App)
// Inside the connect function we will have to tell what data that we want from the store and which component we want to connect this component
// I will get the state whenever my connect function calling this callback

export default connectedAppComponent;
