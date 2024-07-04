"use client";

import { useEffect, useState } from "react";

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1000);

    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#000000] transition-opacity duration-500 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div
          className={`loader-container transition-all duration-300 ${
            fadeOut ? "scale-75 blur-sm" : "scale-100"
          }`}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
