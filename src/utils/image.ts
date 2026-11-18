export const IMAGE_ACCEPT = "image/png,image/jpeg,image/webp,image/gif",
  IMAGE_MAX_SIZE = 2 * 1024 * 1024;

export function getImageError(file: File): string | null {
  if (!IMAGE_ACCEPT.split(",").includes(file.type)) {
    return "Format non pris en charge. Formats acceptés : PNG, JPEG, WebP, GIF.";
  }

  if (file.size > IMAGE_MAX_SIZE) {
    return "L'image est trop volumineuse (2 Mo maximum).";
  }

  return null;
}
