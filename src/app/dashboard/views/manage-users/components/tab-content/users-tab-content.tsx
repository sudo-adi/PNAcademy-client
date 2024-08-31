import React, { useEffect, useState } from 'react';
import { FileDownIcon, Mail, User, Clock, Calendar, MousePointer2, Phone } from 'lucide-react';
import { useUsers } from '../../hooks/useUsers';
import { Skeleton } from '@/components/ui/skeleton';
import { SingleUser } from '@/lib/types/userTypes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { formatDateInIST } from '@/lib/helpers/time-converter';
import { copyToClipboard } from '@/lib/helpers/copy-to-clipboard';
import CreateUserDialog from '../dialog-box/create-user-dialog';
import ImportCsvDialog from '../dialog-box/import-users-csv-dialog';
import ViewUserDialog from '../dialog-box/view-user-dialog';
import EditUserDialog from '../dialog-box/edit-user-diallog';
import DeleteUserDialog from '../dialog-box/delete-user-dialog';
import useUserTableStore from '@/lib/stores/manage-users-store/user-table-store';

const UsersTabContent: React.FC = () => {
  const { loading, error, users, fetchedUsersRes, fetchUsers, removeUsers } = useUsers();
  const { activePageIndex, displayNumberOfRows, sortBy, order, setOrder, setSortBy } = useUserTableStore();
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const userList = (users as SingleUser[]) ?? [];
  const allSelected = userList.length > 0 && selectedUsers.size === userList.length;

  useEffect(() => {
    fetchUsers({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy, order });
  }, [sortBy, order]);

  const toggleSorting = (field: keyof SingleUser) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setOrder('ASC');
    }
  };

  const refreshUsers = () => {
    fetchUsers({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy, order });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(userList.map(user => user.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    const updatedSelectedUsers = new Set(selectedUsers);
    if (checked) {
      updatedSelectedUsers.add(userId);
    } else {
      updatedSelectedUsers.delete(userId);
    }
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleDeleteSelected = async () => {
    await removeUsers({ userIds: Array.from(selectedUsers) });
    console.log(Array.from(selectedUsers));
    setSelectedUsers(new Set());
    refreshUsers();
  };

  return (
    <>
      <Card className="flex flex-row w-full p-2 justify-between border-dashed">
        <div className="flex gap-2">
          <CreateUserDialog refreshUsers={refreshUsers} />
          {selectedUsers.size > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected}>
              Delete Selected
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <ImportCsvDialog />
          <Button variant="outline">
            <FileDownIcon className="h-4 w-4 mr-2" />
            Export as CSV
          </Button>
        </div>
      </Card>

      <Card className="my-2 h-[calc(100vh-18rem)] flex flex-col">
        <div className="relative flex-grow overflow-hidden rounded-2xl scrollbar-none">
          <div className="absolute inset-0 overflow-auto">
            <table className="w-full">
              <thead className="sticky bg-background top-0 z-10">
                <Schema
                  toggleSorting={toggleSorting}
                  sortBy={sortBy}
                  order={order}
                  allSelected={allSelected}
                  onSelectAll={handleSelectAll}
                />
              </thead>
              <tbody>
                {userList.map((user: SingleUser) => (
                  <Row
                    key={user.id}
                    user={user}
                    selected={selectedUsers.has(user.id)}
                    onSelectUser={handleSelectUser}
                    refreshUsers={refreshUsers}
                    loading={loading}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <div className="flex h-[calc(4rem-6px)] items-center justify-between gap-2">
        <Label className="text-xs">
          Showing <strong>1-10</strong> of <strong>{fetchedUsersRes?.data.totalPages}</strong> Users
        </Label>
        <div className="flex gap-2">
          <Button variant="outline">Previous</Button>
          <Button>Next</Button>
        </div>
      </div>
    </>
  );
};

interface SchemaProps {
  toggleSorting: (field: keyof SingleUser) => void;
  sortBy: keyof SingleUser;
  order: "ASC" | "DESC";
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

const Schema: React.FC<SchemaProps> = ({ toggleSorting, sortBy, order, allSelected, onSelectAll, }) => (
  <TableRow>
    <TableHead className="sm:table-cell">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={allSelected}
          onCheckedChange={(checked) => onSelectAll(checked as boolean)} />
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('first_name')}>
      <div className="flex gap-2 items-center cursor-pointer text-[10px] w-22">
        <User className="h-3 w-3" />
        First Name {sortBy === 'first_name' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('last_name')}>
      <div className="flex gap-2 items-center cursor-pointer text-[10px] w-22">
        <User className="h-3 w-3" />
        Last Name {sortBy === 'last_name' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('email')}>
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <Mail className="h-3 w-3" />
        Email {sortBy === 'email' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-default text-[10px]">
        <Phone className='h-3 w-3' />
        Phone Number
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('createdAt')} className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <Calendar className="h-3 w-3" />
        Created At {sortBy === 'createdAt' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('updatedAt')} className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <Clock className="h-3 w-3" />
        Updated At {sortBy === 'updatedAt' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead>
      <div className="flex items-center cursor-default text-[10px]">
        <MousePointer2 className='h-3 w-3 mr-2' />
        Actions
      </div>
    </TableHead>
  </TableRow>
);

interface RowProps {
  user: SingleUser;
  selected: boolean;
  onSelectUser: (userId: string, checked: boolean) => void;
  refreshUsers: () => void;
  loading: boolean;
}

const Row: React.FC<RowProps> = ({ user, selected, onSelectUser, refreshUsers, loading }) => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onSelectUser(user.id, checked as boolean)}
        />
      </TableCell>
      <TableCell className="font-medium text-left text-xs">
        {loading ? (<Skeleton className="w-10 h-4" />) : user.first_name}
      </TableCell>
      <TableCell className="font-medium text-left text-xs">
        {loading ? (<Skeleton className="w-8 h-4" />) : user.last_name}
      </TableCell>
      <TableCell>
        {loading ? (
          <Skeleton className="w-10 h-4" />
        ) : (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => copyToClipboard(user.email)}>
                  <Badge variant="outline" className="hover:bg-secondary text-[10px]">
                    {user.email}
                  </Badge>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                Copy to Clipboard
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </TableCell>
      <TableCell>
        {loading ? (
          <Skeleton className="w-10 h-4" />
        ) : (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => copyToClipboard(user.phone)}>
                  <Badge variant="outline" className="hover:bg-secondary text-[10px]">
                    {user.phone}
                  </Badge>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                Copy to Clipboard
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {loading ? <Skeleton className="w-10 h-4" /> :
          <Badge variant={'outline'} className='text-[10px] bg-transparent cursor-default'>
            {formatDateInIST(user.createdAt)}
          </Badge>}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {loading ? <Skeleton className="w-10 h-4" /> :
          <Badge variant={'outline'} className='text-[10px] bg-transparent cursor-default'>
            {formatDateInIST(user.updatedAt)}
          </Badge>}
      </TableCell>
      <TableCell>
        <div className="flex gap-4">
          {loading ? (<Skeleton className="w-8 h-8" />) : (<ViewUserDialog user={user} />)}
          {loading ? (<Skeleton className="w-8 h-8" />) : (<EditUserDialog user={user} refreshUsers={refreshUsers} />)}
          {loading ? (<Skeleton className="w-8 h-8" />) : (<DeleteUserDialog user={user} refreshUsers={refreshUsers} />)}
        </div>
      </TableCell>
    </TableRow>
  )
}

export default UsersTabContent;
