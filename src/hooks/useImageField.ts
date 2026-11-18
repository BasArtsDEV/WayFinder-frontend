import { useEffect, useRef, useState } from "react";
import { getImageError } from "../utils/image.ts";

/**
 * Handles a pending avatar/banner change (new file or removal) until the form is submitted
 */
export function useImageField() {
  const [file, setFile] = useState<File | null>(null),
    [previewUrl, setPreviewUrl] = useState<string | null>(null),
    [isRemoved, setIsRemoved] = useState(false),
    [error, setError] = useState<string | null>(null),
    previewRef = useRef<string | null>(null);

  function releasePreview() {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }
  }

  useEffect(() => releasePreview, []);

  function select(newFile: File) {
    const fileError = getImageError(newFile);

    setError(fileError);

    if (fileError) {
      return;
    }

    releasePreview();
    previewRef.current = URL.createObjectURL(newFile);
    setFile(newFile);
    setPreviewUrl(previewRef.current);
    setIsRemoved(false);
  }

  function remove() {
    releasePreview();
    setError(null);
    setFile(null);
    setPreviewUrl(null);
    setIsRemoved(true);
  }

  function reset() {
    releasePreview();
    setError(null);
    setFile(null);
    setPreviewUrl(null);
    setIsRemoved(false);
  }

  return { error, file, isRemoved, previewUrl, remove, reset, select };
}

export type ImageField = ReturnType<typeof useImageField>;
