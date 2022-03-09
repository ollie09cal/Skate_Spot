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
    Heading
} from '@chakra-ui/react'


function Login() {
    //VARIABLES/TOKEN
    const navigate = useNavigate()
    const toast = useToast()

    const setTokenFromLocal = (token) => {
        window.localStorage.setItem('user-token', token)
    }

    //STATES
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const [isError, setIsError] = useState({
        error: false, message: ''
    })

    //FUNCTIONS
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('api/login/')
            setTokenFromLocal(data.token)
            //navigate to profile
            //console.log(loginInfo)
        } catch (err) {
            setIsError({ error: true, message: 'Email and password does not match.' })
            toast({
                title: 'Error',
                description: "Failed to login.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const handleChange = (e) => {
        const newObj = { ...loginInfo, [e.target.id]: e.target.value }
        setLoginInfo(newObj)
    }

    return (
        <div className='login-div'>
            <Heading
                bgGradient='linear(to-l, #7928CA, #7DF9FF)'
                bgClip='text'
                fontSize='6xl'
                fontWeight='extrabold'
                textAlign='center'
                pt={4}
            >Login</Heading>

            <Center>
                <Box mt={3} minWidth='350px' maxWidth='500px'>
                    <form onSubmit={handleSubmit}>

                        <FormControl className="form-element" isRequired isInvalid={isError.error} onSubmit={handleSubmit}>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input 
                                id='email' 
                                type='email' 
                                placeholder='Email' 
                                defaultValue={loginInfo.email} 
                                onChange={handleChange} />
                        </FormControl>

                        <FormControl className="form-element" isRequired isInvalid={isError.error}>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input 
                                id='password' 
                                type='password' 
                                placeholder='Password' 
                                defaultValue={loginInfo.password} 
                                onChange={handleChange} />
                            {isError.error && <FormErrorMessage>{isError.message}</FormErrorMessage>}
                        </FormControl>

                        <Center>
                            <Button className="form-element" type='submit' onSubmit={handleSubmit}>Log in</Button>
                        </Center>

                    </form>
                </Box>
            </Center>
        </div>
    )
}

export default Login