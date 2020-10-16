import React, { Component } from 'react'
import Wish from '../svg/wish.svg'
import WishFilled from '../svg/wish_filled.svg'
import Flag from '../svg/flag.svg'
import FlagFilled from '../svg/flag_filled.svg'

interface Props{
    countryID: string,

    wish: boolean, //Disse hentes fra databasen og brukes for at symbolene skal settes på refresh 
    flag: boolean
}

interface State{
    name: string,
    region: string,
    population: number,
    capital: string,
    language: string,
    wish: boolean,
    flag: boolean,
    wishSVG: any,
    flagSVG: any
}

export default class Country extends Component<Props, State> {
    constructor(Props: {countryID : string, wish: boolean, flag: boolean}){
        super(Props)

        let tempWish = Props.wish ? WishFilled : Wish
        let tempFlag = Props.flag ? FlagFilled : Flag
        
        this.state = {
            name: 'Sverige',
            region: 'Europe',
            population: 3,
            capital: "Norway",
            language: "European", 
            wish: Props.wish,
            flag: Props.flag,
            wishSVG: tempWish,
            flagSVG: tempFlag,
        }


    }

    handleFlag() {
        this.setState({flagSVG: this.state.flag ? Flag : FlagFilled, flag: !this.state.flag})
        // TODO: Legg inn lagring tel database 

    }

    handleWish() {
        this.setState({wishSVG: this.state.wish ? Wish : WishFilled, wish: !this.state.wish})
    }

    render() {
        return (
            <div>
                <img src={"https://raw.githubusercontent.com/cristiroma/countries/c6edc915f71c06441fab4da306deac95a28d70aa/data/flags/SVG/" + this.props.countryID + ".svg"} alt={this.props.countryID} width='400px' height="200px"></img>
                <div className="ButtonBox">
                    <button className="SVGButton" onClick={() => this.handleFlag()}>
                        <img src={this.state.flagSVG} alt="wish" width="40px" height="40px"/>
                        <p>Visited</p>
                    </button>
                    <button className="SVGButton" onClick={() => this.handleWish()}>
                        <img src={this.state.wishSVG} alt="wish" width="40px" height="40px"/>
                        <p>Wish to travel</p>
                    </button>
                </div>
                <h2>{this.state.name}</h2>
                <p> Region: {this.state.region} <br/>
                    Capital: {this.state.capital} <br/> 
                    Language: {this.state.name} <br/>
                    Population: {this.state.population} <br/>
                </p>
            </div>
        )
    }
}
