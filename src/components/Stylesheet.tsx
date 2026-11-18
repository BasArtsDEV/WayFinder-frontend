interface StylesheetProps {
  href: string;
}

/**
 * Loads a stylesheet only when the component using it is rendered.
 * React hoists it into <head> and loads it once, even if rendered many times.
 */
export default function Stylesheet({ href }: StylesheetProps) {
  return <link rel="stylesheet" href={href} precedence="page" />;
}
