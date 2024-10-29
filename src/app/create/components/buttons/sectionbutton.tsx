import React from "react";

interface SectionButtonProps {
  index: number;
  onClick: () => void;
  isCurrentSection: boolean;
  disabled: boolean;
}
const SectionButton: React.FC<SectionButtonProps> = ({
  index,
  onClick,
  isCurrentSection,
  disabled,
}) => {
  return (
    <>
      <button disabled={disabled} onClick={onClick} key={index}>
        <div
          className={`text-[8px] flex rounded-md h-6 w-6 p-2 border items-center justify-center ${
            disabled
              ? "text-secondary bg-transparent  hover:bg-transparent"
              : isCurrentSection
              ? "bg-secondary"
              : ""
          }`}
        >
          {index + 1}
        </div>
      </button>
    </>
  );
};

export default SectionButton;
