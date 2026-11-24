import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import PwaBanner from "./components/PwaBanner.tsx";
import AuthContextProvider from "./contexts/providers/AuthProvider.tsx";

function App() {
  return (
    <div className="app-container">
      <AuthContextProvider>
        <Header>WayFinder</Header>
        <PwaBanner />

        <Main />
      </AuthContextProvider>

      <Footer></Footer>
    </div>
  );
}

export default App;
