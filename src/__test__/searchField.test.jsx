import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import SearchBar from '../components/SearchBar'


describe("Test that searchfield saves input and updates reduxstore", ()=> {

    const setup = (store) => {
        const utils = render(<><Provider store={store}><SearchBar/></Provider></>)
        const input = utils.getByTestId('searchInput')
        return {
          input,
          ...utils,
        }
    }

    it("Typing in searchfield ", ()=> {
        const storeCopy = store
        const { input } = setup(storeCopy)
        fireEvent.change(input, {target: {value: "nor"}})
        expect(input.value).toBe("nor")
        expect(storeCopy.getState().searchString).toBe("nor")
    })
})