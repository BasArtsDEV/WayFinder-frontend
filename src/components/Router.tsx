import { Route, Switch } from "wouter";
import { ROUTES } from "../config.ts";
import GameView from "../views/GameView.tsx";
import HuntDetailView from "../views/HuntDetailView.tsx";
import LoginView from "../views/LoginView.tsx";
import NotFoundView from "../views/NotFoundView.tsx";
import RegisterView from "../views/RegisterView.tsx";
import TreasureHuntsView from "../views/TreasureHuntsView.tsx";
import UserProfileView from "../views/UserProfileView.tsx";
import UserSettingsView from "../views/UserSettingsView.tsx";
import VerifyEmailView from "../views/VerifyEmailView.tsx";
import WelcomePageView from "../views/WelcomePageView.tsx";

/**
 * Application component that manage navigation
 */
function Router() {
  return (
    <Switch>
      <Route path={ROUTES.HOME} component={WelcomePageView} />
      <Route path={ROUTES.HUNTS} nest>
        <Route path="/:id" component={HuntDetailView} />
        <Route path={ROUTES.HOME} component={TreasureHuntsView} />
      </Route>

      <Route path={`${ROUTES.GAME}/:id`} component={GameView} />

      <Route path={ROUTES.LOGIN} component={LoginView} />
      <Route path={ROUTES.REGISTER} component={RegisterView} />
      <Route path={ROUTES.VERIFY_EMAIL} component={VerifyEmailView} />
      <Route path={ROUTES.USER_VIEW} component={UserProfileView} />
      <Route path={ROUTES.USER_SETTINGS} component={UserSettingsView} />

      <Route component={NotFoundView} />
    </Switch>
  );
}

export default Router;
