import React, { Component } from "react";
import Recipe from '../Recipe/Recipe';
import bread from '../images/bread.jpeg';
import cookie from '../images/cookie.jpeg';
import shrimp from '../images/shrimp.jpeg';
import lamb from '../images/lamb.jpeg';
import salad from '../images/salad.jpeg';
import chicken from '../images/chicken.jpeg';
import './QuickLinks.css';
import axios from 'axios';
import $ from 'jquery';



let app_id = process.env.REACT_APP_YOUR_APP_ID;
let app_key = process.env.REACT_APP_YOUR_APP_KEY;

class QuickLinks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            recipes: []
         }
    }



    fetchQuickLink = e => {
        e.preventDefault();
        // let recipes = $('.recipes')[1];
        // console.log($('#search')[0].children) 
        let recipes = $('#search')[0];
        // for (var i = 0; i < recipes.length; ++i) {
        //     // recipes[i].remove();
        //     console.log(recipes[i])
        // }
        // if (recipes.children.length > 0) {
        //     for (var i = recipes.length-1; i >= 0; --i) {
        //         console.log(recipes[i])
        //         recipes[i].empty();
        //     }
        //     recipes.remove()
        // }
        // recipes.children.remove()

        console.log('after remove', recipes)
        
        // $('.recipes')[1].children.empty()
        // $('.not-found').remove();
        // console.log($('.recipes div'))
        this.setState({
            recipes: []
        })
        let ing = e.target.alt;
        let quick_api = `https://api.edamam.com/search?q=${ing}&app_id=${app_id}&app_key=${app_key}&count=20`
        axios
            .get(quick_api)
            .then(response => {
                // console.log(response)
                this.setState({ recipes: response.data.hits });
                // console.log(this.state.recipes)
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() { 
        // if ($('.recipes.not-found')) $('.recipes.not-found').empty();
        // console.log(this.state.recipes)
        return ( 
            <div>
                <div className='quicklinks'>
                    <div href="#" className="quicklink" onClick={this.fetchQuickLink}>
                        <img alt='bread' className="icon" src={bread} />
                        <span>Bread Recipes</span>
                    </div>
                    <div href="#" className="quicklink" onClick={this.fetchQuickLink}>
                        <img alt='cookie' className="icon" src={cookie} />
                        <span>Cookie Recipes</span>
                    </div>
                    <div href="#" className="quicklink" onClick={this.fetchQuickLink}>
                        <img alt='shrimp' className="icon" src={shrimp} />
                        <span>Shrimp Recipes</span>
                    </div>
                    <div href="#" className="quicklink" onClick={this.fetchQuickLink}>
                        <img alt='lamb' className="icon" src={lamb} />
                        <span>Lamb Recipes</span>                    
                    </div>
                    <div href="#" className="quicklink" onClick={this.fetchQuickLink}>
                        <img alt='salad' className="icon" src={salad} />
                        <span>Salad Recipes</span>
                    </div>
                    <div href="#" className="quicklink" onClick={this.fetchQuickLink}>
                        <img alt='chicken' className="icon" src={chicken} />
                        <span>Chicken Recipes</span>
                    </div>    
                </div>
                <div className='recipes' id='quicklinks'>
                    {this.state.recipes ? this.state.recipes.map(recipe => {
                        // console.log(recipe)
                        return <Recipe recipeData={recipe.recipe} key={Math.floor(recipe.recipe.calories)}/>;
                    }) : <div></div>
                    }
                </div>
            </div>
         );
    }
}
 
export default QuickLinks;