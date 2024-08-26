import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, BellPlus, Calendar, Clock, Copy, Edit, FileCog, FilePen, FilePieChart, MousePointer2, PieChart, Scroll, ScrollText, Trash2, User, UserCog, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CreateRoleDialog from '../dialog-box/create-role-dialog';
import EditRoleDialog from '../dialog-box/edit-role-dialog';
import DeleteRoleDialog from '../dialog-box/delete-role-dialog';
import RoleBadge from '../role-badge';
import { Label } from '@radix-ui/react-label';
import { useRoles } from '../../hooks/useRoles';
import useRolesTableStore from '@/lib/stores/manage-users-store/roles-table-store';
import { Role } from '@/lib/types/roleTypes';
import { formatDateInIST } from '../../../../../../lib/helpers/time-converter';


// global props
interface ToggleSortingProps {
  field: "name" | "createdAt" | "updatedAt";
}

const RolesTabContent = () => {
  const { roles, loading, error, fetchRoles, removeRoles } = useRoles();
  const { activePageIndex, displayNumberOfRows, sortBy, order, setOrder, setSortBy } = useRolesTableStore();
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  const allSelected = roles.length > 0 && selectedRoles.size === roles.length;


  useEffect(() => {
    fetchRoles({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy, order });
  }, [sortBy, order]);

  const toggleSorting = ({ field }: ToggleSortingProps) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setOrder('ASC');
    }
  };


  const refreshRoles = () => {
    fetchRoles({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy, order });
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRoles(new Set(roles.map(user => user.id)));
    } else {
      setSelectedRoles(new Set());
    }
  };

  const handleSelectRole = (userId: string, checked: boolean) => {
    const updatedSelectedUsers = new Set(selectedRoles);
    if (checked) {
      updatedSelectedUsers.add(userId);
    } else {
      updatedSelectedUsers.delete(userId);
    }
    setSelectedRoles(updatedSelectedUsers);
  };

  const handleDeleteSelected = async () => {
    await removeRoles({
      roleIds: Array.from(selectedRoles).map((roleId) => ({ roleId }))
    });
    console.log(Array.from(selectedRoles));
    setSelectedRoles(new Set());
    refreshRoles();
  };


  return (
    <>
      <Card className='flex flex-row gap-4 w-full p-2 justify-between border-dashed'>
        <div className="flex gap-2">
          <CreateRoleDialog />
          {selectedRoles.size > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected}>
              <Trash2 className='h-4 w-4 mr-2' />
              Delete Selected
            </Button>
          )}
        </div>
      </Card>
      <Card className='my-2 h-[calc(100vh-18rem)] flex flex-col'>
        <Table>
          <TableHeader >
            <Schema
              toggleSorting={toggleSorting}
              sortBy={sortBy}
              order={order}
              allSelected={allSelected}
              onSelectAll={handleSelectAll} />
          </TableHeader>
          <TableBody>
            {roles.map((role: Role) => (
              <Row
                key={role.id}
                role={role}
                selected={selectedRoles.has(role.id)}
                onSelectRole={handleSelectRole}
                refreshRoles={refreshRoles}
                loading={loading}
              />))}
          </TableBody>
        </Table>
      </Card >
      <div className="flex h-[calc(4rem-6px)] items-center justify-between gap-2">
        <Label className='text-xs'>
          Showing <strong>1-10</strong> of <strong>32</strong>{" "}
          Roles
        </Label>
        <div className="flex gap-2">
          <Button variant="outline">
            Previous
          </Button>
          <Button>
            Next
          </Button>
        </div>
      </div>

    </>
  );
};


interface SchemaProps {
  toggleSorting: (field: ToggleSortingProps) => void;
  sortBy: | "id"
  | "name"
  | "canManageAssessment"
  | "canManageUser"
  | "canManageRole"
  | "canManageNotification"
  | "canManageLocalGroup"
  | "canManageReports"
  | "canAttemptAssessment"
  | "canViewReport"
  | "canManageMyAccount"
  | "canViewNotification"
  | "createdAt"
  | "updatedAt";
  order: "ASC" | "DESC";
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

// Table schema
const Schema: React.FC<SchemaProps> = ({ toggleSorting, sortBy, order, allSelected, onSelectAll }) => {
  return (
    <TableRow>
      <TableHead className="hidden w-[100px] sm:table-cell">
        <div className="flex w-28 items-center gap-2 flex-row cursor-pointer">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => onSelectAll(checked as boolean)} />
          Select All
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting({ field: "name" })}>
        <div className="flex flex-row gap-2 items-center cursor-pointer" >
          <ScrollText className='h-4 w-4' />
          Role Name {sortBy === 'name' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead className="hidden md:table-cell" onClick={() => toggleSorting({ field: "createdAt" })}>
        <div className="flex flex-row gap-2 items-center cursor-pointer">
          <Calendar className='h-4 w-4' />
          Created At {sortBy === 'createdAt' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead className="hidden md:table-cell" onClick={() => toggleSorting({ field: "updatedAt" })}>
        <div className="flex flex-row gap-2 items-center cursor-pointer">
          <Clock className='h-4 w-4' />
          Updated At {sortBy === 'updatedAt' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead className="md:table-cell">
        <div className="flex flex-row gap-2 items-center">
          <MousePointer2 className='h-4 w-4' />
          Actions
        </div>
      </TableHead>
    </TableRow >
  );
};
interface RowProps {
  role: Role;
  selected: boolean;
  onSelectRole: (roleId: string, checked: boolean) => void;
  refreshRoles: () => void;
  loading: boolean;
}


// Single table row
const Row: React.FC<RowProps> = ({ role, selected, loading, onSelectRole, refreshRoles }) => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onSelectRole(role.id, checked as boolean)}
        />
      </TableCell>
      <TableCell className="font-medium text-left w-[500px]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            {role.name}
          </div>
          <div className='hidden md:flex gap-2 md:flex-wrap'>
            {role.canManageAssessment && <RoleBadge text={'Manage Assessments'} icon={<FileCog />} />}
            {role.canManageUser && <RoleBadge text={'Manage Users'} icon={<UserCog />} />}
            {role.canManageRole && <RoleBadge text={'Manage Roles'} icon={<Scroll />} />}
            {role.canManageLocalGroup && <RoleBadge text={'Manage Local Groups'} icon={<Users />} />}
            {role.canManageReports && <RoleBadge text={'Manage Reports'} icon={<PieChart />} />}
            {role.canManageNotification && <RoleBadge text={'Manage Notifications'} icon={<BellPlus />} />}
            {role.canAttemptAssessment && <RoleBadge text={'Attempt Assessments'} icon={<Scroll />} />}
            {role.canViewReport && <RoleBadge text={'View Reports'} icon={<FilePieChart />} />}
            {role.canViewNotification && <RoleBadge text={'Get Notifications'} icon={<Bell />} />}
            {role.canManageMyAccount && <RoleBadge text={'Manage My Account'} icon={<User />} />}
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {loading ? <Skeleton className="w-32 h-4" /> : formatDateInIST(role.createdAt)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {loading ? <Skeleton className="w-32 h-4" /> : formatDateInIST(role.updatedAt)}
      </TableCell>
      <TableCell>
        <div className="flex gap-4">
          {loading ? (<Skeleton className="w-8 h-8" />) : (<EditRoleDialog refreshRoles={refreshRoles} />)}
          {loading ? (<Skeleton className="w-8 h-8" />) : (<DeleteRoleDialog refreshRoles={refreshRoles} role={role} />)}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RolesTabContent;
