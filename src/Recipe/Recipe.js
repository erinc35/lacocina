import React, { Component } from "react";
import axios from 'axios';
import host from '../host';
import './Recipe.css';


class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = { recipe: {} }
    }

    // componentDidMount() {
    //     this.setState({ recipe: this.props.recipeData})
    // }
    handleClickHeart = e => {
        console.log(e.target.parentNode)
        e.preventDefault();
        alert('heart')
    }

    createRecipe = async (event) => {
        event.preventDefault();
        const userId = { userId: localStorage.getItem('userId') }
        const activity = { userId: localStorage.getItem('userId'), activity: 'Created Recipe.' }
        const RecipeData = { name: this.state.Recipe.name }

        try {
            // First Creat New Recipe
            const res = await axios.post(`${host}/api/Recipes`, RecipeData)
            if (res) {
                this.setState({ Recipe: res.data })
                // Then add user as Recipe owner
                axios
                    .post(`${host}/api/Recipes/${res.data.id}/RecipeOwners`, userId)
                    .then(() => {
                        // Then add user as Recipe member
                        axios
                            .post(`${host}/api/Recipes/${res.data.id}/RecipeMembers`, userId)
                            .then(() => {
                                // Then add to Recipe activities and update Recipes
                                axios
                                    .post(`${host}/api/Recipes/${res.data.id}/activities`, activity)
                                    .then(() => this.props.updateRecipes())
                            })
                    })
            }
        } catch (err) {
            this.clearSearch();
            this.setState({ error: { code: err.response.status, message: err.response.statusText } });
        };

    getRecipeData = (recipe) => _event => {
        //    JSON.stringify(recipe);
        // console.log("From handleClick: ", recipe)
        _event.preventDefault();
        let currentRecipe = {
            'name': recipe.label,
            'image': recipe.image,
            'calories': recipe.calories,
            'url': recipe.url
        }
           this.setState({ recipe: currentRecipe })
        // console.log(currentRecipe)
    }


    handleLikeRecipe = async (event) => {
        event.preventDefault();
        let { label, image, calories, url } = this.props.recipeData
        const userId = { userId: localStorage.getItem('userId') }
        // const recipeData = this.state.recipe
        let currentRecipe = {
            'name': label,
            'image': image,
            'calories': calories,
            'url': url
        }
        console.log(currentRecipe)
        try {
            // First Creat New Group
            const res = await axios.post(`${host}/api/recipes`, currentRecipe)
            if (res) {
                // this.setState({ group: res.data })
                console.log(res.data)
                
            }
        } catch (err) {
            console.log(err)
        };
    };
 
    render() { 
        console.log(this.state.recipe)
        let data = this.props.recipeData;
        let labelsArray = data.healthLabels;
        let labels = labelsArray.reduce((str, label) => {
            return str + label + ", "
        }, '').slice(0, -2)

        return (  
            <div className="" onClick={this.handleLikeRecipe}>

                    <div className="">
                        <div className="">
                            <div className='recipe-card recipe-front'>
                                <img src={data.image} alt={data.label} className='recipe-img' />
                                <strong><p className='recipe-name'>{data.label}</p></strong>
                                <p className='back-item'><strong>Calories:</strong> {Math.round(data.calories)}</p>
                                <p className='back-item'><strong>Health labels:</strong> {labels}</p>     
                                <i className="far fa-heart heart"></i>                           
                            </div>
                        </div>

                        {/* <div className="">
                            <div className='recipe-card recipe-back'>
                                <h2>{data.label}</h2>
                                <p className='recipe-source'><strong>Source:</strong> {data.source}</p>
                                <p className='recipe-name'><strong>Ingredients:</strong></p>      
                                {data.ingredientLines.map((ing, ind) => {
                                    return <li key={ind} className='back-item'>{ing}</li>                              
                                })}                          
                            </div>
                        </div> */}

                    </div>
                </div>
        );
    }
}
 
export default Recipe;