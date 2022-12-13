// import {data} from '../data';
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import {data} from '../data';
import { addMovies, setShowFavourites } from "../actions";
import { StoreContext } from "../";

class App extends React.Component {

  componentDidMount () {
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
  //  StoreContext will expect a function
    return (
      <StoreContext.Consumer>  
        {(store) => {   // store name can be anything
          return (
            <div className="App">
              <Navbar dispatch = {this.props.store.dispatch} search = {search} />
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
        }}
      </StoreContext.Consumer>
    )
  }
}

export default App;
