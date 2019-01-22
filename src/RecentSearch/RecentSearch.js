import React, { Component } from "react";
import './RecentSearch.css';


class RecentSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        const inputs = this.props.recentSearch;
        // console.log(inputs)
        return(
            <div className='recent-wrapper'>
                {inputs.map((input, ind) => {
                    return <span key={ind} className='recent-button'>{input}</span>
                })}
            </div>
        )
    }
}
 
export default RecentSearch;