// import {data} from '../data';
import React from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import {data} from '../data';
import { addMovies, setShowFavourites } from "../actions";

class App extends React.Component {
  
  componentDidMount () {
    // console.log('this.props',this.props);
    this.props.dispatch(addMovies(data))
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val))
  }
  render () {
    // const { list, favourites, showFavourites } = this.props.store.getState(); // { list: [], favourite : []}
    const {movies, search} = this.props;  // { movies: {}, search: {} }
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
                dispatch = {this.props.dispatch}
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

// This callback function(mapStateToProps) tells the connect that what data we want from the store
function mapStateToProps (state){  // here we get the whole store state
  // console.log('state********',state);
  return{
    movies: state.movies, // what data I want from store state
    search: state.search
  }
}

// Telling redux using connect function that I have a component to be connected to store and I want this particular data only from the store.
const connectedAppComponent = connect(mapStateToProps)(App)
// Inside the connect function we will have to tell what data that we want from the store and which component we want to connect this component
//Internally assume connect function will be calling my callback(mapStateToProps) with the redux store state. I will get the state whenever my connect function calling this callback.
// App component will get properties movie and search as a props
// Whatever component is connected only that component gets refresh/re-render when that particular prop changes.
// App component will render only if movies and search properties will change. 

export default connectedAppComponent;
