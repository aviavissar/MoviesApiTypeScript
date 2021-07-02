import { Route, Switch, Router } from "react-router-dom";
import history from "../services/history";
import Login from "../components/login/login.component";
import Favorites from "../components/favoritesPage/favoritesPage.component";
import Home from "../components/home/home.component";

const MainRouter = () => {
  return (
    <div className="site-content">
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact={true}>
              <Login />
            </Route>
            <Route path="/login">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default MainRouter;
