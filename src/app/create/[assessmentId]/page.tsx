"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import { useAssessment } from "@/app/dashboard/views/manage-assessment/hooks/useAssessment";
import { useQuestions } from "@/app/create/hooks/useQuestion";
import { Separator } from "@/components/ui/separator";
import useCreateAssessmentStore from "@/lib/stores/manage-assessment-store/assessment-create";
import { useOptions } from "@/app/create/hooks/useOption";
import {
  CreateQuestionProps,
  UpdateQuestionProps,
} from "@/lib/types/questionTypes";
import SectionButton from "../components/buttons/sectionbutton";
import QuestionButton from "../components/buttons/questionbutton";
import AddQuestionButton from "../components/buttons/addquestionbuton";
import AddSectionButton from "../components/buttons/addsectionbutton";
import { useSection } from "../hooks/useSection";
import { DeleteSectionProps } from "@/lib/types/sectionTypes";
import RemoveButton from "../components/buttons/remove-button";
import { GetAssessmentByIdData } from "@/lib/types/assessmentTypes";
import { ApiError } from "@/lib/api/apiError";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Create({
  params,
}: {
  params: { assessmentId: string };
}) {
  // all hooks here
  const { fetchAssessmentById } = useAssessment();

  const { addQuestion, patchQuestion, removeQuestion } = useQuestions();

  const { addOption, patchOption, removeOptionById } = useOptions();

  const { removeSection } = useSection();

  // global states here
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

    currentOptionsContent,
    setCurrentOptionsContent,
    currentSectionIndex,
    setCurrentSectionIndex,

    currentMarks,
    setCurrentMarks,
  } = useCreateAssessmentStore();

  // local states here
  const [addQuestionLoading, setAddQuestionLoading] = useState(false);
  const [removeQuestionLoading, setRemoveQuestionLoading] = useState(false);
  const [addSectionLoading, setAddSectionLoading] = useState(false);
  const [removeSectionLoading, setRemoveSectionLoading] = useState(false);
  const [allButtonsDisabled, setAllButtonsDisabled] = useState(false);

  // local functions here

  const initalizeSection = async () => {
    const payload: CreateQuestionProps = {
      assessment_id: assessmentId,
      description: "Question...",
      marks: 0,
      section: assessmentData.length + 1,
    };
    try {
      const response = await addQuestion(payload);
      const newQuestionId = response.id;
      if (newQuestionId) {
        const option1 = await addOption({
          question_id: newQuestionId,
          description: `Option 1`,
          is_correct: false,
        });
        const option2 = await addOption({
          question_id: newQuestionId,
          description: `Option 2`,
          is_correct: false,
        });
        if (option1 && option2) {
          handleRefreshAssessment();
          return true;
        } else {
          throw new Error("UnExpected Error Occured While Adding Options");
        }
      } else {
        throw new Error("Failed to initialize question: Missing question ID");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: `Error Ocurred ${err.status}`,
          description: `${err.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: `Error Ocurred ${error.name}`,
          description: `An Unexpected Error Occured While Initalizing Question : ${error.message} `,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      }
      return false;
    }
  };

  const initalizeQuestion = async (): Promise<boolean> => {
    const payload: CreateQuestionProps = {
      assessment_id: assessmentId,
      description: "Question...",
      marks: currentMarks,
      section: currentSectionIndex + 1,
    };
    try {
      const response = await addQuestion(payload);
      const newQuestionId = response.id;
      if (newQuestionId) {
        const option1 = await addOption({
          question_id: newQuestionId,
          description: `Option 1`,
          is_correct: false,
        });
        const option2 = await addOption({
          question_id: newQuestionId,
          description: `Option 2`,
          is_correct: false,
        });
        if (option1 && option2) {
          const newQuestion = {
            id: newQuestionId,
            assessment_id: assessmentId,
            description: response.description,
            marks: response.marks,
            section: response.section,
            updatedAt: response.updatedAt,
            createdAt: response.createdAt,
            options: [option1, option2],
          };
          const updatedSectionData = [...currentSectionData];
          updatedSectionData.push(newQuestion);
          setCurrentSectionData(updatedSectionData);
          const updatedAssessmentData = [...assessmentData];
          updatedAssessmentData[currentSectionIndex] = updatedSectionData;
          setAssessmentData(updatedAssessmentData);
          setCurrentQuestionId(newQuestionId);
          return true;
        } else {
          throw new Error("UnExpected Error Occured While Adding Options");
        }
      } else {
        throw new Error("Failed to initialize question: Missing question ID");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: `Error Ocurred ${err.status}`,
          description: `${err.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: `Error Ocurred ${error.name}`,
          description: `An Unexpected Error Occured While Initalizing Question : ${error.message} `,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      }
      return false;
    }
  };

  // event handlers here
  const handleRefreshAssessment = async () => {
    try {
      const response = await fetchAssessmentById({ id: params.assessmentId });
      if (response) {
        setAssessmentData(response.sections);
        setCurrentSectionData(response.sections[currentSectionIndex]);
        setCurrentQuestionContent(
          response.sections[currentSectionIndex][currentQuestionIndex]
            .description
        );
        setCurrentOptionsContent(
          response.sections[currentSectionIndex][currentQuestionIndex].options
        );
      } else {
        throw new Error("Failed to fetch assessment data");
      }
    } catch (err) {
      // handle error
    }
  };

  // new implementation
  const handleAddNewOption = async () => {
    try {
      const payload = {
        question_id: currentQuestionId,
        description: `Option ${currentOptionsContent.length + 1}`,
        is_correct: false,
      };

      await addOption(payload);
      const updatedAssessment = await fetchAssessmentById({
        id: params.assessmentId,
      });

      if (updatedAssessment) {
        setAssessmentData(updatedAssessment.sections);
        setCurrentSectionData(updatedAssessment.sections[currentSectionIndex]);
        const question =
          updatedAssessment.sections[currentSectionIndex][currentQuestionIndex];
        setCurrentOptionsContent(question.options);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add new option",
        action: <ToastAction altText="error">ok</ToastAction>,
      });
    }
  };

  const handleRemoveOption = async (id: string) => {
    try {
      await removeOptionById({ id });
      const updatedAssessment = await fetchAssessmentById({
        id: params.assessmentId,
      });

      if (updatedAssessment) {
        setAssessmentData(updatedAssessment.sections);
        setCurrentSectionData(updatedAssessment.sections[currentSectionIndex]);
        const question =
          updatedAssessment.sections[currentSectionIndex][currentQuestionIndex];
        setCurrentOptionsContent(question.options);
      }
    } catch (error) {
      console.error("Error removing option:", error);
      toast({
        title: "Error",
        description: "Failed to remove option",
        action: <ToastAction altText="error">ok</ToastAction>,
      });
    }
  };

  const handleUpdateOption = async (
    id: string,
    description: string,
    isCorrect: boolean
  ) => {
    try {
      const payload = {
        id,
        description,
        is_correct: isCorrect,
      };

      await patchOption(payload);
      const updatedAssessment = await fetchAssessmentById({
        id: params.assessmentId,
      });

      if (updatedAssessment) {
        setAssessmentData(updatedAssessment.sections);
        setCurrentSectionData(updatedAssessment.sections[currentSectionIndex]);
        const question =
          updatedAssessment.sections[currentSectionIndex][currentQuestionIndex];
        setCurrentOptionsContent(question.options);
      }
    } catch (error) {
      console.error("Error updating option:", error);
      toast({
        title: "Error",
        description: "Failed to update option",
        action: <ToastAction altText="error">ok</ToastAction>,
      });
    }
  };

  const handleAddSection = async () => {
    try {
      setAllButtonsDisabled(true);
      setAddSectionLoading(true);
      const status = await initalizeSection();
      if (status) {
        const updatedAssessment = await fetchAssessmentById({
          id: params.assessmentId,
        });
        if (updatedAssessment) {
          setCurrentSectionIndex(updatedAssessment.sections.length - 1);
          setCurrentSectionData(
            updatedAssessment.sections[updatedAssessment.sections.length - 1]
          );
          setAssessmentData(updatedAssessment.sections);
          setCurrentQuestionIndex(0);
          if (
            updatedAssessment.sections[updatedAssessment.sections.length - 1][0]
          ) {
            setCurrentQuestionId(
              updatedAssessment.sections[
                updatedAssessment.sections.length - 1
              ][0].id
            );
            setCurrentQuestionContent(
              updatedAssessment.sections[
                updatedAssessment.sections.length - 1
              ][0].description
            );
            setCurrentOptionsContent(
              updatedAssessment.sections[
                updatedAssessment.sections.length - 1
              ][0].options
            );
          }
        }
      }
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
    };
    try {
      setAllButtonsDisabled(true);
      setRemoveSectionLoading(true);

      if (assessmentData.length <= 1) {
        throw new Error(
          "Cannot delete section: at least 1 section should be present in the assessment"
        );
      }

      await removeSection(data);
      const updatedAssessment = await fetchAssessmentById({
        id: params.assessmentId,
      });

      if (updatedAssessment) {
        setAssessmentData(updatedAssessment.sections);

        // If we're removing the first section, move to the new first section
        // Otherwise, move to the previous section
        const newSectionIndex = section === 1 ? 0 : currentSectionIndex - 1;
        setCurrentSectionIndex(newSectionIndex);
        setCurrentSectionData(updatedAssessment.sections[newSectionIndex]);
        setCurrentQuestionIndex(0);

        if (updatedAssessment.sections[newSectionIndex][0]) {
          setCurrentQuestionId(
            updatedAssessment.sections[newSectionIndex][0].id
          );
          setCurrentQuestionContent(
            updatedAssessment.sections[newSectionIndex][0].description
          );
          setCurrentOptionsContent(
            updatedAssessment.sections[newSectionIndex][0].options
          );
        }
      }
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: `Error Occurred ${err.status}`,
          description: `${err.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: `Error Occurred`,
          description: error.message,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      }
    } finally {
      setRemoveSectionLoading(false);
      setAllButtonsDisabled(false);
    }
  };

  const handleNavigateSection = async (index: number) => {
    try {
      setCurrentSectionIndex(index);
      setCurrentQuestionIndex(0);

      const updatedAssessment = await fetchAssessmentById({
        id: params.assessmentId,
      });
      if (updatedAssessment) {
        setAssessmentData(updatedAssessment.sections);
        setCurrentSectionData(updatedAssessment.sections[index]);
        if (updatedAssessment.sections[index][0]) {
          setCurrentQuestionId(updatedAssessment.sections[index][0].id);
          setCurrentQuestionContent(
            updatedAssessment.sections[index][0].description
          );
          setCurrentOptionsContent(
            updatedAssessment.sections[index][0].options
          );
        }
      }
    } catch (error) {
      console.error("Error navigating section:", error);
    }
  };

  // Question Handlers
  const handleAddQuestion = async () => {
    try {
      setAllButtonsDisabled(true);
      setAddQuestionLoading(true);
      const status = await initalizeQuestion();
      if (status) {
        const updatedAssessment = await fetchAssessmentById({
          id: params.assessmentId,
        });
        if (updatedAssessment) {
          setAssessmentData(updatedAssessment.sections);
          setCurrentSectionData(
            updatedAssessment.sections[currentSectionIndex]
          );
          const newQuestionIndex =
            updatedAssessment.sections[currentSectionIndex].length - 1;
          setCurrentQuestionIndex(newQuestionIndex);

          const newQuestion =
            updatedAssessment.sections[currentSectionIndex][newQuestionIndex];
          if (newQuestion) {
            setCurrentQuestionId(newQuestion.id);
            setCurrentQuestionContent(newQuestion.description);
            setCurrentOptionsContent(newQuestion.options);
          }
        }
      }
    } catch (error) {
      console.error("Error adding question:", error);
      toast({
        title: "Error",
        description: "Failed to add new question",
        action: <ToastAction altText="error">ok</ToastAction>,
      });
    } finally {
      setAddQuestionLoading(false);
      setAllButtonsDisabled(false);
    }
  };

  const handleUpdateQuestion = async () => {
    try {
      const data: UpdateQuestionProps = {
        id: currentQuestionId,
        description: currentQuestionContent,
        marks: currentQuestionMarks,
      };

      await patchQuestion(data);
      const updatedAssessment = await fetchAssessmentById({
        id: params.assessmentId,
      });

      if (updatedAssessment) {
        setAssessmentData(updatedAssessment.sections);
        setCurrentSectionData(updatedAssessment.sections[currentSectionIndex]);
        const question =
          updatedAssessment.sections[currentSectionIndex][currentQuestionIndex];
        setCurrentQuestionContent(question.description);
        setCurrentQuestionMarks(question.marks);
      }
    } catch (error) {
      console.error("Error updating question:", error);
      toast({
        title: "Error",
        description: "Failed to update question",
        action: <ToastAction altText="error">ok</ToastAction>,
      });
    }
  };

  const handleRemoveQuestion = async () => {
    try {
      setAllButtonsDisabled(true);
      setRemoveQuestionLoading(true);

      if (currentSectionData && currentSectionData.length <= 1) {
        throw new Error(
          "Cannot delete question: at least 1 question should be present in the section"
        );
      }

      await removeQuestion({ id: currentQuestionId });
      const updatedAssessment = await fetchAssessmentById({
        id: params.assessmentId,
      });

      if (updatedAssessment) {
        setAssessmentData(updatedAssessment.sections);
        setCurrentSectionData(updatedAssessment.sections[currentSectionIndex]);

        // If we're removing the first question or last question, adjust the index accordingly
        const newQuestionIndex =
          currentQuestionIndex === 0 ? 0 : currentQuestionIndex - 1;
        setCurrentQuestionIndex(newQuestionIndex);

        const newQuestion =
          updatedAssessment.sections[currentSectionIndex][newQuestionIndex];
        if (newQuestion) {
          setCurrentQuestionId(newQuestion.id);
          setCurrentQuestionContent(newQuestion.description);
          setCurrentOptionsContent(newQuestion.options);
        }
      }
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: `Error Occurred ${err.status}`,
          description: err.message,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: "Error Occurred",
          description: error.message,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      }
    } finally {
      setRemoveQuestionLoading(false);
      setAllButtonsDisabled(false);
    }
  };

  const handleRenderQuestionDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurrentQuestionContent(e.target.value);
  };

  const handleNavigateQuestion = async (index: number) => {
    setCurrentQuestionIndex(index);
    setCurrentQuestionId(currentSectionData[index].id);
  };

  const handleQuestionOnBlur = async () => {
    console.log("Question On Blur");
    if (
      currentQuestionContent !==
      currentSectionData![currentQuestionIndex].description
    ) {
      await handleUpdateQuestion();
    }
  };

  const handleNavigateToNextQuestion = async () => {
    if (currentQuestionIndex === currentSectionData.length - 1) {
      handleAddQuestion();
    }
    if (currentQuestionIndex < currentSectionData!.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentQuestionId(currentSectionData![currentQuestionIndex + 1].id);
    }
  };
  const handleNavigateToPreviousQuestion = async () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentQuestionId(currentSectionData![currentQuestionIndex - 1].id);
    }
  };

  // all useEffects here
  useEffect(() => {
    setAssessmentId(params.assessmentId);
  }, []);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const assessment: GetAssessmentByIdData = await fetchAssessmentById({
          id: params.assessmentId,
        });
        console.log(assessment);
        if (assessment.sections.length > 0) {
          setAssessmentData(assessment.sections);
          setCurrentSectionData(assessment.sections[currentSectionIndex]);
        } else {
          setAssessmentData([]);
          setCurrentSectionData([]);
          setCurrentQuestionContent("");
          setCurrentOptionsContent([]);
        }
      } catch (err) {
        if (err instanceof ApiError) {
          toast({
            title: `Error Occurred ${err.status}`,
            description: `${err.message}`,
            action: <ToastAction altText="error">ok</ToastAction>,
          });
        } else {
        }
      } finally {
      }
    };
    fetchAssessment();
  }, [params.assessmentId]);

  useEffect(() => {
    if (
      currentSectionData &&
      Array.isArray(currentSectionData) &&
      currentSectionData.length > 0 &&
      currentSectionData[currentQuestionIndex]
    ) {
      setCurrentQuestionId(currentSectionData[currentQuestionIndex].id);
      setCurrentQuestionContent(
        currentSectionData[currentQuestionIndex].description
      );
      setCurrentOptionsContent(
        currentSectionData[currentQuestionIndex].options
      );
    }
  }, [currentSectionData, currentQuestionIndex]);

  return (
    <div className="flex max-h-screen flex-row overflow-hidden">
      <div className="flex flex-col w-full">
        <Header
          patchQuestion={patchQuestion}
          refreshAssessment={handleRefreshAssessment}
        />
        <main className="flex flex-1 flex-col lg:gap-2 p-4 overflow-y-scroll scrollbar-none">
          <div className="flex flex-col gap-2 w-full max-h-[calc(100vh-6rem)]">
            <Card className="border-none">
              <div className="flex flex-col gap-2 w-full p-1">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex gap-2 p-2">
                    <Badge className="text-[10px] cursor-default">
                      {currentQuestionIndex + 1}
                    </Badge>
                  </div>
                  {currentSectionData && currentSectionData.length > 0 && (
                    <RemoveButton
                      loading={removeQuestionLoading}
                      onClick={handleRemoveQuestion}
                      disabled={
                        currentSectionData.length === 1 ||
                        removeQuestionLoading ||
                        allButtonsDisabled
                      }
                    />
                  )}
                </div>
                <Textarea
                  disabled={
                    currentSectionData && currentSectionData.length === 0
                  }
                  className="w-full max-h-[10rem]"
                  placeholder="Enter your Question..."
                  value={currentQuestionContent}
                  onChange={handleRenderQuestionDescription}
                  onBlur={handleQuestionOnBlur}
                />
              </div>
            </Card>
            <div className="flex items-cen justify-center mt-2">
              <Separator className="w-[98%]" />
            </div>
            <Card className="flex flex-col  items-center justify-start gap-2 border border-none rounded-lg h-[calc(100vh-10rem)] min-h-[12rem] max-h-[60rem] w-full p-1 overflow-y-auto scrollbar-none">
              {currentOptionsContent.map((option, index) => (
                <div className="flex flex-col gap-2 w-full p-1" key={index}>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex gap-2 items-center justify-center">
                      <Badge className="text-[10px] cursor-default">
                        {index + 1}
                      </Badge>
                      <button
                        className="flex gap-2"
                        onClick={() => {
                          handleUpdateOption(
                            option.id,
                            option.description,
                            !option.is_correct
                          );
                        }}
                      >
                        <Badge
                          className={`text - [10px] cursor -default ${
                            option.is_correct
                              ? "bg-green-800 hover:bg-green-900"
                              : "bg-transparent border-dashed text-red-900 border-red-900 hover:bg-transparent hover:border-solid"
                          } `}
                        >
                          {option.is_correct ? "Correct" : "Incorrect"}
                        </Badge>
                      </button>
                    </div>
                    <button onClick={() => handleRemoveOption(option.id)}>
                      <Badge
                        className="text-[10px] cursor-pointer"
                        variant={"destructive"}
                      >
                        remove
                      </Badge>
                    </button>
                  </div>
                  <Textarea
                    className={`w - full max - h - [10rem] ${
                      currentSectionData!.length === 0
                        ? "cursor-not-allowed"
                        : ""
                    } `}
                    placeholder="Enter option description..."
                    value={currentOptionsContent[index].description}
                    onChange={(e) => {
                      const updatedOptions = [...currentOptionsContent];
                      updatedOptions[index] = {
                        ...option,
                        description: e.target.value,
                      }; // Update local state
                      setCurrentOptionsContent(updatedOptions); // Update store with new options
                    }}
                    onBlur={() => {
                      handleUpdateOption(
                        option.id,
                        option.description,
                        option.is_correct
                      ); // Call API to update option on blur
                    }}
                  />
                </div>
              ))}
              <button
                disabled={assessmentData.length === 0}
                onClick={handleAddNewOption}
                className={`text-[10px] border p-3 text-xs rounded-[8px] hover:bg-secondary  items-center justify-center ${
                  assessmentData.length === 0 ? "hidden" : "flex"
                } `}
              >
                <Plus className="h-3 w-3 mr-2" />
                Add Option
              </button>
            </Card>
            <Separator />
            <div className="flex flex-row w-full gap-2">
              <div className="flex flex-col w-full justify-center gap-1 items-start">
                {assessmentData.length > 0 && (
                  <Card className="flex flex-row items-center w-full lg:min-w-[calc(100vw-27rem)] p-2 gap-2 border border-dashed bg-transparent justify-between">
                    <div className="flex gap-2 flex-row items-center scrollbar-none">
                      <div className="flex flex-row items-center max-w-[calc(100vw-7rem)] md:max-w-[calc(100vw-21rem)] lg:max-w-[calc(100vw-32rem)] gap-2 overflow-x-scroll scrollbar-none">
                        {currentSectionData &&
                          currentSectionData.map((_, index) => (
                            <QuestionButton
                              disabled={allButtonsDisabled}
                              isCurrentSection={currentQuestionIndex === index}
                              key={index}
                              index={index}
                              onClick={() => {
                                handleNavigateQuestion(index);
                              }}
                            />
                          ))}
                      </div>
                      <AddQuestionButton
                        disabled={
                          allButtonsDisabled || currentSectionData!.length === 0
                        }
                        onClick={() => handleAddQuestion()}
                        loading={addQuestionLoading}
                      />
                    </div>
                    <RemoveButton
                      loading={removeQuestionLoading}
                      onClick={handleRemoveQuestion}
                      disabled={
                        (currentSectionData &&
                          currentSectionData.length <= 1) ||
                        removeQuestionLoading ||
                        allButtonsDisabled
                      }
                    />
                  </Card>
                )}
                <div className="flex flex-row gap-2 w-full">
                  <Card className="flex flex-row items-center w-full lg:min-w-[calc(100vw-27rem)] p-2 gap-2 border border-dashed bg-transparent justify-between">
                    <div className="flex gap-2 flex-row items-center scrollbar-none">
                      <div className="flex flex-row items-center max-w-[calc(100vw-7rem)] md:max-w-[calc(100vw-21rem)] lg:max-w-[calc(100vw-32rem)] gap-2 overflow-x-scroll scrollbar-none">
                        {assessmentData.map((_, index) => (
                          <SectionButton
                            disabled={allButtonsDisabled}
                            isCurrentSection={currentSectionIndex === index}
                            key={index}
                            index={index}
                            onClick={() => handleNavigateSection(index)}
                          />
                        ))}
                      </div>

                      <AddSectionButton
                        disabled={allButtonsDisabled}
                        onClick={handleAddSection}
                        loading={addSectionLoading}
                      />
                    </div>
                    <RemoveButton
                      loading={removeSectionLoading}
                      onClick={handleRemoveSection}
                      disabled={
                        assessmentData.length <= 1 ||
                        removeSectionLoading ||
                        allButtonsDisabled
                      }
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
                  onClick={() => handleNavigateToPreviousQuestion()}
                >
                  Previous
                </Button>
                <Button onClick={() => handleNavigateToNextQuestion()}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="hidden h-full border-r bg-muted/40 md:block md:min-w-[230px] md:max-w-[230px]  md:w-[230px] lg:min-w-[400px]">
        <SideBar assessmentId={params.assessmentId} />
      </div>
    </div>
  );
}
