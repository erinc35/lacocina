import React, { PureComponent } from "react";
import Recipe from '../Recipe/Recipe';
import bread from '../images/bread.jpeg';
import cookie from '../images/cookie.jpeg';
import shrimp from '../images/shrimp.jpeg';
import lamb from '../images/lamb.jpeg';
import salad from '../images/salad.jpeg';
import chicken from '../images/chicken.jpeg';
import './QuickLinks.css';



class QuickLinks extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            recipes: []
         }
    }

    // fetchQuickLink = e => {
    //     e.preventDefault();
    //     // let recipes = $('#search')[0];
    //     this.setState({
    //         recipes: []
    //     })
    //     let ing = e.target.alt;
    //     let quick_api = `https://api.edamam.com/search?q=${ing}&app_id=${app_id}&app_key=${app_key}&count=20`
    //     axios
    //         .get(quick_api)
    //         .then(response => {
    //             this.setState({ recipes: response.data.hits });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    render() { 
        this.props.recepieFadeIn();

        return ( 
            <div>
                <div className='quicklinks'>
                    <div href="#" className="quicklink" onClick={this.props.fetchQuickLink}>
                        <img alt='bread' className="icon" src={bread} />
                        <span>Bread Recipes</span>
                    </div>
                    <div href="#" className="quicklink" onClick={this.props.fetchQuickLink}>
                        <img alt='cookie' className="icon" src={cookie} />
                        <span>Cookie Recipes</span>
                    </div>
                    <div href="#" className="quicklink" onClick={this.props.fetchQuickLink}>
                        <img alt='shrimp' className="icon" src={shrimp} />
                        <span>Shrimp Recipes</span>
                    </div>
                    <div href="#" className="quicklink" onClick={this.props.fetchQuickLink}>
                        <img alt='lamb' className="icon" src={lamb} />
                        <span>Lamb Recipes</span>                    
                    </div>
                    <div href="#" className="quicklink" onClick={this.props.fetchQuickLink}>
                        <img alt='salad' className="icon" src={salad} />
                        <span>Salad Recipes</span>
                    </div>
                    <div href="#" className="quicklink" onClick={this.props.fetchQuickLink}>
                        <img alt='chicken' className="icon" src={chicken} />
                        <span>Chicken Recipes</span>
                    </div>    
                </div>
                <div className='recipes' id='quicklinks'>
                    {this.state.recipes ? this.state.recipes.map(recipe => {
                        return <Recipe recipeData={recipe.recipe} key={Math.floor(recipe.recipe.calories)} login={this.props.login}/>;
                    }) : <div></div>
                    }
                </div>
            </div>
         );
    }
}
 
export default QuickLinks;