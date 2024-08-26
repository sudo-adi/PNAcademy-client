import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PlusSquare } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import EndsAtDateTimePicker from '../starts-at';
import StartsAtDateTimePicker from '../ends-at';
import AssessmentDuration from '../duration';
import useCreateAssessmentDetailsStore from '@/lib/stores/manage-assessment-store/assessment-details';
import { useAssessment } from '../../hooks/useAssessment';
import { ApiError } from '@/lib/api/apiError';

const assessmentSchema = z.object({
  name: z.string().min(1, { message: 'Assessment name is required' }),
  description: z.string().min(1, { message: 'Assessment description is required' }),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;
const CreateAssessmentDialog = () => {
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
  const { createAssessmentRes, handleCreateAssessment } = useAssessment();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
  });
  const onSubmit = async (data: AssessmentFormData) => {
    try {
      const data = {
        name: assessmentName,
        description: assessmentDescription,
        is_active: is_active,
        start_at: startAt,
        end_at: endAt,
        duration: duration,
        created_by: createdBy,
      }
      await handleCreateAssessment(data);
      console.log(createAssessmentRes);
    } catch (err) {
      if (err as ApiError) {
        console.error(err);
      }
      else {
        console.error(err);
      }
    }
    reset();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusSquare className='h-4 w-4 mr-2' />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[800px]">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <StartsAtDateTimePicker />
                <div className='my-2' />
                <EndsAtDateTimePicker />
                <div className='my-2' />
                <AssessmentDuration />
              </CardContent>
            </Card>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full my-4 justify-between gap-2">
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => reset()}>Cancel</Button>
                </DialogClose>
                <Button variant="outline" onClick={() => reset()}>Clear Selection</Button>
              </div>
              <Button type="submit" variant="default">
                <PlusSquare className='h-4 w-4 mr-2' />
                Create Assessment
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssessmentDialog;
