import React, { Component } from "react";
import './Recipe.css';


class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        // console.log(this.props.recipeData.recipe.label)
        return (  
            <div className='recipe-card'>
                {this.props.recipeData.label}
            </div>
        );
    }
}
 
export default Recipe;