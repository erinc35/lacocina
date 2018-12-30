import React, { Component } from "react";
import QuickLinks from '../QuickLinks/QuickLinks';
import Recipe from '../Recipe/Recipe';
import './Search.css';
import axios from 'axios';
import $ from 'jquery';


let app_id = process.env.REACT_APP_YOUR_APP_ID;
let app_key = process.env.REACT_APP_YOUR_APP_KEY;



class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ingredients: "",
            recipes: [],
            not_found: false, 
            searched: '',
            diets: {
                low_carb: false,
                high_protein: false,
                high_fiber: false,
                low_sodium: false
            }
         }
    }

    // componentDidMount() {
    //     this.setState({
    //         not_found: false
    //     })
    // }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    searchRecipe = e => {
        e.preventDefault();
        // this.setState({ recipes: []})
        // this.forceUpdate()
        const ingInput = this.state.ingredients;
        this.setState({ searched: this.state.ingredients })
        let api = `https://api.edamam.com/search?q=${ingInput}&app_id=${app_id}&app_key=${app_key}`;

        if (this.state.diets.low_carb || this.state.diets.high_protein || this.state.diets.high_fiber || this.state.diets.low_sodium) {
            api = api + '&diet='
        }
        console.log(this.state.diets.low_carb)
        if(this.state.diets.low_carb === true) {
            api = api + 'low-carb'
            console.log(api)
        }
        // else if(this.state.high_protein) {
        //     api = api + ''
        // }
        
        axios.get(api)
            .then(response => {
                response.data.hits.length > 0 ? this.setState({ recipes: response.data.hits, not_found: false}) : 
                    this.setState({ not_found: true });
                // console.log(this.state)
            })
            .catch(err => {
                console.log(err);
            });
    }

    dietCheck = e => {
        // let diets = {...this.state.diets}
        console.log(this.state)
        let diet = e.target.name
        // let value = e.target.value        
        this.setState({ diets: { ...this.state.diets, [diet]: !this.state.diets[diet] }})
        // this.setState(prevState => ({

        //     diets: { ...this.state.diets, [diet]: !prevState.diets[diet] }
        // }) )
    }

    componentDidMount() {
        // console.log(this.state.diets.low_carb)
        
        $("input:checkbox").on('click', function () {
            // in the handler, 'this' refers to the box clicked on
            var $box = $(this);
            if ($box.is(":checked")) {
                // the name of the box is retrieved using the .attr() method
                // as it is assumed and expected to be immutable
                var group = "input:checkbox[alt='" + $box.attr("alt") + "']";
                // the checked state of the group/box on the other hand will change
                // and the current value is retrieved using .prop() method
                $(group).prop("checked", false);
                $box.prop("checked", true);
            } else {
                $box.prop("checked", false);
            }
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
                                        <input className="form-check-input" alt="box" type="checkbox" name="low_carb" onChange={this.dietCheck} defaultChecked={this.state.diets.low_carb}/>
                                            <label className="form-check-label" >Low-carb</label>
                                        </div>
                                        <div className="form-check">
                                        <input className="form-check-input" alt="box" type="checkbox" name="high_protein" value={this.state.high_protein} onChange={this.dietCheck}/>
                                            <label className="form-check-label" >High-protein</label>
                                        </div>
                                        <div className="form-check">
                                        <input className="form-check-input" alt="box" type="checkbox" name="high_fiber" value={this.state.high_fiber} onChange={this.dietCheck}/>
                                            <label className="form-check-label" >High-fiber</label>
                                        </div>
                                        <div className="form-check">
                                        <input className="form-check-input" alt="box" type="checkbox" name="low_sodium" value={this.state.low_sodium} onChange={this.dietCheck}/>
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
                        // console.log(recipe)
                        return <Recipe recipeData={recipe.recipe} key={Math.floor(recipe.recipe.calories)} />;
                    }) : <div className='not-found'>
                        <p className='not-found-text'>Sorry, there is nothing cook with {this.state.searched}.</p>
                    </div>
                    }
                </div>
            </div>
        );
    }
}
 
export default Search;