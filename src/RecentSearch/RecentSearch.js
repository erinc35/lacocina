import React, {Component} from "react";
import './RecentSearch.css';

const RecentSearch =  props => {
  
    const inputs = props.recentSearch;
    return(
        <div className='recent-wrapper'>
            {inputs.map((input, ind) => {
                return <button onClick={(e) => props.handleRecentSearch(e,input)} key={ind} className='recent-button'>
                    {input}
                </button>
            })}
        </div>
            
    )

}

// class RecentSearch extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { inputs: [] }
//     }

//     componentDidMount() {
//         console.log(this.props);
        
//         this.setState({
//             inputs: this.props.recentSearch
//         })
//     }
    

//     render() { 
//         const inputs = this.props.recentSearch;
//         console.log(inputs)
//         return ( 
//             <div className='recent-wrapper'>
//                 {inputs.map((input, ind) => {
//                     return <button onClick={(e) => this.props.handleRecentSearch(e, input)} key={ind} className='recent-button'>
//                         {input}
//                     </button>
//                 })}
//             </div>            
//          );
//     }
// }
 
 
export default RecentSearch;