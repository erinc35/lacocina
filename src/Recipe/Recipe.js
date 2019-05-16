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


    handleLikeRecepie = async (event) => {
        event.preventDefault();
        const userId = { userId: localStorage.getItem('userId') }
        const recipeData = this.state.recipe

        try {
            // First Creat New Group
            const res = await axios.post(`${host}/api/recipes`, recipeData)
            if (res) {
                this.setState({ group: res.data })
                // Then add user as group owner
                axios
                    .post(`${host}/api/groups/${res.data.id}/groupOwners`, userId)
                    .then(() => {
                        // Then add user as group member
                        axios
                            .post(`${host}/api/groups/${res.data.id}/groupMembers`, userId)
                            .then(() => {
                                // Then add to group activities and update groups
                                axios
                                    .then(() => this.props.updateGroups())
                            })
                    })
            }
        } catch (err) {
            this.clearSearch();
            this.setState({ error: { code: err.response.status, message: err.response.statusText } });
        };

        this.toggleInvite()

    };
 
    render() { 
        console.log(this.state.recipe)
        let data = this.props.recipeData;
        let labelsArray = data.healthLabels;
        let labels = labelsArray.reduce((str, label) => {
            return str + label + ", "
        }, '').slice(0, -2)

        return (  
            <div className="" onClick={this.getRecipeData(data)}>

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