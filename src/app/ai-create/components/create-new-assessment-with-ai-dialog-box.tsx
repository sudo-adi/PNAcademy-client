"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React, { use, useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, PlusSquare } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useCreateAssessmentDetailsStore from '@/lib/stores/manage-assessment-store/assessment-details';
import { ApiError } from '@/lib/api/apiError';
import { useRouter } from 'next/navigation';
import { useAssessment } from '@/app/dashboard/views/manage-assessment/hooks/useAssessment';
import StartsAtDateTimePicker from '@/app/dashboard/views/manage-assessment/components/starts-at';
import EndsAtDateTimePicker from '@/app/dashboard/views/manage-assessment/components/ends-at';
import AssessmentDuration from '@/app/dashboard/views/manage-assessment/components/duration';
import useAiCreateStore from '@/lib/stores/ai-create/create-with-ai';
import { CreateQuestionProps } from '@/lib/types/questionTypes';
import { AiOption, AiQuestion, AiSection } from '@/lib/types/ai-assessment';
import { useQuestions } from '@/app/dashboard/views/manage-assessment/hooks/useQuestion';
import { useOptions } from '@/app/dashboard/views/manage-assessment/hooks/useOption';


const assessmentSchema = z.object({
  name: z.string().min(1, { message: 'Assessment name is required' }),
  description: z.string().min(1, { message: 'Assessment description is required' }),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;

const CreateNewAssessmentWithAiDialogBox = () => {
  const { currentSections } = useAiCreateStore();
  const router = useRouter();
  const {
    assessmentName,
    assessmentDescription,
    is_active,
    createdBy,
    startAt,
    endAt,
    duration,
    setCreatedBy,
    setAssessmentName,
    setAssessmentDescription,
    setIsActive } = useCreateAssessmentDetailsStore();

  const {
    addQuestion,
    patchQuestion,
    removeQuestion,
  } = useQuestions();

  const {
    addOption,
    patchOption,
    removeOptionById,
  } = useOptions();

  const { createAssessmentRes, addAssessment } = useAssessment();
  const [loading, setLoading] = useState<boolean>(false);
  const [disableCreateAssessment, setDisableCreateAssessment] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
  });




  const addContentToAssessment = async () => {
    try {
      setLoading(true);
      currentSections.forEach(async (section: AiSection, index) => {
        const sectionId = index + 1;
        console.log(sectionId);
        section.questions.forEach(async (question: AiQuestion) => {
          const data: CreateQuestionProps = {
            assessment_id: "89fb0b42-fbae-4272-bbf6-8aefaa814344",
            section: sectionId,
            description: question.description,
            marks: section.sectionMarks,
          }
          const res = await addQuestion(data);

          console.log(`question ${index} ${res}`);

          const newQuestionId = res?.data?.id;
          if (!newQuestionId) {
            throw new Error("Failed to initialize question: Missing question ID");
          }
          question.options.forEach(async (option: AiOption) => {
            const data = {
              question_id: newQuestionId,
              description: option.description,
              is_correct: option.isCorrect,
            }
            const optionres = await addOption(data);
            console.log(optionres);

          }
          )
        })
      })
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(true);
    }
  }






  const onSubmit = async (data: AssessmentFormData) => {
    try {
      setLoading(true);
      const data = {
        name: assessmentName,
        description: assessmentDescription,
        is_active: is_active,
        start_at: startAt,
        end_at: endAt,
        duration: duration,
        created_by: createdBy,
      }
      const response = await addAssessment(data);
    } catch (err) {
      if (err as ApiError) {
        console.error(err);
      }
      else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
    reset();
  };

  useEffect(() => {
    if (assessmentName.length < 3 || assessmentDescription.length < 3) {
      setDisableCreateAssessment(true);
    }
    else {
      setDisableCreateAssessment(false);
    }
  });

  useEffect(() => {
    if (createAssessmentRes != undefined && createAssessmentRes != null) {
      router.push(`/create/${createAssessmentRes.id}`);
    }
  }, [createAssessmentRes]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusSquare className='h-4 w-4 mr-2' />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden overflow-y-scroll scrollbar-none w-[800px] max-h-[calc(100vh-5rem)]">
        <form onSubmit={handleSubmit(addContentToAssessment)}>
          <DialogHeader>
            <DialogTitle>Create a New Assessment</DialogTitle>
            <DialogDescription>
              Fill in the details for the new assessment.
            </DialogDescription>
            <div className="flex flex-col gap-2 py-4">
              <Label htmlFor='name' className='ml-1'>Assessment Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g English Assessment"
                {...register('name')}
                onChange={(e) => setAssessmentName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              <div className='h-2'>
                {/* spacer */}
              </div>
              <Label htmlFor='description' className='ml-1'>Assessment Description</Label>
              <Textarea
                id="description"
                placeholder="..."
                {...register('description')}
                onChange={(e) => setAssessmentDescription(e.target.value)}

              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <Card>
              <CardContent className='p-2'>
                <AssessmentDuration />
                <div className='my-2' />
                <StartsAtDateTimePicker />
                <div className='my-2' />
                <EndsAtDateTimePicker />
              </CardContent>
            </Card>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full my-4 flex-col md:flex-row justify-between gap-2">
              <div className="flex md:flex-row flex-col gap-2">
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => reset()}>Cancel</Button>
                </DialogClose>
                <Button variant="outline" onClick={() => reset()}>Clear Selection</Button>
              </div>
              <Button
                disabled={loading || disableCreateAssessment}
                type="submit"
                variant="default">
                <PlusSquare className='h-4 w-4 mr-2' />
                {loading ?
                  <Loader2 className='h-4 w-4 animate-spin' /> : 'Create Assessment'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewAssessmentWithAiDialogBox