import HuntDetail from "../components/HuntDetail.tsx";
import Stylesheet from "../components/Stylesheet.tsx";

export default function HuntDetailView() {
  return (
    <>
      <Stylesheet href="/css/HuntDetail.css" />
      <Stylesheet href="/css/Feedbacks.css" />
      <Stylesheet href="/css/RiddleView.css" />
      <HuntDetail />
    </>
  );
}
