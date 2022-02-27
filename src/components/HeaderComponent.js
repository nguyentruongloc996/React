import React from "react";
import { Navbar, NavbarBrand } from 'reactstrap';

function Header(props) {
    return (
        <>
            <Navbar dark>
                <div className='container'>
                    <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
                </div>
            </Navbar>

            <div className="p-5 mb-4 jumbotron">
                <div className="container-fluid py-4">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1 className="display-5 fw-bold">Ristorante Con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fision experience. Our lapsmacking creation will tickle your cu</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;