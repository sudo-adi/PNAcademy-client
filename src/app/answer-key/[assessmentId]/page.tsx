"use client";
import React, { useEffect } from "react";
import { useAnswerKey } from "../hooks/useAnswerKey";
import { Header } from "../components/Header";
import { MainContent } from "../components/MainContent";
import { useState } from "react";
import { GetAnswerKeyProps, Question } from "@/lib/types/answer-keyTypes";
import PnaLoader from "@/components/common/custom-loading-animation";

interface AnswerKeyProps {
  params: {
    assessmentId: string;
  };
}

const AnswerKey: React.FC<AnswerKeyProps> = ({ params }) => {
  const { getMyResponsesForAssessment } = useAnswerKey();
  const [sections, setSections] = useState<Question[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const payload: GetAnswerKeyProps = {
      assessmentId: params.assessmentId,
      page: 1,
      pageSize: 9999,
      order: "ASC",
    };
    const fetchResponses = async () => {
      try {
        const response = await getMyResponsesForAssessment(payload);
        setSections(response);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResponses();
  }, [params.assessmentId]);

  // Calculate total score using the new marking scheme
  const totalScore = sections.reduce((sectionSum, section) => {
    return (
      sectionSum +
      section.reduce((questionSum, question) => {
        const isCorrect = question.options.some(
          (opt) => opt.is_correct && opt.is_selected
        );
        return questionSum + (isCorrect ? question.marks : 0);
      }, 0)
    );
  }, 0);

  const totalPossibleScore = sections.reduce((sectionSum, section) => {
    return (
      sectionSum + section.reduce((sum, question) => sum + question.marks, 0)
    );
  }, 0);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center overflow-hidden bg-background">
        <PnaLoader />
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center overflow-hidden bg-background">
        <p className="text-sm text-muted-foreground">
          No responses found for this assessment.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header totalScore={totalScore} totalPossibleScore={totalPossibleScore} />
      <MainContent sections={sections} />
    </div>
  );
};

export default AnswerKey;
