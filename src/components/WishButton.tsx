import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { setCountriesAction } from '../app/store'
import { CountriesResponse, reduxState } from '../Interfaces'
import { getWishes } from '../Fetch'
import Wish from '../svg/wish_filled.svg'

function WishButton() {

    // Get redux-store
    const store = useSelector((state: reduxState) => state) 

    // Setup of redux actions:
    const dispatch = useDispatch()
    const setCountries = (response : CountriesResponse) => dispatch(setCountriesAction(response))

    const handleResponse = (response : CountriesResponse) => {
        console.log('test')
        if (response) setCountries(response)
    }
    
    return (
        <button onClick={()=> getWishes(store.user.wishes, handleResponse)}>
            <img src={Wish} alt="flag" width="30px" height="30px"/>
            <p>Want to visit</p>
        </button>
    )
}

export default connect()(WishButton)
