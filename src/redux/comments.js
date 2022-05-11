import { COMMENTS } from '../shared/comments'
import * as ActionTypes from "./ActionTypes"

export const Comments = (state = COMMENTS, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            // concat will create a new copy of a object
            return state.concat(comment);
        default:
            return state;
    }
}