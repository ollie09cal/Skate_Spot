import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav, { } from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import coach_frank from './../materials/coach_frank.png'
import { useNavigate } from 'react-router-dom'

const NavigationBar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem('user-token')
        navigate('/')
    }

    return (
        <Navbar bg="light">
            <Container className="navbar-container">
                {/* <Navbar.Brand className="brand">
                    <img width='30px' src={coach_frank} alt="coach frank from the skate games" />
                </Navbar.Brand> */}

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse>
                    <div className="links-div">
                        <Nav.Item>
                            <Link to="/profile">Profile.</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/map">Map.</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/addspot">Add Spot.</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link onClick={window.localStorage.removeItem('user-token')} to="/">Log Out.</Link>
                        </Nav.Item>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar