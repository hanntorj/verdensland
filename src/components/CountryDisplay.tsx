import React from 'react'
import Country from './Country'
import { reduxState } from '../app/store'
import { useSelector } from 'react-redux'

export default function CountryDisplay() {
    const currentCountries = useSelector((state: reduxState) => state.currentCountries)

    if (currentCountries.length === 0){
        return (
            <div>No countries to display :(</div>
        )
    }

    return (
        <div className="CountryDisplay">
            <ul>
                {currentCountries.map((alpha2code : string) => {
                    return <Country countryID={alpha2code} wish={false} flag={false}/>
                })}
            </ul>
        </div>
    )
//    return (
//        <div className="CountryDisplay">
//            <Country countryID="AX" wish={true} flag={false}/>
//            <Country countryID="SE" wish={false} flag={false}/>
//        </div>
//    )
}
