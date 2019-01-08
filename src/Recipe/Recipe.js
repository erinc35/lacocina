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
                <div className="image-flip">

                    <div className="mainflip">
                        <div className="frontside">
                            <div className='recipe-card'>
                                <img src={data.image} alt={data.label} className='recipe-img' />
                                <p className='recipe-name'>{data.label}</p>
                                <p className='back-item'><strong>Calories:</strong> {Math.round(data.calories)}</p>
                            </div>
                        </div>

                        <div className="backside">
                            <div className='recipe-card recipe-back'>
                                <h2>{data.label}</h2>
                                <p className='recipe-source'><strong>Source:</strong> {data.source}</p>
                                <p className='recipe-name'>Ingredients:</p>      
                                {data.ingredientLines.map((ing, ind) => {
                                    return <p key={ind} className='back-item'>{ing}</p>                              
                                })}                          
                            </div>
                        </div>

                    </div>
                </div>
        );
    }
}
 
export default Recipe;