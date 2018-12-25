import React, { Component } from "react";
import QuickLinks from '../QuickLinks/QuickLinks';
import Recipe from '../Recipe/Recipe';
import './Search.css';
import axios from 'axios';


let app_id = process.env.REACT_APP_YOUR_APP_ID;
let app_key = process.env.REACT_APP_YOUR_APP_KEY;



class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ingredients: "",
            low_carb: false,
            high_protein: false,
            high_fiber: false,
            low_sodium: false,
            recipes: [],
            not_found: false
         }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    searchRecipe = e => {
        e.preventDefault();
        const ingInput = this.state.ingredients;
        const api = `https://api.edamam.com/search?q=${ingInput}&app_id=${app_id}&app_key=${app_key}`
        
        axios.get(api)
            .then(response => {
                response.data.hits.length > 0 ? this.setState({ recipes: response.data.hits, not_found: false}) : 
                    this.setState({ not_found: true });
                console.log(this.state)
            })
            .catch(err => {
                console.log(err);
            });
    }



    render() { 
        return (  
            <div>
                <div className="search-wrap">
                        <form onSubmit={this.searchRecipe}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Ingredient</label>
                                <div className="col-sm-10">
                                <input onChange={this.handleInput} className="form-control" placeholder="Ingredient" name='ingredients'/>
                                </div>
                            </div>
                            <fieldset className="form-group">
                                <div className="row">
                                    <legend className="col-form-label col-sm-2 pt-0">Diet Options</legend>
                                    <div className="col-sm-10 diet-opts">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="gridRadios"/>
                                            <label className="form-check-label" >Low-carb</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="gridRadios" />
                                            <label className="form-check-label" >High-protein</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="gridRadios" />
                                            <label className="form-check-label" >High-fiber</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="gridRadios" />
                                            <label className="form-check-label" >Low-sodium</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary">Search Recipe</button>
                                </div>
                            </div>
                        </form>
                </div>
                <QuickLinks />
                <div className='recipes'>
                    {this.state.not_found === false ? this.state.recipes.map(recipe => {
                        console.log(recipe)
                        return <Recipe recipeData={recipe.recipe} key={Math.floor(recipe.recipe.calories)} />;
                    }) : <div className='not-found'>
                        <p className='not-found-text'>Sorry, there is nothing cook with {this.state.ingredients}.</p>
                    </div>
                    }
                </div>
            </div>
        );
    }
}
 
export default Search;