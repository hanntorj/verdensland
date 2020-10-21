import React from "react";
import { CountrySummaryInfo } from "../Fetch";

export default function CountryDisplay({
  alpha,
  name,
  capitol,
  area,
  population,
}: CountrySummaryInfo) {

  return (
    <div className="character">
            <h1>test</h1>
      <img src={"https://raw.githubusercontent.com/cristiroma/countries/c6edc915f71c06441fab4da306deac95a28d70aa/data/flags/SVG/" + alpha + ".svg"} alt={alpha} width='400px' height="200px"></img>
      <h2>{name}</h2>
      <div>Capitol: {capitol} cm</div>
      <div>Area: {area}</div>
      <div>Population: {population}</div>
      {/* TODO her skal vi linke til mer info om hvert enkelt land. må gjøre nytt fetch innad i denne */}
      {/* <Link to={`country/${aplha}`}>Link to character page</Link> */}
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
