import React, { Component } from "react";
import './App.css';
import './SearchForm.css';



class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return ( 
                <div className='form-wrap'>
                    <div className="ingredient">
                        <label className="ingr-label">Ingredient</label>
                        <div className="ingr-input">
                            <input className="form-control" placeholder="Use ',' for multiple ingredients"/>
                        </div>
                    </div>
                    
                </div>
         );
    }
}
 
export default SearchForm;