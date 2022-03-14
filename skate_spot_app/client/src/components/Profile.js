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
    const navigate = useNavigate()

    const [profileData, setProfileData] = useState(null)


    useEffect(() => {
        const getProfile = async () => {
            try {
                const { data } = await axios.get('api/auth/profile', {
                    headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImV4cCI6MTY0NzUzNDE1Mn0.nnI_sydEgMExA53IrqDSUZIudod91iJeU0_a2_JanWc` }
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
            <Center>
                <div className="profile-div">
                    {profileData ?
                        <div className="profile-data">
                            <HStack>
                                <Box m={5}>
                                    <VStack>
                                        <HStack>
                                            <Avatar size='xl' borderWidth='3px' name={profileData.username} src={profileData.profile_image} />
                                            <Text fontSize='4xl'>{profileData.username}</Text>
                                        </HStack>
                                        <Box maxWidth={500}>
                                            <Text fontSize='2xl' className='electric-blue'>Bio:</Text>
                                            <Text fontSize='xl' mb={10}>{profileData.bio}</Text>
                                        </Box>
                                        <Text fontSize='l'>Add another spot...</Text>
                                        <Link to={'/addspot'}>
                                            <Button>+</Button>
                                        </Link>
                                    </VStack>
                                </Box>
                                <Link to={`/viewspot/${profileData.spots[2].id}`}>
                                    <Box mt={4} borderWidth='5px' width='80%' maxWidth='600px' padding={4} bg='#ffffff' className="spot-div">
                                        <HStack>
                                            <Box width="40%" >
                                                <Text
                                                    bgGradient='linear(to-l, #7DF9FF, #000411 )'
                                                    bgClip='text'
                                                    fontSize='3xl'
                                                    fontWeight='extrabold'
                                                >
                                                    {profileData.spots[2].name}
                                                </Text>

                                                <Text mb={2} size='md'>📍 {profileData.spots[2].location}</Text>
                                                <Text mb={2} size='sm'>{profileData.spots[2].description}</Text>
                                            </Box>
                                            <Box width="40%">
                                                <Center>
                                                    <HStack>
                                                        <Text size="xs">Level: </Text>
                                                        <Tag mb={2} colorScheme="blackAlpha">{profileData.spots[2].level}</Tag>
                                                    </HStack>
                                                </Center>
                                                <Image mt={3} src={profileData.spots[2].image} alt="skate park/spot" />
                                            </Box>
                                        </HStack>
                                    </Box>
                                </Link>
                            </HStack>

                        </div>
                        :
                        <Center>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                size='xl'
                                mt={50}
                            />
                        </Center>
                    }
                </div>
            </Center>
        </>

    )
}

export default Profile