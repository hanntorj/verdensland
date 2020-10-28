import { createStore } from 'redux'
import { loadState, saveState } from './sessionStorage'
import { CountriesResponse, CountryMoreInfo, reduxState, User } from '../Interfaces'
import userEvent from '@testing-library/user-event';

const initialState : reduxState = sessionStorage.getItem("reduxState") 
  ? JSON.parse(sessionStorage.getItem("reduxState")!) 
  : {
  currentCountries: [],
  countryClicked: {
    alpha2Code: "",
    name: "",
    capital: "",
    area: 0,
    population: 0,
    region: "",
    subregion: "",
    demonym: "",  
    currencies: "",
    borders: [],
  },
  searchString: "",
  skip: 0,
  limit: 10,
  filters: {
    regions: [],
    areaGreater: false,
    popGreater:  false,
    pop: 0, 
    area: 0,
    areaActive : false, 
    popActive: false,
  },
  sort: "nameAsc",
  user: {
    userID: "",
    flags: [],
    wishes: []
  }
}

function reducer(state : any, {type, payload} : {type: string, payload: string | boolean | number | CountriesResponse | CountryMoreInfo | User}){ //TODO: Change state from any
  // TODO: Change state from any
  switch(type){
    case 'SET_COUNTRIES':
      return {
        ...state,
        currentCountries: payload,
      };
    case "SET_COUNTRYCLICKED":
      return {
        ...state,
        countryClicked: payload,
      };
    case "SET_SEARCHSTRING":
      return {
        ...state,
        searchString: payload,
      };
    case "SET_SKIP":
      return {
        ...state,
        skip: payload,
      };
      case "SET_SORT":
        return {
          ...state,
          sort: payload,

        }
    case "ADD_REGION":
      return {
        ...state,
        filters: {
          ...state.filters,
          regions: [...state.filters.regions, payload],
        },
      };
    case "REMOVE_REGION":
      return {
        ...state,
        filters: {
          ...state.filters,
          regions: state.filters.regions.filter(
            (region: string) => region !== payload
          ),
        },
      };
    case "UPDATE_POP":
      return {
        ...state,
        filters: {
          ...state.filters,
          pop: payload,
        },
      };
    case "UPDATE_AREA":
      return {
        ...state,
        filters: {
          ...state.filters,
          area: payload,
        },
      };
    case "TOGGLE_FILTER":
      switch (payload) {
        case "regions":
          return {
            ...state, 
            filters: {
              ...state.filters, 
              regionsActive: !state.filters.regionsActive
            }
          }
        case 'area':
          return {
            ...state, 
            filters: {
              ...state.filters, 
              areaActive: !state.filters.areaActive
            }
          }
        case 'pop':
          return {
            ...state, 
            filters: {
              ...state.filters,
              popActive: !state.filters.popActive
            }
          }
        default: 
          return state;
      }
    case "TOGGLE_GREATER":
      switch (payload) {
        case "pop":
          return {
            ...state,
            filters: {
              ...state.filters,
              popGreater: !state.filters.popGreater,
            },
          };
        case "area":
          return {
            ...state,
            filters: {
              ...state.filters,
              areaGreater: !state.filters.areaGreater,
            },
          };
        default:
          return state;
      }
    case 'SET_USER':
      return {
        ...state, 
        user: payload
      }
    case 'REMOVE_FLAG': 
      return {
        ...state,
        user: {
          ...state.user,
          flags: state.user.flags.filter((alpha: string) => alpha !== payload)
        }
      }
    case 'REMOVE_WISH': 
      return {
        ...state,
        user: {
          ...state.user,
          wishes: state.user.wishes.filter((alpha: string) => alpha !== payload)
        }
      }
    case 'ADD_WISH': 
      return {
        ...state,
        user: {
          ...state.user,
          wishes: [...state.user.wishes, payload]
        }
      }
    case 'ADD_FLAG': 
      return {
        ...state,
        user: {
          ...state.user, 
          flags: [...state.user.flags, payload]
        }
      }
    default:
      return state;
  }
}

const currentState = loadState(initialState);

export const store = createStore(reducer, currentState)

//Linking the store up to sessionStorage
store.subscribe(()=>{
  saveState(store.getState())
})

//Actions for modifying the redux-store
export const setCountriesAction = (countries : CountriesResponse) => ({
  type: 'SET_COUNTRIES',
  payload: countries
})
export const setCountryClickedAction = (countryClicked: CountryMoreInfo) => ({
  type: "SET_COUNTRYCLICKED",
  payload: countryClicked,
});

export const setUserAction = (user: User) => ({
  type: "SET_USER",
  payload: user
})

export const setSearchStringAction = (searchString: string) => ({
  type: "SET_SEARCHSTRING",
  payload: searchString,
});

export const setSkipAction = (skip: number) => ({
  type: "SET_SKIP",
  payload: skip,
});

export const setSortAction = (sort: string) => ({
  type: "SET_SORT",
  payload: sort,
});

export const addRegionAction = (region: string) => ({
  type: "ADD_REGION",
  payload: region,
});

export const removeRegionAction = (region: string) => ({
  type: "REMOVE_REGION",
  payload: region,
});

export const toggleGreaterThanAction = (filter: string) => ({
  type: "TOGGLE_GREATER",
  payload: filter,
});

export const toggleFilterAction = (filterType: string) => ({
  type: "TOGGLE_FILTER",
  payload: filterType,
});

export const updatePopAction = (number: number) => ({
  type: "UPDATE_POP",
  payload: number,
});

export const updateAreaAction = (number: number) => ({
  type: "UPDATE_AREA",
  payload: number
})

export const addFlagsAction = (alpha: string) => ({
  type: "ADD_FLAG",
  payload: alpha
})

export const addWishesAction = (alpha: string) => ({
  type: "ADD_WISH",
  payload: alpha
})

export const removeFlagsAction = (alpha: string) => ({
  type: "REMOVE_FLAG", 
  payload: alpha
})

export const removeWishesAction = (alpha: string) => ({
  type: "REMOVE_WISH", 
  payload: alpha
})
