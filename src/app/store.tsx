import { createStore } from 'redux'

interface filters{
  regions: Array<string>
  areaGreater : boolean
  popGreater : boolean
  pop : number
  area: number
}
export interface reduxState{
  currentCountries: Array<string> // List of alpha2code for the current countries that should be visible
  currentPage : number            // Variable for the current page of the countrydisplay
  filters : filters
  regionsActive : boolean
  areaActive: boolean
  popActive: boolean
}

const initialState : reduxState = sessionStorage.getItem("reduxState") ? JSON.parse(sessionStorage.getItem("reduxState")!) : {
  currentCountries: ["AF", "NO", "SE", "DK"],
  currentPage: 0,
  filters: {
    regions: [],
    areaGreater: false,
    popGreater:  false,
    pop: 0, 
    area: 0
  },
  regionsActive: false,
  areaActive : false, 
  popActive: false,

}

function reducer(state : any, {type, payload} : {type: string, payload: string|boolean|number}){ //TODO: Ender state fra å være any
  switch(type){
    case 'ADD_REGION':
      return {
        ...state,
        filters : {
          ...state.filters,
          regions: [...state.filters.regions, payload]
        }
      }
    case 'REMOVE_REGION':
      return{
        ...state,
        filters:{
          ...state.filters, 
          regions: state.filters.regions.filter((region:string) => region !== payload)
        }
      }
    case 'UPDATE_POP': 
      return {
        ...state,
        filters:{
          ...state.filters,
          pop: payload
        }
      }
    case 'UPDATE_AREA': 
      return {
        ...state,
        filters:{
          ...state.filters,
          area: payload
        }
      }
    case 'TOGGLE_FILTER':
      switch(payload){
        case 'regions':
          console.log("Got into the case")
          return {
            ...state, 
            regionsActive: !state.regionsActive
          }
        case 'area':
          return {
            ...state, 
            areaActive: !state.areaActive
          }
        case 'pop':
          return {
            ...state, 
            popActive: !state.popActive
          }
        default: 
          return state;
      }
    default: 
      return state;
  }
}

export const store = createStore(reducer, initialState)

export const addRegionAction = (region : string) => ({
  type: "ADD_REGION",
  payload: region
})

export const removeRegionAction = (region: string) => ({
  type: "REMOVE_REGION",
  payload: region
})

export const toggleFilterAction = (filterType : string) => ({
  type: "TOGGLE_FILTER",
  payload: filterType
})

export const updatePopAction = (number: number) => ({
  type: "UPDATE_POP",
  payload: number
})

export const updateAreaAction = (number: number) => ({
  type: "UPDATE_AREA",
  payload: number
})

//export default configureStore({
//  reducer: {
//    //TODO
//  }
//})

//eks
// import { configureStore } from '@reduxjs/toolkit'
// import usersReducer from '../features/users/usersSlice'
// import postsReducer from '../features/posts/postsSlice'
// import commentsReducer from '../features/comments/commentsSlice'
// 
// export default configureStore({
//   reducer: {
//     users: usersReducer,
//     posts: postsReducer,
//     comments: commentsReducer
//   }
// })