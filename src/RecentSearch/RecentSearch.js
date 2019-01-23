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
                    return <button key={ind} className='recent-button'>{input}</button>
                })}
            </div>
        )
    }
}
 
export default RecentSearch;