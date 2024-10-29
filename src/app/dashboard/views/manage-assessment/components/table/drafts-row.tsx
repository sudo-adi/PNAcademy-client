import useStatusIndicator from "@/app/hooks/global hooks/useStatusIndicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { copyToClipboard } from "@/lib/helpers/copy-to-clipboard";
import { formatDateInIST } from "@/lib/helpers/time-converter";
import { Assessment } from "@/lib/types/assessmentTypes";
import { ArchiveX, Edit, Eye, Trash2Icon, Wand } from "lucide-react";
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

interface RowProps {
  assessment: Assessment;
  selected: boolean;
  onSelectAssessment: (assessmentId: string, checked: boolean) => void;
  refreshAssessments: () => void;
  loading: boolean;
}

// Single table row
const Row: React.FC<RowProps> = ({
  assessment,
  selected,
  onSelectAssessment,
  loading,
  refreshAssessments,
}) => {
  // all hooks here
  const router = useRouter();
  const { removeAssessment } = useAssessment();

  // all event handlers here
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
    }
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) =>
            onSelectAssessment(assessment.id, checked as boolean)
          }
        />
      </TableCell>
      <TableCell className="font-medium text-left">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 text-xs items-center">
            {loading ? <Skeleton className="w-32 h-4" /> : assessment.name}
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={"outline"} className="text-[8px] text-center">
          {loading ? <Skeleton className="w-32 h-4" /> : assessment.id}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={"outline"} className="text-[10px] text-center">
          {loading ? (
            <Skeleton className="w-32 h-4" />
          ) : (
            formatDateInIST(assessment.createdAt)
          )}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={"outline"} className="text-[10px] text-center">
          {loading ? (
            <Skeleton className="w-32 h-4" />
          ) : (
            formatDateInIST(assessment.updatedAt)
          )}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="lg:hidden flex flex-row gap-2 h-full items-center justify-start text-[10px] text-center">
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
                onClick={() => handleEditAssessment(assessment.id)}
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <ArchiveX className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Item</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. Are you sure you want to
                      delete this item?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      variant="destructive"
                      onClick={() => handleDeleteAssessment(assessment.id)}
                    >
                      <Trash2Icon className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => handleViewAssessmentById(assessment.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => handleEditAssessment(assessment.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-transparent">
                <ArchiveX className=" h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Delete assessment "{assessment?.name}"
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Are you sure you want to delete
                  this assessment?
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
                  variant={"destructive"}
                  onClick={() => handleDeleteAssessment(assessment.id)}
                >
                  <ArchiveX className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Row;
