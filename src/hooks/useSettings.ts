import React, { useState } from "react";
import { useLocation } from "wouter";
import { ROUTES } from "../config.ts";
import { useAuth } from "../contexts/AuthContext.ts";
import {
  deleteUserImage,
  updateUser,
  uploadUserImage,
  type User,
  type UserImageKind,
  type UserUpdateData,
} from "../services/user.ts";
import { isPasswordValid, PASSWORD_RULES_MESSAGE } from "../utils/password.ts";
import { type ImageField, useImageField } from "./useImageField.ts";

const DEFAULT_ERROR = "Une erreur est survenue. Veuillez réessayer plus tard.";

function getImageChanges(
  kind: UserImageKind,
  hasImage: boolean,
): Partial<User> {
  const version = Date.now();

  return kind === "avatar"
    ? { avatarVersion: version, hasAvatar: hasImage }
    : { bannerVersion: version, hasBanner: hasImage };
}

/**
 * Sends the pending change of an image (new file or removal), if there is one
 */
async function applyImageChange(
  userId: number,
  kind: UserImageKind,
  field: ImageField,
): Promise<Partial<User>> {
  if (field.file) {
    await uploadUserImage(userId, kind, field.file);
    return getImageChanges(kind, true);
  }

  if (field.isRemoved) {
    await deleteUserImage(userId, kind);
    return getImageChanges(kind, false);
  }

  return {};
}

/**
 * Applies the pending avatar and banner changes
 */
async function saveImages(
  userId: number,
  avatar: ImageField,
  banner: ImageField,
) {
  const [avatarResult, bannerResult] = await Promise.allSettled([
      applyImageChange(userId, "avatar", avatar),
      applyImageChange(userId, "banner", banner),
    ]),
    results = [
      { label: "Avatar", result: avatarResult },
      { label: "Bannière", result: bannerResult },
    ],
    changes: Partial<User> = {},
    errors: string[] = [];

  for (const { label, result } of results) {
    if (result.status === "fulfilled") {
      Object.assign(changes, result.value);
    } else {
      errors.push(
        `${label} : ${result.reason instanceof Error ? result.reason.message : DEFAULT_ERROR}`,
      );
    }
  }

  return { changes, errors };
}

// eslint-disable-next-line max-lines-per-function
export function useSettings(user: User) {
  const [username, setUsername] = useState(user.username),
    [firstName, setFirstName] = useState(user.firstName),
    [lastName, setLastName] = useState(user.lastName),
    [email, setEmail] = useState(user.email),
    [timezone, setTimezone] = useState(user.timezone),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState(""),
    [error, setError] = useState<string | null>(null),
    [isLoading, setIsLoading] = useState(false),
    avatar = useImageField(),
    banner = useImageField(),
    { setUser } = useAuth(),
    [, setLocation] = useLocation();

  function getPasswordError(): string | null {
    if (!password && !confirmPassword) {
      return null;
    }
    if (password !== confirmPassword) {
      return "Les mots de passe ne correspondent pas.";
    }
    if (!isPasswordValid(password)) {
      return PASSWORD_RULES_MESSAGE;
    }
    return null;
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const passwordError = getPasswordError(),
      data: UserUpdateData = {
        email,
        firstName,
        lastName,
        timezone,
        username,
      };

    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password) {
      data.password = password;
    }

    setIsLoading(true);

    updateUser(user.id, data)
      .then(async (updatedUser: User) => {
        const { changes, errors } = await saveImages(user.id, avatar, banner);

        setUser({ ...user, ...updatedUser, ...changes });

        if (errors.length) {
          // The images that have been saved are no longer pending
          if ("hasAvatar" in changes) {
            avatar.reset();
          }
          if ("hasBanner" in changes) {
            banner.reset();
          }
          setError(`Profil enregistré, mais :\n${errors.join("\n")}`);
          return;
        }

        setLocation(ROUTES.USER_VIEW);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : DEFAULT_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return {
    error,
    fields: {
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
      setTimezone,
      setUsername,
      timezone,
      username,
    },
    handleSubmit,
    images: { avatar, banner },
    isLoading,
  };
}
