"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import { useAssessment } from "@/app/dashboard/views/manage-assessment/hooks/useAssessment";
import { useQuestions } from "@/app/dashboard/views/manage-assessment/hooks/useQuestion";
import { Separator } from "@/components/ui/separator";
import useCreateAssessmentStore from "@/lib/stores/manage-assessment-store/assessment-create";
import { useOptions } from "@/app/dashboard/views/manage-assessment/hooks/useOption";
import { set } from "date-fns";
import { UpdateQuestionProps } from "@/lib/types/questionTypes";
import { CreateOptionProps, UpdateOptionProps } from "@/lib/types/optionTypes";
import { Option, Question } from "@/lib/types/assessmentTypes";

export default function Create({ params }: { params: { assessmentId: string } }) {
  const {
    fetchAssessmentById,
    assessment,
  } = useAssessment();

  const {
    addQuestion,
    addQuestionResponse,
    patchQuestion,
    patchQuestionResponse
  } = useQuestions();
  const {
    addOption,
    addOptionResponse,
    patchOption,
    patchOptionResponse,
    removeOptionById,
    removeOptionByIdResponse,
  } = useOptions();

  const {
    assessmentId,
    setAssessmentId,
    assessmentData,
    setAssessmentData,
    sectionData,
    setSectionData,

    currentQuestionId,
    setCurrentQuestionId,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    currentQuestionContent,
    setCurrentQuestionContent,
    currentQuestionMarks,
    setCurrentQuestionMarks,

    currentOptionId,
    setCurrentOptionId,
    currentOptionContent,
    setCurrentOptionContent,
    currentOptionsContent,
    setCurrentOptionsContent,
    currentOptionIsCorrect,
    setCurrentOptionIsCorrect,

  } = useCreateAssessmentStore();



  useEffect(() => {
    setAssessmentId(params.assessmentId);
  }, []);


  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        await fetchAssessmentById({ id: params.assessmentId });
      } catch (e) {
        console.log(e);
      }
    }
    fetchAssessment();
  }, [params.assessmentId])

  useEffect(() => {
    console.log("data is here", assessment);
    if (assessment) {
      setAssessmentData(assessment.sections);

    }
  }, [assessment]);

  useEffect(() => {
    console.log("current question index", currentQuestionIndex);
  }, [currentQuestionIndex]);














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
                    {currentQuestionIndex}
                  </Badge>
                  <Badge className="text-[10px] cursor-pointer" variant={"destructive"}>
                    remove
                  </Badge>
                </div>
                <Textarea
                  className="w-full max-h-[10rem]"
                  placeholder="Enter your Question..."
                  value={""}
                  onChange={(e) => { }}
                />
              </div>
            </Card>
            <Card
              className="flex flex-col  items-center justify-start gap-2 border border-none rounded-lg h-[30rem] min-h-[12rem] max-h-[60rem] w-full p-1 overflow-y-auto scrollbar-none">
              <div className="flex flex-col gap-2 w-full p-1">
                <div className="flex flex-row justify-between items-center">
                  <Badge className="text-[10px] cursor-default">
                    1
                  </Badge>
                  <button>
                    <Badge className="text-[10px] cursor-pointer" variant={"destructive"}>
                      remove
                    </Badge>
                  </button>
                </div>
                <Textarea
                  className="w-full max-h-[10rem]"
                  placeholder="Enter your Question..."
                />
              </div>
              <button
                className="text-[10px] border p-3 text-xs rounded-[8px] hover:bg-secondary flex items-center justify-center">
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
                </div>
              </Card>
              <div className="flex flex-col w-3/4 justify-center gap-1 items-center">
                <Card className="flex flex-row items-center w-full p-2 gap-2 border border-dashed bg-transparent">
                  <button>
                    <div className={`text-[8px] flex rounded-full h-6 w-6 p-2 border items-center justify-center`}>
                      1
                    </div>
                  </button>
                  <button>
                    <div className={`text-[8px] flex rounded-full h-6 w-6 p-2 border items-center justify-center`}>
                      1
                    </div>
                  </button>
                  <button>
                    <div className={`text-[8px] flex rounded-full h-6 w-6 p-2 border items-center justify-center`}>
                      1
                    </div>
                  </button>
                  <button>
                    <div className={`text-[8px] flex rounded-full h-6 w-6 p-2 border items-center justify-center`}>
                      1
                    </div>
                  </button>
                  <div className="flex rounded-full h-6 w-6 p-2 border items-center justify-center">
                    <button className="text-[8px]">
                      +
                    </button>
                  </div>
                </Card>
                <Card className="flex flex-row w-full p-2 gap-2 border-dashed bg-transparent">
                  <button
                    className={`border w-6 h-6 text-xs rounded-[8px] hover:bg-secondary flex items-center justify-center `}
                  >
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
      </div >
      <div className="hidden h-full border-r bg-muted/40 md:block md:w-[350px] lg:min-w-[400px] overflow-y-scroll">
        <SideBar assessmentId={params.assessmentId} />
      </div>
    </div >
  );
}
