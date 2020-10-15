import React, { Component } from 'react'

interface Props{
    countryID: string
}

interface State{
    name: string,
    region: string,
    population: number,
    capital: string,
    language: string,
}

export default class Country extends Component<Props, State> {
    constructor(Props: {countryID : string}){
        super(Props)
        
        this.state = {
            name: 'Sverige',
            region: 'Europe',
            population: 3,
            capital: "Norway",
            language: "European"
        }
        
        //Fetch fra database og sett state her. 
        /*var client = require('mongodb').MongoClient

        client.connect('mongodb://it2810-74.idi.ntnu.no:27017/prosjekt3', function(err : Error, db){
            if (err) throw err

            db.collection('prosjekt3').find().toArray(function (err: Error, result: Array<String>){
                if (err) throw err

                console.log(result)
            })
        })*/
    }

    render() {
        return (
            <div>
                <img src={"https://raw.githubusercontent.com/cristiroma/countries/c6edc915f71c06441fab4da306deac95a28d70aa/data/flags/SVG/" + this.props.countryID + ".svg"} alt={this.props.countryID} width='400px' height="200px"></img>
                <h2>{this.state.name}</h2>
                <p> Region: {this.state.region} <br/>
                    Capital: {this.state.name} <br/> 
                    Language: {this.state.name} <br/>
                    Population: {this.state.population} <br/>
                </p>
                Heisann hoppsann
            </div>
        )
    }
}
