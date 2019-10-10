import React from "react";
import Recipe from '../Recipe/Recipe';
import '../Recipe/Recipe.css';


const Favorites = props => {
    const recipeData = props.location.state.recipeData;
    console.log(recipeData)
    return (
        <div className='recipes'>
            {recipeData ? recipeData.map(recipe => {
                return <Recipe recipeData={recipe}  />;
            }) : <div></div>
        }
        </div>

    )

}

export default Favorites;