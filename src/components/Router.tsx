import { Route, Switch } from "wouter";
import WelcomePageView from "../views/WelcomePageView.tsx";
import NotFoundView from "../views/NotFoundView.tsx";

/**
 * Application component that manage navigation
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={WelcomePageView} />

      <Route component={NotFoundView} />
    </Switch>
  );
}

export default Router;
