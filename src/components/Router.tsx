import { Route, Switch } from "wouter";
import HomePageView from "../views/HomePageView.tsx";
import NotFoundView from "../views/NotFoundView.tsx";

/**
 * Composant gérant la navigation de l'application
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
