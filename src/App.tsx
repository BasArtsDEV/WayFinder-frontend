import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";

function App() {
  return (
    <div className="app-container">
      <Header>WayFinder</Header>

      <Main />

      <Footer>
        <p>Pied de page</p>
      </Footer>
    </div>
  );
}

export default App;
