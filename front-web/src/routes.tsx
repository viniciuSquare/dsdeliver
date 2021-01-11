import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./navbar";
import Orders from "./Orders";

function Routes(){
    return(
        <BrowserRouter>
            <Navbar/>
            <Switch>
                
                <Route exact path="/" > 
                    <Home/>
                </Route>

                <Route path="/orders"> 
                    <Orders/>
                </Route>
                
            </Switch>

        </BrowserRouter>
    )
}

export default Routes;