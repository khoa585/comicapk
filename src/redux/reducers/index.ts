import { combineReducers } from 'redux'
import internetReducer from './InternetReducer'
export type AppState = {

}
const rootReducer = combineReducers<AppState>({
    internetReducer
})

export default rootReducer;
