import React from 'react'
import { User } from '../Interfaces' 
import { setUserAction } from '../app/store'
import { connect, useDispatch } from 'react-redux'
import { getUserData, requestUserID } from '../Fetch'

function SetUser() {
    
    const dispatch = useDispatch()
    const setUser  = (user: User) => dispatch(setUserAction(user))
    
    const handleExistingUser = (user: User) => {
        if(user){
            setUser(user)
        }
    }
    
    const handleNewUser = (user: User) => {
        if(user){
            setUser(user)
            localStorage.setItem("userID", user._id)
        }
    }
    
    const storageID : string | null = localStorage.getItem("userID")
    if(! sessionStorage.getItem("visited")){
        sessionStorage.setItem("visited", "true")
        if (storageID) {
            getUserData(handleExistingUser, storageID)
        } else {
            requestUserID(handleNewUser)
        }
    }

    return (
        <>  
        </>
    )
}

export default connect()(SetUser)