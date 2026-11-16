import { Route, Switch } from "wouter";
import { ROUTES } from "../config.ts";
import HuntDetailView from "../views/HuntDetailView.tsx";
import LoginView from "../views/LoginView.tsx";
import NotFoundView from "../views/NotFoundView.tsx";
import RegisterView from "../views/RegisterView.tsx";
import RiddleGPSView from "../views/RiddleGPSView.tsx";
import RiddleQCMView from "../views/RiddleQCMView.tsx";
import RiddleQRCodeView from "../views/RiddleQRCodeView.tsx";
import RiddleTextView from "../views/RiddleTextView.tsx";
import TreasureHuntsView from "../views/TreasureHuntsView.tsx";
import UserProfileView from "../views/UserProfileView.tsx";
import UserSettingsView from "../views/UserSettingsView.tsx";
import VerifyEmailView from "../views/VerifyEmailView.tsx";
import WelcomePageView from "../views/WelcomePageView.tsx";

/**
 * Placeholder handler, to be replaced when the riddle views are wired to the API.
 */
const todo = () => {
  // Handler temporaire en attendant la connexion à l'API
};

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

      <Route path="/riddle" nest>
        <Route path="/text">
          {" "}
          <RiddleTextView
            title={"Ceci est un titre"}
            description={"Ceci est une description de test"}
            imageUrl={
              "https://venstone.xyz/assets/images/2023-08-08-15.23.14.webp"
            }
            question={"Est-ce une question ?"}
            rank={1}
            remainingMinutes={1}
            score={1}
            step={1}
            totalSteps={1}
            onSubmit={todo}
          />
        </Route>
        <Route path="/qcm">
          {" "}
          <RiddleQCMView
            title={"Ceci est un titre"}
            description={"Ceci est une description de test"}
            imageUrl={
              "https://carnet-dhistoire.fr/wp-content/uploads/2025/06/histoire-drapea-francais.webp"
            }
            question={"Quelle est la capitale de la France ?"}
            choices={[
              { id: "1", text: "Londres" },
              { id: "2", text: "Paris" },
              { id: "3", text: "Berlin" },
              { id: "4", text: "Madrid" },
            ]}
            answersCount={2}
            rank={1}
            remainingMinutes={1}
            score={1}
            step={1}
            totalSteps={1}
            onSubmit={todo}
          />
        </Route>
        <Route path="/qrcode">
          {" "}
          <RiddleQRCodeView
            title={"Trouvez ce QRCode"}
            description={"Ceci est une description de test"}
            rank={1}
            remainingMinutes={1}
            score={1}
            step={1}
            totalSteps={1}
            onScan={todo}
          />
        </Route>
        <Route path="/gps">
          {" "}
          <RiddleGPSView
            title={"Trouvez ce lieu"}
            description={"Ceci est une description de test"}
            rank={1}
            remainingMinutes={1}
            score={1}
            step={1}
            totalSteps={1}
            onValidateLocation={todo}
          />
        </Route>
      </Route>

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
