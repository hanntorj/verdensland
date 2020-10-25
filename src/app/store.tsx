import { createStore } from 'redux'
import { loadState, saveState } from './sessionStorage'
import {CountriesResponse} from '../Interfaces'

interface filters{
  regions: Array<string>          // List of current regions to filter on
  areaGreater : boolean           // value for sorting out countries with area greater or lesser than area
  popGreater : boolean            // value for sorting out countries with population greater or lesser than pop
  area: number                    // threshold for area to filer on
  pop : number                    // threshold for population to filter on
}
export interface reduxState{
  currentCountries: CountriesResponse // List of alpha2code for the current countries that should be visible
  searchString: string
  skip : number            // Variable for the current page of the countrydisplay
  limit : number
  filters : filters
  regionsActive : boolean         // boolean values for if a filter is active or not
  areaActive: boolean
  popActive: boolean
}

const initialState : reduxState = sessionStorage.getItem("reduxState") ? JSON.parse(sessionStorage.getItem("reduxState")!) : {
  currentCountries: [],
  searchString: "",
  skip: 0,
  limit: 10,
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

function reducer(state : any, {type, payload} : {type: string, payload: string|boolean|number|CountriesResponse}){ //TODO: Change state from any
  switch(type){
    case 'SET_COUNTRIES':
      return {
        ...state,
        currentCountries : payload
      }
      case 'SET_SEARCHSTRING':
      return {
        ...state,
        searchString : payload
      }
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

const currentState = loadState(initialState)

export const store = createStore(reducer, currentState)
store.subscribe(()=>{
  saveState(store.getState())
})

export const setCountriesAction = (countries : CountriesResponse) => ({
  type: 'SET_COUNTRIES',
  payload: countries
})

export const setSearchStringAction = (searchString : string) => ({
  type: 'SET_SEARCHSTRING',
  payload: searchString
})

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