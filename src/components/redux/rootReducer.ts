import { combineReducers } from 'redux'

const rxLoginInfo = (state = { rxLoginInfo: null }, action: any) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                rxLoginInfo: action.payload
            }
        case "LOG_OUT":
            return {
                ...state,
                rxLoginInfo: null
            }
        default:
            return state
    }
}





const rootReducer = combineReducers({
    rxLoginInfo
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>