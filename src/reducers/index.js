import { ADD_MOVIES } from "../actions";


const initialMoviesState = {
    list : [],
    favourites: []
}
export default function movies (state = initialMoviesState, action){
    
    if(action.type === ADD_MOVIES){
        return {
            ...state,
            list : action.movies
        }
    }
    return state;
}

// const ADD_MOVIES = 'ADD_MOVIES';

// Here we are doing string comparison, ideally we should avoid string comparison
// we should store the string somewhere in a variable with the same name then we should compare it with the variable 
// and move this variable to another file which is action file