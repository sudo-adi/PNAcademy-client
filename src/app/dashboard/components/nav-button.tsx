"use client";
import React from 'react';

interface NavButtonProps {
  text: string;
  icon: React.ReactElement;
  onClick?: () => void;
  isActive?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ text, icon, onClick, isActive }) => {
  // Clone the icon element to add additional class names
  const iconWithClass = React.cloneElement(icon, {
    className: `${icon.props.className || ''} h-4 w-4`
  });

  const baseClass = "flex items-center gap-3 rounded-lg px-3 py-2 transition-all";
  const activeClass = "text-primary bg-muted hover:text-primary";
  const inactiveClass = "text-muted-foreground hover:text-primary";

  return (
    <button
      className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
      onClick={onClick}
    >
      {iconWithClass}
      <span>{text}</span>
    </button>
  );
};

export default NavButton;
