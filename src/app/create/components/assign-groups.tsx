import { useAssessment } from '@/app/dashboard/views/manage-assessment/hooks/useAssessment'
import { useGroups } from '@/app/dashboard/views/manage-groups/hooks/useGroups'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableHead, TableRow } from '@/components/ui/table'
import { formatDateInIST } from '@/lib/helpers/time-converter'
import useGroupsTableStore from '@/lib/stores/manage-groups-store.ts/groups-table-store'
import { Group } from '@/lib/types/groupTypes'
import { Calendar, Plus, Users, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface AssignedGroupsCardProps {
  assessmentId: string
}

const AssignedGroupsCard: React.FC<AssignedGroupsCardProps> = ({ assessmentId }) => {
  const { loading, groups, fetchGroups, fetchAssignedGroups, assignedGroups } = useGroups();
  const { assignAssessmentToGroup, removeAssessmentFromGroup } = useAssessment();
  const { activePageIndex, displayNumberOfRows, sortBy, order, setSortBy, setOrder } = useGroupsTableStore();

  const groupList = (groups as Group[]) ?? [];

  // Filter out groups that are already assigned
  const unassignedGroups = groupList.filter(group =>
    !assignedGroups.some(assignedGroup => assignedGroup.id === group.id)
  );

  useEffect(() => {
    fetchGroups({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy, order });
    refreshGroups();
  }, [sortBy, order]);

  const refreshGroups = () => {
    fetchAssignedGroups({ id: assessmentId });
  };

  const toggleSorting = (field: keyof Group) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setOrder('ASC');
    }
  };

  const handleRemoveAssessmentFromGroup = async (groupId: string) => {
    try {
      await removeAssessmentFromGroup({ assessmentId, groupId });
      refreshGroups();
    } catch (error) {
      console.error("Failed to remove assessment from group:", error);
    }
  };

  const handleAssignAssessmentToGroup = async (groupId: string) => {
    try {
      await assignAssessmentToGroup({ assessmentId, groupId });
      refreshGroups();
    } catch (error) {
      console.error("Failed to assign assessment to group:", error);
    }
  };

  return (
    <>
      <Card className="min-h-[14rem] flex flex-col scrollbar-none">
        <div className="relative flex-grow overflow-hidden rounded-2xl scrollbar-none">
          <div className="absolute inset-0 overflow-auto scrollbar-none">
            <table className="w-full scrollbar-none">
              <thead className="sticky bg-background top-0 z-10">
                <Schema toggleSorting={toggleSorting} sortBy={sortBy} order={order} />
              </thead>
              <tbody>
                {unassignedGroups.map((group: Group) => (
                  <Row
                    key={group.id}
                    group={group}
                    add={() => handleAssignAssessmentToGroup(group.id)}
                    refreshGroups={refreshGroups}
                    loading={loading}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <Card className='min-h-[10rem] w-full px-2 pt-2'>
        <div className="flex h-[2rem] border-b-2 border-secondary p-2">Selected Groups</div>
        <div className='flex flex-wrap gap-2 px-2 pt-2 overflow-y-scroll scrollbar-none max-h-[12rem] overflow-hidden'>
          {assignedGroups.map((group) => (
            <AssignGroupBadge key={group.id} groupId={group.id} removeAssessmentFromGroup={() => handleRemoveAssessmentFromGroup(group.id)} />
          ))}
        </div>
      </Card>
    </>
  )
};

interface AssignGroupBadgeProps {
  groupId: string;
  removeAssessmentFromGroup: () => void;
}

const AssignGroupBadge: React.FC<AssignGroupBadgeProps> = ({ groupId, removeAssessmentFromGroup }) => {
  return (
    <Badge className='flex gap-2 cursor-pointer hover:scale-105 transition-all duration-300'>
      {groupId}
      <button onClick={removeAssessmentFromGroup}>
        <X className='h-4 w-4 hover:scale-125 transition-all duration-300 hover:border rounded-full' />
      </button>
    </Badge>
  )
};

interface SchemaProps {
  toggleSorting: (field: keyof Group) => void;
  sortBy: keyof Group;
  order: "ASC" | "DESC";
}

const Schema: React.FC<SchemaProps> = ({ toggleSorting, sortBy, order }) => (
  <TableRow>
    <TableHead onClick={() => toggleSorting('name')}>
      <div className="flex gap-2 items-center cursor-pointer text-[10px] w-36">
        <Users className="h-3 w-3" />
        Name {sortBy === 'name' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('createdAt')} className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <Calendar className="h-3 w-3" />
        Created At {sortBy === 'createdAt' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('createdAt')} className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <Plus className="h-3 w-3" />
        Add
      </div>
    </TableHead>
  </TableRow>
);

interface RowProps {
  group: Group;
  add: () => void;
  refreshGroups: () => void;
  loading: boolean;
}

const Row: React.FC<RowProps> = ({ group, refreshGroups, loading, add }) => (
  <TableRow>
    <TableCell className="font-medium text-left text-xs">
      {loading ? <Skeleton className="w-32 h-4" /> : group.name}
    </TableCell>
    <TableCell className="hidden md:table-cell text-xs">
      {loading ? <Skeleton className="w-32 h-4" /> : formatDateInIST(group.createdAt)}
    </TableCell>
    <TableCell>
      <button onClick={add}>
        <Badge className='cursor-pointer'>+</Badge>
      </button>
    </TableCell>
  </TableRow>
);

export default AssignedGroupsCard;
