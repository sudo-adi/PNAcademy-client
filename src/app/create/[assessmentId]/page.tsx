"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
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

export default function Create({ params }: { params: { assessmentId: string } }) {
  const {
    fetchAssessmentById,
    assessment,
    assessmentLoading,
  } = useAssessment();

  const {
    addQuestion,
    addQuestionResponse,
    questionLoading,
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
        <main className="flex flex-1 flex-col lg:gap-2 p-6 overflow-y-scroll scrollbar-none">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Assessment Name</h1>
          </div>
          <Card className="flex flex-row w-full gap-2 p-2 justify-between bg-transparent border-none">
            <div className="flex gap-2">
              {sectionsList.map((section, index) => (
                <button className="mounse-pointer" key={index}>
                  {/* <Badge
                    variant={currentSection == section ? "secondary" : "outline"}
                    key={index}
                  >
                    {section}
                  </Badge> */}
                </button>
              ))}
              <button onClick={handleCreateSection} onClickCapture={handleCreateSection}>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  +
                </Badge>
              </button>
            </div>
          </Card>
          <Card className="flex flex-row w-full p-2 justify-between border-dashed bg-transparent">
            <div className="flex gap-2">
              {questionsList.map((question, index) => (
                <Button key={question.id}>
                  {index + 1}
                </Button>
              ))}
              <Button variant={"outline"} onClick={handleInitializeSection}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              {/* Add any additional components or content here */}
            </div>
          </Card>
          <div className="flex flex-col gap-2 w-full max-h-[calc(100vh-16rem)]">
            <Card>
              <div className="flex flex-col w-full p-1">
                <Label className="p-2">Question</Label>
                <Textarea
                  className="w-full max-h-[10rem]"
                  value={currentQuestion?.description}
                  placeholder="Enter your Question..."
                />
              </div>
            </Card>
            <Card className="flex flex-col items-center justify-start border border-dashed rounded-lg h-[26rem] min-h-[12rem] max-h-[60rem] w-full p-1 gap-4 overflow-y-auto scrollbar-none">
              <div className="flex flex-col w-full max-h-[8rem]">
                <Label className="p-2">Option 1</Label>
                <Textarea
                  className="w-full"
                  placeholder="Enter Option 1..."
                />
              </div>
              <Button>
                <Plus className="h-4 w-4" />
                Add Option
              </Button>
            </Card>
            <Card className="flex flex-row items-center justify-center min-h-[7rem] max-h-[15rem]">
              <Badge>Python</Badge>
            </Card>
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
