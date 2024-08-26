import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BoxSelectIcon, Calendar, CircleDot, CircleDotDashed, CirclePlay, CircleStop, Clock, Copy, Edit, Eye, FileIcon, Link, MousePointer, Wand, Trash, Trash2, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAssessment } from '../../hooks/useAssessment'
import useAssessmentsTableStore from '@/lib/stores/manage-assessment-store/assessments-table'
import { Assessment } from '@/lib/types/assessmentTypes'
import { formatDateInIST } from '@/lib/helpers/time-converter'
import { Badge } from '@/components/ui/badge'
import {
  Cloud,
  CreditCard,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  UserPlus,
  Users,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useStatusIndicator from '../../hooks/useStatusIndicator'
import { copyToClipboard } from '@/lib/helpers/copy-to-clipboard'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'



const AllTabContent = () => {
  const {
    assessment,
    assignedAssessments,
    error,
    loading,
    createAssessmentRes,
    fetchAssessmentsRes,
    removeAssessmentRes,
    addAssessmentToGroupRes,
    removeAssessmentFromGroupRes,
    updateAssessmentRes,
    addAssessment,
    fetchAssessmentById,
    fetchAssessments,
    patchAssessment,
    removeAssessment,
    addAssessmentToGroup,
    fetchAssignedAssessments,
    removeAssessmentFromGroup, } = useAssessment();
  const { activePageIndex, displayNumberOfRows, sortBy, order, setOrder, setSortBy, setActivePageIndex, setDisplayNumberOfRows } = useAssessmentsTableStore();
  const [selectedAssessments, setSelectedAssessments] = useState<Set<string>>(new Set());
  const assessmentList: Assessment[] = (fetchAssessmentsRes?.data.assesments as Assessment[]) ?? [];
  const allAssessments: Assessment[] = assessmentList.filter(assessment => assessment.is_active === true);
  const allSelected: boolean = assessmentList.length > 0 && selectedAssessments.size === assessmentList.length;


  useEffect(() => {
    fetchAssessments({ page: 1, pageSize: 9999, sortBy, order });
  }, [sortBy, order]);

  const refreshAssessments = () => {
    fetchAssessments({ page: 1, pageSize: 9999, sortBy, order });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAssessments(new Set(assessmentList.map(assessment => assessment.id)));
    } else {
      setSelectedAssessments(new Set());
    }
  };

  const handleSelectAssessment = (userId: string, checked: boolean) => {
    const updatedSelectedUsers = new Set(selectedAssessments);
    if (checked) {
      updatedSelectedUsers.add(userId);
    } else {
      updatedSelectedUsers.delete(userId);
    }
    setSelectedAssessments(updatedSelectedUsers);
  };

  const toggleSorting = (field: keyof Assessment) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setOrder('ASC');
    }
  };
  return (
    <>
      <Card className='my-2 max-h-[calc(100vh-18rem)] w-full flex flex-col scrollbar-thin'>
        <Table>
          <TableHeader >
            <Schema
              toggleSorting={toggleSorting}
              sortBy={sortBy}
              order={order}
              onSelectAll={handleSelectAll}
              allSelected={allSelected} />
          </TableHeader>
          <TableBody>
            {allAssessments.map(assessment => (
              <Row
                key={assessment.id}
                assessment={assessment}
                selected={selectedAssessments.has(assessment.id)}
                onSelectAssessment={handleSelectAssessment}
                refreshAssessments={refreshAssessments}
                loading={loading}
              />
            ))}
          </TableBody>
        </Table>
      </Card >
      <div className="flex h-[calc(4rem-6px)] items-center justify-between gap-2">
        <Label className='text-[10px]'>
          Showing <strong>{allAssessments.length}</strong>{" "}Assessments
        </Label>
        {/* <div className="flex gap-2">
          <Button variant="outline">
            Previous
          </Button>
          <Button onClick={
            () => setActivePageIndex(activePageIndex + 1)
          }>
            Next
          </Button>
        </div> */}
      </div>
    </>
  )
}


interface SchemaProps {
  toggleSorting: (field: keyof Assessment) => void;
  sortBy: keyof Assessment;
  order: "ASC" | "DESC";
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}
const Schema: React.FC<SchemaProps> = ({ toggleSorting, sortBy, order, allSelected, onSelectAll, }) => {

  return (
    <TableRow>
      <TableHead className="hidden sm:table-cell">
        <div className="flex w-4 items-center gap-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => onSelectAll(checked as boolean)} />
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting('name')} className='w-[270px]'>
        <div className="flex gap-2 text-[10px] items-center cursor-pointer">
          <User className="h-4 w-4" />
          Assessment Name {sortBy === 'name' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting('start_at')}>
        <div className="flex gap-2 text-[10px] items-center cursor-pointer">
          <User className="h-4 w-4" />
          Started at {sortBy === 'start_at' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting('end_at')}>
        <div className="flex gap-2 text-[10px] items-center cursor-pointer">
          <User className="h-4 w-4" />
          Ended at {sortBy === 'end_at' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting('createdAt')}>
        <div className="gap-2 text-[10px] items-center cursor-pointer flex">
          <User className="h-4 w-4" />
          <div className="inline-block">
            Created at {sortBy === 'createdAt' && (order === 'ASC' ? '↓' : '↑')}
          </div>
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting('updatedAt')}>
        <div className="flex gap-2 text-[10px] items-center cursor-pointer">
          <User className="h-4 w-4" />
          Updated at {sortBy === 'updatedAt' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead className="md:table-cell">
        <div className="flex text-[10px] flex-row gap-2 items-center">
          <CircleDotDashed className='h-4 w-4' />
          Status
        </div>
      </TableHead>
      <TableHead className="md:table-cell ">
        <div className="flex text-[10px] flex-row items-center justify-start">
          <Wand className='mr-2 h-4 w-4' />
          Actions
        </div>
      </TableHead>
    </TableRow>
  );
};


interface RowProps {
  assessment: Assessment;
  selected: boolean;
  onSelectAssessment: (assessmentId: string, checked: boolean) => void;
  refreshAssessments: () => void;
  loading: boolean;
}


// Single table row
const Row: React.FC<RowProps> = ({ assessment, selected, onSelectAssessment, refreshAssessments, loading }) => {
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => copyToClipboard(assessment.id)}>
                    <Badge variant={'outline'} className='text-[8px]'>
                      {assessment.id}
                    </Badge>
                  </button>
                </TooltipTrigger>
                <TooltipContent className='text-[10px]'>
                  <p>Copy Assessment Id to Clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                <span>View</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link className="mr-2 h-4 w-4" />
                <span>Copy Link</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>

    </TableRow >
  );
};

export default AllTabContent