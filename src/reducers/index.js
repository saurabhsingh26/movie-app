import { ADD_MOVIES, ADD_FAVOURITE } from "../actions";


const initialMoviesState = {
    list : [],
    favourites: []
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

        case ADD_FAVOURITE:
            return {
                ...state,
                favourites : [action.movie, ...state.favourites]
            }
        default : 
            return state;
    }
}

// const ADD_MOVIES = 'ADD_MOVIES';

// Here we are doing string comparison, ideally we should avoid string comparison
// we should store the string somewhere in a variable with the same name then we should compare it with the variable 
// and move this variable to another file which is action file