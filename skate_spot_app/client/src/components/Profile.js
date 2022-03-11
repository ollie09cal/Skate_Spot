import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ReactMapGl, { Marker } from 'react-map-gl'
import NavigationBar from './NavigationBar'
import Viewspot from './Viewspot'

import {
    Box,
    Spinner,
    Stack,
    Heading,
    Image,
    HStack,
    VStack,
    Button,
    useToast,
    Center,
    Tag,
    Text,
    Avatar
} from '@chakra-ui/react'

function Profile() {
    const [profileData, setProfileData] = useState(null)

    useEffect(() => {
        const getProfile = async () => {
            try {
                const { data } = await axios.get('api/auth/profile',{
                    headers: {Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImV4cCI6MTY0NzUzNDE1Mn0.nnI_sydEgMExA53IrqDSUZIudod91iJeU0_a2_JanWc`}
                })
                setProfileData(data)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }
        getProfile()
    }, [])

    return (
        <>
            <NavigationBar />
            <div className="profile-div">
                {profileData ?
                <div className="profile-data">
                    <HStack>
                        <VStack>
                            <HStack>
                                <Avatar size='xl' borderWidth='3px' name={profileData.username} src={profileData.profile_image} />
                                <Text fontSize='4xl'>{profileData.username}</Text>
                            </HStack>
                            <Text fontSize='2xl'>{profileData.bio}</Text>
                        </VStack>
                    </HStack>
                </div>
                :
                <Center>
                    <Spinner 
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='grey.200'
                        color='red.500'
                        size='xl'
                        mt={50}
                    />
                </Center>
                }
            </div>
        </>
        
    )
}

export default Profile