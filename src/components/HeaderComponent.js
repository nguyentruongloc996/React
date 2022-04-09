import React, { useState } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button, Modal, ModelHeader, ModalBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Header(props) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function toogleNav() {
        setIsNavOpen(!isNavOpen);
    };

    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <Navbar dark expand="md">
                <div className='container'>
                    <NavbarToggler onClick={toogleNav} />
                    <NavbarBrand className="mr-auto" href='/'>
                        <img src="assets/images/logo.png" height="30" width="41" alt='Ristorante Con Fusion' />
                    </NavbarBrand>
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg"></span> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus">
                                    <span className="fa fa-info fa-lg"></span> About Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    <span className="fa fa-list fa-lg"></span> Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus">
                                    <span className="fa fa-address-card fa-lg"></span> Contact Us
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button outline onClick={toggleModal}>
                                    <span className="fa fa-sign-in fa-lg">
                                        Login
                                    </span>
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>

            <div className="p-5 mb-4 jumbotron">
                <div className="container py-4">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1 className="display-5 fw-bold">Ristorante Con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader>Login</ModalHeader>
                <ModalBody>

                </ModalBody>
            </Modal>
        </>
    );
}

export default Header;