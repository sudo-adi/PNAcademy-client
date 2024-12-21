import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

const PnaLoader = () => {
  const { theme } = useTheme();

  return (
    <>
      {theme === "dark" || !theme ? (
        <div>
          <Image
            src="/logo-dark.png"
            className="animate-pulse"
            alt="Loading"
            width={100}
            height={100}
          />
        </div>
      ) : (
        <div>
          <Image
            src="/logo.png"
            className="animate-pulse"
            alt="Loading"
            width={100}
            height={100}
          />
        </div>
      )}
    </>
  );
};

export default PnaLoader;
