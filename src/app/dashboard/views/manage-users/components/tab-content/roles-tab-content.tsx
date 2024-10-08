import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import {
  Bell,
  BellPlus,
  Calendar,
  Clock,
  FileCog,
  FilePieChart,
  MousePointer2,
  PieChart,
  Scroll,
  ScrollText,
  Trash2,
  User,
  UserCog,
  Users
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import CreateRoleDialog from '../dialog-box/create-role-dialog';
import EditRoleDialog from '../dialog-box/edit-role-dialog';
import DeleteRoleDialog from '../dialog-box/delete-role-dialog';
import RoleBadge from '../role-badge';
import { Label } from '@radix-ui/react-label';
import { useRoles } from '../../hooks/useRoles';
import useRolesTableStore from '@/lib/stores/manage-users-store/roles-table-store';
import { Role } from '@/lib/types/roleTypes';
import { formatDateInIST } from '../../../../../../lib/helpers/time-converter';
import { Badge } from '@/components/ui/badge';
import { ApiError } from '@/lib/api/apiError';

// global props
interface ToggleSortingProps {
  field: "name" | "createdAt" | "updatedAt";
}

const RolesTabContent = () => {

  // all hooks here
  const { fetchRoles, removeRoles } = useRoles();

  // global states here
  const { activePageIndex, displayNumberOfRows, sortBy, order, setOrder, setSortBy } = useRolesTableStore();

  // local states here
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());

  const [loadingRoles, setLaoadingRoles] = useState<boolean>(true);

  const [rolesError, setRolesError] = useState<ApiError | Error>()

  // local vars here
  const allSelected = roles.length > 0 && selectedRoles.size === roles.length;

  // local functions here
  const fetchRolesData = useCallback(async () => {
    try {
      setLaoadingRoles(true)
      const response = await fetchRoles(
        {
          page: activePageIndex,
          pageSize: displayNumberOfRows,
          sortBy,
          order
        }
      )
      setRoles(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setRolesError(err);
      } else {
        setRolesError(err as Error);
      }
    } finally {
      setLaoadingRoles(false);
    }
  }, [sortBy, order]);

  const refreshRoles = () => {
    fetchRolesData();
  }

  // handlers here
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

  const handleToggleSorting = ({ field }: ToggleSortingProps) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setOrder('ASC');
    }
  };

  // useEffects here
  useEffect(() => {
    fetchRolesData();
  }, [fetchRolesData]);

  return (
    <>
      <Card className='flex flex-row gap-4 w-full p-2 justify-between border-dashed'>
        <div className="flex gap-2">
          <CreateRoleDialog refreshRoles={refreshRoles} />
          {selectedRoles.size > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected}>
              <Trash2 className='h-4 w-4 mr-2' />
              Delete Selected
            </Button>
          )}
        </div>
      </Card>
      <Card className='my-2 h-[calc(100vh-18rem)] flex flex-col'>
        <div className="relative flex-grow overflow-hidden rounded-2xl scrollbar-none">
          <div className="absolute inset-0 overflow-auto">
            <table className="w-full">
              <thead className="sticky bg-background top-0 z-10">
                <Schema
                  toggleSorting={handleToggleSorting}
                  sortBy={sortBy}
                  order={order}
                  allSelected={allSelected}
                  onSelectAll={handleSelectAll} />
              </thead>
              <tbody>
                {roles.map((role: Role) => (
                  <Row
                    key={role.id}
                    role={role}
                    selected={selectedRoles.has(role.id)}
                    onSelectRole={handleSelectRole}
                    refreshRoles={refreshRoles}
                    loading={loadingRoles}
                  />))}
              </tbody>
            </table>
          </div>
        </div>
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
      <TableHead className="hidden sm:table-cell">
        <div className="flex items-center gap-2 flex-row cursor-pointer">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => onSelectAll(checked as boolean)} />
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting({ field: "name" })}>
        <div className="flex flex-row gap-2 items-center cursor-pointer text-[10px]">
          <ScrollText className='h-3 w-3' />
          Role Name {sortBy === 'name' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead className="hidden md:table-cell" onClick={() => toggleSorting({ field: "createdAt" })}>
        <div className="flex flex-row gap-2 items-center cursor-pointer text-[10px]">
          <Calendar className='h-3 w-3' />
          Created At {sortBy === 'createdAt' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead className="hidden md:table-cell" onClick={() => toggleSorting({ field: "updatedAt" })}>
        <div className="flex flex-row gap-2 items-center cursor-pointer text-[10px]">
          <Clock className='h-3 w-3' />
          Updated At {sortBy === 'updatedAt' && (order === 'ASC' ? '↓' : '↑')}
        </div>
      </TableHead>
      <TableHead className="md:table-cell">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <MousePointer2 className='h-3 w-3' />
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
          <div className="flex flex-row gap-2 items-center text-xs">
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
        {loading ? <Skeleton className="w-32 h-4" /> :
          <Badge variant={'outline'} className='text-[10px] bg-transparent cursor-default'>
            {formatDateInIST(role.createdAt)}
          </Badge>}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {loading ? <Skeleton className="w-32 h-4" /> :
          <Badge variant={'outline'} className='text-[10px] bg-transparent cursor-default'>
            {formatDateInIST(role.updatedAt)}
          </Badge>}
      </TableCell>
      <TableCell>
        <div className="flex gap-4">
          {loading ? (<Skeleton className="w-8 h-8" />) : (<EditRoleDialog refreshRoles={refreshRoles} role={role} />)}
          {loading ? (<Skeleton className="w-8 h-8" />) : (<DeleteRoleDialog refreshRoles={refreshRoles} role={role} />)}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RolesTabContent;
