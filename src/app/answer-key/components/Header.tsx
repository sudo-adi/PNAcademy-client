import React, { useState } from "react";
import { ArrowLeft, ClipboardList, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  totalScore: number;
  totalPossibleScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  totalScore,
  totalPossibleScore,
}) => {
  const percentageScore = (totalScore / totalPossibleScore) * 100;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.push("/dashboard");
    setIsLoading(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 flex h-16 items-center w-full">
        <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
          <div
            className="flex items-center gap-2 hover:bg-secondary/80 px-3 py-2 rounded-md cursor-pointer transition-colors border border-border"
            onClick={handleBack}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">Assessment Result</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <span className="text-primary font-medium">{totalScore}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">
                {totalPossibleScore}
              </span>
            </div>
            <div className="h-8 w-8 relative">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={
                    percentageScore < 33
                      ? "#ef4444"
                      : percentageScore < 75
                      ? "#f59e0b"
                      : percentageScore < 90
                      ? "#3b82f6"
                      : "#22c55e"
                  }
                  strokeWidth="3"
                  strokeDasharray={`${
                    (totalScore / totalPossibleScore) * 100
                  }, 100`}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
