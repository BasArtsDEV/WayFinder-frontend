import { Route, Switch } from "wouter";
import HuntDetailView from "../views/HuntDetailView.tsx";
import LoginView from "../views/LoginView.tsx";
import NotFoundView from "../views/NotFoundView.tsx";
import RegisterView from "../views/RegisterView.tsx";
import TreasureHuntsView from "../views/TreasureHuntsView.tsx";
import UserProfileView from "../views/UserProfileView.tsx";
import VerifyEmailView from "../views/VerifyEmailView.tsx";
import WelcomePageView from "../views/WelcomePageView.tsx";

/**
 * Application component that manage navigation
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={WelcomePageView} />
      <Route path="/hunts" component={TreasureHuntsView} />
      <Route path="/hunts/:id" component={HuntDetailView} />

      <Route path="/login" component={LoginView} />
      <Route path="/register" component={RegisterView} />
      <Route path="/verify-email" component={VerifyEmailView} />
      <Route path="/user/me" component={UserProfileView} />

      <Route component={NotFoundView} />
    </Switch>
  );
}

export default Router;
