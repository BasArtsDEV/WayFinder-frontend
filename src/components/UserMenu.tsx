import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ROUTES } from "../config.ts";
import { useLogout } from "../hooks/useLogout.ts";
import { getUserAvatar, type User } from "../services/user.ts";

export default function UserMenu({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false),
    menuRef = useRef<HTMLDivElement>(null),
    handleLogout = useLogout();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="user-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Menu du compte"
        onClick={() => {
          setIsOpen((open) => !open);
        }}
      >
        <div className="header-avatar-circle">
          <img
            src={getUserAvatar(user.id.toString())}
            alt={`Avatar de ${user.username}`}
            className="avatar-field-icon"
          />
        </div>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown" role="menu">
          <Link
            href={ROUTES.USER_VIEW}
            className="user-menu-item"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <i className="bi bi-person-fill user-menu-icon"></i>
            Profil
          </Link>

          <Link
            href={ROUTES.USER_SETTINGS}
            className="user-menu-item"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <i className="bi bi-gear-fill user-menu-icon"></i>
            Paramètres
          </Link>

          <button
            type="button"
            className="user-menu-item user-menu-item-leave"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
          >
            <i className="bi bi-box-arrow-right user-menu-icon"></i>
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
