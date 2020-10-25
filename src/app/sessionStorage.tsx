import {reduxState} from './store'

export const loadState = (state: reduxState) =>{
    try {
        const storedState = sessionStorage.getItem("reduxState")

        if (storedState) {
            return JSON.parse(storedState)
        }
        return state
    } catch (error) {
        return state
    }
}

export const saveState = (state: reduxState) =>{
    try {
        const stringifiedState = JSON.stringify(state)
        sessionStorage.setItem("reduxState", stringifiedState)
    } catch (error) {
        console.log("There was an error saving the current state to sesisonStorage", error)
    }
}