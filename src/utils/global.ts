/**
 * Function to format a date as (e.g: 12/12/2000) without writing this entire logic inside the component.
 * @param date string
 * @return string
 */
export default function formatDate(date: string): string {
  return new Date(date).toLocaleString("default", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}
