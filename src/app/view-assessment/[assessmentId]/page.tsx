"use client";
import { useAttemption } from "@/app/assessment/hooks/useAttemptAssessments";
import {
  GetAssessmentTimeDetailsResponse,
  ViewQuestion,
  ViewSection,
} from "@/lib/types/attemptionTypes";
import React, { useCallback, useEffect, useState } from "react";
import { GetAssessmentByIdData } from "@/lib/types/assessmentTypes";
import { useViewAssessment } from "../hooks/useViewAssessment";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Section from "../components/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import useViewAssessmentStore from "@/lib/stores/view-assessment-store/view-assessment-store";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  CircleDot,
  Edit,
  Link,
  Text,
  Trash2,
  Trash2Icon,
} from "lucide-react";
import { format, formatDate, millisecondsToMinutes } from "date-fns";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ViewAssessmentProps {
  params: {
    assessmentId: string;
  };
}

const ViewAssessment: React.FC<ViewAssessmentProps> = ({ params }) => {
  const {
    activeSectionIndex,
    activeQuestionIndex,
    activeQuestion,
    setActiveQuestion,
    setActiveSectionIndex,
    setActiveQuestionIndex,
  } = useViewAssessmentStore();

  const router = useRouter();

  const { fetchAssessmentTimeDetails } = useAttemption();
  const { fetchAssessmentById } = useViewAssessment();
  const [fontSize, setFontSize] = useState<number>(16);
  const [visibleQuestionsView, setVisibleQuestionsView] =
    useState<boolean>(false);

  const handleSliderChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  const [activeSection, setActiveSection] = useState<ViewQuestion[]>([]);
  // State management
  const [timeDetails, setTimeDetails] =
    useState<GetAssessmentTimeDetailsResponse["data"]>();
  const [assessment, setAssessment] = useState<GetAssessmentByIdData>();
  const [sections, setSections] = useState<ViewSection>();
  const [activeViewIndex, setActiveViewIndex] = useState<number>(0);

  const fetchTimeDetails = async () => {
    try {
      const response = await fetchAssessmentTimeDetails({
        id: params.assessmentId,
      });
      setTimeDetails(response);
    } catch (err) {
      console.error("Error fetching time details:", err);
    }
  };

  const fetchAssessment = useCallback(async () => {
    try {
      const response = await fetchAssessmentById({ id: params.assessmentId });
      setSections(response.sections);
      console.log("response", response);
      setAssessment(response);
      return response;
    } catch (err) {
      console.error("Error fetching assessment:", err);
    }
  }, [params.assessmentId]);

  const handleViewQuestion = useCallback(
    (sectionIndex: number, questionIndex: number) => {
      if (sections) {
        setActiveSection(Object.values(sections)[sectionIndex]);
        setActiveSectionIndex(sectionIndex);
        setActiveQuestionIndex(questionIndex);
        setActiveQuestion(Object.values(sections)[sectionIndex][questionIndex]);
        setVisibleQuestionsView(true);
      }
    },
    [sections]
  );
  const handlePreviousQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex < activeSection?.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  const handleClearActiveAssessmentData = () => {
    setVisibleQuestionsView(false);
    setActiveQuestionIndex(0);
    setActiveSectionIndex(0);
    setActiveSection([]);
    setActiveQuestion({} as ViewQuestion);
  };

  useEffect(() => {
    fetchAssessment();
  }, [fetchAssessment]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="flex flex-row items-center p-2 border border-b-muted px-10 justify-between">
        <button
          className="text-sm border rounded-md p-4 hover:bg-muted"
          onClick={router.back}
        >
          <ArrowLeft size={16} />
        </button>
        <p className="text-sm">{assessment?.name}</p>
        <div className="text-xs flex border border-muted p-4 rounded-lg">
          {millisecondsToMinutes(assessment?.duration || 0)} Minutes
        </div>
      </div>
      {/* for sections  */}
      <main className="absolute flex flex-col h-full w-full p-5">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col gap-2 w-full p-5 h-[calc(100vh-7rem)] overflow-hidden overflow-y-scroll scrollbar-none">
            {sections &&
              Object.entries(sections).map(([sectionNumber, questions]) => (
                <Section
                  key={sectionNumber}
                  questions={questions}
                  sectionNumber={parseInt(sectionNumber) + 1}
                  viewQuestion={handleViewQuestion}
                />
              ))}
          </div>
          <Card className="flex h-[calc(100vh-7rem)] w-[30rem] p-5 bg-primary-muted flex-col justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Card
                  className={`flex flex-row gap-2 items-center w-full p-4 bg-muted flex-wrap h-auto text-xs
                    ${"hello"}`}
                >
                  <CircleDot className="h-4 w-4" />
                  Active
                </Card>
                <Card className="flex w-full p-4 bg-muted flex-wrap h-auto text-xs">
                  {assessment?.sections
                    .flat()
                    .reduce((total, question) => total + question.marks, 0)}
                </Card>
              </div>
              <Card className="flex flex-col gap-2 w-full p-4 bg-muted flex-wrap h-auto text-xs">
                <div className="flex border border-b-muted-foreground/50 py-2">
                  <Text className="h-4 w-4 mr-2" /> Description
                </div>
                <div className="flex w-full p-1">
                  {assessment && assessment.description}
                </div>
              </Card>
              {assessment?.start_at && (
                <Card className="flex w-full p-4 bg-muted flex-wrap h-auto text-xs">
                  {format(
                    new Date(assessment.start_at),
                    "do MMMM yyyy, hh:mm a"
                  )}
                </Card>
              )}
              {assessment?.start_at && (
                <Card className="flex w-full p-4 bg-muted flex-wrap h-auto text-xs">
                  {format(new Date(assessment.end_at), "do MMMM yyyy, hh:mm a")}
                </Card>
              )}
            </div>
            <div className="flex w-full flex-col gap-2">
              <Button
                size={"sm"}
                className="w-full flex flex-row gap-2 items-center justify-center text-xs"
                variant={"outline"}
              >
                <Link size={14} />
                Copy Link
              </Button>
              <Button
                size={"sm"}
                className="w-full flex flex-row gap-2 items-center justify-center text-xs"
                variant={"secondary"}
              >
                <Edit size={14} />
                Edit
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size={"sm"}
                    className="w-full flex flex-row gap-2 items-center justify-center text-xs"
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      Delete assessment "{assessment?.name}"
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. Are you sure you want to
                      delete this assessment?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="submit" variant={"destructive"}>
                      <Trash2Icon size={16} className="mr-2" />
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>
      </main>
      {/* for questions */}
      <main
        className={`absolute bg-background inset-0 transition-transform duration-500 ease-in-out overflow-hidden hidden lg:block h-screen
               ${visibleQuestionsView ? "translate-x-0" : "translate-x-full"}
`}
      >
        <div className="flex w-full h-[4rem] border-b justify-between">
          <div className="flex items-center justify-center p-6">
            <button
              className="text-sm border rounded-md p-4 hover:bg-muted"
              onClick={() => setVisibleQuestionsView(false)}
            >
              <ArrowLeft size={16} />
            </button>
            <span className="font-semibold text-muted-foreground"></span>
          </div>
          <div className="flex items-center justify-center p-6">
            <Badge variant={"outline"}>Section {activeSectionIndex + 1}</Badge>
          </div>
          <div className="flex">
            <div className="flex items-center justify-center p-4 border-dashed-2 border rounded-md border-primary/40 my-2 mx-4">
              <span className="font-semibold">50</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row h-[calc(100vh-8rem)]">
          <div className="flex">
            <div className="flex flex-col w-[5rem] border-b">
              <div className="flex flex-col items-center justify-start p-6 gap-4 h-[calc(100vh-4rem)] overflow-y-scroll overflow-hidden scrollbar-none">
                {activeSection.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex min-h-[40px] min-w-[40px] border-2 items-center justify-center rounded-md cursor-pointer",
                      activeQuestionIndex === index && "bg-secondary"
                    )}
                    onClick={() => setActiveQuestionIndex(index)}
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
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="flex p-8 flex-col gap-4">
                <div className="flex">
                  <Badge>Question {activeQuestionIndex + 1}</Badge>
                </div>
                <div className="flex" style={{ fontSize: `${fontSize}px` }}>
                  {activeSection[activeQuestionIndex]?.description ||
                    "Question not available"}
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={54} minSize={30}>
              <div className="flex flex-col w-full h-full overflow-hidden overflow-y-scroll scrollbar-none p-8 gap-8">
                <div className="flex">
                  <Badge>Options</Badge>
                </div>
                {activeQuestion?.options?.map((option) => (
                  <div className="flex flex-col gap-2" key={option.id}>
                    <div
                      className={cn(
                        "flex flex-row rounded-xl hover:bg-secondary items-center border hover:duration-800 hover:transition-all transition-all duration-800"
                      )}
                    >
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
              disabled={activeQuestionIndex === 0}
            >
              Previous
            </Button>
            {
              <Button
                onClick={
                  activeQuestionIndex === activeSection.length - 1
                    ? handleClearActiveAssessmentData
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
      <div className="overflow-hidden lg:hidden">
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
          <Badge variant={"outline"}>proktr.ai</Badge>
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
      </div>
    </div>
  );
};

export default ViewAssessment;
