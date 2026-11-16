import type { ReactNode } from "react";
import { Link } from "wouter";
import { ROUTES } from "../config.ts";
import { useSettings } from "../hooks/useSettings.ts";
import type { User } from "../services/user.ts";
import FormField from "./FormField.tsx";
import PasswordField from "./PasswordField.tsx";

interface SettingsSectionProps {
  children: ReactNode;
  icon: string;
  title: string;
}

function SettingsSection({ children, icon, title }: SettingsSectionProps) {
  return (
    <fieldset className="settings-section">
      <legend>
        <i className={`bi ${icon}`} aria-hidden="true"></i>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function SettingsActions({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="settings-actions">
      <button type="submit" className="btn-app-primary" disabled={isLoading}>
        <span className="btn-icon-wrapper">
          <img
            src="/icons/check.png"
            className="btn-action-icon"
            alt="Icône de validation"
          />
        </span>
        <span>{isLoading ? "Enregistrement..." : "Valider"}</span>
      </button>

      <Link href={ROUTES.USER_VIEW} className="btn-app-decline">
        <span className="btn-icon-wrapper">
          <i className="bi bi-x-circle-fill" aria-hidden="true"></i>
        </span>
        <span>Annuler</span>
      </Link>
    </div>
  );
}

interface UserSettingsProps {
  user: User;
}

export default function UserSettings({ user }: UserSettingsProps) {
  const { error, fields, handleSubmit, isLoading } = useSettings(user);

  return (
    <div className="settings-container">
      <h1>Paramètres</h1>

      <form className="settings-form" onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger settings-error" role="alert">
            {error}
          </div>
        )}

        <SettingsSection icon="bi-person-fill" title="Identité">
          <div className="form-field-row">
            <FormField
              label="Prénom"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Prénom"
              value={fields.firstName}
              onChange={(event) => {
                fields.setFirstName(event.target.value);
              }}
            />
            <FormField
              label="Nom"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Nom"
              value={fields.lastName}
              onChange={(event) => {
                fields.setLastName(event.target.value);
              }}
            />
          </div>
        </SettingsSection>

        <SettingsSection icon="bi-envelope-fill" title="Adresse e-mail">
          <FormField
            label="E-mail"
            type="email"
            name="email"
            id="email"
            placeholder="exemple@mail.com"
            value={fields.email}
            onChange={(event) => {
              fields.setEmail(event.target.value);
            }}
          />
        </SettingsSection>

        <SettingsSection icon="bi-lock-fill" title="Nouveau mot de passe">
          <PasswordField
            label="Mot de passe"
            name="password"
            id="password"
            placeholder="Entrez un mot de passe..."
            required={false}
            value={fields.password}
            onChange={(event) => {
              fields.setPassword(event.target.value);
            }}
          />
          <PasswordField
            label="Confirmation"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirmez le mot de passe..."
            required={false}
            value={fields.confirmPassword}
            onChange={(event) => {
              fields.setConfirmPassword(event.target.value);
            }}
          />
        </SettingsSection>

        <SettingsActions isLoading={isLoading} />
      </form>
    </div>
  );
}
