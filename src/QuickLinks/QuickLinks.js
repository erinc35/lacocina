
import React, { Component } from "react";
import bread from '../images/bread.jpeg';
import cookie from '../images/cookie.jpeg';
import shrimp from '../images/shrimp.jpeg';
import lamb from '../images/lamb.jpeg';
import salad from '../images/salad.jpeg';
import chicken from '../images/chicken.jpeg';
import './QuickLinks.css';
import axios from 'axios';


let app_id = process.env.REACT_APP_YOUR_APP_ID;
let app_key = process.env.REACT_APP_YOUR_APP_KEY;


class QuickLinks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            recipes: []
         }
    }


    fetchQuickLink = () => {
        axios
            .get(`https://api.edamam.com/search?q=chicken&app_id=${app_id}&app_key=${app_key}&from=0&to=3&calories=591-722&health=alcohol-free`)
            .then(response => {
                console.log(response.data.hits)
                this.setState({ recipes: response });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() { 
        return ( 
            <div className='quicklinks'>
                <div  
                    href="#" 
                    className="quicklink"
                    onClick={this.fetchQuickLink}
                >
                    <img alt='bread' className="icon" src={bread} />
                    <span>Bread Recipes</span>
                </div>
                <div  href="#" className="quicklink">
                    <img alt='cookie' className="icon" src={cookie} />
                    <span>Cookie Recipes</span>
                    
                </div>
                <div  href="#" className="quicklink">
                    <img alt='shrimp' className="icon" src={shrimp} />
                    <span>Shrimp Recipes</span>
                </div>
                <div  href="#" className="quicklink">
                    <img alt='lamb' className="icon" src={lamb} />
                    <span>Lamb Recipes</span>                    
                </div>
                <div href="#" className="quicklink">
                    <img alt='salad' className="icon" src={salad} />
                    <span>Salad Recipes</span>
                </div>
                <div  href="#" className="quicklink">
                    <img alt='chicken' className="icon" src={chicken} />
                    <span>Chicken Recipes</span>
                </div>
                        
            </div>
         );
    }
}
 
export default QuickLinks;