/**
 * Checks that the password matches the application security rules
 */
export function isPasswordValid(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/u.test(password) &&
    /[0-9]/u.test(password) &&
    /[^A-Za-z0-9]/u.test(password)
  );
}

export const PASSWORD_RULES_MESSAGE =
  "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.";
