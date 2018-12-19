import React, { Component } from "react";
import './Recipe.css';


class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        // console.log(this.props.recipeData)
        return (  
            <div className='recipe-card'>
                <img src={this.props.recipeData.image} alt="" className='recipe-img'/>
                <p>{this.props.recipeData.label}</p>            </div>
        );
    }
}
 
export default Recipe;