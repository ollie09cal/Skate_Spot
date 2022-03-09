import { useNavigate } from 'react-router-dom'
import { 
    Heading, 
    Button,
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import coach_frank from './../materials/coach_frank.png'

function Homepage() {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const signUpNav = () => {
        navigate('/signup')
    }
    const LoginNav = () => {
        navigate('/login')
    }

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
            <Center>
                <Button
                    bgGradient='linear(to-l, #7928CA, #7DF9FF)'
                    mt={3} 
                    onClick={onOpen}>Info</Button>
            </Center>
            
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Center>
                            <img width='30px' src={coach_frank} alt="coach frank from skate 3" />
                        </Center>   
                        Coach Frank Says...
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Welcome to the glorious world of skate spots, the web app that allows you to find that spot that you have been itching for!
                        From sign up you will be be able to search the UK for spots that skaters, much like yourself, have shreaded and uploaded themselves!
                        I encourage you to also take part in the community by uploading your own spots and leaving reviews at the spots you have skated..<br /><br />
                        <Center>
                            🛹 HAPPY SKATING 🛹
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Get Skating!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <div className='button-div'>
                <Button onClick={LoginNav}>Login</Button>
                <Button onClick={signUpNav}>Sign Up</Button>
            </div>
        </div>
    )
}

export default Homepage