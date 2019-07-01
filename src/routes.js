import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import App from './App';
import Auth from './Auth/Auth';
import Authenticating from './Auth/Authenticating';
import Search from './Search/Search';
import Favorites from './Favorites/Favorites';



// Create new Auth session
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

export const makeMainRoutes = () => {
    return (
        <Router history={history} component={App}>
            <>
                <Route path="/" render={(props) => <App auth={auth} {...props} />} />
                <Route exact path="/" render={(props) => <Search auth={auth} {...props} />} />
                <Route exact path="/favorites" render={(props) => <Favorites {...props} />} />                
                <Route exact path="/authenticating" render={(props) => {
                    handleAuthentication(props);
                    return <Authenticating {...props} />
                }} />
            </>
        </Router>
    );
}