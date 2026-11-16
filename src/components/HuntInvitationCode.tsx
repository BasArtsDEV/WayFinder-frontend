import { useState } from "react";
import { copyToClipboard } from "../utils/global.ts";

interface HuntInvitationCodeProps {
  code: string;
}

export default function HuntInvitationCode({ code }: HuntInvitationCodeProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <div className="hunt-code">
      <div className="hunt-code-content">
        <span className="hunt-code-label">Code d&apos;invitation</span>
        <span className="hunt-code-value">{code}</span>
      </div>

      <button
        type="button"
        className="hunt-code-copy"
        onClick={() => {
          copyToClipboard(code);
          setIsCopied(true);
        }}
      >
        <i
          className={isCopied ? "bi bi-check-lg" : "bi bi-clipboard"}
          aria-hidden="true"
        ></i>
        <span>{isCopied ? "Copié !" : "Copier"}</span>
      </button>
    </div>
  );
}
