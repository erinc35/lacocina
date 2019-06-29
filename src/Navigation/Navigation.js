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
import './Navigation.css';
    

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

    fetchRecipe = id => {
        
    }

    render() {
        return (
            <Navbar expand="md" className='navbar'>
                <NavbarBrand href="/">
                    <h1 className="app-title">la cocina</h1>                          
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar> 
                        <NavItem>
                            {this.props.isAuthenticated()
                                ?
                            <NavLink to={`/`}>{localStorage.getItem('displayName')}'s Favorites </NavLink> :
                            null  }                          
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
        );
    }
}

export default Navigation;
