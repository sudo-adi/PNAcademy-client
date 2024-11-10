"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import useAttemptAssessmentsStore from "@/lib/stores/attempt-assessment/attempt-assessment.store";
import { useAttemption } from "../../hooks/useAttemptAssessments";
import {
  AssessmentStartSectionStatus,
  AssignedAssessmentQuestion,
  AttemptQuestionProps,
} from "@/lib/types/attemptionTypes";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TimerComponent from "../components/timer";
import useTimerStore from "@/lib/stores/attempt-assessment/timer-store";
import { millisecondsToSeconds } from "date-fns";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

interface AssessmentProps {
  params: {
    assessmentId: string;
  };
}

const Assessment: React.FC<AssessmentProps> = ({ params }) => {
  // all hooks here
  const {
    startQuestion,
    startSection,
    startAssessment,
    stopAssessment,
    fetchAssessmentTimeDetails,
  } = useAttemption();
  const router = useRouter();

  const [fontSize, setFontSize] = useState(16);
  const handleSliderChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  // global states here
  const {
    currentSectionId,
    currentQuestionIndex,
    setCurrentSectionId,
    setCurrentQuestionIndex,
  } = useAttemptAssessmentsStore();
  const { timeLeft, startTimer, resetTimer, setTimeLeft } = useTimerStore();

  // local states here
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [activeSectionQuestions, setActiveSectionQuestions] = useState<
    AssignedAssessmentQuestion[]
  >([]);
  const assessmentId = params.assessmentId;
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  // Current Question Data
  const currentQuestion = activeSectionQuestions[currentQuestionIndex];
  const currentSelectedOptionId: string | null =
    currentQuestion?.selectedOptionId;

  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<AssessmentStartSectionStatus[]>([]);

  // local functions here
  const findCurrentSectionId = async (): Promise<number> => {
    try {
      const statusSections = await startAssessment({ assessmentId });
      if (!statusSections) throw new Error("Failed to start assessment");
      setSections(statusSections);
      const activeSection = statusSections.find(
        (section) => section.status === "started"
      );
      const sectionToStart = activeSection ? activeSection.section : 1;
      setCurrentSectionId(sectionToStart);
      return sectionToStart;
    } catch (err) {
      throw Error("Error starting assessment");
    }
  };

  const fetchTimeDetails = async () => {
    try {
      const response = await fetchAssessmentTimeDetails({
        id: params.assessmentId,
      });
      const startTime = new Date(response.started_at).getTime();
      const serverTime = new Date(response.server_time).getTime();
      const duration = response.duration;
      const remainingTime = duration - (serverTime - startTime);
      setTimeLeft(millisecondsToSeconds(remainingTime));
    } catch (err) {
      console.error("Error fetching time details:", err);
    }
  };

  const initializeAssessment = useCallback(async () => {
    try {
      console.log(currentSectionId);
      const sectionId = currentSectionId || (await findCurrentSectionId());
      const response = await startSection({
        assessmentId: assessmentId,
        section: sectionId,
      });
      if (response) {
        setActiveSectionQuestions(response);
        const initialSelectedOptions: Record<string, string> = {};
        response.forEach((question) => {
          if (question.selectedOptionId) {
            initialSelectedOptions[question.id] = question.selectedOptionId;
          }
        });
        setSelectedOptions(initialSelectedOptions);
      }
    } catch (err) {
      console.error("Error initializing assessment:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // handlers here
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeSectionQuestions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAttemptQuestion = async (optionId: string) => {
    const payload: AttemptQuestionProps = {
      assessmentId: assessmentId,
      questionId: activeSectionQuestions[currentQuestionIndex].id,
      selectedOptionId: optionId,
    };
    try {
      const status = await startQuestion(payload);
      if (status) {
        console.log("Question attempted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptionSelect = async (optionId: string) => {
    if (!currentQuestion) return;

    // Update UI immediately
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));

    // Make API call
    await handleAttemptQuestion(optionId);
    initializeAssessment();
  };

  const handleGoBackToOverview = () => {
    // navigate to overview page
    router.push(`/assessment/${assessmentId}`);
  };

  const handleClearSelectedOption = async () => {};

  // Initial Setup
  useEffect(() => {
    initializeAssessment();
    fetchTimeDetails();
    startTimer();
  }, [initializeAssessment]);

  const handleSubmitAssessment = async () => {
    try {
      await stopAssessment({
        assessmentId: params.assessmentId,
      });
      toast({
        title: "Assessment submitted",
        description: "Assessment has been submitted successfully",
        action: <ToastAction altText="success">Ok</ToastAction>,
      });
      router.push("/dashboard");
    } catch (err: any) {
      if (err.status === 400) {
        toast({
          title: "Incomplete assessment",
          description:
            "AAll sections must be completed before ending the assessment",
          action: <ToastAction altText="error">Ok</ToastAction>,
        });
      } else if (err.status === 404) {
        toast({
          title: "Assessment not found",
          description: "Assessment not found",
          action: <ToastAction altText="error">Ok</ToastAction>,
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Error submitting assessment",
          description: "Something went wrong while submitting the assessment",
          action: <ToastAction altText="error">Ok</ToastAction>,
        });
      }
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitAssessment();
    }
  }, [timeLeft]);

  // Render loading state if no questions are available
  if (!activeSectionQuestions.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Badge variant="outline">No questions available</Badge>
      </div>
    );
  }
  return (
    <>
      <main className="overflow-hidden hidden md:block">
        <div className="flex w-full h-[4rem] border-b justify-between">
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold text-muted-foreground">
              <button
                className="text-[10px] border p-2 text-xs rounded-[8px] hover:bg-secondary flex items-center justify-center"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-3 w-3" />
              </button>
            </span>
          </div>
          <div className="flex items-center justify-center p-6">
            <Badge variant={"outline"}>Section {currentSectionId}</Badge>
          </div>
          <div className="flex">
            <div className="flex items-center justify-center p-4 border-dashed-2 border rounded-md border-primary/40 my-2 mx-4">
              <span className="font-semibold">{currentQuestion?.marks}</span>
            </div>
            <div className="flex items-center justify-center p-6 border-dashed-2 border-l">
              <span className="font-semibold">
                <TimerComponent />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row h-[calc(100vh-8rem)]">
          <div className="flex">
            <div className="flex flex-col w-[5rem] border-b">
              <div className="flex flex-col items-center justify-start p-6 gap-4 h-[calc(100vh-4rem)] overflow-y-scroll oveflow-hidden scrollbar-none">
                {activeSectionQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex min-h-[40px] min-w-[40px] border-2 items-center justify-center rounded-md cursor-pointer",
                      currentQuestionIndex === index && "bg-secondary"
                    )}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full w-full border"
          >
            <ResizablePanel minSize={30} defaultSize={40}>
              <div className="flex p-8 flex-col gap-4">
                <div className="flex">
                  <Badge>Question {currentQuestionIndex + 1}</Badge>
                </div>
                <div className="flex" style={{ fontSize: `${fontSize}px` }}>
                  {currentQuestion?.description || "Question not available"}
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={30}>
              <div className="flex flex-col w-full h-full overflow-hidden overflow-y-scroll p-8 gap-8">
                <div className="flex">
                  <Badge>Options</Badge>
                </div>
                {currentQuestion?.options?.map((option) => (
                  <div className="flex flex-col gap-2" key={option.id}>
                    <div
                      className={cn(
                        "flex flex-row rounded-xl hover:bg-secondary items-center border hover:scale-105 hover:duration-800 hover:transition-all transition-all duration-800",
                        selectedOptionId === option.id && "bg-secondary"
                      )}
                      onClick={() => handleOptionSelect(option.id)}
                    >
                      <div className="flex w-1/7 p-8 h-full items-center justify-center">
                        <Checkbox
                          checked={
                            selectedOptions[currentQuestion.id] === option.id
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div
                        className="cursor-pointer flex h-full w-full p-5 border-l bg-background scrollbar-thin rounded-r-sm"
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {option.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="flex h-[4rem] flex-row items-center px-8 justify-between">
          <div className="flex gap-2">
            Powered By
            <Badge variant={"outline"}>PNAcademy</Badge>
          </div>
          <Slider
            defaultValue={[16]}
            max={32}
            min={12}
            step={1}
            onValueChange={handleSliderChange}
            className="w-[10%] ml-12"
          />
          <div className="flex h-full items-center justify-center gap-2">
            <Button
              variant={"outline"}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {
              <Button
                onClick={
                  currentQuestionIndex === activeSectionQuestions.length - 1
                    ? handleGoBackToOverview
                    : handleNextQuestion
                }
              >
                Next
              </Button>
            }
          </div>
        </div>
      </main>
      {/* mobile view */}
      <main className="overflow-hidden lg:hidden">
        <div className="flex w-full h-[4rem] border-b justify-between">
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold text-muted-foreground">
              #Assessment 1 | 5 Marks/Q
            </span>
          </div>

          <div className="flex">
            <div className="flex items-center justify-center p-4 border-dashed-2 border rounded-md border-primary/40 my-2 mx-4">
              <span className="font-semibold">50</span>
            </div>
            <div className="flex items-center justify-center p-6 border-dashed-2 border-l">
              <span className="font-semibold">20:19</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          <div className="flex">
            <div className="flex flex-row w-full border border-b">
              <div className="flex flex-row w-full items-start justify-start p-6 gap-4 overflow-x-scroll oveflow-hidden scrollbar-thin">
                {Array.from({ length: 22 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex min-h-[40px] min-w-[40px] border-2 items-center justify-center rounded-md"
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ResizablePanelGroup
            direction="vertical"
            className="h-full w-full border"
          >
            <ResizablePanel defaultSize={20}>
              <div className="flex p-8 flex-col gap-4">
                <div className="flex">
                  <Badge>Question 1</Badge>
                </div>
                <div className="flex text-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae quam alias saepe autem nostrum minus debitis ipsam
                  inventore, velit maxime?
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={80}>
              <div className="flex flex-col w-full h-full overflow-hidden overflow-y-scroll p-8 gap-8">
                <div className="flex">
                  <Badge>Options</Badge>
                </div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="flex flex-col gap-2" key={index}>
                    <div className="flex flex-row rounded-xl hover:bg-secondary items-center border hover:scale-105 hover:duration-800 hover:transition-all transition-all duration-800">
                      <div className="flex w-1/7 p-8 h-full items-center justify-center">
                        <Checkbox />
                      </div>
                      <div className="flex h-full w-6/7 p-5 border-l bg-background scrollbar-thin rounded-r-sm text-sm">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Quo quidem voluptate minima voluptatem aperiam
                        repellat sequi voluptatum autem id consequuntur.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="flex h-[4rem] flex-row items-center px-8 justify-between">
          <Badge variant={"outline"}>PNAcademy</Badge>
          <div className="flex items-center justify-center p-6">
            <Badge variant={"outline"}>Section 1</Badge>
          </div>
          <div className="flex h-full items-center justify-center gap-2">
            <Button variant={"outline"} className="text-xs">
              Back
            </Button>
            <Button className="text-xs">Next</Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Assessment;
