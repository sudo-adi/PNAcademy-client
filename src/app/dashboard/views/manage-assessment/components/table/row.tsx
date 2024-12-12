import useStatusIndicator from "@/app/hooks/global hooks/useStatusIndicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { copyToClipboard } from "@/lib/helpers/copy-to-clipboard";
import { formatDateInIST } from "@/lib/helpers/time-converter";
import { Assessment } from "@/lib/types/assessmentTypes";
import {
  CircleDot,
  Edit,
  Eye,
  Link,
  Loader,
  Trash2,
  Trash2Icon,
  Wand,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAssessment } from "../../hooks/useAssessment";
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
import { useState, useEffect } from "react";

interface RowProps {
  assessment: Assessment;
  selected: boolean;
  loading: boolean;
  onSelectAssessment: (assessmentId: string, checked: boolean) => void;
  refreshAssessments: () => void;
}

const Row: React.FC<RowProps> = ({
  assessment,
  selected,
  onSelectAssessment,
  loading,
  refreshAssessments,
}) => {
  const [isDleting, setIsDeleting] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState<NodeJS.Timeout | null>(null);
  const { removeAssessment } = useAssessment();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        toast({
          title: "Loading Assessments",
          description:
            "This is taking longer than usual. Please check your network connection.",
          duration: 3000,
          action: <ToastAction altText="loading">Ok</ToastAction>,
        });
      }, 3000);
      setLoadingTimer(timer);
    } else {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
      }
    }
    return () => {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
      }
    };
  }, [loading]);

  const handleCopyAssessmentID = (
    assessmentId: string,
    assessmentName: string
  ) => {
    copyToClipboard(assessmentId);
    toast({
      title: `Assessment Id of ${assessmentName}, Copied to Clipboard`,
      description: "id: " + assessmentId,
      action: <ToastAction altText="success">Ok</ToastAction>,
    });
  };

  const isLive =
    assessment.start_at &&
    assessment.end_at &&
    new Date(assessment.start_at) < new Date() &&
    new Date(assessment.end_at) > new Date();

  const handleViewAssessmentById = (assessmentId: string) => {
    router.push("/view-assessment/" + assessmentId);
  };

  const handleCopyAssessmentLink = (assessmentId: string) => {
    copyToClipboard(window.location.origin + "/assessment/" + assessmentId);
    toast({
      title: `Assessment Link Copied to Clipboard`,
      description: window.location.origin + "/assessment/" + assessmentId,
      action: <ToastAction altText="success">Ok</ToastAction>,
    });
  };

  const handleEditAssessment = (assessmentId: string) => {
    router.push("/create/" + assessmentId);
  };

  const handleDeleteAssessment = async (assessmentId: string) => {
    try {
      setIsDeleting(true);
      const response = await removeAssessment({ id: assessmentId });
      if (response) {
        toast({
          title: "Assessment Deleted Successfully",
          description: "Assessment has been deleted successfully",
          action: <ToastAction altText="success">Ok</ToastAction>,
        });
      } else {
        toast({
          title: "Failed to delete assessment",
          description: "Failed to delete assessment",
          action: <ToastAction altText="error">Ok</ToastAction>,
        });
      }
    } catch (err) {
      toast({
        title: "Failed to delete assessment",
        description: "Failed to delete assessment",
        action: <ToastAction altText="error">Ok</ToastAction>,
      });
    } finally {
      refreshAssessments();
      setIsDeleting(false);
    }
  };

  const statusColor = useStatusIndicator(assessment);

  if (loading) {
    return null; // Don't render anything while loading
  }

  return (
    <TableRow>
      <TableCell className="font-medium text-left">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 text-xs items-center">
            <p className="line-clamp-2">{assessment.name}</p>
          </div>
          <div className="flex">
            <button
              className="hidden bg-secondary hover:bg-transparent lg:flex px-2 py-1 rounded-sm border-2 border-dashed gap-2 text-[8px] italic"
              onClick={() =>
                handleCopyAssessmentID(assessment.id, assessment.name)
              }
            >
              {assessment.id}
            </button>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="ghost" className="text-[10px] text-center">
          {formatDateInIST(assessment.start_at)}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="ghost" className="text-[10px] text-center">
          {formatDateInIST(assessment.end_at)}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="ghost" className="text-[10px] text-center">
          {formatDateInIST(assessment.createdAt)}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="ghost" className="text-[10px] text-center">
          {formatDateInIST(assessment.updatedAt)}
        </Badge>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          className="hover:bg-transparent text-[10px] text-center"
        >
          <CircleDot className={`h-4 w-4 ${statusColor}`} />
        </Button>
      </TableCell>
      <TableCell>
        <div className="flex flex-row gap-2 h-full items-center justify-start text-[10px] text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent">
                <Wand className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16">
              <DropdownMenuItem
                onClick={() => handleViewAssessmentById(assessment.id)}
              >
                <Eye className="mr-2 h-4 w-4" />
                <span>View</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleCopyAssessmentLink(assessment.id)}
              >
                <Link className="mr-2 h-4 w-4" />
                <span>Copy Link</span>
              </DropdownMenuItem>
              {!isLive && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleEditAssessment(assessment.id)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                </>
              )}
              {!isLive && (
                <>
                  <DropdownMenuSeparator />
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Trash2Icon className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          Delete assessment "{assessment?.name}"
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. Are you sure you want to
                          delete this assessment?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          variant="destructive"
                          disabled={isDleting}
                          onClick={() => handleDeleteAssessment(assessment.id)}
                        >
                          {isDleting ? (
                            <Loader className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Trash2Icon className="h-4 w-4 mr-2" />
                              Delete
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Row;
