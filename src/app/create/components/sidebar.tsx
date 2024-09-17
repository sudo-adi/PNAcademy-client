"use client"
import React, { useEffect, useState } from 'react'
import SubHeader from './sub-header'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '@/components/ui/textarea'
import { useAssessment } from '@/app/dashboard/views/manage-assessment/hooks/useAssessment'
import { Loader2 } from 'lucide-react'
import { UpdateAssessmentProps } from '@/lib/types/assessmentTypes'
import { Card, CardContent } from '@/components/ui/card'
import SideBarStartAtDateTimePicker from './sidebar-start-at'
import SideBarEndsAtDateTimePicker from './sidebar-end-at'
import SideBarAssessmentDuration from './sidebar-duration'
import AssignedGroupsCard from './assign-groups'

interface FormInputProps {
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onBlur?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, placeholder, onChange, value, onBlur }) => (
  <div>
    <Label className='p-2'>
      {label}
    </Label>
    <Input placeholder={placeholder} onChange={onChange} value={value} onBlur={onBlur} className='text-xs' />
  </div>
)



interface FormTextareaProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ label, placeholder, onChange, value, onBlur }) => (
  <div>
    <Label className='p-2'>
      {label}
    </Label>
    <Textarea placeholder={placeholder} onChange={onChange} value={value} onBlur={onBlur} className='text-xs max-h-[10rem]' />
  </div>
)

interface SideBarProps {
  assessmentId: string
}
const SideBar: React.FC<SideBarProps> = ({ assessmentId }) => {
  const [assessmentName, setAssessmentName] = useState('');
  const [assessmentDescription, setAssessmentDescription] = useState<string>('');
  const [startsAt, setStartsAt] = useState<string>('');
  const [endsAt, setEndsAt] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { assessment, fetchAssessmentById, patchAssessment } = useAssessment();
  useEffect(() => {
    const fetchAndSetAssessment = async () => {
      try {
        setLoading(true);
        await fetchAssessmentById({ id: assessmentId });
      } catch (error) {
        console.error('Failed to fetch assessment data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (assessmentId) {
      fetchAndSetAssessment();
    }
  }, [assessmentId]);

  useEffect(() => {
    const initializeSideBar = () => {
      if (assessment) {
        setAssessmentName(assessment.name);
        setAssessmentDescription(assessment.description);
        setStartsAt(assessment.start_at);
        setEndsAt(assessment.end_at);
        setDuration(assessment.duration);
        setIsActive(assessment.is_active);
      }
    }
    initializeSideBar();
  }, [assessment]);

  const handleBlur = () => {
    if (assessment) {
      const data: UpdateAssessmentProps = {
        id: assessment.id,
        name: assessmentName,
        description: assessmentDescription,
        is_active: isActive,
        start_at: startsAt,
        end_at: endsAt,
        duration: duration,
      };

      const updateAndSetAssessment = async () => {
        try {
          await patchAssessment(data);
        } catch (err) {
          console.error('Failed to update assessment:', err);
        }
      };
      updateAndSetAssessment();
    }
  };

  return (
    <div className="flex h-[100vh] flex-col gap-2 border-l w-full overflow-hidden ">
      {loading ?
        (<div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin" />
        </div>)
        :
        (<>
          <div className="flex h-[calc(100vh)] flex-col gap-4 p-4 w-full text-xs overflow-y-scroll scrollbar-none">
            <FormInput
              label="Assessment Name:"
              placeholder="Enter assessment name"
              onChange={(e) => setAssessmentName(e.target.value)}
              onBlur={handleBlur}
              value={assessmentName}
            />
            <FormTextarea
              label="Assessment Description:"
              placeholder="Enter assessment description"
              onChange={(e) => setAssessmentDescription(e.target.value)}
              onBlur={handleBlur}
              value={assessmentDescription}
            />
            <div className="flex w-full">
              <Card className='w-full'>
                <CardContent className='p-2'>
                  <SideBarStartAtDateTimePicker
                    assessment={assessment!}
                    patchAssessment={patchAssessment}
                  />
                  <div className='my-2' />
                  <SideBarEndsAtDateTimePicker assessment={assessment!}
                    patchAssessment={patchAssessment}
                  />
                  <div className='my-2' />
                  <SideBarAssessmentDuration />
                </CardContent>
              </Card>
            </div>
            <AssignedGroupsCard assessmentId={assessmentId} />
          </div>
          <div className="items-center">
            <SubHeader />
          </div>
        </>)}
    </div>
  );
};

export default SideBar;
