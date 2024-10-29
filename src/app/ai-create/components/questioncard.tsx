import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RotateCw, Trash2, Loader } from "lucide-react";
import React from "react";

interface QuestionCardProps {
  index: number;
  question: string;
  options: string[];
  correctOption: string;
  questionNumber: number;
  regenerating: boolean; // Spinner state
  regenerateQuestion: (index: number) => void;
  deleteQuestion: (index: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  correctOption,
  regenerating,
  questionNumber,
  index,
  regenerateQuestion,
  deleteQuestion,
}) => {
  return (
    <div className="h-full flex-grow">
      <div className="flex flex-col w-full gap-1">
        <div className="flex flex-col w-full gap-1">
          <div className="flex flex-row justify-between items-center">
            <Badge className="text-[12px] " variant="outline">
              Question {questionNumber}
            </Badge>
            <div className="flex items-center gap-2">
              <button
                disabled={regenerating}
                onClick={() => deleteQuestion(index)}
              >
                <Badge
                  className="text-[12px] hover:bg-secondary  border-destructive"
                  variant="outline"
                >
                  Delete
                  <Trash2 className="h-3 w-3 ml-2" />
                </Badge>
              </button>
              <button
                onClick={() => regenerateQuestion(index)}
                disabled={regenerating}
              >
                <Badge
                  className="text-[12px] hover:bg-secondary text-primary border-primary"
                  variant="outline"
                >
                  {regenerating ? (
                    <>
                      <Loader className="animate-spin h-3 w-3" />
                    </>
                  ) : (
                    <>
                      Regenerate
                      <RotateCw className="h-3 w-3 ml-2" />
                    </>
                  )}
                </Badge>
              </button>
            </div>
          </div>
        </div>

        {/* Question and Options */}
        <Card className="flex flex-col h-full w-full border-dotted p-4 text-[12px] gap-1">
          {regenerating ? (
            <div className="flex justify-center items-center h-full w-full">
              <div className="flex flex-col w-full gap-1">
                <Skeleton className="flex h-10 w-full flex-grow p-2 bg-secondary rounded-sm text-[12px]"></Skeleton>
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div className="flex flex-col gap-1" key={idx}>
                      <div className="flex h-4">
                        <Skeleton className="text-[12px] w-6 bg"></Skeleton>
                      </div>
                      <Skeleton className="flex w-full p-2 h-8 rounded-sm text-[12px]">
                        {/* Content for Card */}
                      </Skeleton>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <Card className="flex w-full p-2 bg-secondary rounded-sm text-[12px]">
                {question}
              </Card>
              <div className="flex flex-col gap-2 mt-4">
                {options.map((option, idx) => (
                  <div className="flex flex-col gap-1" key={idx}>
                    <div className="flex">
                      <Badge
                        className={`text-[12px] ${
                          correctOption === option
                            ? "border-green-600"
                            : "border-red-800"
                        }`}
                        variant="outline"
                      >
                        {idx + 1}
                      </Badge>
                    </div>
                    <Card
                      className={`flex w-full p-2 rounded-sm ${
                        correctOption === option
                          ? "border-green-600 bg-green-600 text-white"
                          : ""
                      } text-[12px]`}
                    >
                      {option}
                    </Card>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default QuestionCard;
