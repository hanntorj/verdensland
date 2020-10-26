import React, { Component } from 'react'
import Wish from '../svg/wish.svg'
import WishFilled from '../svg/wish_filled.svg'
import Flag from '../svg/flag.svg'
import FlagFilled from '../svg/flag_filled.svg'

interface State {
    wish : boolean,
    flag : boolean,
    flagSVG : any, 
    wishSVG : any
}

interface Props {
    alpha: string,
    //userID : string
}

export default class UserDataButtons extends Component<Props, State> {
    constructor(props : {alpha: string}){ //
        super(props)
        //let tempWish = props.wish ? WishFilled : Wish
        //let tempFlag = props.flag ? FlagFilled : Flag

        // Fetch userData from db

        this.state = {
            wish : false,   // Update these when able to fetch from db
            flag : false,   // Update these when able to fetch from db
            flagSVG : Flag,
            wishSVG : Wish
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
        )
    }
}
