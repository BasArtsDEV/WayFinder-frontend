import { Link } from "wouter";
import { ROUTES } from "../config.ts";
import { getUserAvatar, type User } from "../services/user.ts";

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="user-container">
      <div className="avatar-section">
        <div className="avatar-circle">
          <img
            src={getUserAvatar(user.id.toString())}
            alt={`Avatar de ${user.username}`}
            className="field-icon"
          />
        </div>
        <h1>@{user.username}</h1>
      </div>

      <div className="fields-container">
        <div className="field">
          <div className="field-icon-container">
            <img
              src="/icons/add-user.png"
              alt="Identité"
              className="field-icon"
            />
          </div>
          <div className="field-content">
            <h4>Identité</h4>
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
        </div>

        <div className="field">
          <div className="field-icon-container">
            <img src="/icons/mail.svg" alt="Email" className="field-icon" />
          </div>
          <div className="field-content">
            <h4>Adresse e-mail</h4>
            <span>{user.email}</span>
          </div>
        </div>

        <div className="field">
          <div className="field-icon-container">
            <img
              src="/icons/calendar.svg"
              alt="Membre depuis"
              className="field-icon"
            />
          </div>
          <div className="field-content">
            <h4>Membre depuis</h4>
            <span>
              {new Date(user.createdAt).toLocaleString("default", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="button-container">
        <Link href={ROUTES.USER_SETTINGS} className="btn-app-primary">
          <div className="btn-icon-wrapper">
            <img
              src="/icons/pen.svg"
              className="btn-action-icon"
              alt="Icône de modification des informations"
            />
          </div>
          <p className="btn-text">Éditer les informations</p>
        </Link>

        <Link href={ROUTES.HOME} className="btn-app-secondary btn-home">
          <div className="btn-icon-wrapper">
            <img
              src="/icons/home.png"
              className="btn-action-icon"
              alt="Retour accueil"
            />
          </div>
          <p className="btn-text">Retourner à l&apos;accueil</p>
        </Link>
      </div>
    </div>
  );
}
