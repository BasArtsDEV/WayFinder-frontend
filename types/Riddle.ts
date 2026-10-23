/**
 * Props shared by every riddle view (text, QCM, QR code, GPS).
 * They match the information displayed on top of each mockup.
 */
export interface RiddleBaseProps {
  description: string;
  imageUrl?: string;
  rank: number;
  remainingMinutes: number;
  score: number;
  step: number;
  title: string;
  totalSteps: number;
}

export interface RiddleChoice {
  id: string;
  text: string;
}
