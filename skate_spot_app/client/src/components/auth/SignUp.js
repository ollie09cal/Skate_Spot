import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'
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
    Textarea
} from '@chakra-ui/react'
import { SmallAddIcon } from '@chakra-ui/icons'


function SignUp() {
    //VARIABLES
    const navigate = useNavigate()
    const toast = useToast()

    //STATES
    const [signUpInfo, setSignUpInfo] = useState({
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        bio: '',
        profile_image: ''
    })
    const [formError, setFormError] = useState({
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        bio: '',
        profile_image: ''
    })

    //FUNCTIONS
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(signUpInfo)
            toast({
                title:'Registered!',
                description: 'You have sucessfully signed up! Happy Skating and welcome to the community!',
                status: 'success',
                duration: 9000,
                isCloseable: true
            })
            //navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setFormError({ ...formError, [e.target.id]: ''})
        const newObj = { ...signUpInfo, [e.target.id]: e.target.value }
        setSignUpInfo(newObj)
    }

    return (
        <div className="signup-div">

            <Heading
                bgGradient='linear(to-l, #7928CA, #7DF9FF)'
                bgClip='text'
                fontSize='6xl'
                fontWeight='extrabold'
                textAlign='center'
                pt={4}
            >Sign Up.</Heading>

            <Center>
                <Box mt={3} minWidth='350px'>
                    <form onSubmit={handleSubmit}>
                        <FormControl className="form-element" isRequired IsInvalid={formError.email}>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input
                                id='email'
                                type='email'
                                placeholder='Email'
                                defaultValue={signUpInfo.email}
                                onChange={handleChange}
                            />
                            {formError.email && <FormErrorMessage>Email is already in use.</FormErrorMessage>}
                        </FormControl>

                        <FormControl className="form-element" isRequired IsInvalid={formError.username}>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <Input
                                id='username'
                                type='text'
                                placeholder='Username'
                                defaultValue={signUpInfo.username}
                                onChange={handleChange}
                            />
                            {formError.username && <FormErrorMessage>Username is already in use! *keep below 50 characters</FormErrorMessage>}
                        </FormControl>

                        <FormControl className="form-element" isRequired IsInvalid={formError.bio}>
                            <FormLabel htmlFor='bio'>Bio</FormLabel>
                            <Textarea
                                resize='none'
                                id='bio'
                                type='text'
                                placeholder='write a short bio describing yourself as a skater (max 255 characters)'
                                defaultValue={signUpInfo.bio}
                                onChange={handleChange}
                            />
                            {formError.bio && <FormErrorMessage>Please ensure you bio is below 255 characters.</FormErrorMessage>}
                        </FormControl>

                        <FormControl className="form-element" isRequired IsInvalid={formError.password}>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input
                                id='password'
                                type='password'
                                placeholder='Password'
                                defaultValue={signUpInfo.password}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl className="form-element" isRequired IsInvalid={formError.password_confirmation}>
                            <FormLabel htmlFor='password'>Confirm your password</FormLabel>
                            <Input
                                id='password_confirmation'
                                type='password'
                                placeholder='Password'
                                defaultValue={signUpInfo.password_confirmation}
                                onChange={handleChange}
                            />
                            {formError.password_confirmation && <FormErrorMessage>Passwords do not match!</FormErrorMessage>}
                        </FormControl>

                        {/* <ImageUpload value={signUpInfo.profile_image} name="profileImage" handleImageURL={handleImageURL} /> */}

                        <Center><Button
                            className="form-element"
                            type='submit'
                            rightIcon={<SmallAddIcon />}
                            onSubmit={() => {
                                handleSubmit()
                            }}>Sign Up!</Button>
                        </Center>
                    </form>
                </Box>
            </Center>
        </div>
    )
}

export default SignUp