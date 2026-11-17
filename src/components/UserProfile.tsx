import { type ReactNode, useState } from "react";
import { Link } from "wouter";
import { ROUTES } from "../config.ts";
import { getUserAvatar, getUserBanner, type User } from "../services/user.ts";
import LogoutButton from "./LogoutButton.tsx";

interface UserProfileProps {
  user: User;
}

function ProfileHeader({ user }: UserProfileProps) {
  const [hasBanner, setHasBanner] = useState(true);

  return (
    <div className={hasBanner ? "avatar-section has-banner" : "avatar-section"}>
      {hasBanner && (
        <img
          src={getUserBanner(user.id.toString())}
          alt=""
          className="profile-banner"
          onError={() => {
            setHasBanner(false);
          }}
        />
      )}
      <div className="avatar-circle">
        <img
          src={getUserAvatar(user.id.toString())}
          alt={`Avatar de ${user.username}`}
          className="field-icon"
        />
      </div>
      <h1>@{user.username}</h1>
    </div>
  );
}

interface ProfileFieldProps {
  children: ReactNode;
  icon: ReactNode;
  title: string;
}

function ProfileField({ children, icon, title }: ProfileFieldProps) {
  return (
    <div className="field">
      <div className="field-icon-container" aria-hidden="true">
        {icon}
      </div>
      <div className="field-content">
        <h4>{title}</h4>
        {children}
      </div>
    </div>
  );
}

function EmailStatus({ isVerified }: { isVerified: boolean }) {
  return isVerified ? (
    <span className="email-status email-status-verified">
      <i className="bi bi-patch-check-fill" aria-hidden="true"></i>
      Vérifiée
    </span>
  ) : (
    <span className="email-status email-status-pending">
      <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
      Non vérifiée
    </span>
  );
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="user-container">
      <ProfileHeader user={user} />

      <div className="fields-container">
        <ProfileField
          title="Identité"
          icon={<img src="/icons/add-user.png" alt="" className="field-icon" />}
        >
          <span>
            {user.firstName} {user.lastName}
          </span>
        </ProfileField>

        <ProfileField
          title="Adresse e-mail"
          icon={<img src="/icons/mail.svg" alt="" className="field-icon" />}
        >
          <span className="field-email">{user.email}</span>
          <EmailStatus isVerified={user.isVerified} />
        </ProfileField>

        <ProfileField
          title="Membre depuis"
          icon={<img src="/icons/calendar.svg" alt="" className="field-icon" />}
        >
          <span>
            {new Date(user.createdAt).toLocaleString("default", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </ProfileField>

        <ProfileField
          title="Fuseau horaire"
          icon={<i className="bi bi-globe2 field-bi-icon"></i>}
        >
          <span>{user.timezone.replaceAll("_", " ")}</span>
        </ProfileField>
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

        <LogoutButton />
      </div>
    </div>
  );
}
