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
import Recipe from '../Recipe/Recipe';
import host from '../host';
import axios from 'axios';



class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            recipes: [],
            recipe: {}
        };
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');         
        this.fetchAllRecipes(userId);
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
                let recipeIds = res.data.map(recipe => recipe.recipeId)
                console.log(recipeIds)
                let recipes = recipeIds.reduce( async(recipes, id) => {
                    await this.fetchRecipe(id)
                    this.setState({ recipes: [...this.state.recipes, this.state.recipe]})
                        // if (result) {
                        //     recipes = [...recipes, this.state.recipe]
                        //     return recipes;
                        // }

                   
                                    
                    }, [])
                // console.log('recipes', recipes)
            
            }
            
                // await this.fetchRecipe(recipeIds[0])
                // console.log(this.state.recipe)
                // this.setState({ recipes: res.data })    
                //  axios.get(`${host}/api/recipes`)
                //       .then(res => {
                //           console.log(res.da
                //       })           
            
        } catch(err){
            console.log(err)
        }
        
    }

    render() {
        return (
            <div>
                <Navbar light expand="md" className='navbar'>
                    <NavbarBrand href="/">
                        <h1 className="app-title">la cocina</h1>                          
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
                                            recipeData: this.state.recipes || []
                                        }
                                    }}>
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
