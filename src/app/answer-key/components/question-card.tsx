import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";
import { Question } from "@/lib/types/answer-keyTypes";
import { useAnswerKey } from "../hooks/useAnswerKey";
import ExplanationDialogBox from "./ExplainationDialogBox";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
}) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getExplanation } = useAnswerKey();

  const isCorrect = question.options.some(
    (opt) => opt.is_correct && opt.is_selected
  );

  const renderOptionStatus = (option: any) => {
    if (option.is_correct && option.is_selected) {
      return <Check className="h-4 w-4 text-green-600" />;
    } else if (!option.is_correct && option.is_selected) {
      return <X className="h-4 w-4 text-red-600" />;
    } else if (option.is_correct && !option.is_selected) {
      return <Check className="h-4 w-4 text-muted-foreground" />;
    }
    return null;
  };

  const explainAnswer = async () => {
    try {
      setIsExplanationOpen(true);
      setIsLoading(true);
      const response = await getExplanation(question.id);
      setExplanation(response.data.explanation);
    } catch (error) {
      console.error("Error fetching explanation:", error);
      setExplanation("Failed to load explanation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full p-4 bg-background rounded-lg border">
        {/* Question Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge className="mr-2">Q. {questionNumber}</Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Marks:</span>
              <span
                className={`font-medium ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect ? question.marks : 0}
              </span>
              <span className="text-muted-foreground">/{question.marks}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="text-lg">{isCorrect ? "✅" : "❌"}</div>
            </div>
          </div>
        </div>

        {/* Question Description */}
        <div className="flex p-1 text-sm">{question.description}</div>

        {/* Legend */}
        <div className="flex gap-4 px-5 pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-sm" />
            <span>Correct Answer</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-secondary rounded-sm" />
            <span>Your Answer</span>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4 px-5 py-4">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`flex flex-row items-center p-2 rounded-md ${
                option.is_selected ? "bg-secondary" : ""
              } ${option.is_correct ? "bg-green-500" : ""} ${
                option.is_correct && option.is_selected
                  ? "border-2 border-green-600"
                  : option.is_selected && !option.is_correct
                  ? "border-2 border-red-600"
                  : ""
              }`}
            >
              <div className="flex-1 flex items-center gap-3">
                <Checkbox disabled checked={option.is_selected} />
                <span className="flex-1">{option.description}</span>
              </div>
              <div className="flex items-center gap-2">
                {renderOptionStatus(option)}
              </div>
            </div>
          ))}
        </div>

        {/* Explain Button */}
        <div
          className="flex items-center gap-2 px-8 py-2 cursor-pointer mb-5 text-primary hover:text-primary/80 transition-colors"
          onClick={explainAnswer}
        >
          <span className="underline">Explain</span>
          <span className="text-xs"></span>
        </div>
        <Separator className="w-full" />
      </div>

      <ExplanationDialogBox
        isOpen={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        question={question}
        explanation={explanation}
        isLoading={isLoading}
      />
    </>
  );
};
