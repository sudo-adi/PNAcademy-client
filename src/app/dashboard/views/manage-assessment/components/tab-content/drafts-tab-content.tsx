import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BoxSelectIcon, Calendar, CircleDot, CircleDotDashed, CirclePlay, CircleStop, Clock, Copy, Edit, Eye, FileIcon, Link, MousePointer, Wand, Trash, Trash2, User, Timer, ArchiveX, SquareArrowUpLeft } from 'lucide-react'
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

const DraftsTabContent = () => {
  const {
    assessment,
    assignedAssessments,
    assessmentLoading,
    createAssessmentRes,
    fetchAssessmentsRes,
    removeAssessmentRes,
    addAssessmentToGroupRes,
    removeAssessmentFromGroupRes,
    addAssessment,
    fetchAssessmentById,
    fetchAssessments,
    patchAssessment,
    removeAssessment,
    fetchAssignedAssessments,
    removeAssessmentFromGroup, } = useAssessment();
  const { activePageIndex, displayNumberOfRows, sortBy, order, setOrder, setSortBy } = useAssessmentsTableStore();
  const [selectedAssessments, setSelectedAssessments] = useState<Set<string>>(new Set());
  const assessmentList: Assessment[] = (fetchAssessmentsRes?.data.assesments as Assessment[]) ?? [];
  const allSelected: boolean = assessmentList.length > 0 && selectedAssessments.size === assessmentList.length;
  const draftedAssessments: Assessment[] = assessmentList.filter(assessment => assessment.is_active === false);


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
      <Card className='my-2 h-[calc(100vh-18rem)] w-full flex flex-col'>
        <div className="relative flex-grow overflow-hidden">
          <div className="absolute inset-0 overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-background z-10">
                <Schema
                  toggleSorting={toggleSorting}
                  sortBy={sortBy}
                  order={order}
                  onSelectAll={handleSelectAll}
                  allSelected={allSelected}
                />
              </thead>
              <tbody>
                {draftedAssessments.map(assessment => (
                  <Row
                    key={assessment.id}
                    assessment={assessment}
                    selected={selectedAssessments.has(assessment.id)}
                    onSelectAssessment={handleSelectAssessment}
                    refreshAssessments={refreshAssessments}
                    loading={assessmentLoading}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <div className="flex h-[calc(4rem-6px)] items-center justify-between gap-2">
        <Label className='text-[10px]'>
          Showing {draftedAssessments.length} Assessments
        </Label>
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
    <TableRow className='bg-'>
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
      <TableHead onClick={() => toggleSorting('id')} className='w-[270px]'>
        <div className="flex gap-2 text-[10px] items-center cursor-pointer">
          <User className="h-4 w-4" />
          Assessment Id {sortBy === 'id' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting('createdAt')}>
        <div className="flex gap-2 text-[10px] w-[100px] items-center cursor-pointer">
          <Timer className="h-4 w-4" />
          Cretated at {sortBy === 'createdAt' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting('updatedAt')}>
        <div className="flex gap-2 text-[10px] w-[100px] items-center cursor-pointer">
          <Timer className="h-4 w-4" />
          Last Drafted {sortBy === 'updatedAt' && (order === 'ASC' ? '↓' : '↑')}
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
          <Button variant="outline" className='bg-transparent'>
            <SquareArrowUpLeft className='h-4 w-4' />
          </Button>
        </div>
      </TableCell>

    </TableRow>
  );
};

export default DraftsTabContent