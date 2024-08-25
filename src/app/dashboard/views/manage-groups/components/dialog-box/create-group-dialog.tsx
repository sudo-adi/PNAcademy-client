import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, MousePointer2, Phone, Plus, User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { SingleUser } from '@/lib/types/userTypes';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { copyToClipboard } from '@/lib/helpers/copy-to-clipboard';
import { useUsers } from '../../../manage-users/hooks/useUsers';
import useGroupUsersSelectTableStore from '@/lib/stores/manage-groups-store.ts/group-user-select-table-store';
import { ApiError } from '@/lib/api/apiError';
import { useGroups } from '../../hooks/useGroups';
import { toast } from '@/components/ui/use-toast';

interface CreateGroupDialogProps {
  refreshGroups: () => void;
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({ refreshGroups }) => {

  const { users, fetchedUsersRes, fetchUsers, removeUsers } = useUsers();
  const { loading, error, createdGroupRes, addGroup, addUsersInGroup } = useGroups();
  const { activePageIndex, displayNumberOfRows, sortBy, order, setOrder, setSortBy } = useGroupUsersSelectTableStore();
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [groupName, setGroupName] = useState<string>('');
  const userList = (users as SingleUser[]) ?? [];
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [createError, setCreateError] = useState<ApiError | null>(null);
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

  const refreshUsers = () => {
    fetchUsers({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy, order });
  };


  const createGroupWithUsers = async () => {
    try {
      setStatusDialogOpen(true);
      await addGroup({ name: groupName });
      const groupId: string | undefined = createdGroupRes?.data.id;
      if (groupId) {
        await addUsersInGroup({ userIds: Array.from(selectedUsers), groupId: groupId });
      }

    } catch (err) {
      if (err instanceof ApiError) {
        setCreateError(err);
      } else {
        setCreateError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      refreshGroups();
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">
            <Plus className='h-4 w-4 mr-2' />
            Create
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[1000px] max-w-none">
          <DialogHeader>
            <DialogTitle>Create a New Group</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, quia?
            </DialogDescription>
            <div className="flex flex-col gap-2 py-4">
              <Label htmlFor='name' className='ml-1'>Group Name</Label>
              <Input
                id="name"
                type="email"
                placeholder="e.g : english group"
                onChange={(e) => setGroupName(e.target.value)}
                required />
            </div>

            <Card
              className="h-[400px] overflow-y-auto p-0"
            >
              <CardContent className='p-0'>
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
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full justify-between gap-2">
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="outline"
                  onClick={() => handleSelectAll(false)
                  }>
                  Clear Selection
                </Button>
              </div>

              <Button variant="default" onClick={createGroupWithUsers}>
                <Plus className='h-4 w-4 mr-2' />
                Create Group
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{error ? 'Error' : 'Success'}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{loading ? <Loader2 className='animate-spin' /> : error ? error.message : `${groupName} group Created Successfully`}</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="default">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface SchemaProps {
  toggleSorting: (field: keyof SingleUser) => void;
  sortBy: keyof SingleUser;
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
    <TableHead onClick={() => toggleSorting('first_name')}>
      <div className="flex gap-2 items-center cursor-pointer">
        <User className="h-4 w-4" />
        First Name {sortBy === 'first_name' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('last_name')}>
      <div className="flex gap-2 items-center cursor-pointer">
        <User className="h-4 w-4" />
        Last Name {sortBy === 'last_name' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting('email')}>
      <div className="flex gap-2 items-center cursor-pointer">
        <Mail className="h-4 w-4" />
        Email {sortBy === 'email' && (order === 'ASC' ? '↓' : '↑')}
      </div>
    </TableHead>
    <TableHead className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-default">
        <Phone className='h-4 w-4' />
        Phone Number
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




const Row: React.FC<RowProps> = ({ user, selected, onSelectUser, refreshUsers, loading, }) => {
  return (
    <TableRow >
      <TableCell className="hidden sm:table-cell">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onSelectUser(user.id, checked as boolean)}
        />
      </TableCell>
      <TableCell className="font-medium text-left">
        {loading ? (<Skeleton className="w-32 h-4" />) : user.first_name}
      </TableCell>
      <TableCell className="font-medium text-left">
        {loading ? (<Skeleton className="w-32 h-4" />) : user.last_name}
      </TableCell>
      <TableCell>
        {loading ? (
          <Skeleton className="w-32 h-4" />
        ) : (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => copyToClipboard(user.email)}>
                  <Badge variant="outline" className="hover:bg-secondary">
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
          <Skeleton className="w-32 h-4" />
        ) : (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => copyToClipboard(user.phone)}>
                  <Badge variant="outline" className="hover:bg-secondary">
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
    </TableRow >
  )
}

export default CreateGroupDialog