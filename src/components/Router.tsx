import { Route, Switch } from "wouter";
import HomePageView from "../views/HomePageView.tsx";
import NotFoundView from "../views/NotFoundView.tsx";

/**
 * Application component that manage navigation
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePageView} />

      <Route component={NotFoundView} />
    </Switch>
  );
}

export default Router;
