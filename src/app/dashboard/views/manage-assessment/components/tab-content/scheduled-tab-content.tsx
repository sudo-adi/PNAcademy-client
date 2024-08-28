import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BoxSelectIcon, Calendar, CircleDot, CircleDotDashed, CirclePlay, CircleStop, Clock, Copy, Edit, Eye, FileIcon, Link, MousePointer2, Trash, Trash2, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAssessment } from '../../hooks/useAssessment'
import useAssessmentsTableStore from '@/lib/stores/manage-assessment-store/assessments-table'
import { Assessment } from '@/lib/types/assessmentTypes'
import { formatDateInIST } from '@/lib/helpers/time-converter'
import { Badge } from '@/components/ui/badge'
import useStatusIndicator from '../../hooks/useStatusIndicator'

const ScheduledTabContent = () => {
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
  const assessmentList = (fetchAssessmentsRes?.data.assesments as any[]) ?? [];
  const allSelected = assessmentList.length > 0 && selectedAssessments.size === assessmentList.length;
  const scheduledAssessmentsList = assessmentList.filter(assessment => { return (new Date(assessment.start_at) > new Date()) && (assessment.is_active) });


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
      <Card className='my-2 max-h-[calc(100vh-18rem)] w-full flex flex-col'>
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
            {scheduledAssessmentsList.map(assessment => (
              <Row
                key={assessment.id}
                assessment={assessment}
                selected={selectedAssessments.has(assessment.id)}
                onSelectAssessment={handleSelectAssessment}
                refreshAssessments={refreshAssessments}
                loading={assessmentLoading}
              />
            ))}
          </TableBody>
        </Table>
      </Card >
      <div className="flex h-[calc(4rem-6px)] items-center justify-between gap-2">
        <Label className='text-[10px]'>
          Showing {scheduledAssessmentsList.length} Assessments
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
          <MousePointer2 className='mr-2 h-4 w-4' />
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
            <button className='hidden lg:flex px-2 py-1 rounded-sm border-2 border-dashed gap-2 text-[8px] italic hover:bg-muted' onClick={() => console.log("me here")}>
              {loading ? (<Skeleton className="w-32 h-4" />) : assessment.id}
            </button>
            <button className='flex lg:hidden px-2 py-1 rounded-sm border-2 border-dashed gap-2 text-[10px] italic hover:bg-muted' onClick={() => console.log("me here")}>
              {loading ? (<Skeleton className="w-32 h-4" />) : "Copy id"}
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
          <Button variant="outline" className='bg-transparent'>
            <Eye className='h-4 w-4' />
          </Button>
          {/* <Button variant="outline" className='bg-transparent'>
            <Link className='h-4 w-4' />
          </Button>
          <Button variant="outline" className='bg-transparent'>
            <Copy className='h-4 w-4' />
          </Button>
          <Button variant="outline" className='bg-transparent'>
            <Edit className='h-4 w-4' />
          </Button>
          <Button variant="outline" className='bg-transparent'>
            <Trash2 className='h-4 w-4' />
          </Button> */}
        </div>
      </TableCell>

    </TableRow>
  );
};

export default ScheduledTabContent