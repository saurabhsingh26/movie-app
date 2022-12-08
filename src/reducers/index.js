import { ADD_MOVIES, ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE, SET_SHOW_FAVOURITES } from "../actions";


const initialMoviesState = {
    list : [],
    favourites: [],
    showFavourites : false
}
export default function movies (state = initialMoviesState, action){
    console.log('action',action);

    switch (action.type) {
        case ADD_MOVIES:
            return {   //our initial state are object so we need to return object not array
                ...state,   
                list : action.movies  // changing the property of list of initial state using (object properties)
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
