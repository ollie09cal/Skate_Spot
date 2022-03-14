import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ReactMapGl, { Marker } from 'react-map-gl'
import NavigationBar from './NavigationBar'

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
    Text
} from '@chakra-ui/react'

const Viewspot = () => {
    const [spotData, setSpotData] = useState()
    const id = useParams()

    useEffect(() => {
        const getSpot = async () => {
            try {
                const { data } = await axios.get(`/api/spots/${id.spotid}`)
                setSpotData(data)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }
        getSpot()
    }, [])


    return (
        <>
            <NavigationBar />
            {spotData ?
                <div className="viewspot-div">
                    <Center>
                        <Box mt={4} borderWidth='5px' width='80%' maxWidth='800px' padding={4} bg='#ffffff' className="spot-div">
                            <HStack>
                                <Box width="40%" mr={5}>
                                    <Text
                                        bgGradient='linear(to-l, #7DF9FF, #000411 )'
                                        bgClip='text'
                                        fontSize='3xl'
                                        fontWeight='extrabold'
                                    >
                                        {spotData.name}
                                    </Text>

                                    <Text mb={2} size='md'>{spotData.location}</Text>
                                    <Box mb={2} height={32} borderWidth='3px' >
                                        <ReactMapGl
                                            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                            container='map'
                                            height='100%'
                                            width='100%'
                                            margin='0 auto'
                                            mapStyle="mapbox://styles/mapbox/streets-v9"
                                            style={{ width: '100%', height: '100%' }}
                                            zoom={14}
                                            latitude={spotData.latitude}
                                            longitude={spotData.longitude}
                                        >
                                        </ReactMapGl>
                                    </Box>
                                    <Text mb={2} size='sm'>{spotData.description}</Text>
                                </Box>
                                <Box width="40%">
                                    <Center>
                                        <HStack>
                                            <Text size="xs">Level: </Text>
                                            <Tag mb={2} colorScheme="blackAlpha">{spotData.level}</Tag>
                                        </HStack>
                                    </Center>
                                    <Image mt={3} src={spotData.image} alt="skate park/spot" />
                                    <Text>❤️ {spotData.likes.length} Total likes</Text>
                                </Box>
                            </HStack>
                        </Box>
                    </Center>
                </div>
                :
                <Center>
                    <Spinner />
                </Center>
            }
        </>
    )
}

export default Viewspot