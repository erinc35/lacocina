import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">
                        <h1 className="app-title">la cocina</h1>                          
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to={`/`}>Favorites </NavLink>                             
                            </NavItem>
                            <NavItem>
                                {this.props.isAuthenticated()
                                    ?
                                    <NavLink to={`/`} onClick={this.props.logout}>Logout</NavLink> : 
                                    <NavLink to={`/authenticating`} onClick={this.props.login}>Login</NavLink>
                                }
                            </NavItem>
                            
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;
