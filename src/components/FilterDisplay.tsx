import React, {useLayoutEffect} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { toggleFilterAction, addRegionAction, removeRegionAction, updatePopAction, updateAreaAction, toggleGreaterThanAction, reduxState} from '../app/store'
import '../css/sliders.css'

function FilterDisplay() {

    var regions = [
        "Africa", "Americas", "Antarctica", "Asia", "Europe", "Oceania"
    ]

    // Fetch state from redux-store
    const filterState = useSelector((state: reduxState) => state.filters)

    // Setup of  actions to change redux-store
    const dispatch = useDispatch()
    const addRegion = (id : string) => {dispatch(addRegionAction(id))}
    const removeRegion = (id : string) => {dispatch(removeRegionAction(id))}
    //const updatePopNumber = (amount : number) => {dispatch(updatePopAction(amount))}
    //const updateAreaNumber = (amount : number) => {dispatch(updateAreaAction(amount))}
    const toggleGreaterThan = (filter : string) => {dispatch(toggleGreaterThanAction(filter))}
    const toggleFilter = (filterType: string) => dispatch(toggleFilterAction(filterType))

    //console.log(useSelector((state : reduxState) => state))

    function toggleButtonClass(id : string){
        // Function that toggle the display of a button when it is clicked.
        let button : HTMLElement = document.getElementById(id)!
        if(! filterState.regions.includes(id)){
            button.setAttribute("class", "RegionButtonClicked")
            addRegion(id)
        } else {
            button.setAttribute("class", "RegionButton")
            removeRegion(id)
        }
    }

    useLayoutEffect(()=>{
        // Hook that handles display of component on refreshes

        //Sliders:
        //TODO

        //Area & population: 
        if(filterState.areaGreater){
            console.log("Kom meg inn i loopen")
            let areaSelector : HTMLSelectElement = (document.getElementById("areaGreater") as HTMLSelectElement)!
            areaSelector.value = 'greater'
        }
        if(filterState.popGreater){
            let areaSelector : HTMLSelectElement = (document.getElementById("popGreater") as HTMLSelectElement)!
            areaSelector.value = 'greater'
        }

        //Greater than-fields: 
        //TODO

        //Regional buttons:
        for(var x in regions){
            let region : string = regions[x]
            if(filterState.regions.includes(region)){
                let button : HTMLElement = document.getElementById(region)!
                button.setAttribute('class', 'RegionButtonClicked')
            }
        }
    })

    return (
        <div className="FilterDisplay">
            <div className="Filter Area">

                <div className="FilterTitle">  
                    <p>Area</p>
                    <div className="SliderDiv">
                        <label className="switch">
                            <input type="checkbox" onClick={()=>toggleFilter('area')}/>
                            <span className="slider round"/>
                        </label>
                    </div>
                </div>

                <div className="inputFields">
                    <input className="areaInput" placeholder="Area"/>
                    <form>
                        <select id="areaGreater" onChange={()=>toggleGreaterThan('area')}>
                            <option value="lesser">Smaller than input</option>
                            <option value="greater">Larger than input</option>
                        </select>
                    </form>
                </div>
            </div>

            <div className="Filter Population">
                <div className="FilterTitle">  
                    <p>Population</p>
                    <div className="SliderDiv">
                        <label className="switch">
                            <input type="checkbox" onClick={()=>toggleFilter('pop')}/>
                            <span className="slider round"/>
                        </label>
                    </div>
                </div>

                <div className="inputFields">
                    <input className="popInput" placeholder="Population"/>
                    <form>
                        <select id="popGreater" onChange={()=>toggleGreaterThan('pop')}>
                            <option value="lesser">Smaller than input</option>
                            <option value="greater">Larger than input</option>
                        </select>
                    </form>
                </div>
            </div>

            <div className="Filter Region">
                <div className="FilterTitle">  
                    <p>Region</p>
                    <div className="SliderDiv">
                        <label className="switch">
                            <input type="checkbox" onClick={()=>toggleFilter('regions')}/>
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

export default connect()(FilterDisplay);