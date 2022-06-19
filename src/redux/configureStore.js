// this is optional

import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createForms } from 'react-redux-form'
import { Dishes } from './dishes'
import { Comments } from './comments'
import { Promotions } from './promotions'
import { Leaders } from './leaders'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { InitialFeedBack } from './form'

// Return store with Reducer to handle actions and initialState
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedBack
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}