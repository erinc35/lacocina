import React, { Component } from "react";
import './Search.css';



class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className="search-wrap">
                <div className=''>
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Ingredient</label>
                            <div class="col-sm-10">
                                <input class="form-control" placeholder="Ingredient"/>
                            </div>
                        </div>
                        <fieldset class="form-group">
                            <div class="row">
                                <legend class="col-form-label col-sm-2 pt-0">Diet Options</legend>
                                <div class="col-sm-10 diet-opts">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="gridRadios"/>
                                        <label class="form-check-label" >Low-carb</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="gridRadios" />
                                        <label class="form-check-label" >High-protein</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="gridRadios" />
                                        <label class="form-check-label" >High-fiber</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="gridRadios" />
                                        <label class="form-check-label" >Low-sodium</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="form-group row">
                            <div class="col-sm-10">
                                <button type="submit" class="btn btn-primary">Search Recipe</button>
                            </div>
                        </div>
                    </form>
                </div> 
            </div>
        );
    }
}
 
export default Search;