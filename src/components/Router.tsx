import { Route, Switch } from "wouter";
import LoginView from "../views/LoginView.tsx";
import NotFoundView from "../views/NotFoundView.tsx";
import RegisterView from "../views/RegisterView.tsx";
import WelcomePageView from "../views/WelcomePageView.tsx";

/**
 * Application component that manage navigation
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={WelcomePageView} />
      <Route path="/login" component={LoginView} />
      <Route path="/register" component={RegisterView} />

      <Route component={NotFoundView} />
    </Switch>
  );
}

export default Router;
