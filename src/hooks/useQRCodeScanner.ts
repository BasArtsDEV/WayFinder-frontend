import jsQR from "jsqr";
import { useEffect, useRef, useState } from "react";

function decodeFrame(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
): string | null {
  const context = canvas.getContext("2d"),
    { videoHeight: height, videoWidth: width } = video;

  if (!context || video.readyState !== video.HAVE_ENOUGH_DATA) {
    return null;
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(video, 0, 0, width, height);

  return (
    jsQR(context.getImageData(0, 0, width, height).data, width, height)?.data ??
    null
  );
}

export function useQRCodeScanner(onDetected: (value: string) => void) {
  const [isScanning, setIsScanning] = useState(false),
    [error, setError] = useState<string | null>(null),
    videoRef = useRef<HTMLVideoElement>(null),
    onDetectedRef = useRef(onDetected);

  useEffect(() => {
    onDetectedRef.current = onDetected;
  }, [onDetected]);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    let frameId = 0,
      isCancelled = false,
      stream: MediaStream | null = null;

    function scanFrame() {
      if (!videoRef.current) {
        return;
      }

      const value = decodeFrame(videoRef.current, canvas);

      if (value) {
        setIsScanning(false);
        onDetectedRef.current(value);
      } else {
        frameId = requestAnimationFrame(scanFrame);
      }
    }

    if (isScanning) {
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: { facingMode: "environment" } })
        .then(async (mediaStream) => {
          stream = mediaStream;

          if (isCancelled || !videoRef.current) {
            mediaStream.getTracks().forEach((track) => {
              track.stop();
            });
            return;
          }

          videoRef.current.srcObject = mediaStream;
          await videoRef.current.play();
          frameId = requestAnimationFrame(scanFrame);
        })
        .catch(() => {
          setError(
            "Impossible d'accéder à la caméra. Vérifiez les permissions de votre navigateur.",
          );
          setIsScanning(false);
        });
    }

    return () => {
      isCancelled = true;
      cancelAnimationFrame(frameId);
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [isScanning]);

  function start() {
    setError(null);
    setIsScanning(true);
  }

  function stop() {
    setIsScanning(false);
  }

  return { error, isScanning, start, stop, videoRef };
}
