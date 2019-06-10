import React, { Component } from "react";
import axios from 'axios';
import host from '../host';
import './Recipe.css';


class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            recipe: {},
            liked: false,
            recipeId: '',
            recipesLiked: []
     }
    }

    componentDidMount() {
        this.getLikedRecipes();
    }

    handleLikeRecipe = async (event) => {
        event.preventDefault();
        let { label, image, calories, url } = this.props.recipeData
        const userId = { userId: localStorage.getItem('userId') }
        let currentRecipe = {
            'name': label,
            'image': image,
            'calories': calories,
            'url': url
        }
        // this.addRecipe(currentRecipe, userId)
        { this.state.liked ? this.deleteRecipe(userId.userId) : this.addRecipe(currentRecipe, userId) }
        // this.toggleLike();
    };


    addRecipe = async (currentRecipe, userId) => { 
        try {
            const res = await axios.post(`${host}/api/recipes`, currentRecipe)
            if (res) {
                this.setState({ recipeId: res.data.id })
                axios
                    .post(`${host}/api/recipes/${res.data.id}/recipeOwners`, userId)
                    .then(res => {
                        this.setState({ liked: true })
                        this.getLikedRecipes();
                    })
            }
        } catch (err) {
            console.log(err)
        };
    }

    deleteRecipe = async (userId) => {
        this.getLikedRecipes();

        try {
            let recipesLiked = this.state.recipesLiked; //array of objects
            let recipe = recipesLiked.filter(recipe => {
                return recipe.RecipeName === this.props.recipeData.label;
            })
            let recipeId = recipe[0].recipeId
            const res = await axios.delete(`${host}/api/recipes/${recipeId}/recipeOwners/${userId}`)
            if (res) {
                this.setState({ liked: false })
            }
        } catch (err) {
            console.log(err)
        };

    }

    getLikedRecipes = async () => {
        try {
            let userId = localStorage.getItem('userId')
            const res = await axios.get(`${host}/api/users/${userId}/recipes`)
            if (res) {
                this.setState({ recipesLiked: res.data })
            }
        } catch (err) {
            console.log(err)
        };
        let recipeName = this.props.recipeData.label;
        if (this.state.recipesLiked && this.state.recipesLiked.some(recipe => {
            return recipe.RecipeName === recipeName
        })) {
            this.setState({ liked: true })
        }
    }


    toggleLike = () => {
        this.setState(prevState => ({
            liked: !prevState.liked
        }));
    }

    render() { 

        let data = this.props.recipeData;
        let labelsArray = data.healthLabels;
        let labels = labelsArray.reduce((str, label) => {
            return str + label + ", "
        }, '').slice(0, -2)
        return (  
            <div className="" >

                    <div className="">
                        <div className="">
                            <div className='recipe-card recipe-front'>
                                <img src={data.image} alt={data.label} className='recipe-img' />
                                <strong><p className='recipe-name'>{data.label}</p></strong>
                                <p className='back-item'><strong>Calories:</strong> {Math.round(data.calories)}</p>
                                <p className='back-item'><strong>Health labels:</strong> {labels}</p>     
                                <i 
                                    onClick={(e) => this.handleLikeRecipe(e)} 
                                    className={this.state.liked ? "fa fa-heart full-heart" : "fa fa-heart empty-heart"}>
                                </i>                           
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