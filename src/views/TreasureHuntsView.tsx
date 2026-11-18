import HuntsList from "../components/HuntsList.tsx";
import Stylesheet from "../components/Stylesheet.tsx";

export default function TreasureHuntsView() {
  return (
    <>
      <Stylesheet href="/css/TreasureHuntsView.css" />
      <HuntsList />
    </>
  );
}
