import { ADD_MOVIES, ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE, SET_SHOW_FAVOURITES } from "../actions";


const initialMoviesState = {
    list : [],
    favourites: [],
    showFavourites : false
}
export default function movies (state = initialMoviesState, action){
    // we should avoid if else conditions we should use switch case
    // if(action.type === ADD_MOVIES){
    //     return {
    //         ...state,
    //         list : action.movies
    //     }
    // }
    // return state;

    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list : action.movies
            }

        case ADD_TO_FAVOURITE:
            return {
                ...state,
                favourites : [action.movie, ...state.favourites]
            }

        case REMOVE_FROM_FAVOURITE:
            const filteredArray = state.favourites.filter(
                movie => movie.Title !== action.movie.Title
            );

            return {
                ...state,
                favourites : filteredArray
            };
        
        case SET_SHOW_FAVOURITES:
            return {
                ...state,
                showFavourites: action.val 
            }
        default : 
            return state;
    }
}

// const ADD_MOVIES = 'ADD_MOVIES';

// Here we are doing string comparison, ideally we should avoid string comparison
// we should store the string somewhere in a variable with the same name then we should compare it with the variable 
// and move this variable to another file which is action file