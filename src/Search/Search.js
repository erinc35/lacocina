import React, { Component } from "react";
import QuickLinks from '../QuickLinks/QuickLinks';
import Recipe from '../Recipe/Recipe';
import SearchForm from '../SearchForm/SearchForm';
import RecentSearch from '../RecentSearch/RecentSearch';
import './Search.css';
import axios from 'axios';
import $ from 'jquery';
import {TweenMax, TweenLite} from "gsap";


let app_id = process.env.REACT_APP_YOUR_APP_ID;
let app_key = process.env.REACT_APP_YOUR_APP_KEY;



class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ingredients: "",
            recipes: [],
            not_found: false, 
            searched: [],
            recentSearch: [],
            invalidSearch: '',
            diets: {
                low_carb: false,
                high_protein: false,
                balanced: false,
                low_fat: false
            }
         }
    }

    componentDidMount() {
       TweenMax.from(".app-title", 4, {opacity: 0.1, marginLeft: 200})
        // this.recepieFadeIn()
        // TweenMax.omTo(".recipes", 3, {
        //     opacity: 0
        // })
        this.setState({ recentSearch: JSON.parse(localStorage.getItem('recentSearch'))})
    console.log('cdm')
       
        // TweenLite.to(".app-title", 4, {scrambleText: {text: "This is sa", chars: "XOXO", revealDelay: 0.5}})
        // this.setState({ recentSearch: JSON.parse(localStorage.getItem('recentSearch')) })
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    recepieFadeIn = () => {
        $(document).ready(function () {
            // window.onload(function () {
                console.log($('.image-flip'))
                $('.image-flip').each(function (index) {
                    console.log($(this))
                    $(this).delay(700 * index).animate({ 'opacity': '1' }, 1000);
                    // $(this).hide().fadeIn(2000)
                    
                }); 
            // })
        })

        // $(document).ready(function () {

        //     $(window).scroll(function () {
        //         console.log($('.image-flip'))
        //         // $('.image-flip')[0]
        //         /* Check the location of each desired element */
        //         let recipes = $('.image-flip');
        //         recipes.each(function (i) {
        //         // for(let i = 0; i < recipes.length; i++){
        //             var bottom_of_object = $(this).position().top + $(this).outerHeight();
        //             var bottom_of_window = $(window).scrollTop() + $(window).height();

        //             /* If the object is completely visible in the window, fade it it */
        //             if (bottom_of_window > bottom_of_object) {
        //                 $(this).animate({ 'opacity': '1' }, 1800);
        //                 // recipes[i].animate({ 'opacity': '1' }, 1800);
                        
        //             }
        //         });
        //         // }
        //     });
        // });
    }

    searchRecipe = e => {
        e.preventDefault();
        $('.recipes div').empty();
        const ingInput = this.state.ingredients;
        const searched = JSON.parse(localStorage.getItem('recentSearch')).slice();
        // const searched = this.state.searched.slice();        
        searched.push(this.state.ingredients)
        // localStorage.setItem('recentSearch', JSON.stringify(searched).slice(searched.length - 8))
        localStorage.setItem('recentSearch', JSON.stringify(searched.slice(searched.length - 4)))

        this.setState({ //searched: searched.slice(searched.length - 8), 
            invalidSearch: this.state.ingredients,
            ingredients: '',
            recentSearch: JSON.parse(localStorage.getItem('recentSearch')),
            recipes: []
            // recentSearch: tempRecent
        })
        // this.setState({ searched ,ingredients: '' })
        // localStorage.setItem
        let api = `https://api.edamam.com/search?q=${ingInput}&app_id=${app_id}&app_key=${app_key}`;
        
        if (this.state.diets.low_carb === true || this.state.diets.high_protein === true || this.state.diets.high_fiber === true || this.state.diets.low_sodium) {
            let inputs = Array.from(e.target.getElementsByClassName('form-check-input'))   
            let checkedDiet = inputs.filter(input => input.checked)[0].name.replace(/_/g, '-');
            api = api + `&diet=${checkedDiet}`
        }

        axios.get(api)
            .then(response => {
                response.data.hits.length > 0 ? this.setState({ recipes: response.data.hits, not_found: false}) : 
                    this.setState({ not_found: true });
            })
            .catch(err => {
                console.log(err);
            });

        let boxes = $('.form-check-input');
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].checked = false;
        }
        
    }

    handleRecentSearch = (e, input) => {
        e.preventDefault();
        $('.recipes div').empty();
        const searched = JSON.parse(localStorage.getItem('recentSearch')).slice();
        searched.push(input)
        localStorage.setItem('recentSearch', JSON.stringify(searched.slice(searched.length - 4)))

        this.setState({ 
            invalidSearch: this.state.ingredients,
            ingredients: '',
            recentSearch: JSON.parse(localStorage.getItem('recentSearch')),
            recipes: []
        })
        let api = `https://api.edamam.com/search?q=${input}&app_id=${app_id}&app_key=${app_key}`;
        axios.get(api)
            .then(response => {
                response.data.hits.length > 0 ? this.setState({ recipes: response.data.hits, not_found: false }) :
                    this.setState({ not_found: true });
            })
            .catch(err => {
                console.log(err);
            });
    }

    dietCheck = e => {
        $("input:checkbox").on('click', (e) => {
            // in the handler, 'this' refers to the box clicked on
            let $box = e.target;
            let diets = { ...this.state.diets };
            let diet = e.target.name;
            
            if ($box.checked) {

                // the name of the box is retrieved using the .attr() method
                // as it is assumed and expected to be immutable
                // var group = "input:checkbox[alt='" + $box.attr("alt") + "']";
                let group = "input:checkbox[alt='" + $box.alt + "']";

                // the checked state of the group/box on the other hand will change
                // and the current value is retrieved using .prop() method
                $(group)[0].checked = false;
                $(group)[1].checked = false;
                $(group)[2].checked = false;
                $(group)[3].checked = false;

                $box.checked = true;

                this.setState({ diets: { ...this.state.diets, [diet]: true } })
                // console.log(this.state.diets.low_carb)
                
            } else {
                $box.checked = false;
                this.setState({ diets: { ...this.state.diets, [diet]: false } })
            }
            
        });
    }

    render() { 
        this.recepieFadeIn()
        
        return (  
            <div>
                <div className='search-header'>
                    <h2 className="app-title">la cocina</h2>  

                    <div className="search-wrap">
                            <form onSubmit={this.searchRecipe}>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label form-label">Ingredient</label>
                                    <div className="col-sm-10 search-input-wrap">
                                        <input onChange={this.handleInput} className="form-control" placeholder="Ingredient" name='ingredients' value={this.state.ingredients}/>
                                        <button type="submit" className="btn btn-primary">Search</button>                                    
                                    </div>
                                    <div className="col-sm-10 search-input-wrap mt-3">
                                        <label className="col-sm-4 recent-label form-label">Recently searched:</label>
                                    {this.state.recentSearch ? <RecentSearch recentSearch={this.state.recentSearch} handleRecentSearch={this.handleRecentSearch}/> : null}
                                    </div>                                    
                                </div>
                                <fieldset className="form-group">
                                    <div className="row">
                                        <legend className="col-form-label col-sm-2 pt-0 form-label">Diet Options</legend>
                                        <div className="col-sm-10 diet-opts">
                                            <div className="form-check">
                                                <input className="form-check-input" alt="box" type="checkbox" name="low_carb" onClick={this.dietCheck} defaultChecked={this.state.diets.low_carb}/>
                                                <label className="form-check-label" >Low-carb</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" alt="box" type="checkbox" name="high_protein" value={this.state.high_protein} onChange={this.dietCheck}/>
                                                <label className="form-check-label" >High-protein</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" alt="box" type="checkbox" name="balanced" value={this.state.balanced} onChange={this.dietCheck}/>
                                                <label className="form-check-label" >Balanced</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" alt="box" type="checkbox" name="low_fat" value={this.state.low_fat} onChange={this.dietCheck}/>
                                                <label className="form-check-label" >Low-fat</label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                    </div>
                </div>
                <QuickLinks />
                <div className='recipes' id='search'>
                    {this.state.not_found === false ? this.state.recipes.map(recipe => {
                        // console.log(recipe)
                        return <a target="_blank" href={recipe.recipe.url} className='recipe-link' key={Math.floor(recipe.recipe.calories)}><Recipe recipeData={recipe.recipe}  /></a>
                    }) : <div className='not-found'>
                            <p className='not-found-text'>Sorry, there is nothing cook with {this.state.invalidSearch}.</p>
                    </div>
                    }
                </div>
                
            </div>
            
        );
    }
}
 
export default Search;