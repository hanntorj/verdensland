import React from 'react'
import Country from './Country'

export default function CountryDisplay() {
    return (
        <div className="CountryDisplay">
            <Country countryID="AX"/>
            <Country countryID="SE"/>
        </div>
    )
}
