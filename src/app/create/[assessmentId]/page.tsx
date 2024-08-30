"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircleX, Cross, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import { useOptions } from "@/app/dashboard/views/manage-assessment/hooks/useOption";
import { useAssessment } from "@/app/dashboard/views/manage-assessment/hooks/useAssessment";
import { useQuestions } from "@/app/dashboard/views/manage-assessment/hooks/useQuestion";
import { GetAssessmentByIdResponse, Question } from "@/lib/types/assessmentTypes";
import useAssessmentStore from "@/lib/stores/manage-assessment-store/assessment-store";
import { Separator } from "@/components/ui/separator";

export default function Create({ params }: { params: { assessmentId: string } }) {
  const {
    fetchAssessmentById,
    assessment,
  } = useAssessment();

  const {
    addQuestion,
    addQuestionResponse,
  } = useQuestions();

  const [sectionsList, setSectionsList] = useState<number[]>([]);
  const [questionsList, setQuestionsList] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const { assessmentId, currentSection, currentQuestionNo, question, options, sections, questionSectionMap, marks,
    setAssessmentId, setCurrentSection, setCurrentQuestionNo, setQuestion, setOptions, setSections, setQuestionSectionMap, setMarks } = useAssessmentStore();

  useEffect(() => {
    setAssessmentId(params.assessmentId);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      if (assessmentId) {
        await fetchAssessmentById({ id: assessmentId });
      }
    };

    fetchData();
  }, [assessmentId]);

  useEffect(() => {
    if (assessment && assessment.questions) {
      const sections: number[] = assessment.questions.map((question) => question.section);
      const uniqueSortedSections: number[] = Array.from(new Set(sections)).sort((a, b) => a - b);
      setSections(uniqueSortedSections);
    }
  }, [assessment]);

  useEffect(() => {
    if (assessment && assessment.questions) {
      const sections: number[] = assessment.questions.map((question) => question.section);
      const uniqueSortedSections: number[] = Array.from(new Set(sections)).sort((a, b) => a - b);
      const sectionQuestionMap: Record<string, string[]> = assessment.questions.reduce((map, question) => {
        const { section, id } = question;
        if (!map[section]) {
          map[section] = [];
        }
        map[section].push(id);
        return map;
      }, {} as Record<string, string[]>);

      setSections(uniqueSortedSections);
      setQuestionSectionMap(Object.entries(sectionQuestionMap).map(([section, questions]) => ({
        [section]: questions,
      })));
      console.log(uniqueSortedSections);
      console.log(Object.entries(sectionQuestionMap).map(([section, questions]) => ({
        [section]: questions,
      })));
    }
  }, [assessment, setSections, setQuestionSectionMap, addQuestionResponse]);


  const handleInitializeSection = async () => {
    const section = sections.length + 1;
    const newQuestion = {
      assessment_id: assessmentId,
      description: 'Enter Question Details...',
      marks: 0,
      section: section,
    };
    await addQuestion(newQuestion);
  };

  const handleCreateSection = async () => {
    await handleInitializeSection();
  };

  return (
    <div className="flex max-h-screen flex-row overflow-y-hidden">
      <div className="flex flex-col w-full">
        <Header assessmentId={assessmentId} />
        <main className="flex flex-1 flex-col lg:gap-2 p-4 overflow-y-scroll scrollbar-none">
          <div className="flex flex-col gap-2 w-full max-h-[calc(100vh-6rem)]">
            <Card className="border-none">
              <div className="flex flex-col gap-2 w-full p-1">
                <div className="flex flex-row justify-between items-center">
                  <Badge className="text-[10px] cursor-default">
                    Question 1
                  </Badge>
                  <Badge className="text-[10px] cursor-pointer" variant={"destructive"}>
                    remove
                  </Badge>
                </div>
                <Textarea
                  className="w-full max-h-[10rem]"
                  value={currentQuestion?.description}
                  placeholder="Enter your Question..."
                />
              </div>
            </Card>
            <Card className="flex flex-col  items-center justify-start gap-2 border border-none rounded-lg h-[30rem] min-h-[12rem] max-h-[60rem] w-full p-1 overflow-y-auto scrollbar-none">
              <div className="flex flex-col gap-2 w-full max-h-[8rem]">
                <div className="flex flex-row justify-between items-center">
                  <Badge className="text-[10px]">
                    Option 1
                  </Badge>
                  <CircleX className="h-4 w-4 mr-2 text-red-500" />
                </div>
                <Textarea
                  className="w-full border-dashed focus:outline-none focus:ring-0 focus:ring-offset-0"
                  placeholder="Enter Option 1..."
                />
              </div>
              <button className="text-[10px] border p-3 text-xs rounded-[8px] hover:bg-secondary flex items-center justify-center">
                <Plus className="h-3 w-3 mr-2" />
                Add Option
              </button>
            </Card>
            <Separator />
            <div className="flex flex-row w-full gap-2">
              <Card className="flex flex-col w-1/4 border border-dashed h-[5rem]">
                <div className="flex flex-wrap overflow-scroll scrollbar-none">
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                  <Badge className="text-[8px] cursor-default m-1">
                    Python
                    <button>
                      <X className="h-3 w-3 ml-1 rounded-full" />
                    </button>
                  </Badge>
                </div>
              </Card>
              <div className="flex flex-col w-3/4 justify-center gap-1 items-center">
                <Card className="flex flex-row items-center w-full p-2 gap-2 border border-dashed bg-transparent">
                  <div className="flex rounded-full h-6 w-6 p-2 border items-center justify-center">
                    <button className="text-[8px]">
                      1
                    </button>
                  </div>
                  <div className="flex rounded-full h-6 w-6 p-2 border items-center justify-center">
                    <button className="text-[8px]">
                      +
                    </button>
                  </div>
                </Card>
                <Card className="flex flex-row w-full p-2 gap-2 border-dashed bg-transparent">
                  <button className="border w-6 h-6 text-xs rounded-[8px] hover:bg-secondary bg-primary">
                    1
                  </button>
                  <button className="border w-6 h-6 text-xs rounded-[8px] hover:bg-secondary flex items-center justify-center">
                    <Plus className="h-3 w-3" />
                  </button>
                </Card>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2">
                Powered by
                <Badge variant="outline">PNAcademy</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Previous</Button>
                <Button>Next</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="hidden h-full border-r bg-muted/40 md:block md:w-[350px] lg:min-w-[400px] overflow-y-scroll">
        <SideBar assessmentId={params.assessmentId} />
      </div>
    </div>
  );
}
