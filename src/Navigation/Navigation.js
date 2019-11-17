import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import './Navigation.css';
import axios from 'axios';
import host from '../host';




class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            recipes: [],
            recipe: {}
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    fetchRecipe = async recipeId => {
        try{
        const res = await axios.get(`${host}/api/recipes/${recipeId}`)
             if(res) {
                //  console.log(res)
                 this.setState({ recipe: res.data})
             }
        }catch(err){
            console.log(err)
        }
    }

    fetchAllRecipes = async id => {
        try{
            const res = await axios.get(`${host}/api/users/${id}/recipes`)
            if(res) {
                this.setState({ recipes: res.data })
            }     
        } catch(err){
            console.log(err)
        }
        
    }

    render() {
        // const userId = localStorage.getItem('userId');  
        
        return (
            <div>
                <Navbar light expand="md" className='navbar'>
                    <NavbarBrand href="/" className='icon-wrap' >
                        <h1 className="app-title">la cocina</h1>                          
                        <i className="fas fa-utensils fa-2x icon"></i>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto nav-items" navbar> 
                            <NavItem>
                                {this.props.isAuthenticated()
                                    ?
                                    <Link to={{
                                        pathname: '/favorites',
                                        state: {
                                            recipeData: this.state.recipes 
                                        }
                                    }} 
                                    // onClick={() => this.fetchAllRecipes(userId)}
                                    >
                                        {localStorage.getItem('displayName')}'s Favorites 
                                    </Link> :
                                null  }                          
                            </NavItem>
                            <NavItem>
                                {this.props.isAuthenticated()
                                    ?
                                    <Link to={`/`} onClick={this.props.logout}>Logout</Link> : 
                                    <Link to={`/authenticating`} onClick={this.props.login}>Login</Link>
                                }
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <div className='recipes'>
                    {/* {this.state.recipes ? this.state.recipes.map(recipe => {
                        return <Recipe recipeData={recipe} key={Math.floor(recipe.calories)} />;
                    }) : <div></div>
                    } */}
                </div>
            </div>
        );
    }
}

export default Navigation;
