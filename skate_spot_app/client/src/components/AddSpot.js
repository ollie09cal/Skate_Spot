import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'
import { ImageUploadField } from './ImageUpload'
import NavigationBar from './NavigationBar'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Box,
    useToast,
    Center,
    Heading,
    Textarea,
    VStack,
    HStack
} from '@chakra-ui/react'
import { SmallAddIcon } from '@chakra-ui/icons'


function AddSpot() {
    //VARIABLES
    const navigate = useNavigate()
    const toast = useToast()

    //STATES
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        longitude: 0,
        latitude: 0,
        image: '',
        description: '',
        rating: 0,
        level: ''
    })
    const [formError, setFormError] = useState({
        name: '',
        location: '',
        longitude: 0,
        latitude: 0,
        image: '',
        description: '',
        rating: 0,
        level: ''
    })
    const [searchValues, setSearchValues] = useState({
        search: ''
    })
    const [resultsOptions, setResultsOptions] = useState([])

    //FUNCTIONS
    const handleSearch = (e) => setSearchValues({ ...searchValues, [e.target.name]: e.target.value })
    const search = (e) => {
        const { center } = resultsOptions[resultsOptions.findIndex(result => result.place_name === e.target.innerText)]
        setFormData({ ...formData, longitude: center[0], latitude: center[1], location: e.target.innerText })
        setSearchValues({ search: e.target.innerText })
        setResultsOptions([])
    }
    const searchSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValues.search}.json?access_token=pk.eyJ1IjoianZpY2tlcnMiLCJhIjoiY2t6bGFuZTNoMHl3MDJza2Vvd2U2Mm84cSJ9.nYy2TJv3ChiUdpl4CLtYJA`)
            const results = data.features
            setResultsOptions(results)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(formData)
            const { data } = await axios.post('api/spots/', formData, {
                headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImV4cCI6MTY0NzUzNDE1Mn0.nnI_sydEgMExA53IrqDSUZIudod91iJeU0_a2_JanWc` }
            })
            console.log(data)
            toast({
                title: 'Spot Created!',
                description: 'You have sucessfully added your spot to our database 🛹',
                status: 'success',
                duration: 9000,
                isCloseable: true
            })
            navigate('/login')
        } catch (err) {
            setFormError({ ...formError, ...err.response.data.errors })
            console.log(err)
            toast({
                title: 'Error',
                description: "failed to create spot please ensure all fields have been filled in",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }
    const handleChange = (e) => {
        setFormError({ ...formError, [e.target.id]: '' })
        const newObj = { ...formData, [e.target.id]: e.target.value }
        setFormData(newObj)
    }
    const handleImageUrl = url => {
        setFormData({ ...formData, profile_image: url })
    }

    return (
        <>
            <NavigationBar />
            <div className="add-spot-div">
                <Heading
                    bgGradient='linear(to-l, #7928CA, #7DF9FF)'
                    bgClip='text'
                    fontSize='6xl'
                    fontWeight='extrabold'
                    textAlign='center'
                    pt={4}
                >Add Spot.</Heading>
                <Center>
                    <Box mt={3} minWidth='350px' maxWidth='600px'>
                        <form onSubmit={handleSubmit}>
                            <FormControl className="form-element" isRequired IsInvalid={formError.name}>
                                <FormLabel htmlFor='name'>Add a unique name for the spot</FormLabel>
                                <Input
                                    id='name'
                                    type='text'
                                    placeholder='Old joes curb...'
                                    defaultValue={formData.name}
                                    onChange={handleChange}
                                />
                                {formError.name && <FormErrorMessage>Keep it unique and under 100 characters</FormErrorMessage>}
                            </FormControl>

                            <FormControl className='form-element' isRequired isInvalid={formError.location}>
                                <FormLabel htmlFor='location' mt={4}>Location, Location, Location!</FormLabel>
                                <Input
                                    placeholder='Search'
                                    size='md'
                                    name='search'
                                    value={searchValues.search}
                                    onChange={handleSearch} />
                                <Button className='search-button' mt={2} mb={3} onClick={searchSubmit}>Search</Button>
                                {!!resultsOptions.length &&
                                    <Box className='search-results' width='300px'>
                                        <VStack spacing={4} position='absolute' zIndex={1} bg='white' width='100%'>
                                            {resultsOptions.map((option, i) => {
                                                console.log(option)
                                                return (
                                                    <Box h='40px' key={i} onClick={search} >
                                                        <p>{option.place_name}</p>
                                                    </Box>
                                                )
                                            })}
                                        </VStack>
                                    </Box>
                                }
                                {formError.location && <FormErrorMessage>Invalid location (try chosing somewhere near)</FormErrorMessage>}
                            </FormControl>

                            <FormControl className='form-element' isRequired isInvalid={formError.image}>
                                <FormLabel htmlFor="image">Upload a photo of your spot!</FormLabel>
                                <ImageUploadField
                                value={formData.image}
                                name="profile_image"
                                handleImageUrl={handleImageUrl}
                            />
                            </FormControl>

                            <Center><Button
                                className="form-element"
                                type='submit'
                                rightIcon={<SmallAddIcon />}
                                onSubmit={() => {
                                    handleSubmit()
                                }}>Add Spot!</Button>
                            </Center>

                        </form>
                    </Box>
                </Center>
            </div>
        </>

    )
}

export default AddSpot