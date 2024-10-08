import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateInIST } from "@/lib/helpers/time-converter";
import { Assessment } from "@/lib/types/assessmentTypes";
import { ArchiveX, Edit, Eye, SquareArrowUpLeft, Wand } from "lucide-react";

interface RowProps {
  assessment: Assessment;
  selected: boolean;
  onSelectAssessment: (assessmentId: string, checked: boolean) => void;
  refreshAssessments: () => void;
  loading: boolean;
}


// Single table row
const Row: React.FC<RowProps> = ({ assessment, selected, onSelectAssessment, refreshAssessments, loading }) => {



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
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={'outline'} className='text-[8px] text-center'>
          {loading ? <Skeleton className="w-32 h-4" /> : assessment.id}
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
        <div className="lg:hidden flex flex-row gap-2 h-full items-center justify-start text-[10px] text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className='bg-transparent'>
                <Wand className='w-4 h-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                <span>View</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ArchiveX className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="outline" className='bg-transparent'>
            <Eye className='h-4 w-4' />
          </Button>
          <Button variant="outline" className='bg-transparent'>
            <Edit className='h-4 w-4' />
          </Button>
          <Button variant="outline" className='bg-transparent'>
            <ArchiveX className='h-4 w-4' />
          </Button>
          {/* <Button variant="outline" className='bg-transparent'>
            <SquareArrowUpLeft className='h-4 w-4' />
          </Button> */}
        </div>
      </TableCell>

    </TableRow>
  );
};


export default Row;