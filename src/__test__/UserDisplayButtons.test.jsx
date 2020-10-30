import React from 'react'
import { render } from '@testing-library/react'
import UserDisplayButton from '../components/UserDisplayButton'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from '../app/store'

describe("Test for checking that userDisplayButton renders correctly", ()=>{

    it('Renders without crashing', ()=>{
        const div = document.createElement("div")
        ReactDOM.render(<><Provider store={store}><UserDisplayButton type="WISH"/></Provider></>,div)
    })

    it('UserDataButtons renders the correct text based on type', () => {
        const {queryByText} = render(<><Provider store={store}><UserDisplayButton type="FLAG"/></Provider></>)
        expect(queryByText(/Visited/i))
    })

    it('UserDataButtons renders the correct text based on type', () => {
        const {queryByText} = render(<><Provider store={store}><UserDisplayButton type="WISH"/></Provider></>)
        expect(queryByText(/Want to visit/i))
    })
})

