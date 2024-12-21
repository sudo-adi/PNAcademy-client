import React, { use, useEffect } from "react";
import { SectionCard } from "./SectionCard";
import { Question } from "@/lib/types/answer-keyTypes";

interface MainContentProps {
  sections: Question[][];
}

export const MainContent: React.FC<MainContentProps> = ({ sections }) => {
  console.log(sections);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Assessment Results
          </h1>
          <p className="text-muted-foreground mt-2">
            Review your answers and explanations for each question
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((sectionQuestions, index) => {
            const startIndex = sections
              .slice(0, index)
              .reduce((sum, section) => sum + section.length, 0);

            return (
              <SectionCard
                key={index}
                questions={sectionQuestions}
                sectionStartIndex={startIndex}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};
