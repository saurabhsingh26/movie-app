// import {data} from '../data';
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import {data} from '../data';
import { addMovies, setShowFavourites } from "../actions";

class App extends React.Component {

  componentDidMount () {
    // make api call to get the movie
    // and when we get the movie, we diapatch an action "we want to add these movies to the store"

    const { store } = this.props

    store.subscribe(() => {
      console.log('UPDATED');
      this.forceUpdate(); //forcefully updating our app component we should never use this method
    })

    // store.dispatch({     // After the very first render first dispatch will call then subscribe will call then console.log at line 25 will call
    //   type:"ADD_MOVIES",
    //   movies: data
    // })

    store.dispatch(addMovies(data))

    console.log('State',this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { favourites } = this.props.store.getState();
    const index = favourites.indexOf(movie);

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
    console.log("Render");
    const { list, favourites, showFavourites } = this.props.store.getState(); // { list: [], favourite : []}
    console.log(this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar />
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

export default App;
