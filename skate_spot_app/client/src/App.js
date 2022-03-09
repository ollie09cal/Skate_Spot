import React from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

//PAGES:
import Homepage from './components/Homepage'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import Profile from './components/Profile'
import Map from './components/Map'
import AddSpot from './components/AddSpot'

function App() {
  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get('api/spots/') // * <-- replace with your endpoint
  //     console.log(data)
  //   }
  //   getData()
  // })

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/map' element={<Map />} />
          <Route path='/addspot' element={<AddSpot />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
