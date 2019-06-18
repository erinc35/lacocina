import React from "react";
import './RecentSearch.css';

const RecentSearch =  props => {
  
    const inputs = props.recentSearch;
    return(
        <div className='recent-wrapper'>
            {inputs.map((input, ind) => {
                return <button onClick={(e) => this.props.handleRecentSearch(e,input)} key={ind} className='recent-button'>{input}</button>
            })}
        </div>
            
    )

}
 
export default RecentSearch;