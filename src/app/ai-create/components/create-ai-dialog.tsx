"use client";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PlusSquare } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ApiError } from "@/lib/api/apiError";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useAICreate } from "../hooks/useAiCreate";
import useAiAssessmentDetailStore from "@/lib/stores/ai-create/ai-assessment-detail-store";
import StartsAtDateTimePicker from "./starts-at";
import EndsAtDateTimePicker from "./ends-at";
import AssessmentDuration from "./duration";
import useAiCreateStore from "@/lib/stores/ai-create/create-with-ai";
import { AiSection } from "@/lib/types/ai-assessment";

const assessmentSchema = z.object({
  name: z.string().min(0),
  description: z.string().min(0),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;
const CreateAiDialog = () => {
  // all hooks here
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
  });

  const { currentSections, setCurrentSections } = useAiCreateStore();

  const { saveAssessment } = useAICreate();

  // global states here
  const {
    assessmentName,
    assessmentDescription,
    startAt,
    endAt,
    duration,
    setAssessmentName,
    setAssessmentDescription,
  } = useAiAssessmentDetailStore();

  // local states here

  // loading states here
  const [loading, setLoading] = useState<boolean>(false);

  // disable states here
  const [disableCreateAssessment, setDisableCreateAssessment] =
    useState<boolean>(false);

  // local vars here

  // all functions here
  const onSubmit = async () => {
    const transformAllQuestions = (currentSections: AiSection[]) => {
      return currentSections.flatMap((section, sectionIndex) =>
        section.questions.map((question) => ({
          description: question.description,
          marks: section.markPerQuestion,
          section: sectionIndex + 1,
          options: question.options.map((option) => ({
            description: option.description,
            isCorrect: option.isCorrect,
          })),
        }))
      );
    };
    const questions = transformAllQuestions(currentSections);
    const data = {
      name: assessmentName,
      description: assessmentDescription,
      is_active: false,
      start_at: startAt,
      end_at: endAt,
      duration: duration,
      questions: questions,
    };
    try {
      setLoading(true);
      const response: string = await saveAssessment(data);
      toast({
        title: "Success",
        description: "Assessment created successfully",
        action: <ToastAction altText="success">ok</ToastAction>,
      });
      router.push(`/create/${response}`);
      setCurrentSections([]);
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `An error occurred while creating Assessment ${err.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while creating Assessment ${error.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      }
    } finally {
      setLoading(false);
    }
    reset();
  };

  // all event handlers heres

  // all useEffects here
  useEffect(() => {
    const isAssessmentNameTooShort = assessmentName.length > 3;
    const isAssessmentDescriptionTooShort = assessmentDescription.length >= 10;
    if (isAssessmentNameTooShort && isAssessmentDescriptionTooShort) {
      setDisableCreateAssessment(false);
    } else {
      setDisableCreateAssessment(true);
    }
  }, [assessmentName, assessmentDescription]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          disabled={
            !currentSections ||
            currentSections.length === 0 ||
            currentSections.some((section) => section.questions.length < 1)
          }
        >
          <PlusSquare className="h-4 w-4 mr-2" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden overflow-y-scroll scrollbar-none w-[800px] max-h-[calc(100vh-5rem)]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a New Assessment</DialogTitle>
            <DialogDescription>
              Fill in the details for the new assessment.
            </DialogDescription>
            <div className="flex flex-col gap-2 py-4">
              <Label htmlFor="name" className="ml-1">
                Assessment Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g English Assessment"
                {...register("name")}
                onChange={(e) => setAssessmentName(e.target.value)}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              <div className="h-2">{/* spacer */}</div>
              <Label htmlFor="description" className="ml-1">
                Assessment Description
              </Label>
              <Textarea
                id="description"
                placeholder="..."
                {...register("description")}
                onChange={(e) => setAssessmentDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <Card>
              <CardContent className="p-2">
                <StartsAtDateTimePicker />
                <div className="my-2" />
                <EndsAtDateTimePicker />
                <div className="my-2" />
                <AssessmentDuration />
              </CardContent>
            </Card>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full my-4 flex-col md:flex-row justify-between gap-2">
              <div className="flex md:flex-row flex-col gap-2">
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => reset()}>
                    Cancel
                  </Button>
                </DialogClose>
              </div>
              <Button
                disabled={loading || disableCreateAssessment}
                type="submit"
                variant="default"
              >
                <PlusSquare className="h-4 w-4 mr-2" />
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Create Assessment"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAiDialog;
