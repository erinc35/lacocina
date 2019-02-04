import React, { Component } from "react";
import './RecentSearch.css';
import axios from 'axios';


let app_id = process.env.REACT_APP_YOUR_APP_ID;
let app_key = process.env.REACT_APP_YOUR_APP_KEY;


class RecentSearch extends Component {
    constructor(props) {
        super(props);
        
    }
    render() { 
        const inputs = this.props.recentSearch;
        return(
            <div>
                <div className='recent-wrapper'>
                    {inputs.map((input, ind) => {
                        return <button onClick={(e) => this.props.handleRecentSearch(e,input)} key={ind} className='recent-button'>{input}</button>
                    })}
                </div>
                
            </div>
        )
    }
}
 
export default RecentSearch;