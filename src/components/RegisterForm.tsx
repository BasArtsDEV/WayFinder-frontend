import type React from "react";
import { Link } from "wouter";
import { ROUTES } from "../config.ts";
import FormField from "./FormField.tsx";

interface RegisterFormFieldsProps {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  setConfirmPassword: (value: string) => void;
  setEmail: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setPassword: (value: string) => void;
  setUsername: (value: string) => void;
  username: string;
}

function RegisterFormFields({
  confirmPassword,
  email,
  firstName,
  lastName,
  password,
  setConfirmPassword,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setUsername,
  username,
}: RegisterFormFieldsProps) {
  return (
    <>
      <FormField
        label="Nom d'utilisateur"
        type="text"
        name="username"
        id="username"
        placeholder="Entrez un nom d'utilisateur..."
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <FormField
        label="Adresse e-mail"
        type="email"
        name="email"
        id="email"
        placeholder="exemple@mail.com"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <div className="form-field-row">
        <FormField
          label="Prénom"
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Jean"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <FormField
          label="Nom"
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Némarre"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
      </div>
      <FormField
        label="Mot de passe"
        type="password"
        name="password"
        id="password"
        placeholder="Saisissez un mot de passe..."
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <FormField
        label="Confirmer le mot de passe"
        type="password"
        name="confirm-password"
        id="confirm-password"
        placeholder="Récrivez votre mot de passe..."
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
      />
    </>
  );
}

function RegisterFormActions({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <p className="mt-1">
        Vous avez déjà un compte ?{" "}
        <Link href={ROUTES.LOGIN} className="btn-app-hypertext">
          Connectez-vous
        </Link>
        .
      </p>
      <div className="form-submit">
        <button type="submit" className="btn-app-primary" disabled={isLoading}>
          <span className="btn-icon-wrapper">
            <img src="/icons/check.png" className="btn-action-icon" alt="" />
          </span>
          <span>{isLoading ? "Inscription..." : "Valider"}</span>
        </button>
      </div>
      <Link href={ROUTES.HOME} className="btn-app-secondary">
        <div className="btn-icon-wrapper">
          <img className="btn-action-icon" src="/icons/home.png" alt="Retour" />
        </div>
        <span>Retourner à l'accueil</span>
      </Link>
    </>
  );
}

export interface RegisterFormProps {
  error: string | null;
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  fields: RegisterFormFieldsProps;
}

function RegisterForm({
  error,
  fields,
  handleSubmit,
  isLoading,
}: RegisterFormProps) {
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <RegisterFormFields {...fields} />
      <RegisterFormActions isLoading={isLoading} />
    </form>
  );
}

export default RegisterForm;
