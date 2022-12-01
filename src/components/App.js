// import {data} from '../data';
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import {data} from '../data';

class App extends React.Component {

  componentDidMount () {
    // make api call to get the movie
    // and when we get the movie, we diapatch an action "we want to add these movies to the store"

    const { store } = this.props

    store.subscribe(() => {
      console.log('UPDATED');
      this.forceUpdate(); //forcefully updating our app component we should never use this method
    })

    store.dispatch({     // After the very first render first dispatch will call then subscribe will call then console.log at line 25 will call
      type:"ADD_MOVIES",
      movies: data
    })

    console.log('State',this.props.store.getState());
  }
  render () {
    console.log("Render");
    const movie = this.props.store.getState();
    console.log('movie',movie);
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourite</div>
          </div>
          <div className="list">
            {movie.map((movie, index) => (
              <MovieCard movie = {movie} key={`movies-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
