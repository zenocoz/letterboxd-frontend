import { render } from "react-dom"
import { createStore, applyMiddleware, Store } from "redux"
import thunk from "redux-thunk"
import { MovieState, MovieAction, DispatchType } from "./store.d"

import reducer from "./reducers"

export const store: Store<MovieState, MovieAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))
