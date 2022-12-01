// {
//     type: 'ADD_MOVIES',
//     movies: [m1,m2,m3]
// }


// these variable are called action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE';
export const REMOVE_FROM_FAVOURITE = 'REMOVE_FROM_FAVOURITE';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';

// action creator

export function addMovies (movies){
    return {
        type:ADD_MOVIES,
        movies
    }
}

export function addFavourite (movie){
  return {
      type:ADD_TO_FAVOURITE,
      movie
  }
}

export function removeFromFavourites (movie){
  return {
      type:REMOVE_FROM_FAVOURITE,
      movie
  }
}

export function setShowFavourites (val){
  return {
      type:SET_SHOW_FAVOURITES,
      val
  }
}