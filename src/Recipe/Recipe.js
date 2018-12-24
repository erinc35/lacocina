import React, { Component } from "react";
import './Recipe.css';


class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        let data = this.props.recipeData;
        // console.log(this.props.recipeData)
        return (  
            <div className='recipe-card'>
                <img src={data.image} alt={data.label} className='recipe-img'/>
                <p className='recipe-name'>{data.label}</p>
                <p className='recipe-source'>by {data.source}</p>                
            </div>
        );
    }
}
 
export default Recipe;