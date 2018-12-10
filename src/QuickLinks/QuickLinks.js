import React, { Component } from "react";
import bread from '../images/bread.jpeg';
import cookie from '../images/cookie.jpeg';
import shrimp from '../images/shrimp.jpeg';
import lamb from '../images/lamb.jpeg';
import salad from '../images/salad.jpeg';


import './QuickLinks.css';


class QuickLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='quicklinks'>
                <a target="_blank" href="https://www.twitter.com/ErincEmer" className="quicklink">
                    <img className="icon" src={bread} />
                    <span>Bread Recipes</span>
                </a>
                <a target="_blank" href="https://www.twitter.com/ErincEmer" className="quicklink">
                    <img className="icon" src={cookie} />
                    <span>Cookie Recipes</span>
                    
                </a>
                <a target="_blank" href="https://www.twitter.com/ErincEmer" className="quicklink">
                    <img className="icon" src={shrimp} />
                    <span>Shrimp Recipes</span>
                </a>
                <a target="_blank" href="https://www.twitter.com/ErincEmer" className="quicklink">
                    <img className="icon" src={lamb} />
                    <span>Lamb Recipes</span>                    
                </a>
                <a target="_blank" href="https://www.twitter.com/ErincEmer" className="quicklink">
                    <img className="icon" src={salad} />
                    <span>Salad Recipes</span>
                </a>

                        
            </div>
         );
    }
}
 
export default QuickLinks;