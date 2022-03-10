import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NavigationBar from './NavigationBar'

function Profile() {
    const [profileData, setProfileData] = useState(null)

    return (
        <>
            <NavigationBar />
            <h2>Profile Page</h2>
        </>
        
    )
}

export default Profile