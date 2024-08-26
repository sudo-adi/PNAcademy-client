import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import CreateGroupDialog from './components/dialog-box/create-group-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDateInIST } from '@/lib/helpers/time-converter'
import { Group } from '@/lib/types/groupTypes'
import { Calendar, Clock, MousePointer2, Search, Trash2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import EditGroupDialog from './components/dialog-box/edit-group-dialog'
import ViewGroupDialog from './components/dialog-box/view-group-dialog'
import DeleteGroupDialog from './components/dialog-box/delete-group-dialog'
import useGroupsTableStore from '@/lib/stores/manage-groups-store.ts/groups-table-store'
import { useGroups } from './hooks/useGroups'
import { Input } from '@/components/ui/input'

const ManageGroups = () => {
  const {
    loading,
    groups,
    fetchedGroupsRes,
    fetchGroups,
    removeGroups,
  } = useGroups();
  const { activePageIndex, displayNumberOfRows, sortBy, order, setSortBy, setOrder } = useGroupsTableStore();
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
  const groupList = (groups as Group[]) ?? [];
  const allSelected = groupList.length > 0 && selectedGroups.size === groupList.length;


  useEffect(() => {
    fetchGroups({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy, order });
  }, [sortBy, order]);


  const refreshGroups = () => {
    fetchGroups({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy, order });
  };

  const toggleSorting = (field: keyof Group) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setOrder('ASC');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGroups(new Set(groupList.map(user => user.id)));
    } else {
      setSelectedGroups(new Set());
    }
  };

  const handleSelectGroup = (userId: string, checked: boolean) => {
    const updatedSelectedUsers = new Set(selectedGroups);
    if (checked) {
      updatedSelectedUsers.add(userId);
    } else {
      updatedSelectedUsers.delete(userId);
    }
    setSelectedGroups(updatedSelectedUsers);
  };

  const handleDeleteSelected = async () => {
    await removeGroups({ groupIds: Array.from(selectedGroups) });
    console.log(Array.from(selectedGroups));
    setSelectedGroups(new Set());
    refreshGroups();
  };

  return (
    <>
      <Card className="flex flex-row w-full p-2 justify-between border-dashed">
        <div className="flex gap-2">
          <CreateGroupDialog refreshGroups={refreshGroups} />
          {selectedGroups.size > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected}>
              <Trash2 className='h-4 w-4 mr-2' />
              Delete Groups
            </Button>
          )}
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Search Group..." />
          <Button type="submit" className='flex items-center justify-center  gap-1'>
            <Search className='h-4 w-4' />
            Search
          </Button>
        </div>
      </Card>
      <Card className=" h-[calc(100vh-15rem)] flex flex-col">
        <Table>
          <TableHeader>
            <Schema
              toggleSorting={toggleSorting}
              sortBy={sortBy}
              order={order}
              allSelected={allSelected}
              onSelectAll={handleSelectAll}
            />
          </TableHeader>
          <TableBody>
            {groupList.map((group: Group) => (
              <Row
                key={group.id}
                group={group}
                selected={selectedGroups.has(group.id)}
                onSelectGroup={handleSelectGroup}
                refreshGroups={refreshGroups}
                loading={loading}
              />
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex h-[1rem] items-center justify-between gap-2">
        <Label className="text-xs">
          Showing <strong>1-10</strong> of <strong>{fetchedGroupsRes?.data.totalPages}</strong> Users
        </Label>
        <div className="flex gap-2">
          <Button variant="outline">Previous</Button>
          <Button>Next</Button>
        </div>
      </div>


    </>
  )
}


interface SchemaProps {
  toggleSorting: (field: keyof Group) => void;
  sortBy: keyof Group;
  order: "ASC" | "DESC";
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

const Schema: React.FC<SchemaProps> = ({ toggleSorting, sortBy, order, allSelected, onSelectAll, }) => (
  <TableRow>
    <TableHead className="w-[100px] sm:table-cell">
      <div className="flex w-28 items-center gap-2">
        <Checkbox
          checked={allSelected}
          onCheckedChange={(checked) => onSelectAll(checked as boolean)} />
        Select All
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('name')}>
      <div className="flex gap-2 items-center cursor-pointer">
        <Users className="h-4 w-4" />
        Name {sortBy === 'name' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('createdAt')} className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-pointer">
        <Calendar className="h-4 w-4" />
        Created At {sortBy === 'createdAt' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('updatedAt')} className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-pointer">
        <Clock className="h-4 w-4" />
        Updated At {sortBy === 'updatedAt' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead>
      <div className="flex items-center cursor-default">
        <MousePointer2 className='h-4 w-4 mr-2' />
        Actions
      </div>
    </TableHead>
  </TableRow>
);

interface RowProps {
  group: Group;
  selected: boolean;
  onSelectGroup: (groupId: string, checked: boolean) => void;
  refreshGroups: () => void;
  loading: boolean;
}




const Row: React.FC<RowProps> = ({ group, selected, onSelectGroup, refreshGroups, loading }) => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onSelectGroup(group.id, checked as boolean)}
        />
      </TableCell>
      <TableCell className="font-medium text-left">
        {loading ? (<Skeleton className="w-32 h-4" />) : group.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {loading ? <Skeleton className="w-32 h-4" /> : formatDateInIST(group.createdAt)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {loading ? <Skeleton className="w-32 h-4" /> : formatDateInIST(group.updatedAt)}
      </TableCell>
      <TableCell>
        <div className="flex gap-4">
          {loading ? (<Skeleton className="w-8 h-8" />) : (<ViewGroupDialog group={group} refreshGroups={refreshGroups} />)}
          {loading ? (<Skeleton className="w-8 h-8" />) : (<EditGroupDialog group={group} refreshGroups={refreshGroups} />)}
          {loading ? (<Skeleton className="w-8 h-8" />) : (<DeleteGroupDialog group={group} refreshGroups={refreshGroups} />)}
        </div>
      </TableCell>
    </TableRow>
  )
}

export default ManageGroups