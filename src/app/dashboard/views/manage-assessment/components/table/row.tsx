import useStatusIndicator from "@/app/hooks/global hooks/useStatusIndicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { copyToClipboard } from "@/lib/helpers/copy-to-clipboard";
import { formatDateInIST } from "@/lib/helpers/time-converter";
import { Assessment } from "@/lib/types/assessmentTypes";
import { CircleDot, Edit, Eye, Link, Trash2, Wand } from "lucide-react";


interface RowProps {
  assessment: Assessment;
  selected: boolean;
  loading: boolean;
  onSelectAssessment: (assessmentId: string, checked: boolean) => void;
  refreshAssessments: () => void;
}

// Single table row
const Row: React.FC<RowProps> = ({ assessment, selected, onSelectAssessment, loading }) => {

  // all hooks here
  const handleCopyAssessmentID = (assessmentId: string, assessmentName: string) => {
    copyToClipboard(assessmentId);
    toast({
      title: `Assessment Id of ${assessmentName}, Copied to Clipboard`,
      description: "id: " + assessmentId,
      action: (
        <ToastAction altText="success">Ok</ToastAction>
      ),
    })
  }

  // local vars here
  const isLive = assessment.start_at && assessment.end_at && new Date(assessment.start_at) < new Date() && new Date(assessment.end_at) > new Date();

  // all event handlers here
  const handleViewAssessmentById = (assessmentId: string) => {

  }

  const handleCopyAssessmentLink = (assessmentId: string) => {
    copyToClipboard(window.location.origin + "/assessment/" + assessmentId);
    toast({
      title: `Assessment Link Copied to Clipboard`,
      description: window.location.origin + "/assessment/" + assessmentId,
      action: (
        <ToastAction altText="success">Ok</ToastAction>
      ),
    })
  }

  const handleEditAssessment = (assessmentId: string) => {

  }

  const handleDeleteAssessment = (assessmentId: string) => {

  }

  const statusColor = useStatusIndicator(assessment);
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onSelectAssessment(assessment.id, checked as boolean)}
        />
      </TableCell>
      <TableCell className="font-medium text-left">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 text-xs items-center">
            {loading ? (<Skeleton className="w-32 h-4" />) : assessment.name}
          </div>
          <div className="flex">
            <button className='hidden lg:flex px-2 py-1 rounded-sm border-2 border-dashed gap-2 text-[8px] italic hover:bg-muted' onClick={() => handleCopyAssessmentID(assessment.id, assessment.name)}>
              {loading ? (<Skeleton className="w-32 h-4" />) : assessment.id}
            </button>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={'outline'} className='text-[10px] text-center'>
          {loading ? <Skeleton className="w-32 h-4" /> : formatDateInIST(assessment.start_at)
          }
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={'outline'} className='text-[10px] text-center'>
          {loading ? <Skeleton className="w-32 h-4" /> : formatDateInIST(assessment.end_at)}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={'outline'} className='text-[10px] text-center'>
          {loading ? <Skeleton className="w-32 h-4" /> : formatDateInIST(assessment.createdAt)}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={'outline'} className='text-[10px] text-center'>
          {loading ? <Skeleton className="w-32 h-4" /> : formatDateInIST(assessment.updatedAt)}
        </Badge>
      </TableCell>
      <TableCell>
        <Button variant="ghost" className='hover:bg-transparent text-[10px] text-center'>
          <CircleDot className={`h-4 w-4 ${statusColor}`} />
        </Button>
      </TableCell>
      <TableCell>
        <div className="flex flex-row gap-2 h-full items-center justify-start text-[10px] text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className='bg-transparent'>
                <Wand className='w-4 h-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16">
              <DropdownMenuItem onClick={() => handleViewAssessmentById(assessment.id)}>
                <Eye className="mr-2 h-4 w-4" />
                <span>View</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleCopyAssessmentLink(assessment.id)}>
                <Link className="mr-2 h-4 w-4" />
                <span>Copy Link</span>
              </DropdownMenuItem>
              {!isLive &&
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleEditAssessment(assessment.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                </>
              }
              {
                !isLive &&
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDeleteAssessment(assessment.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </>
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow >
  );
};


export default Row;