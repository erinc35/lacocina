import React from "react";
import Recipe from '../Recipe/Recipe';
import '../Recipe/Recipe.css';


const Favorites = props => {
    const recipeData = props.location.state.recipeData;
    return (
        <div className='recipes'>
            {recipeData ? recipeData.map(recipe => {
                return <Recipe recipeData={recipe} key={Math.floor(recipe.calories)} />;
            }) : <div></div>
        }
        </div>

    )

}

export default Favorites;