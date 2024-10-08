import { Group } from '@/lib/types/groupTypes';
import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, Mail, Phone, User, Users, } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { SingleUser } from '@/lib/types/userTypes';
import { useGroups } from '../../hooks/useGroups';
import useGroupUsersSelectTableStore from '@/lib/stores/manage-groups-store.ts/group-user-select-table-store';
import { copyToClipboard } from '@/lib/helpers/copy-to-clipboard';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { ApiError } from '@/lib/api/apiError';
interface ViewUsersDialogProps {
  group: Group;
}

const ViewGroupDialog: React.FC<ViewUsersDialogProps> = ({ group }) => {

  // all hooks here
  const { fetchGroupUsers } = useGroups();

  // local states here
  const [users, setUsers] = useState<SingleUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  // global states
  const { sortBy, order, setOrder, setSortBy } = useGroupUsersSelectTableStore();

  // local functions here
  const fetchGroupUsersData = useCallback(async () => {
    setLoadingUsers(true);
    const payload = {
      page: 1,
      pageSize: 9999,
      sortBy,
      order,
      groupId: group.id
    };
    try {
      const response = await fetchGroupUsers(payload);
      setUsers(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(err as Error);
      }
    } finally {
      setLoadingUsers(false);
    }
  }, [sortBy, order, group.id]);

  // handlers here
  const handleToggleSorting = (field: keyof SingleUser) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setOrder('ASC');
    }
  };

  useEffect(() => {
    fetchGroupUsersData();
  }, [fetchGroupUsersData]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-transparent'>
            <Eye className='h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[1000px] max-w-none">
          <DialogHeader className='p-1 flex flex-row items-center justify-between'>
            <DialogTitle className='flex flex-row items-center justify-center gap-2'>
              <Users className='h-4 w-4' />
              {group.name}
            </DialogTitle>
            <div className="flex flex-row pr-4 gap-2 items-center justify-center">
              <User className='h-4 w-4' />
              {users.length}
            </div>
          </DialogHeader>
          <Card
            className="h-[400px] overflow-y-auto p-0"
          >
            <CardContent className='p-0'>
              {users.length > 0 ? (
                <Table>
                  <TableHeader>
                    <Schema
                      toggleSorting={handleToggleSorting}
                      sortBy={sortBy}
                      order={order}
                    />
                  </TableHeader>
                  <TableBody>
                    {users.map((user: SingleUser) => (
                      <Row
                        key={user.id}
                        user={user}
                        loading={loadingUsers}
                      />
                    ))}
                  </TableBody>
                </Table>
              ) :
                (
                  <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
                    No users found in this group
                  </div>
                )
              }
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog >
    </>
  )
}

interface RowProps {
  user: SingleUser;
  loading: boolean;
}

const Row: React.FC<RowProps> = ({ user, loading, }) => {
  return (
    <TableRow >
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
          <button onClick={() => {
            copyToClipboard(user.email)
            toast({
              title: "Email Copied",
              description: `${user.email} has been copied to clipboard`,
              action: (
                <ToastAction altText="Email Copied">
                  ok
                </ToastAction>
              ),
            })
          }
          }>
            <Badge variant="outline" className="hover:bg-secondary">
              {user.email}
            </Badge>
          </button>
        )}
      </TableCell>
      <TableCell>
        {loading ? (
          <Skeleton className="w-32 h-4" />
        ) : (
          <button onClick={() => {
            copyToClipboard(user.phone)
            toast({
              title: "Phone Number Copied",
              description: `${user.phone} has been copied to clipboard`,
              action: (
                <ToastAction altText="Phone Number Copied">
                  ok
                </ToastAction>
              ),
            })
          }
          }>
            <Badge variant="outline" className="hover:bg-secondary">
              {user.phone}
            </Badge>
          </button>
        )}
      </TableCell>
    </TableRow >
  )
}

interface SchemaProps {
  toggleSorting: (field: keyof SingleUser) => void;
  sortBy: keyof SingleUser;
  order: "ASC" | "DESC";
}

const Schema: React.FC<SchemaProps> = ({ toggleSorting, sortBy, order, }) => (
  <TableRow>
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




export default ViewGroupDialog