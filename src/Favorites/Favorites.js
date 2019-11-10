import React, {Component} from "react";
import Recipe from '../Recipe/Recipe';
import '../Recipe/Recipe.css';
import axios from 'axios';
import host from '../host';


// const Favorites = props => {
//     const { recipeData } = props.location.state;
//     console.log(recipeData)
//     return (
//         <div className='recipes'>
//             {recipeData ? recipeData.map(recipe => {
//                 return <Recipe key={recipe.recipeId} recipeData={recipe}  />;
//             }) : <div></div>
//         }
//         </div>

//     )

// }

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = { favRecipes: [] }
    }

    componentDidMount() {
        console.log('cdm in fav')
        const userId = localStorage.getItem('userId');  
        this.fetchAllRecipes(userId) 
    }

    fetchAllRecipes = async id => {

        try {
            const res = await axios.get(`${host}/api/users/${id}/recipes`)
            // console.log(res)
            if (res) {
                this.setState({ favRecipes: res.data })
            }


        } catch (err) {
            console.log(err)
        }

    }

    render() { 
        const { favRecipes } = this.state;
        console.log(this.state)
        return (<div className='recipes'>
            {favRecipes ? favRecipes.map(recipe => {
                return <Recipe key={recipe.recipeId} recipeData={recipe} />;
            }) : <div></div>
            }
        </div> );
    }
}
 


export default Favorites;