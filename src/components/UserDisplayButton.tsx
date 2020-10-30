import React from 'react'
import Wish from '../svg/wish_filled.svg'
import Flag from '../svg/flag_filled.svg'
import { getWishes } from '../Fetch'
import { setCountriesAction } from '../app/store'
import { CountriesResponse, reduxState } from '../Interfaces'
import { connect, useDispatch, useSelector } from 'react-redux'

interface Props { 
    type: string
}

function UserDisplayButton(props: Props) {

    // Get redux-store
    const store = useSelector((state: reduxState) => state) 

    // Setup of redux actions:
    const dispatch = useDispatch()
    const setCountries = (response : CountriesResponse) => dispatch(setCountriesAction(response))

    const handleResponse = (response : CountriesResponse) => {
        if (response) setCountries(response)
    }
    
    switch(props.type){
        case 'WISH': 
            return (
                <button data-testid="UserDisplayButton" onClick={()=> getWishes(store.user.wishes, handleResponse)}>
                    <img src={Wish} alt="flag" width="30px" height="30px"/>
                    <p>Want to visit</p>
                </button>
            )
        case 'FLAG': 
            return (
                <button data-testid="UserDisplaybutton" onClick={()=> getWishes(store.user.flags, handleResponse)}>
                    <img src={Flag} alt="flag" width="30px" height="30px"/>
                    <p>Visited</p>
                </button>                
            )
        default:
            return (
                <>
                </>
            )
    }
}

export default connect()(UserDisplayButton)
