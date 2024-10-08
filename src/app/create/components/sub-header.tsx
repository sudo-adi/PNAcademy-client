import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { Assessment, UpdateAssessmentProps } from '@/lib/types/assessmentTypes'
import { Loader, Radio, Timer, Upload } from 'lucide-react'
import React, { useState } from 'react'

interface SubHeaderProps {
  assessment: Assessment;
  patchAssessment: (data: UpdateAssessmentProps) => Promise<Assessment>;
}

const SubHeader: React.FC<SubHeaderProps> = ({ patchAssessment, assessment }) => {

  // local states here
  const [drafting, setDrafting] = useState<boolean>(false);
  const [publishing, setPublishing] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(assessment.is_active);

  // handlers here
  const handleDraft = async () => {
    try {
      setDrafting(true);
      const data: UpdateAssessmentProps = {
        ...assessment,
        is_active: false,
      };
      await patchAssessment(data);
      toast({
        title: "Success",
        description: "Drafted Successfully",
        action: <ToastAction altText="success">ok</ToastAction>,
      });
      setIsPublished(false);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to Draft",
        action: <ToastAction altText="error">ok</ToastAction>,
      });
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
      toast({
        title: "Success",
        description: `${isPublished ? "Updated" : "Published"} Successfully`,
        action: <ToastAction altText="success">ok</ToastAction>,
      });
      setIsPublished(true);
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to Publish",
        action: <ToastAction altText="error">ok</ToastAction>,
      });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="flex flex-row justify-evenly gap-2 h-14 items-center border-t border px-4 lg:h-[60px] lg:px-6">
      <Button variant={isPublished ? "default" : "secondary"} className="w-full" onClick={handleDraft}>
        {drafting ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Timer className="h-4 w-4 mr-2" />}
        Draft
      </Button>
      <Button className="w-full"
        onClick={handlePublish}
        variant={isPublished ? "secondary" : "default"}
      >
        {isPublished ?
          <>
            {publishing ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
            Update
          </> :
          <>
            {publishing ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Radio className="h-4 w-4 mr-2" />}
            Publish
          </>
        }
      </Button>
    </div>
  )
}

export default SubHeader