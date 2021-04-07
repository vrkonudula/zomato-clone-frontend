import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './views/Home';
import Filter from "./views/Filter";
import RestaurantDetails from "./views/RestaurantDetails";

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={Home} exact />
                <Route path="/filter" component={Filter} /> 
                <Route path="/restaurant/details" exact component={RestaurantDetails} />
            </BrowserRouter>
        )
    }
}

export default Router;