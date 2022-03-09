import { useNavigate } from 'react-router-dom'
import { Heading, Button } from '@chakra-ui/react'

function Homepage() {
    const navigate = useNavigate()

    return (
        <div className="homepage-div">
            <Heading
                bgGradient='linear(to-l, #7928CA, #7DF9FF)'
                bgClip='text'
                fontSize='6xl'
                fontWeight='extrabold'
                textAlign='center'
                paddingTop='20'
            >Skate Spot.</Heading>
            <div className='button-div'>
                <Button>Login</Button>
                <Button>Sign Up</Button>
            </div>
        </div>
    )
}

export default Homepage