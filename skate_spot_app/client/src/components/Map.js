import React, { useState, useEffect } from "react"
import axios from 'axios'
import NavigationBar from './NavigationBar'
import { Center, Spinner, Image, useDisclosure, Input, Button, Text, FormControl, Select, FormLabel, Box, VStack, Menu, Modal, ModalFooter, ModalBody, ModalHeader, ModalOverlay, ModalContent, ModalCloseButton, Heading, Checkbox, HStack } from '@chakra-ui/react'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import { useParams, useNavigate, Link } from 'react-router-dom'


function Map() {
    const navigate = useNavigate()
    const [spotsData, setSpotsData] = useState()
    const [viewport, setViewport] = useState({
        longitude: 54.766937104419014,
        latitude: -4.756711467711366
    })

    useEffect(() => {
        const getSpots = async () => {
            try {
                const { data } = await axios.get('/api/spots')
                setSpotsData(data)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }
        getSpots()
    }, [])


    return (
        <>
            <NavigationBar />

            <div className="map-div">

                <Heading
                    bgGradient='linear(to-l, #7928CA, #7DF9FF)'
                    bgClip='text'
                    fontSize='6xl'
                    fontWeight='extrabold'
                    textAlign='center'
                    pt={4}
                >Map.</Heading>
                {spotsData ?
                    <Center>
                        <Box height='800px' width='700px' borderWidth='3px'>
                            <ReactMapGl
                                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                container='map'
                                height='100%'
                                width='100%'
                                mapStyle="mapbox://styles/mapbox/streets-v9"
                                style={{ width: '100%', height: '100%' }}
                                zoom={5}
                                latitude={viewport.longitude}
                                longitude={viewport.latitude}
                            >
                                {spotsData.map(spot => {
                                    return (

                                        <Marker color='red'  key={spot.location} latitude={spot.latitude} longitude={spot.longitude}>
                                            <Link to={`/viewspot/${spot.id}`}>
                                                🛹
                                            </Link>
                                        </Marker>
                                    )
                                })}
                            </ReactMapGl>
                        </Box>
                    </Center>
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
        </>
    )
}

export default Map