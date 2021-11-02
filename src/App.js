import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/Header/Header";
import Inventory from "./component/Inventory/Inventory";
import Rivew from "./component/Rivew/Rivew";
import Shop from "./component/Shop/Shop";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from "./component/ProductDetail/ProductDetail";
import Login from "./component/Login/Login";
import Shipment from "./component/Shipment/Shipment";
import { Toaster } from "react-hot-toast";
import { createContext, useState } from "react";
import PrivetRoute from "./component/PrivetRoute/PrivetRoute";

export const userContext = createContext({});

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <h3>email: {loggedInUser.email}</h3>
        <Toaster />
        <Header />
        <Switch>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/rivew">
            <Rivew />
          </Route>
          <PrivetRoute path="/inventory">
            <Inventory />
          </PrivetRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivetRoute path="/shipment">
            <Shipment />
          </PrivetRoute>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <h1>404 Error</h1>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
