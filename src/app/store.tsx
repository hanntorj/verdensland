import { createStore } from 'redux'
import { loadState, saveState } from './sessionStorage'
import {CountriesResponse, reduxState} from '../Interfaces'

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
      case 'SET_SKIP':
        return {
          ...state,
          skip : payload
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
    case 'TOGGLE_GREATER':
      switch(payload){
        case 'pop':
          return {
            ...state,
            filters: {
              ...state.filters,
              popGreater: !state.filters.popGreater
            }
          }
        case 'area':
          return {
            ...state,
            filters: {
              ...state.filters,
              areaGreater: !state.filters.areaGreater
            }
          }
        default: 
          return state
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

export const setSkipAction = (skip : number) => ({
  type: 'SET_SKIP',
  payload: skip
})

export const addRegionAction = (region : string) => ({
  type: "ADD_REGION",
  payload: region
})

export const removeRegionAction = (region: string) => ({
  type: "REMOVE_REGION",
  payload: region
})

export const toggleGreaterThanAction = (filter: string) => ({
  type: "TOGGLE_GREATER",
  payload: filter
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