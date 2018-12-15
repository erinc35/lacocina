import React, { Component } from "react";
import bread from '../images/bread.jpeg';
import cookie from '../images/cookie.jpeg';
import shrimp from '../images/shrimp.jpeg';
import lamb from '../images/lamb.jpeg';
import salad from '../images/salad.jpeg';
import chicken from '../images/chicken.jpeg';
import './QuickLinks.css';
import axios from 'axios';



class QuickLinks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            recipes: []
         }
    }

    fetchQuickLink = () => {
        axios
            .get("")
            .then(response => {
                console.log(response.data.hits)
                this.setState({ recipes: response });
            })
            .catch(err => {
                console.log(err);
            });
        // console.log(this.state)
    }

    render() { 
        return ( 
            <div className='quicklinks'>
                <a 
                    href="#" 
                    className="quicklink"
                    onClick={this.fetchQuickLink}
                >
                    <img className="icon" src={bread} />
                    <span>Bread Recipes</span>
                </a>
                <a href="#" className="quicklink">
                    <img className="icon" src={cookie} />
                    <span>Cookie Recipes</span>
                    
                </a>
                <a href="#" className="quicklink">
                    <img className="icon" src={shrimp} />
                    <span>Shrimp Recipes</span>
                </a>
                <a href="#" className="quicklink">
                    <img className="icon" src={lamb} />
                    <span>Lamb Recipes</span>                    
                </a>
                <a href="#" className="quicklink">
                    <img className="icon" src={salad} />
                    <span>Salad Recipes</span>
                </a>
                <a href="#" className="quicklink">
                    <img className="icon" src={chicken} />
                    <span>Chicken Recipes</span>
                </a>
                        
            </div>
         );
    }
}
 
export default QuickLinks;