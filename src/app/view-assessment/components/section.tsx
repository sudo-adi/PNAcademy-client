import { Badge } from "@/components/ui/badge";
import { truncateText } from "@/lib/helpers/truncate-text";
import useViewAssessmentStore from "@/lib/stores/view-assessment-store/view-assessment-store";
import { ViewQuestion } from "@/lib/types/attemptionTypes";
import { Unlock } from "lucide-react";
import React from "react";

interface SectionProps {
  questions: ViewQuestion[];
  sectionNumber: number;
  viewQuestion: (sectionIndex: number, questionIndex: number) => void;
}

const Section: React.FC<SectionProps> = ({
  questions,
  sectionNumber,
  viewQuestion,
}) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col border-2 rounded-lg w-full">
        <div className="flex border-2 border-b-primary bg-muted w-full h-auto rounded-t-sm p-4 text-sm justify-between">
          <div className="flex items-center gap-2">
            Section {sectionNumber}
            <p className="text-muted-foreground">
              | {questions[0].marks * questions.length} Marks/Q
            </p>
          </div>
        </div>
        <div className="flex p-4 flex-col gap-4 items-center w-full">
          <div className="relative w-full">
            <div className="flex p-4 flex-col gap-4 items-center w-full relative">
              {questions.map((question, index) => (
                <SingleQuestionRow
                  key={index}
                  index={index}
                  question={question.description}
                  viewQuestion={viewQuestion}
                  sectionNumber={sectionNumber}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SingleQuestionRowProps {
  index: number;
  question: string;
  sectionNumber: number;
  viewQuestion: (sectionIndex: number, questionIndex: number) => void;
}

const SingleQuestionRow: React.FC<SingleQuestionRowProps> = ({
  index,
  question,
  sectionNumber,
  viewQuestion,
}) => {
  return (
    <div className="flex gap-2 w-full">
      <div className="flex items-center justify-center">
        <Badge
          variant={"outline"}
          className="text-xs h-6 w-6 items-center justify-center"
        >
          {index + 1}
        </Badge>
      </div>
      <div className="flex flex-row items-center justify-between border-b p-1 w-full text-sm gap-4 flex-grow">
        <p className="text-sm w-full">{truncateText(question, 100)}</p>
        <div className="flex items-center">
          <button
            className="text-xs group text-primary transition duration-300 w-28"
            onClick={() => viewQuestion(sectionNumber - 1, index)}
          >
            View Question →
            <span className="block my-2 max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-secondary"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section;
