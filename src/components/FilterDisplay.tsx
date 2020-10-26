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
    const addRegion         = (id : string)        => {dispatch(addRegionAction(id))}
    const removeRegion      = (id : string)        => {dispatch(removeRegionAction(id))}
    const updatePopNumber   = (amount : number)    => {dispatch(updatePopAction(amount))}
    const updateAreaNumber  = (amount : number)    => {dispatch(updateAreaAction(amount))}
    const toggleGreaterThan = (filter : string)    => {dispatch(toggleGreaterThanAction(filter))}
    const toggleFilter      = (filterType: string) => {dispatch(toggleFilterAction(filterType))}

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

    const handleNumberInput = (filter: string) => {
        // Function that handles change on inputfields
        let inputField : HTMLInputElement = (document.getElementById(filter+"Input") as HTMLInputElement)!

        let inputStringValue: string = inputField.value
        let inputValue : number = -1
        
        if(inputStringValue === ''){
            inputValue = 0
        } else if (JSON.parse(inputStringValue) < 0) {
            inputField.value = ''
            inputField.placeholder = 'Please insert a valid number'
            return 
        } else {
            inputValue = JSON.parse(inputStringValue)
        }

        if (filter === 'pop') {
            inputField.placeholder = 'Population'
            updatePopNumber(inputValue)
        } else if (filter === 'area'){
            inputField.placeholder = 'Area'
            updateAreaNumber(inputValue)
        }
    }

    return (
        <div className="FilterDisplay">
            <div className="Filter Area">

                <div className="FilterTitle">  
                    <p>Area</p>
                    <div className="SliderDiv">
                        <label className="switch">
                            <input id="areaCheck" type="checkbox" checked={filterState.areaActive} onClick={()=>toggleFilter('area')}/>
                            <span className="slider round"/>
                        </label>
                    </div>
                </div>

                <div className="inputFields">
                    <input type="number" id="areaInput" placeholder="Area" value={filterState.area > 0 ? JSON.stringify(filterState.area) : ''} onChange={()=>handleNumberInput('area')}/>
                    <form>
                        <select id="areaGreater" value={filterState.areaGreater ? 'greater' : 'lesser'} onChange={()=>toggleGreaterThan('area')}>
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
                            <input id="popCheck" type="checkbox" checked={filterState.popActive} onClick={()=>toggleFilter('pop')}/>
                            <span className="slider round"/>
                        </label>
                    </div>
                </div>

                <div className="inputFields">
                    <input id="popInput" type="number" placeholder="Population" value={filterState.pop  > 0 ? JSON.stringify(filterState.pop)  : ''}onChange={()=>handleNumberInput('pop')}/>
                    <form>
                        <select id="popGreater" value={filterState.popGreater  ? 'greater' : 'lesser'} onChange={()=>toggleGreaterThan('pop')}>
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
                            <input id="regionCheck" type="checkbox" checked={filterState.regionsActive} onClick={()=>toggleFilter('regions')}/>
                            <span className="slider round"/>
                        </label>
                    </div>
                </div>
                <div className="RegionalButtons">
                    <button className={filterState.regions.includes('Asia')       ? 'RegionButtonClicked': 'RegionButton'} id="Asia"          onClick={()=> toggleButtonClass("Asia")}>Asia</button>
                    <button className={filterState.regions.includes('Africa')     ? 'RegionButtonClicked': 'RegionButton'} id="Africa"        onClick={()=> toggleButtonClass("Africa")}>Africa</button>
                    <button className={filterState.regions.includes('Americas')   ? 'RegionButtonClicked': 'RegionButton'} id="Americas"      onClick={()=> toggleButtonClass("Americas")}>Americas</button>
                    <button className={filterState.regions.includes('Antarctica') ? 'RegionButtonClicked': 'RegionButton'} id="Antarctica"    onClick={()=> toggleButtonClass("Antarctica")}>Antarctica</button>
                    <button className={filterState.regions.includes('Europe')     ? 'RegionButtonClicked': 'RegionButton'} id="Europe"        onClick={()=> toggleButtonClass("Europe")}>Europe</button>
                    <button className={filterState.regions.includes('Oceania')    ? 'RegionButtonClicked': 'RegionButton'} id="Oceania"       onClick={()=> toggleButtonClass("Oceania")}>Oceania</button>
                </div>
            </div> 
        </div>
    )
}

export default connect()(FilterDisplay);