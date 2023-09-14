// these variable are called action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITE = "REMOVE_FROM_FAVOURITE";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";

// action creator

export function addMovies(movies) {
  // calling this action from app.js line 16
  return {
    type: ADD_MOVIES,
    movies,
  };
}

export function addFavourite(movie) {
  return {
    type: ADD_TO_FAVOURITE,
    movie,
  };
}

export function removeFromFavourites(movie) {
  return {
    type: REMOVE_FROM_FAVOURITE,
    movie,
  };
}

export function setShowFavourites(val) {
  return {
    type: SET_SHOW_FAVOURITES,
    val,
  };
}

export function addMovieToList(movie) {
  return {
    type: ADD_MOVIE_TO_LIST,
    movie,
  };
}

export function handleMovieSearch(movie) {
  // In this action is not a object, we are handling this using thunk
  const url = `https://www.omdbapi.com/?apikey=a3ef52f8&t=${movie}`;
  return function (dispatch) {
    // if that function get dispatch
    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        console.log("movie", movie);

        // dispatch an action
        dispatch(addMovieSearchResult(movie));
      });
  };
}

export function addMovieSearchResult(movie) {
  return {
    type: ADD_SEARCH_RESULT,
    movie,
  };
}
