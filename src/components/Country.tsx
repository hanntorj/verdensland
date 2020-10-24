import React from "react";
import { CountrySummaryInfo } from "../Fetch";
import { Link } from 'react-router-dom';


export default function Country({
  alpha2Code,
  name,
  capital,
  area,
  population,
}: CountrySummaryInfo) {
  return (
    <div className="character">
      <img
        src={
          "https://raw.githubusercontent.com/cristiroma/countries/c6edc915f71c06441fab4da306deac95a28d70aa/data/flags/SVG/" +
          alpha2Code +
          ".svg"
        }
        alt={alpha2Code}
        width="400px"
        height="200px"
      ></img>
      <h2>{name}</h2>
      <div>capital: {capital}</div>
      <div>Area: {area}</div>
      <div>Population: {population}</div>
      <Link to={`country/${alpha2Code}`}>See more</Link>
    </div>
  );
}

interface Props {
  countryID: string;
}

interface State {
  name: string;
  region: string;
  population: number;
  capital: string;
  language: string;
}

// export default class Country extends Component<Props, State> {
//     constructor(Props: {countryID : string}){
//         super(Props)
//
//         this.state = {
//             name: 'Sverige',
//             region: 'Europe',
//             population: 3,
//             capital: "Norway",
//             language: "European"
//         }
//
//     }
//
//     render() {
//         return (
//             <div>
//                 <img src={"https://raw.githubusercontent.com/cristiroma/countries/c6edc915f71c06441fab4da306deac95a28d70aa/data/flags/SVG/" + this.props.countryID + ".svg"} alt={this.props.countryID} width='400px' height="200px"></img>
//                 <h2>{this.state.name}</h2>
//                 <p> Region: {this.state.region} <br/>
//                     Capital: {this.state.name} <br/>
//                     Language: {this.state.name} <br/>
//                     Population: {this.state.population} <br/>
//                 </p>
//                 Heisann hoppsann
//             </div>
//         )
//     }
// }
