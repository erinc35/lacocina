import React, {Component} from "react";
import Recipe from '../Recipe/Recipe';
import '../Recipe/Recipe.css';
import axios from 'axios';
import host from '../host';


class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = { favRecipes: [] }
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');  
        this.fetchAllRecipes(userId) 
    }

    fetchAllRecipes = async id => {
        try {
            const res = await axios.get(`${host}/api/users/${id}/recipes`)
            if (res) {
                this.setState({ favRecipes: res.data })
            }
        } catch (err) {
            console.log(err)
        }

    }

    

    render() { 
        const { favRecipes } = this.state;
        return (<div className='recipes'>
            {favRecipes ? favRecipes.map(recipe => {
                return <Recipe key={recipe.recipeId} recipeData={recipe} fillHeart={true}/>;
            }) : <div></div>
            }
        </div> );
    }
}
 


export default Favorites;