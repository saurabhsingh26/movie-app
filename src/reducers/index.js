import { ADD_MOVIES } from "../actions";

export default function movies (state = [], action){
    // Here we are doing string comparison, ideally we should avoid string comparison
    // we should store the string somewhere in a variable with the same name then we should compare it with the variable 
    // and move this variable to another file which is action file
    if(action.type === ADD_MOVIES){
        return action.movies;
    }
    return state;
}

// const ADD_MOVIES = 'ADD_MOVIES';