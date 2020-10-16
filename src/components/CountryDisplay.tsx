import React from 'react'
import Country from './Country'

export default function CountryDisplay() {
    return (
        <div className="CountryDisplay">
            <Country countryID="AX" wish={true} flag={false}/>
            <Country countryID="SE" wish={false} flag={false}/>
        </div>
    )
}
