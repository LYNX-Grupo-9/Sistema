import React from "react";
import logo from '../../assets/temis-logo.png';

export function Loading() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-[var(--color-blueDark)] z-[9999]">
      <div
        className="w-24 h-24 border-4 border-transparent border-l-[var(--color-light)] border-r-[var(--color-blueLight)] rounded-full animate-spin duration-[4000ms]"
        role="status"
      />
      <img src={logo} alt="Loading..." className="w-20 absolute" />
    </div>
  );
}
