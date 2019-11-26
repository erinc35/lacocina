import React, { Component } from "react";
import QuickLinks from '../QuickLinks/QuickLinks';
// import Navigation from '../Navigation/Navigation';
import Recipe from '../Recipe/Recipe';
import RecentSearch from '../RecentSearch/RecentSearch';
import './Search.css';
import axios from 'axios';
import {TweenMax} from "gsap";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import { Link } from 'react-router-dom';

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
            },
            selected: ''
         }
         //focus area
         this.recentSearchElement = React.createRef();
    }

    // dietCheck = e => {
    //     $("input:checkbox").on('click', (e) => {
    //         // in the handler, 'this' refers to the box clicked on
    //         let $box = e.target;
    //         let diet = e.target.name;

    //         if ($box.checked) {
    //             let group = "input:checkbox[alt='" + $box.alt + "']";

    //             $(group)[0].checked = false;
    //             $(group)[1].checked = false;
    //             $(group)[2].checked = false;
    //             $(group)[3].checked = false;

    //             $box.checked = true;

    //             this.setState({ diets: { ...this.state.diets, [diet]: true } })
    //             // console.log(this.state.diets.low_carb)

    //         } else {
    //             $box.checked = false;
    //             this.setState({ diets: { ...this.state.diets, [diet]: false } })
    //         }

    //     });
    // }

    dietCheck = e => {
        this.setState({ selected: e.target.value })
    }

    componentDidMount() {
        TweenMax.from(".app-title", 4, {opacity: 0.1, marginLeft: 200})
        this.setState({ recentSearch: JSON.parse(localStorage.getItem('recentSearch'))})

    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    fetchQuickLink = e => {
        e.preventDefault();
        this.setState({
            recipes: []
        })
        let ing = e.target.alt;
        let quick_api = `https://api.edamam.com/search?q=${ing}&app_id=${app_id}&app_key=${app_key}&count=20`
        axios
            .get(quick_api)
            .then(response => {
                this.setState({ recipes: response.data.hits });
            })
            .catch(err => {
                console.log(err);
            });
    }

    searchRecipe = e => {
        e.preventDefault();
        const ingInput = this.state.ingredients;
        const searched = JSON.parse(localStorage.getItem('recentSearch')) === null ? [] : JSON.parse(localStorage.getItem('recentSearch')).slice();
        if (this.state.ingredients !== '') searched.push(this.state.ingredients)
        localStorage.setItem('recentSearch', JSON.stringify(searched.slice(searched.length - 5)))

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
        // if (this.state.selected.length > 0) {
        // // if (this.state.diets.low_carb === true || this.state.diets.high_protein === true || this.state.diets.high_fiber === true || this.state.diets.low_sodium) {
        //     let inputs = Array.from(e.target.getElementsByClassName('form-check-input'))   
        //     let checkedDiet = inputs.filter(input => input.checked)[0].name.replace(/_/g, '-');
            
        //     api = api + `&diet=${checkedDiet}`
        //     console.log(api)
        // }
        if(this.state.selected.length > 0){
            let checkedDiet = this.state.selected.replace(/_/g, '-');
            api = api + `&diet=${checkedDiet}`
            console.log(checkedDiet)
            console.log(api)
        }

        axios.get(api)
            .then(response => {
                response.data.hits.length > 0 ? this.setState({ recipes: response.data.hits, not_found: false, selected: ''}) : 
                    this.setState({ not_found: true });
            })
            .catch(err => {
                console.log(err);
            });
       
        
    }

    handleRecentSearch = (e, input) => {
        e.preventDefault();
        const searched = JSON.parse(localStorage.getItem('recentSearch')).slice();
        searched.push(input);
        localStorage.setItem('recentSearch', JSON.stringify(searched.slice(searched.length - 5)))

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

    

    render() {       
        // console.log(this.props.isAuthenticated)
        // this.recepieFadeIn();
        // if(this.state.recipes.length === 0) {
        //     return <div>buu</div>
        // }
        
        return (  
            <div>
                {/* <Navigation /> */}
                <div className='search-header'>
                    {/* {this.props.isAuthenticated
                        ? 
                        <Link to={`/`} onClick={this.props.logout}>Logout</Link> : <Link to={`/authenticating`} onClick={this.props.login}>Login</Link>
                    } */}
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
                                                <input className="form-check-input"  checked={this.state.selected === 'low_carb'} alt="box" type="checkbox" value='low_carb' name="low_carb" onChange={this.dietCheck} />
                                                <label className="form-check-label" >Low-carb</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" checked={this.state.selected === 'high_protein'} alt="box" type="checkbox" value='high_protein' name="high_protein"  onChange={this.dietCheck}/>
                                                <label className="form-check-label" >High-protein</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" checked={this.state.selected === 'balanced'} alt="box" type="checkbox" value='balanced' name="balanced"  onChange={this.dietCheck}/>
                                                <label className="form-check-label" >Balanced</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" checked={this.state.selected === 'low_fat'} alt="box" type="checkbox" value='low_fat' name="low_fat"  onChange={this.dietCheck}/>
                                                <label className="form-check-label" >Low-fat</label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                    </div>
                </div>
                <QuickLinks fetchQuickLink={this.fetchQuickLink} login={this.props.auth.login} />
                {this.state.recipes.length === 0 && this.state.not_found === false ? <div className="soup-pot-loader">
                    <div className="can"></div>
                    <div className="can"></div>
                    <div className="can"></div>
                    <div className="soup-pot-loader-pot"></div>
                </div> : null}
                <div className='recipes' id='search'>
                    {this.state.not_found === false ? this.state.recipes.map((recipe, index) => {
                        return (
                            <ReactCSSTransitionGroup transitionName="fade" key={index} transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                <div className='recipe-link' style={{ transitionDelay: `${index * 300}ms` }}>
                                    <Recipe recipeData={recipe.recipe} key={index} login={this.props.auth.login} />
                                </div>
                            </ReactCSSTransitionGroup>

                                )
                    }) 
                    : 
                    <div className='not-found'>
                        <p className='not-found-text'>Sorry, there is nothing cook with {this.state.invalidSearch}.</p>
                    </div>
                    }
                </div>
                
            </div>
            
        );
    }
}
 
export default Search;