"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Section, Trash, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { use, useEffect, useState } from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import { useAssessment } from "@/app/dashboard/views/manage-assessment/hooks/useAssessment";
import { useQuestions } from "@/app/dashboard/views/manage-assessment/hooks/useQuestion";
import { Separator } from "@/components/ui/separator";
import useCreateAssessmentStore from "@/lib/stores/manage-assessment-store/assessment-create";
import { useOptions } from "@/app/dashboard/views/manage-assessment/hooks/useOption";
import { CreateQuestionProps, DeleteQuestionProps, UpdateQuestionProps } from "@/lib/types/questionTypes";
import SectionButton from "../components/buttons/sectionbutton";
import QuestionButon from "../components/buttons/questionbutton";
import AddQuestionButton from "../components/buttons/addquestionbuton";
import AddSectionButton from "../components/buttons/addsectionbutton";
import { useSection } from "../hooks/useSection";
import { DeleteSectionProps } from "@/lib/types/sectionTypes";
import RemoveButton from "../components/buttons/remove-button";
import { Input } from "@/components/ui/input";

export default function Create({ params }: { params: { assessmentId: string } }) {
  const {
    fetchAssessmentById,
    assessment,

  } = useAssessment();

  const {
    addQuestion,
    addQuestionResponse,
    patchQuestion,
    patchQuestionResponse,
    removeQuestion,
    removeQuestionResponse,
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
    removeSection,
  } = useSection();

  const {
    assessmentId,
    setAssessmentId,
    assessmentData,
    setAssessmentData,
    currentSectionData,
    setCurrentSectionData,

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
    currentSectionIndex,
    setCurrentSectionIndex,

    currentMarks,
    setCurrentMarks,

  } = useCreateAssessmentStore();

  useEffect(() => {
    setAssessmentId(params.assessmentId);
  }, []);

  const [addQuestionLoading, setAddQuestionLoading] = useState(false);
  const [removeQuestionLoading, setRemoveQuestionLoading] = useState(false);
  const [addSectionLoading, setAddSectionLoading] = useState(false);
  const [removeSectionLoading, setRemoveSectionLoading] = useState(false);
  const [allButtonsDisabled, setAllButtonsDisabled] = useState(false);


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
    console.log("current Section", currentSectionIndex);
    if (assessment?.sections?.length!) {
      setAssessmentData(assessment.sections);
      setCurrentSectionData((assessment.sections[currentSectionIndex]));
    }
  }, [assessment]);


  useEffect(() => {
    if (currentSectionData && Array.isArray(currentSectionData) && currentSectionData.length > 0 && currentSectionData[currentQuestionIndex]) {
      setCurrentQuestionId(currentSectionData[currentQuestionIndex].id);
      setCurrentQuestionContent(currentSectionData[currentQuestionIndex].description);
      setCurrentOptionsContent(currentSectionData[currentQuestionIndex].options);
    }
  }, [currentSectionData, currentQuestionIndex]);

  const refreshAssessment = async () => {
    try {
      await fetchAssessmentById({ id: params.assessmentId });
    } catch (e) {
      console.log(e);
    };
  }


  const initalizeSection = async () => {
    try {
      const data: CreateQuestionProps = {
        assessment_id: assessmentId,
        description: "Question...",
        marks: 0,
        section: assessmentData.length + 1,
      };
      const res = await addQuestion(data);
      const newQuestionId = res?.data?.id;
      if (!newQuestionId) {
        throw new Error("Failed to initialize question: Missing question ID");
      }
      await addOption({ question_id: newQuestionId, description: `Option 1`, is_correct: false });
      await addOption({ question_id: newQuestionId, description: `Option 2`, is_correct: false });
      console.log("Question initialized with ID:", newQuestionId);
    } catch (error) {
      console.error("Error initializing question:", error);
    }
  };

  const initalizeQuestion = async () => {
    try {
      const data: CreateQuestionProps = {
        assessment_id: assessmentId,
        description: "Question...",
        marks: 0,
        section: currentSectionIndex + 1,
      };
      const res = await addQuestion(data);
      const newQuestionId = res?.data?.id;
      if (!newQuestionId) {
        throw new Error("Failed to initialize question: Missing question ID");
      }
      await addOption({ question_id: newQuestionId, description: `Option 1`, is_correct: false });
      await addOption({ question_id: newQuestionId, description: `Option 2`, is_correct: false });
      console.log("Question initialized with ID:", newQuestionId);
    } catch (error) {
      console.error("Error initializing question:", error);
    }
  };

  const addNewOption = async () => {
    try {
      const data = {
        question_id: currentQuestionId,
        description: `Option ${currentOptionsContent.length + 1}`,
        is_correct: false,
      };
      await addOption(data);
      refreshAssessment();
    } catch (error) {
      console.error("Error adding option:", error);
    }
  }

  const removeOption = async (id: string) => {
    try {
      await removeOptionById({ id });
      refreshAssessment();
    } catch (error) {
      console.error("Error removing option:", error);
    }
  }

  const updateOption = async (id: string, description: string, isCorrect: boolean) => {
    try {
      const data = {
        id,
        description,
        is_correct: isCorrect,
      };
      await patchOption(data);
      refreshAssessment();
    } catch (error) {
      console.error("Error updating option:", error);
    }
  }

  // handle sections
  const handleAddSection = async () => {
    const data: CreateQuestionProps = {
      assessment_id: assessmentId,
      description: "...",
      marks: 0,
      section: assessmentData.length + 1,
    };
    try {
      setAllButtonsDisabled(true);
      setAddSectionLoading(true);
      await initalizeSection();
      await refreshAssessment();
      setCurrentQuestionIndex(0);
      setCurrentSectionIndex(assessmentData.length);

    } catch (error) {
      console.error("Error adding section:", error);
    } finally {
      setAddSectionLoading(false);
      setAllButtonsDisabled(false);
    }
  };

  const handleRemoveSection = async () => {
    const section = currentSectionIndex + 1;
    const data: DeleteSectionProps = {
      assessmentId: assessmentId,
      section: section,
    }
    try {
      setAllButtonsDisabled(true);
      setRemoveSectionLoading(true)
      if (currentSectionIndex === 0) {
        await removeSection(data);
        await fetchAssessmentById({ id: params.assessmentId });
        setCurrentSectionIndex(0);
        setCurrentSectionData(assessment!.sections[0]);
      } else {
        await removeSection(data);
        await fetchAssessmentById({ id: params.assessmentId });
        setAssessmentData(assessment!.sections);
        setCurrentSectionData((assessment!.sections[currentSectionIndex]));
        setCurrentSectionIndex(currentSectionIndex - 1);
      }
    } catch (error) {
      console.error("Error removing section:", error);
    } finally {
      setRemoveSectionLoading(false);
      setAllButtonsDisabled(false);

    }
  }

  const handleSectionChange = async (index: number) => {
    setCurrentSectionIndex(index);
    setCurrentQuestionIndex(0);
    setCurrentSectionData(assessment!.sections[index]);
  }

  // handle questions
  const handleAddQuestion = async () => {
    const sectionNumber = currentSectionIndex! + 1;
    const data: CreateQuestionProps = {
      assessment_id: assessmentId,
      description: "...",
      marks: 0,
      section: sectionNumber,
    };
    try {
      setAllButtonsDisabled(true);
      setAddQuestionLoading(true);
      await initalizeQuestion();
      await refreshAssessment();
      setAssessmentData(assessment!.sections);
      setCurrentSectionData((assessment!.sections[currentSectionIndex]));
      setCurrentQuestionIndex(currentSectionData!.length);
    } catch (error) {
      console.error("Error adding question:", error);
    } finally {
      setAddQuestionLoading(false);
      setAllButtonsDisabled(false);
    }
  }

  const handleRemoveQuestion = async () => {
    const data: DeleteQuestionProps = {
      id: currentQuestionId!,
    };
    try {
      setAllButtonsDisabled(true);
      setRemoveQuestionLoading(true);
      if (currentQuestionIndex === 0) {
        await removeQuestion(data);
        await refreshAssessment();
        setCurrentQuestionIndex(0);
        setCurrentQuestionId(currentSectionData![0].id);
      } else {
        await removeQuestion(data);
        await refreshAssessment();
        setCurrentQuestionId(currentSectionData![currentQuestionIndex! - 1].id);
        setCurrentQuestionIndex(currentQuestionIndex! - 1);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    } finally {
      setRemoveQuestionLoading(false);
      setAllButtonsDisabled(false);
    }
  };

  const handleQuestionChange = async (index: number,) => {
    setCurrentQuestionIndex(index);
    setCurrentQuestionId(currentSectionData![index].id);
  }

  const handleQuestionDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentQuestionContent(e.target.value);
  }

  const handleUpdateQuestion = async () => {
    const data: UpdateQuestionProps = {
      id: currentQuestionId!,
      description: currentQuestionContent,
      marks: currentQuestionMarks,
    };
    try {
      await patchQuestion(data);
      await refreshAssessment();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  }

  const handleQuestionOnBlur = async () => {
    if (currentQuestionContent !== currentSectionData![currentQuestionIndex].description) {
      await handleUpdateQuestion();
    }
  }

  const navigateToNextQuestion = async () => {
    if (currentQuestionIndex === currentSectionData.length - 1) {
      handleAddQuestion();
    }
    if (currentQuestionIndex < currentSectionData!.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentQuestionId(currentSectionData![currentQuestionIndex + 1].id);
    }
  }
  const navigateToPreviousQuestion = async () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentQuestionId(currentSectionData![currentQuestionIndex - 1].id);
    }
  }

  return (
    <div className="flex max-h-screen flex-row overflow-y-hidden">
      <div className="flex flex-col w-full">
        <Header assessmentId={assessmentId} />
        <main className="flex flex-1 flex-col lg:gap-2 p-4 overflow-y-scroll scrollbar-none">
          <div className="flex flex-col gap-2 w-full max-h-[calc(100vh-6rem)]">
            <Card className="border-none">
              <div className="flex flex-col gap-2 w-full p-1">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex gap-2">
                    <Badge className="text-[10px] cursor-default">
                      {currentQuestionIndex + 1}
                    </Badge>
                    <Badge className="text-[10px] cursor-pointer" variant={"outline"}>
                      <input
                        className="bg-transparent border-none text-[10px] w-4 text-center outline-none"
                        value={currentQuestionMarks}
                        onChange={(e) => setCurrentQuestionMarks(parseInt(e.target.value))}
                      />
                    </Badge>
                  </div>
                  <RemoveButton
                    loading={removeQuestionLoading}
                    onClick={handleRemoveQuestion}
                    disabled={currentSectionData!.length === 1 || removeQuestionLoading || allButtonsDisabled}
                  />
                </div>
                <Textarea
                  className="w-full max-h-[10rem]"
                  placeholder="Enter your Question..."
                  onChange={handleQuestionDescriptionChange}
                  value={currentQuestionContent}
                  onBlur={handleQuestionOnBlur}
                />
              </div>
            </Card>
            <div className="flex items-cen justify-center mt-2">
              <Separator className="w-[98%]" />
            </div>
            <Card
              className="flex flex-col  items-center justify-start gap-2 border border-none rounded-lg h-[30rem] min-h-[12rem] max-h-[60rem] w-full p-1 overflow-y-auto scrollbar-none">
              {currentOptionsContent?.map((option, index) => (
                <div className="flex flex-col gap-2 w-full p-1" key={index}>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex gap-2 items-center justify-center">
                      <Badge className="text-[10px] cursor-default">
                        {index + 1}
                      </Badge>
                      <button
                        className="flex gap-2"
                        onClick={() => { updateOption(option.id, option.description, !option.is_correct) }}
                      >
                        <Badge
                          className={`text-[10px] cursor-default ${option.is_correct ? "bg-green-800 hover:bg-green-900" : "bg-transparent border-dashed text-red-900 border-red-900 hover:bg-transparent hover:border-solid"}`} >
                          {option.is_correct ? "Correct" : "Incorrect"}
                        </Badge>
                      </button>
                    </div>
                    <button
                      onClick={() => removeOption(option.id)}
                    >
                      <Badge className="text-[10px] cursor-pointer" variant={"destructive"}>
                        remove
                      </Badge>
                    </button>
                  </div>
                  <Textarea
                    className="w-full max-h-[10rem]"
                    placeholder="Enter option description..."
                    value={currentOptionsContent[index].description}
                    onChange={(e) => {
                      const updatedOptions = [...currentOptionsContent];
                      updatedOptions[index] = { ...option, description: e.target.value }; // Update local state
                      setCurrentOptionsContent(updatedOptions); // Update store with new options
                    }}
                    onBlur={() => {
                      updateOption(option.id, option.description, option.is_correct); // Call API to update option on blur
                    }}
                  />
                </div>
              ))}
              <button
                onClick={addNewOption}
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
                <Card className="flex flex-row items-center w-full p-2 gap-2 border border-dashed bg-transparent justify-between">
                  <div className="flex gap-2 flex-row items-center scrollbar-none">
                    <div className="flex flex-row items-center w-full gap-2 overflow-x-scroll scrollbar-none">
                      {currentSectionData!.map((question, index) => (
                        <QuestionButon
                          disabled={allButtonsDisabled}
                          isCurrentSection={currentQuestionIndex === index}
                          key={index}
                          index={index}
                          onClick={() => {
                            handleQuestionChange(index);
                          }} />
                      ))}
                    </div>
                    <AddQuestionButton
                      disabled={allButtonsDisabled}
                      onClick={() => handleAddQuestion()}
                      loading={addQuestionLoading} />
                  </div>
                  <RemoveButton
                    loading={removeQuestionLoading}
                    onClick={handleRemoveQuestion}
                    disabled={currentSectionData!.length === 1 || removeQuestionLoading || allButtonsDisabled}
                  />
                </Card>
                <div className="flex flex-row gap-2 w-full">
                  <Card className="flex flex-row w-full p-2 gap-2 border-dashed bg-transparent">
                    <div className="flex flex-row items-center w-full gap-2 overflow-x-scroll">
                      {assessmentData.map((section, index) => (
                        <SectionButton
                          disabled={allButtonsDisabled}
                          isCurrentSection={currentSectionIndex === index}
                          key={index}
                          index={index}
                          onClick={() => handleSectionChange(index)}
                        />
                      ))}
                      <AddSectionButton
                        disabled={allButtonsDisabled}
                        onClick={handleAddSection}
                        loading={addSectionLoading}
                      />
                    </div>
                    <RemoveButton
                      loading={removeSectionLoading}
                      onClick={handleRemoveSection}
                      disabled={assessmentData.length === 1 || removeSectionLoading || allButtonsDisabled}
                    />
                  </Card>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2">
                Powered by
                <Badge variant="outline">PNAcademy</Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigateToPreviousQuestion()}
                >Previous</Button>
                <Button
                  onClick={() => navigateToNextQuestion()}
                >Next</Button>
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
