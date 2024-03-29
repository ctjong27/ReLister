import React, { Fragment } from "react";
import logo from "./logo.svg";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "../../features/pages/HomePage";
import NavBar from "../../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import IngredientListDashboard from "../../features/views/dashboards/IngredientListDashboard";
import ShoppingListPage from "../../features/pages/ShoppingListPage";
import PantryListPage from "../../features/pages/PantryListPage";

function App() {
  return (
    <Fragment>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                {/* <Route exact path="/shopping_list" component={IngredientListDashboard} /> */}
                <Route exact path="/shopping_list" component={ShoppingListPage} />
                <Route exact path="/pantry_list" component={PantryListPage} />
{/* 
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                /> */}
                {/* <Route component={NotFound} /> */}
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
