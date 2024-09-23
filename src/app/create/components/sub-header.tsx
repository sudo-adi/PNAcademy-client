import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { GetAssessmentByIdData, UpdateAssessmentProps } from '@/lib/types/assessmentTypes'
import { Loader, Timer, Upload } from 'lucide-react'
import React from 'react'

interface SubHeaderProps {
  assessment: GetAssessmentByIdData;
  patchAssessment: (data: UpdateAssessmentProps) => Promise<void>;
}

const SubHeader: React.FC<SubHeaderProps> = ({ patchAssessment, assessment }) => {
  const [drafting, setDrafting] = React.useState<boolean>(false);
  const [publishing, setPublishing] = React.useState<boolean>(false);
  const handleDraft = async () => {
    try {
      setDrafting(true);
      const data: UpdateAssessmentProps = {
        ...assessment,
        is_active: false,
      };
      await patchAssessment(data);
    } catch (e) {
      console.error(e);
    } finally {
      setDrafting(false);
    }
  };
  const handlePublish = async () => {
    try {
      setPublishing(true);
      const data: UpdateAssessmentProps = {
        ...assessment,
        is_active: true,
      };
      await patchAssessment(data);
    } catch (e) {
      console.error(e);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="flex flex-row justify-evenly gap-2 h-14 items-center border-t border px-4 lg:h-[60px] lg:px-6">
      <Button variant="secondary" className="w-full" onClick={handleDraft}>
        {drafting ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Timer className="h-4 w-4 mr-2" />}
        Draft
      </Button>
      <Button className="w-full"
        onClick={handlePublish}
      >
        {publishing ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
        Publish
      </Button>
    </div>
  )
}

export default SubHeader