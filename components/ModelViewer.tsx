"use client";

import "@google/model-viewer";
import { useEffect, useRef, useState } from "react";

export default function ModelViewer() {
  const viewerRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleLoad = () => setStatus("loaded");
    const handleError = () => setStatus("error");

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div className="relative w-full min-w-0">
      <model-viewer
        ref={viewerRef}
        src="/models/C41_QS_a3f9c78cdb.glb"
        alt="C41QS 3D model"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1"
        style={{
          width: "100%",
          height: "clamp(280px, 55vw, 480px)",
          background: "transparent",
        }}
      />

      {status !== "loaded" && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center"
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          <p className="text-sm text-slate-300">
            {status === "error"
              ? "The 3D model is temporarily unavailable. Please try again later."
              : "Loading 3D model..."}
          </p>
        </div>
      )}

      <p className="mt-4 text-center text-sm text-slate-400">
        Drag to rotate • Scroll to zoom
      </p>
    </div>
  );
}