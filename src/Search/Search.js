import React, { Component } from "react";
import QuickLinks from '../QuickLinks/QuickLinks';
import './Search.css';



class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div>
                <div className="search-wrap">
                        <form>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Ingredient</label>
                                <div className="col-sm-10">
                                    <input className="form-control" placeholder="Ingredient"/>
                                </div>
                            </div>
                            <fieldset className="form-group">
                                <div className="row">
                                    <legend className="col-form-label col-sm-2 pt-0">Diet Options</legend>
                                    <div className="col-sm-10 diet-opts">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="gridRadios"/>
                                            <label className="form-check-label" >Low-carb</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="gridRadios" />
                                            <label className="form-check-label" >High-protein</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="gridRadios" />
                                            <label className="form-check-label" >High-fiber</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="gridRadios" />
                                            <label className="form-check-label" >Low-sodium</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary">Search Recipe</button>
                                </div>
                            </div>
                        </form>
                </div>
                <QuickLinks />
            </div>
        );
    }
}
 
export default Search;