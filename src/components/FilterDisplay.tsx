import React, {useLayoutEffect} from 'react'
import '../css/sliders.css'

export default function FilterDisplay() {

    var regions = [
        "Africa", "Americas", "Antarctica", "Asia", "Europe", "Oceania"
    ]

    function toggleButtonClass(id : string){
        // Function that toggle the display of a button when it is clicked. 
        // #TODO Link up to redux-store and update this on click
        let button : HTMLElement = document.getElementById(id)!
        if(! JSON.parse(sessionStorage.getItem(id+"button")!)){
            button.setAttribute("class", "RegionButtonClicked")
            sessionStorage.setItem(id+"button", JSON.stringify(true))
        } else {
            button.setAttribute("class", "RegionButton")
            sessionStorage.setItem(id+"button", JSON.stringify(false))
        }
    }

    useLayoutEffect(()=>{
        // Hook that handles display of buttons on refresh
        for(var x in regions){
            let region : string = regions[x]
            console.log(region, sessionStorage.getItem(region+"button"))
            if(! (sessionStorage.getItem(region+"button"))){
                sessionStorage.setItem(region+"button", JSON.stringify(false))
            } 
            if(JSON.parse(sessionStorage.getItem(region + "button")!)) {
                let button : HTMLElement = document.getElementById(region)!
                button.setAttribute("class", "RegionButtonClicked")
            }
        }
    }, [])

    return (
        <div className="FilterDisplay">
            <div className="Filter Area">

                <div className="FilterTitle">  
                    <p>Area</p>
                    <div className="Slider">
                        <label className="switch">
                            <input type="checkbox"/>
                            <span className="slider round"/>
                        </label>
                    </div>
                </div>

                <div className="inputFields">
                    <input placeholder="Area"/>
                    <form>
                        <select>
                            <option value="greater">Larger than input</option>
                            <option value="lesser">Smaller than input</option>
                        </select>
                    </form>
                </div>
            </div>

            <div className="Filter Population">
                <div className="FilterTitle">  
                    <p>Population</p>
                    <div className="Slider">
                        <label className="switch">
                            <input type="checkbox"/>
                            <span className="slider round"/>
                        </label>
                    </div>
                </div>

                <div className="inputFields">
                    <input placeholder="Population"/>
                    <form>
                        <select>
                            <option value="greater">Larger than input</option>
                            <option value="lesser">Smaller than input</option>
                        </select>
                    </form>
                </div>
            </div>

            <div className="Filter Region">
                <div className="FilterTitle">  
                    <p>Region</p>
                    <div className="Slider">
                        <label className="switch">
                            <input type="checkbox"/>
                            <span className="slider round"/>
                        </label>
                    </div>
                </div>
                <div className="RegionalButtons">
                    <button className="RegionButton" id="Asia"          onClick={()=> toggleButtonClass("Asia")}>Asia</button>
                    <button className="RegionButton" id="Africa"        onClick={()=> toggleButtonClass("Africa")}>Africa</button>
                    <button className="RegionButton" id="Americas"      onClick={()=> toggleButtonClass("Americas")}>Americas</button>
                    <button className="RegionButton" id="Antarctica"    onClick={()=> toggleButtonClass("Antarctica")}>Antarctica</button>
                    <button className="RegionButton" id="Europe"        onClick={()=> toggleButtonClass("Europe")}>Europe</button>
                    <button className="RegionButton" id="Oceania"       onClick={()=> toggleButtonClass("Oceania")}>Oceania</button>
                </div>
            </div> 
        </div>
    )
}
