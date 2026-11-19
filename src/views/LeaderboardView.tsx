import { useParams } from "wouter";
import Leaderboard from "../components/Leaderboard.tsx";
import Stylesheet from "../components/Stylesheet.tsx";

export default function LeaderboardView() {
  const { id } = useParams();

  return (
    <>
      <Stylesheet href="/css/Leaderboard.css" />
      <Leaderboard huntId={Number(id)} />
    </>
  );
}
