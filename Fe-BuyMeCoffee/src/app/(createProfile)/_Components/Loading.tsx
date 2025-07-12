"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <img
        src="/coffee.gif"
        alt="Loading"
        width={150}
        height={150}
        className="object-contain"
      />
    </div>
  );
}
