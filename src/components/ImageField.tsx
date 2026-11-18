import type { ChangeEvent } from "react";
import type { ImageField as ImageFieldState } from "../hooks/useImageField.ts";
import { IMAGE_ACCEPT } from "../utils/image.ts";

interface ImageFieldProps {
  /** URL of the image currently saved on the server, if the User has one */
  currentUrl: string | null;
  field: ImageFieldState;
  id: string;
  kind: "avatar" | "banner";
  label: string;
}

export default function ImageField({
  currentUrl,
  field,
  id,
  kind,
  label,
}: ImageFieldProps) {
  const src = field.previewUrl ?? (field.isRemoved ? null : currentUrl),
    hasPendingChange = field.file !== null || field.isRemoved,
    canRemove = src !== null;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const [selected] = event.target.files ?? [];

    field.select(selected);
    event.target.value = "";
  }

  return (
    <div className={`image-field image-field-${kind}`}>
      <span className="image-field-label">{label}</span>

      <div className="image-field-preview">
        {src ? (
          <img src={src} alt={`Aperçu : ${label.toLowerCase()}`} />
        ) : (
          <i
            className={`bi ${kind === "avatar" ? "bi-person-fill" : "bi-image"}`}
            aria-hidden="true"
          ></i>
        )}
      </div>

      <div className="image-field-actions">
        <input
          type="file"
          id={id}
          className="visually-hidden image-field-input"
          accept={IMAGE_ACCEPT}
          onChange={handleChange}
        />
        <label htmlFor={id} className="image-field-button">
          <i className="bi bi-upload" aria-hidden="true"></i>
          {src ? "Modifier" : "Ajouter"}
        </label>

        {canRemove && (
          <button
            type="button"
            className="image-field-button image-field-button-danger"
            onClick={field.remove}
          >
            <i className="bi bi-trash3-fill" aria-hidden="true"></i>
            Supprimer
          </button>
        )}

        {hasPendingChange && (
          <button
            type="button"
            className="image-field-button"
            onClick={field.reset}
          >
            <i className="bi bi-arrow-counterclockwise" aria-hidden="true"></i>
            Annuler
          </button>
        )}
      </div>

      {field.error && (
        <p className="image-field-error" role="alert">
          {field.error}
        </p>
      )}
    </div>
  );
}
