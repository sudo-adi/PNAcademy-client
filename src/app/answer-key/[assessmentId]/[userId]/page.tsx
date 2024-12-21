"use client";
import React, { useEffect, useState } from "react";
import { useAnswerKey } from "@/app/answer-key/hooks/useAnswerKey";
import { Header } from "@/app/answer-key/components/Header";
import { MainContent } from "@/app/answer-key/components/MainContent";
import { GetAnswerKeyProps, Question } from "@/lib/types/answer-keyTypes";
import PnaLoader from "@/components/common/custom-loading-animation";

interface AnswerKeyProps {
  params: {
    assessmentId: string;
    userId: string;
  };
}

const UserAnswerKey: React.FC<AnswerKeyProps> = ({ params }) => {
  const { getResponsesForUser } = useAnswerKey();
  const [sections, setSections] = useState<Question[][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const payload: GetAnswerKeyProps = {
      assessmentId: params.assessmentId,
      userId: params.userId,
      page: 1,
      pageSize: 9999,
      order: "ASC",
    };
    const fetchResponses = async () => {
      try {
        const response = await getResponsesForUser(payload);
        setSections(response);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (params.assessmentId && params.userId) {
      fetchResponses();
    }
  }, []);

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
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

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
      {sections && <MainContent sections={sections} />}
    </div>
  );
};

export default UserAnswerKey;
