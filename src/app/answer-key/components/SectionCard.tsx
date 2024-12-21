import React, { useEffect } from "react";
import { Question } from "@/lib/types/answer-keyTypes";
import { QuestionCard } from "./question-card";

interface SectionCardProps {
  questions: Question[];
  sectionStartIndex: number;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  questions,
  sectionStartIndex,
}) => {
  // Calculate section statistics
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const earnedMarks = questions.reduce((sum, q) => {
    const isCorrect = q.options.some(
      (opt) => opt.is_correct && opt.is_selected
    );
    return sum + (isCorrect ? q.marks : 0);
  }, 0);

  const percentageScore = (earnedMarks / totalMarks) * 100;

  return (
    <div className="flex flex-col w-full bg-card rounded-lg shadow-lg border">
      {/* Section Header */}
      <div className="bg-primary/5 p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Section {questions[0]?.section}
            </h2>
            <p className="text-sm text-muted-foreground">
              Questions: {questions.length}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 relative">
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
                  strokeDasharray={`${percentageScore}, 100`}
                />
                <text
                  x="18"
                  y="20.35"
                  className="percentage"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="8"
                >
                  {Math.round(percentageScore)}%
                </text>
              </svg>
            </div>
            <div className="flex flex-col items-end gap-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-medium">
                <span
                  className={
                    percentageScore < 33
                      ? "text-red-600"
                      : percentageScore < 75
                      ? "text-yellow-600"
                      : percentageScore < 90
                      ? "text-blue-600"
                      : "text-green-600"
                  }
                >
                  {earnedMarks}
                </span>
                <span className="text-muted-foreground">/{totalMarks}</span>
              </div>
              <div className="text-sm text-muted-foreground">Section Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Container */}
      <div className="p-6 space-y-6">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={sectionStartIndex + index + 1}
          />
        ))}
      </div>
    </div>
  );
};
