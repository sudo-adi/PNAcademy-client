"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { ArrowDown, ArrowLeft, ArrowUp, Plus, PlusIcon, RotateCw, RotateCwIcon, SparklesIcon, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAICreate } from './hooks/useAiCreate'
import useAiCreateStore from '@/lib/stores/ai-create/create-with-ai'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AiSection } from '@/lib/types/ai-assessment'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import QuestionCard from './components/questioncard'
import PnaLoader from '@/components/common/custom-loading-animation'
import { set } from 'date-fns'


const AiCreate = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>('');
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const [difficultyLevel, setDifficultyLevel] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);
  const [sectionMarks, setSectionMarks] = useState<number>(0);
  const [disableGenerateButton, setDisableGenerateButton] = useState<boolean>(true);
  const { createQuestions, createSingleQuestion, questionsResponse } = useAICreate();
  const [section, setSection] = useState<AiSection>();
  const [disableInputUi, setDisableInputUi] = useState<boolean>(false);
  const [generatingSingleQuestion, setGeneratingSingleQuestion] = useState<boolean>(false);
  const [regeneratingQuestionIndex, setRegeneratingQuestionIndex] = useState<number | null>(null);
  const { currentNumberOfQuestions, currentDifficultyLevel, currentMarksPerQuestion, currentSections, currentSectionIndex, currentQuestionIndex,
    setCurrentNumberOfQuestions, setCurrentDifficultyLevel, setCurrentMarksPerQuestion, setCurrentSectionIndex, setCurrentQuestionIndex, setCurrentSections
  } = useAiCreateStore();

  const handleGenerateQuestions = async () => {
    setGenerating(true);
    try {
      console.log('Generating questions...');
      await createQuestions({
        topic: prompt,
        numberOfQuestions: numberOfQuestions,
        difficulty: difficultyLevel as "easy" | "medium" | "hard",
      });
    } catch (error) {
      console.log('Error generating questions:', error);
      toast({
        title: "Oops something went wrong",
        description: "An error occured while generating questions",
        action: (
          <ToastAction altText="try again" onClick={() => handleGenerateQuestions()}>Try Again</ToastAction>
        )
      });
    }
    setGenerating(false);
  }

  const handleSectionChange = (index: number) => {
    setCurrentSectionIndex(index);
  }

  const initNewSection = async () => {
    const newSection = {
      prompt: "",
      difficultyLevel: "" as "",
      sectionMarks: 0,
      questions: []
    }
    setCurrentSections([...currentSections, newSection])
    setCurrentSectionIndex(currentSections.length);
  }

  const generateSingleQuestion = async (index: number) => {
    setGeneratingSingleQuestion(true);
    try {
      const section = [...currentSections];
      const currentSection = section[currentSectionIndex];
      const question = currentSection.questions[index];
      const response = await createSingleQuestion({
        topic: currentSection.prompt,
        numberOfQuestions: 1,
        difficulty: difficultyLevel as "easy" | "medium" | "hard",
      });
      console.log('response:', response);
      if (response?.data?.questions && response.data.questions.length > 0) {
        section[currentSectionIndex].questions[index] = response.data.questions[0];
        setCurrentSections(section);
      } else {
        throw new Error('No questions found in the response.');
      }
    } catch (error) {
      console.error('Error generating question:', error);
      toast({
        title: "Error",
        description: "Failed to generate question.",
        action: <ToastAction altText="Try Again" onClick={() => generateSingleQuestion(index)}>Try Again</ToastAction>
      });
    } finally {
      setGeneratingSingleQuestion(false);
    }
  }


  const reGenerateSingleQuestion = async (index: number) => {
    setRegeneratingQuestionIndex(index);
    try {
      const section = [...currentSections];
      const currentSection = section[currentSectionIndex];
      const question = currentSection.questions[index];
      const response = await createSingleQuestion({
        topic: currentSection.prompt,
        numberOfQuestions: 1,
        difficulty: difficultyLevel as "easy" | "medium" | "hard",
      });
      console.log('response:', response);
      if (response?.data?.questions && response.data.questions.length > 0) {
        section[currentSectionIndex].questions[index] = response.data.questions[0];
        setCurrentSections(section);
      } else {
        throw new Error('No questions found in the response.');
      }
    } catch (error) {
      console.error('Error generating question:', error);
      toast({
        title: "Error",
        description: "Failed to generate question.",
        action: <ToastAction altText="Try Again" onClick={() => generateSingleQuestion(index)}>Try Again</ToastAction>
      });
    } finally {
      setRegeneratingQuestionIndex(null); // Reset after completion
    }
  }





  const deleteQuestion = (index: number) => {
    const section = [...currentSections];
    section[currentSectionIndex].questions = section[currentSectionIndex].questions.filter((_, i) => i !== index);
    setCurrentSections(section);
  }



  useEffect(() => {
    if (questionsResponse) {
      const retrievedQuestions = questionsResponse.data.questions || [];
      const retrievedNumberOfQuestions = retrievedQuestions.length;

      // Update the formatted section
      const formattedSection: AiSection = {
        prompt: prompt,
        difficultyLevel: difficultyLevel as "easy" | "medium" | "hard" | "",
        sectionMarks: sectionMarks,
        questions: retrievedQuestions,
      };

      // Update sections array
      const updatedSections = [...currentSections];
      if (currentSectionIndex < updatedSections.length) {
        updatedSections[currentSectionIndex] = formattedSection;
      } else {
        updatedSections.push(formattedSection);
      }
      setCurrentSections(updatedSections);

      // Set number of questions and handle toast notifications
      if (retrievedNumberOfQuestions > 0) {
        setCurrentNumberOfQuestions(retrievedNumberOfQuestions);

        if (retrievedNumberOfQuestions !== numberOfQuestions) {
          setNumberOfQuestions(retrievedNumberOfQuestions);
          toast({
            title: "Unable to generate all questions",
            description: `${retrievedNumberOfQuestions} questions generated`,
            action: <ToastAction altText="ok">Ok</ToastAction>,
          });
        } else {
          toast({
            title: "Questions Generated",
            description: `${retrievedNumberOfQuestions} questions generated`,
            action: <ToastAction altText="ok">Ok</ToastAction>,
          });
        }
      }
      console.log("section:", retrievedQuestions);
    }
  }, [questionsResponse]);


  useEffect(() => {
    if (numberOfQuestions > 0 && difficultyLevel && prompt) {
      setDisableGenerateButton(false);
    }
    else {
      setDisableGenerateButton(true);
    }
  }, [numberOfQuestions, difficultyLevel, prompt]);

  useEffect(() => {
    if (currentSections.length == 0) {
      setDisableInputUi(true);
    }
    else {
      setDisableInputUi(false);
    }
  }, [currentSections]);

  useEffect(() => {
    if (
      currentSections.length > 0 &&
      currentSectionIndex >= 0 &&
      currentSectionIndex < currentSections.length
    ) {
      const currentSection = currentSections[currentSectionIndex];

      if (currentSection) {
        setPrompt(currentSection.prompt);
        setDifficultyLevel(currentSection.difficultyLevel);
        setSectionMarks(currentSection.sectionMarks);
        setNumberOfQuestions(currentSection.questions.length);
      }
    }
  }, [currentSectionIndex, currentSections]);

  return (
    <>
      <div className="flex flex-col items-center justify-start h-screen w-screen overflow-hidden">
        <div className="flex w-full h-[60px] border-b items-center justify-between px-5">
          <div className="flex items-center  h-full gap-2">
            <button
              disabled={generating}
              onClick={() => router.push('/dashboard')}
              className='text-[12px] border p-2 rounded-xl hover:bg-secondary'>
              <ArrowLeft className='h-4 w-4' />
            </button>
            <h1 className="text-white hidden md:flex flex-row items-center gap-2">
              AI Create
              <SparklesIcon className='h-4 w-4' />
            </h1>
            <SparklesIcon className='md:hidden block h-4 w-4' />
          </div>
          <div className="flex  py-4">
            <Badge
              variant="outline">
              Section {currentSectionIndex + 1} of {currentSections.length}
            </Badge>
          </div>
          <Button size="sm" className='text-xs'>
            Create +
          </Button>
        </div>
        <div className="flex flex-col w-full py-4 px-5 gap-2">
          <div className="flex flex-col md:flex-row items-start h-[11rem] md:h-[5rem] gap-2 w-full rounded-2xl">
            <div className="flex w-full md:w-3/5">
              <Textarea
                disabled={generating || disableInputUi}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Prompt here to generate Questions..."
                className="w-full max-h-[5rem]"
              />
            </div>
            <div className="flex justify-center flex-col w-full md:w-2/5">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row w-full gap-2">
                  <Input
                    disabled={generating || disableInputUi}
                    value={isNaN(numberOfQuestions) || numberOfQuestions === 0 ? '' : numberOfQuestions}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setNumberOfQuestions(isNaN(value) ? 0 : value);
                    }}
                    placeholder="Total Questions"
                    type="number"
                    className="w-full min-w-[4rem] text-[12px] h-9 rounded-sm"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className='w-full text-[12px] h-9'
                        disabled={generating || disableInputUi}
                        variant="outline">
                        {difficultyLevel || '--  Select Difficulty  --'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => setDifficultyLevel('easy')}>
                        easy
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setDifficultyLevel('medium')}>
                        medium
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setDifficultyLevel('hard')}>
                        hard
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-row w-full gap-2">
                  <Input
                    value={isNaN(sectionMarks) || sectionMarks === 0 ? '' : sectionMarks}
                    disabled={generating || disableInputUi}
                    placeholder="Mark/Question"
                    type="number"
                    className="w-full min-w-[4rem] text-[12px] h-9"
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setSectionMarks(isNaN(value) ? 0 : value);
                    }}
                  />
                  <Button
                    disabled={generating || disableGenerateButton}
                    onClick={handleGenerateQuestions}
                    className='w-full text-[12px] h-9'>
                    {generating ?
                      <>
                        Generating
                        <SparklesIcon className="h-4 2-4 animate-pulse" />
                      </>
                      : 'Generate'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col">
            {generating ? (
              <div className="flex flex-grow items-center justify-center overflow-y-scroll scrollbar-none h-[calc(100vh-21rem)] md:h-[calc(100vh-15rem)] w-full">
                <PnaLoader />
              </div>
            ) : currentSections.length == 0 ? (
              <div className="flex flex-col border-2 border-dashed rounded-xl flex-grow items-center justify-center overflow-y-scroll scrollbar-none  h-[calc(100vh-21rem)] md:h-[calc(100vh-15rem)] w-full">
                <div className="flex h-full w-full flex-col items-center justify-end">
                  Add a new sections by clicking down below the plus [+] icon
                </div>
                <div className="flex mt-1 border-[#e6e6e6] h-full w-[2px] border-l border-dashed ">
                </div>
                <ArrowDown className='h-8 w-8 mb-1' />
              </div>
            ) :
              (
                <>
                  {currentSections.length === 0 || !currentSections[currentSectionIndex]?.questions?.length ? (
                    <div className="flex flex-col border-2 border-dashed rounded-xl flex-grow items-center justify-center overflow-y-scroll scrollbar-none  h-[calc(100vh-21rem)] md:h-[calc(100vh-15rem)] w-full">
                      <ArrowUp className='h-8 w-8 mt-1' />
                      <div className="flex mt-1 border-[#e6e6e6] h-full w-[2px] border-l border-dashed ">
                      </div>
                      <div className="flex h-full w-full flex-col items-center justify-start">
                        Generate Some Questions
                      </div>
                    </div>

                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 overflow-scroll w-full overflow-x-hidden overflow-y-scroll scrollbar-none h-[calc(100vh-21rem)] md:h-[calc(100vh-15rem)]">
                      {currentSections[currentSectionIndex]?.questions?.map((question, index) => {
                        if (!question || !question.description || !question.Options) return null;
                        return (
                          <QuestionCard
                            key={index}
                            regenerating={regeneratingQuestionIndex === index} // Only show spinner for the question being regenerated
                            index={index}
                            question={question.description}
                            options={question.Options.map((option) => option.description)}
                            correctOption={question.Options.find((option) => option.isCorrect)?.description || 'No correct option found'}
                            questionNumber={index + 1}
                            regenerateQuestion={reGenerateSingleQuestion}
                            deleteQuestion={deleteQuestion}
                          />
                        );
                      })}
                      <button
                        onClick={() => {
                          generateSingleQuestion(currentSections[currentSectionIndex]?.questions.length);
                        }}
                        className="flex h-auto max-h-[22rem] w-auto border-dashed border-2 items-center bg-secondary/30 hover:bg-secondary/60 transition-all duration-500justify-center flex-col rounded-xl"
                      >
                        <div className="flex items-center justify-center h-full w-full flex-col">
                          {generatingSingleQuestion ? (
                            <PnaLoader />
                          ) : (
                            <>
                              <PlusIcon className="h-4 w-4" />
                              <span className="text-[12px]">Add Question</span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  )}
                </>
              )
            }
          </div>
          <div className="flex border border-dashed p-1 flex-row rounded-2xl items-center justify-between">
            <div className="flex flex-row gap-2">
              <Button
                onClick={handleGenerateQuestions}
                disabled={
                  currentSections[currentSectionIndex]?.prompt == ''
                  || currentSections[currentSectionIndex]?.difficultyLevel == ''
                  || currentSections?.length == 0
                  || generating}>
                <RotateCw className='h-4 w-4' />
              </Button>
            </div>
            <div className="flex flex-row gap-2">
              {currentSections.map((section, index) => (
                <button
                  disabled={generating}
                  onClick={() => {
                    handleSectionChange(index)
                  }}
                  className={`flex items-center justify-center h-10 w-10 border
                  rounded-sm hover:bg-secondary ${generating ? "hover:bg-transparent" : ""} ${currentSectionIndex === index ? 'bg-secondary' : ''}`} key={index}>
                  {index + 1}
                </button>
              ))}
              <button
                onClick={initNewSection}
                disabled={generating}
                className={`${generating ? "hover:bg-transparent" : ""} flex items-center justify-center h-10 w-10 border rounded-sm hover:bg-secondary`}>
                +
              </button>
            </div>
            <Button
              disabled={generating}
              variant={'destructive'}
              onClick={() => {
                setCurrentSections(currentSections.filter((section, index) => index !== currentSectionIndex))
                if (currentSectionIndex > 0) {
                  setCurrentSectionIndex(currentSectionIndex - 1);
                } else if (currentSectionIndex === 0 && currentSections.length === 1) {
                  setCurrentSectionIndex(-1);
                }
              }
              }
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div >
    </>
  )
}

export default AiCreate