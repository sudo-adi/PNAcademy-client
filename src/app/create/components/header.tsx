import { Button } from "@/components/ui/button";
import { ArrowLeft, FilePen, Menu } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useCreateAssessmentStore from "@/lib/stores/manage-assessment-store/assessment-create";
import { useRouter } from "next/navigation";
import SideBar from "./sidebar";
import { UpdateQuestionProps } from "@/lib/types/questionTypes";

interface HeaderProps {
  patchQuestion: (data: UpdateQuestionProps) => void;
  refreshAssessment: () => void;
}

const Header: React.FC<HeaderProps> = ({
  patchQuestion,
  refreshAssessment,
}) => {
  const router = useRouter();
  const { assessmentId } = useCreateAssessmentStore();
  const {
    currentMarks,
    setCurrentMarks,
    currentSectionIndex,
    currentQuestionIndex,
    currentSectionData,
  } = useCreateAssessmentStore();

  const [inputValue, setInputValue] = useState<string>(
    currentMarks.toString() || ""
  ); // Local state for the input

  const validateAndSetMarks = (value: string) => {
    const parsedValue = parseInt(value);
    // Validate the parsed value
    if (isNaN(parsedValue) || parsedValue < 0) {
      setCurrentMarks(0); // Set to 0 if NaN or negative
      setInputValue("0"); // Update input to show 0
    } else if (parsedValue <= 100) {
      setCurrentMarks(parsedValue); // Update the current marks if valid
    } else {
      setCurrentMarks(100); // Clamp to 100 if above max
      setInputValue("100"); // Update input to show 100
    }
  };
  // Handle input blur event
  const handleBlur = () => {
    validateAndSetMarks(inputValue);
  };

  useEffect(() => {
    if (currentSectionData && currentSectionData.length > 0) {
      const marks = currentSectionData[currentQuestionIndex]?.marks ?? 0;
      setCurrentMarks(marks);
      setInputValue(marks.toString());
    }
  }, [currentSectionIndex, currentQuestionIndex, currentSectionData]); // Remove currentMarks from dependencies

  // Update your handleCurrentSectionMarksChange function
  const handleCurrentSectionMarksChange = async (value: string) => {
    setInputValue(value);
    const numericValue = parseInt(value);

    if (!isNaN(numericValue)) {
      const validValue = Math.min(Math.max(numericValue, 0), 100);
      setCurrentMarks(validValue);

      try {
        const updatePromises = currentSectionData.map((question) =>
          patchQuestion({ ...question, marks: validValue })
        );
        await Promise.all(updatePromises);
      } catch (error) {
        console.error("Error updating marks:", error);
      } finally {
        refreshAssessment();
      }
    }
  };

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:min-h-[60px] lg:px-6">
      <div className="flex gap-2">
        <button
          className="text-[10px] border p-2 text-xs rounded-[8px] hover:bg-secondary flex items-center justify-center"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-3 w-3" />
        </button>
        <div className="flex flex-row items-center gap-2">
          <FilePen className="w-4 h-4" />
          <h1 className="text-sm font-bold">Create Assessment</h1>
        </div>
      </div>
      <div className="sm:mr-52 md:mr-56">Section {currentSectionIndex + 1}</div>
      {currentSectionData && currentSectionData.length > 0 && (
        <div className="flex flex-row items-center border-muted bg-secondary rounded-sm border gap-2 px-2">
          <input
            className="bg-transparent border-none text-[16px] max-w-14 text-center outline-none no-arrows"
            value={inputValue}
            type="number"
            max={100}
            min={0}
            onChange={(e) => handleCurrentSectionMarksChange(e.target.value)}
            onBlur={handleBlur}
          />
        </div>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0">
          <SideBar assessmentId={assessmentId} />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
