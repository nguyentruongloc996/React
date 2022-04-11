// this is optional

import {createStore} from 'redux'
import { Reducer, initialState } from './reducer'

// Return store with Reducer to handle actions and initialState
export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialState
    )

    return store;
}