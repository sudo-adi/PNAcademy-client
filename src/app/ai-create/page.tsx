"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { ArrowDown, ArrowLeft, ArrowRight, Loader, Loader2, RotateCw, SparklesIcon, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAICreate } from './hooks/useAiCreate'
import useAiCreateStore from '@/lib/stores/ai-create/create-with-ai'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AiSection } from '@/lib/types/ai-assessment'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

const AiCreate = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>('');
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const [difficultyLevel, setDifficultyLevel] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);
  const [sectionMarks, setSectionMarks] = useState<number>(0);
  const [disableGenerateButton, setDisableGenerateButton] = useState<boolean>(true);
  const { createQuestions, questionsResponse } = useAICreate();
  const [section, setSection] = useState<AiSection>();
  const [disableInputUi, setDisableInputUi] = useState<boolean>(false);
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
  const initNewSection = async () => {
    const newSection = {
      prompt: "",
      sectionMarks: 0,
      questions: []
    }
    setCurrentSections([...currentSections, newSection])
    setCurrentSections([...currentSections, newSection])
    setCurrentSectionIndex(currentSections.length);
  }
  useEffect(() => {
    if (questionsResponse && questionsResponse.data.questions?.length > 0) {
      const retrivedNumberOfQuestions = questionsResponse!.data.questions.length;
      setCurrentNumberOfQuestions(questionsResponse!.data.questions.length);
      setCurrentSectionIndex(0);
      setCurrentQuestionIndex(0);
      const section = {
        prompt: prompt,
        sectionMarks: 0,
        questions: questionsResponse.data.questions
      }
      if (retrivedNumberOfQuestions != numberOfQuestions) {
        setNumberOfQuestions(retrivedNumberOfQuestions);
        toast({
          title: "Unable To generate all questions",
          description: `${retrivedNumberOfQuestions} questions generated`,
          action: (
            <ToastAction altText="ok">Ok</ToastAction>
          )
        });
      }
      else {
        toast({
          title: "Questions Generated",
          description: `${retrivedNumberOfQuestions} questions generated`,
          action: (
            <ToastAction altText="ok">Ok</ToastAction>
          )
        });
      }
      console.log('section:', questionsResponse?.data.questions);
    }

  }, [questionsResponse]);
  useEffect(() => {

    if (numberOfQuestions > 0 && difficultyLevel && prompt && sectionMarks >= 0) {
    }
    else {
      setDisableGenerateButton(true);
    }
  }, [numberOfQuestions, sectionMarks, difficultyLevel, prompt]);

  useEffect(() => {
    if (currentSections.length == 0) {
      setDisableInputUi(true);
    }
    else {
      setDisableInputUi(false);
    }
  }, [currentSections]);



  return (
    <>
      <div className="flex flex-col items-center justify-start h-screen w-screen overflow-hidden">
        <div className="flex w-full h-[60px] border-b items-center justify-center px-5">
          <div className="flex items-center w-full h-full gap-2">
            <button
              disabled={generating}
              onClick={() => router.push('/dashboard')}
              className='text-[10px] border p-2 rounded-xl hover:bg-secondary'>
              <ArrowLeft className='h-4 w-4' />
            </button>
            <h1 className="text-white flex flex-row items-center gap-2">
              Create with AI
              <SparklesIcon className='h-4 w-4' />
            </h1>
          </div>
          <div className="flex w-full py-4">
            <Badge
              variant="outline">
              Section 1
            </Badge>
          </div>
          <Button size="sm" className='text-xs'>
            Create +
          </Button>
        </div>
        <div className="flex flex-col w-full py-4 px-10 gap-2">
          <div className="flex flex-row items-start h-[5rem] gap-2 w-full rounded-2xl">
            <div className="flex w-3/5">
              <Textarea
                disabled={generating || disableInputUi}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Prompt here to generate Questions..."
                className="w-full max-h-[5rem]"
              />
            </div>
            <div className="flex justify-center flex-col w-2/5">
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
                    className="w-full min-w-[4rem] text-[10px] h-9 rounded-sm"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className='w-full text-[10px] h-9'
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
                    disabled={generating || disableInputUi}
                    placeholder="Mark/Question"
                    type="number"
                    className="w-full min-w-[4rem] text-[10px] h-9"
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setSectionMarks(isNaN(value) ? 0 : value);
                    }}
                  />
                  <Button
                    disabled={generating || disableGenerateButton || disableInputUi}
                    onClick={handleGenerateQuestions}
                    className='w-full text-[10px] h-9'>
                    {generating ?
                      <>
                        Generating Questions
                        <SparklesIcon className="h-4 2-4 animate-pulse" />
                      </>
                      : 'Generate Questions'}
                  </Button>
                </div>
                <div className="flex flex-col w-full gap-2 items-baseline">
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col">
            {generating ? (
              <div className="flex flex-grow items-center justify-center overflow-y-scroll scrollbar-none h-[calc(100vh-15rem)] w-full">
                <Loader2 className='h-10 w-10 animate-spin' />
              </div>
            ) : currentSections.length == 0 ? (
              <div className="flex flex-col border-2 border-dashed rounded-xl flex-grow items-center justify-center overflow-y-scroll scrollbar-none h-[calc(100vh-15rem)] w-full">
                <div className="flex h-full w-full flex-col items-center justify-end">
                  Add a new sections by clicking down below the plus [+] icon
                </div>
                <div className="flex mt-1 border-[#e6e6e6] h-full w-[2px] border-l border-dashed ">
                </div>
                <ArrowDown className='h-8 w-8 mb-1' />
              </div>
            ) :
              (
                <div className="grid grid-cols-2 gap-2 overflow-scroll w-full overflow-x-hidden overflow-y-scroll scrollbar-none h-[calc(100vh-15rem)]">
                  {/* {currentSections.map((section, index) => (

                  ))} */}
                </div>
              )
            }
          </div>
          <div className="flex border border-dashed p-1 flex-row rounded-2xl items-center justify-between">
            <div className="flex flex-row gap-2">
              <Button
                disabled={currentSectionIndex === 0 || generating}
                variant={'outline'}>
                <ArrowLeft className='h-4 w-4' />
              </Button>
              {/* <Button
                disabled={currentSectionIndex === 0 || generating}
              >
                <ArrowRight className='h-4 w-4' />
              </Button> */}
            </div>
            <div className="flex flex-row gap-2">
              {currentSections.map((section, index) => (
                <button
                  onClick={() => setCurrentSectionIndex(index)}
                  className={`flex items-center justify-center h-10 w-10 border
                  rounded-sm hover:bg-secondary ${currentSectionIndex === index ? 'bg-secondary' : ''}`} key={index}>
                  {index}
                </button>
              ))}
              <button
                onClick={initNewSection}
                className='flex items-center justify-center h-10 w-10 border rounded-sm hover:bg-secondary'>
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
                } else {
                  setCurrentSectionIndex(0);
                }
              }}
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