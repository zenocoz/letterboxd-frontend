import { render } from "react-dom"
import { createStore, applyMiddleware, Store, compose } from "redux"
import thunk from "redux-thunk"
import { MovieState, MovieAction, DispatchType } from "./store.d"

import reducer from "./reducer"

// const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store: Store<MovieState, MovieAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))
