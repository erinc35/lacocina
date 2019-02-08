import RecentSearch from '../RecentSearch/RecentSearch';
import React, { Component } from "react";


class SearchForm extends Component {
    constructor(props) {
        super(props);

    }
    render() { 
        return ( 
            <div className="search-wrap">
                <form onSubmit={this.props.searchRecipe}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label form-label">Ingredient</label>
                        <div className="col-sm-10 search-input-wrap">
                            <input onChange={this.handleInput} className="form-control" placeholder="Ingredient" name='ingredients' value={this.state.ingredients} />
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                        <div className="col-sm-10 search-input-wrap mt-3">
                            <label className="col-sm-4 recent-label form-label">Recently searched:</label>
                            {this.state.recentSearch ? <RecentSearch recentSearch={this.state.recentSearch} handleRecentSearch={this.handleRecentSearch} /> : null}
                        </div>
                    </div>
                    <fieldset className="form-group">
                        <div className="row">
                            <legend className="col-form-label col-sm-2 pt-0 form-label">Diet Options</legend>
                            <div className="col-sm-10 diet-opts">
                                <div className="form-check">
                                    <input className="form-check-input" alt="box" type="checkbox" name="low_carb" onClick={this.dietCheck} defaultChecked={this.state.diets.low_carb} />
                                    <label className="form-check-label" >Low-carb</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" alt="box" type="checkbox" name="high_protein" value={this.state.high_protein} onChange={this.dietCheck} />
                                    <label className="form-check-label" >High-protein</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" alt="box" type="checkbox" name="balanced" value={this.state.balanced} onChange={this.dietCheck} />
                                    <label className="form-check-label" >Balanced</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" alt="box" type="checkbox" name="low_fat" value={this.state.low_fat} onChange={this.dietCheck} />
                                    <label className="form-check-label" >Low-fat</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
         );
    }
}
 
export default SearchForm;