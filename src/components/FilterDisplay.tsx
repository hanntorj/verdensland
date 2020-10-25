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
    const storeState = useSelector((state: reduxState) => state) // Should consider refactoring <filter>Active in store to be inside state.filters

    // Setup of  actions to change redux-store
    const dispatch = useDispatch()
    const addRegion = (id : string) => {dispatch(addRegionAction(id))}
    const removeRegion = (id : string) => {dispatch(removeRegionAction(id))}
    const updatePopNumber = (amount : number) => {dispatch(updatePopAction(amount))}
    const updateAreaNumber = (amount : number) => {dispatch(updateAreaAction(amount))}
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
        let regionSlider : HTMLInputElement = (document.getElementById('regionCheck') as HTMLInputElement)!
        let popSlider    : HTMLInputElement = (document.getElementById('popCheck')    as HTMLInputElement)!
        let areaSlider   : HTMLInputElement = (document.getElementById('areaCheck')   as HTMLInputElement)!
        regionSlider.checked = storeState.regionsActive
        popSlider.checked = storeState.popActive
        areaSlider.checked = storeState.areaActive


        //Area & population: 
        let areaInput : HTMLInputElement = (document.getElementById('areaInput') as HTMLInputElement)!
        let popInput  : HTMLInputElement = (document.getElementById('popInput')  as HTMLInputElement)!
        areaInput.value = filterState.area > 0 ? JSON.stringify(filterState.area) : ''
        popInput.value  = filterState.pop  > 0 ? JSON.stringify(filterState.pop)  : ''
        
        //Greater than-fields: 
        let areaSelector : HTMLSelectElement = (document.getElementById("areaGreater") as HTMLSelectElement)!
        let popSelector  : HTMLSelectElement = (document.getElementById("popGreater")  as HTMLSelectElement)!
        areaSelector.value = filterState.areaGreater ? 'greater' : 'lesser'
        popSelector.value  = filterState.popGreater  ? 'greater' : 'lesser'


        //Regional buttons:
        for(var x in regions){
            let region : string = regions[x]
            if(filterState.regions.includes(region)){
                let button : HTMLElement = document.getElementById(region)!
                button.setAttribute('class', 'RegionButtonClicked')
            }
        }
    })

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
                            <input id="areaCheck" type="checkbox" onClick={()=>toggleFilter('area')}/>
                            <span className="slider round"/>
                        </label>
                    </div>
                </div>

                <div className="inputFields">
                    <input type="number" id="areaInput" placeholder="Area" onChange={()=>handleNumberInput('area')}/>
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
                            <input id="popCheck" type="checkbox" onClick={()=>toggleFilter('pop')}/>
                            <span className="slider round"/>
                        </label>
                    </div>
                </div>

                <div className="inputFields">
                    <input id="popInput" type="number" placeholder="Population" onChange={()=>handleNumberInput('pop')}/>
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
                            <input id="regionCheck" type="checkbox" onClick={()=>toggleFilter('regions')}/>
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