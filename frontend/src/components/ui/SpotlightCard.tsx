import React from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor: _spotlightColor,
  ...props
}: SpotlightCardProps) {
  void _spotlightColor;

  return (
    <div
      className={`surface-card overflow-hidden ${className}`}
      {...props}
    >
      <span aria-hidden="true" className="glass-specular-rim" />
      {children}
    </div>
  );
}
