import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Loader from "../components/Loader.tsx";
import { ROUTES } from "../config.ts";
import { verifyEmail } from "../services/authService";

function VerifyEmailView() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
      "loading",
    ),
    [message, setMessage] = useState<string>(
      "Validation de votre compte en cours...",
    ),
    hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const queryParams = new URLSearchParams(window.location.search);

    if (!queryParams.has("id")) {
      setStatus("error");
      setMessage("Lien de validation invalide ou incomplet.");
      return;
    }

    verifyEmail(queryParams.toString())
      .then((msg) => {
        setStatus("success");
        setMessage(msg);
      })
      .catch((error: unknown) => {
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de la vérification de votre email.",
        );
      });
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5 text-center">
              <h2 className="mb-4">Vérification de l'email</h2>

              {status === "loading" && <Loader label={message} />}

              {status === "success" && (
                <div className="alert alert-success mb-4" role="alert">
                  <h4 className="alert-heading">Félicitations !</h4>
                  <p>{message}</p>
                  <hr />
                  <div className="d-flex justify-content-end">
                    <Link href={ROUTES.LOGIN} className="btn btn-success">
                      Se connecter
                    </Link>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="alert alert-danger mb-4" role="alert">
                  <h4 className="alert-heading">Erreur de validation</h4>
                  <p>{message}</p>
                  <hr />
                  <div className="d-flex justify-content-end">
                    <Link href={ROUTES.HOME} className="btn btn-outline-danger">
                      Retour à l'accueil
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailView;
