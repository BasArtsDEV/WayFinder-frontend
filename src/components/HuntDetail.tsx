import { Link, useParams } from "wouter";
import type { TreasureHunt } from "../../types/TreasureHunt.ts";
import { ROUTES } from "../config.ts";
import { useTreasureHunt } from "../hooks/useTreasureHunts.ts";
import formatDate from "../utils/global.ts";
import {
  formatHuntDuration,
  formatHuntRating,
  formatRiddlesCount,
} from "../utils/hunt.ts";
import FeedbacksList from "./FeedbacksList.tsx";
import HuntInvitationCode from "./HuntInvitationCode.tsx";
import HuntPlayActions from "./HuntPlayActions.tsx";

interface HuntStatProps {
  icon: string;
  label: string;
  value: string;
}

function HuntStat({ icon, label, value }: HuntStatProps) {
  return (
    <div className="riddle-stat">
      <i className={`bi ${icon} riddle-stat__icon`} aria-hidden="true"></i>
      <div>
        <span className="riddle-stat__label">{label}</span>
        <span className="riddle-stat__value">{value}</span>
      </div>
    </div>
  );
}

function HuntStats({ hunt }: { hunt: TreasureHunt }) {
  return (
    <div className="riddle-stats hunt-detail-stats">
      <HuntStat
        icon="bi-puzzle-fill"
        label="Énigmes"
        value={formatRiddlesCount(hunt)}
      />
      <HuntStat
        icon="bi-star-fill"
        label="Note"
        value={formatHuntRating(hunt)}
      />
      <HuntStat
        icon="bi-clock-fill"
        label="Durée"
        value={formatHuntDuration(hunt)}
      />
      <HuntStat
        icon="bi-calendar-event-fill"
        label="Créée le"
        value={formatDate(hunt.creationDate)}
      />
    </div>
  );
}

export default function HuntDetail() {
  const { id } = useParams(),
    { error, hunt, isLoading } = useTreasureHunt(Number(id));

  return (
    <article className="hunt-detail">
      <Link href={`~${ROUTES.HUNTS}`} className="hunt-detail-back">
        <i className="bi bi-arrow-left" aria-hidden="true"></i>
        Toutes les chasses
      </Link>

      {isLoading && (
        <p className="hunts-message">Chargement de la chasse au trésor...</p>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {hunt && (
        <>
          <header className="hunt-detail-hero">
            <h1 className="hunt-detail-title">{hunt.title}</h1>
            <p className="hunt-detail-team">
              <i className="bi bi-people-fill" aria-hidden="true"></i>
              Créée par {hunt.team.name}
            </p>
            <p className="hunt-detail-description">{hunt.description}</p>
          </header>

          <HuntStats hunt={hunt} />
          <HuntInvitationCode code={hunt.invitationCode} />
          <HuntPlayActions hunt={hunt} />
          <FeedbacksList huntId={hunt.id} />
        </>
      )}
    </article>
  );
}
