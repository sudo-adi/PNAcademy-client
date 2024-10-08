import { Group, RemoveFromGroupProps } from '@/lib/types/groupTypes';
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit, Loader, Loader2, Mail, Phone, Plus, PlusSquare, Trash2, User, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useGroups } from '../../hooks/useGroups';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { SingleUser } from '@/lib/types/userTypes';
import useGroupUsersSelectTableStore from '@/lib/stores/manage-groups-store.ts/group-user-select-table-store';
import { ApiError } from '@/lib/api/apiError';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUsers } from '../../../manage-users/hooks/useUsers';



interface EditUserDialogProps {
  refreshGroups: () => void;
  group: Group;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ group, refreshGroups }) => {

  // all hooks here
  const { editGroup, fetchGroupUsers, removeUsersInGroup, addUsersInGroup, } = useGroups();
  const { fetchUsers } = useUsers();

  // global states here
  const { activePageIndex, displayNumberOfRows, sortBy, order, setOrder, setSortBy } = useGroupUsersSelectTableStore();

  // local states here
  const [initLoading, setInitLoading] = useState(false);
  const [groupName, setGroupName] = useState<string>(group.name);
  const [editUsersList, setEditUsersList] = useState<SingleUser[]>([]);
  const [unAddedUsers, setUnAddedUsers] = useState<SingleUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedAddTabUsers, setSelectedAddTabUsers] = useState<Set<string>>(new Set());
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [loadingUnAddedUsers, setLoadingUnAddedUsers] = useState<boolean>(false);
  const [addingUser, setAddingUser] = useState<boolean>(false);
  const [addingUsers, setAddingUsers] = useState<boolean>(false);
  const [removingUser, setRemovingUser] = useState<boolean>(false);
  const [removingUsers, setRemovingUsers] = useState<boolean>(false);


  // local vars here
  const allSelected = editUsersList.length > 0 && selectedUsers.size === editUsersList.length;
  const allSelectedAddTabUsers = unAddedUsers.length > 0 && selectedAddTabUsers.size === unAddedUsers.length;

  // local functions here
  const fetchGroupUsersList = async () => {
    const configPayload = {
      page: 1,
      pageSize: 9999,
      sortBy,
      order,
      groupId: group.id,
    }
    try {
      const response = await fetchGroupUsers(configPayload);
      setEditUsersList(response);
    } catch (err) {
      throw err;
    } finally {
    }
  }

  const fetchUnaddedUsersList = async () => {
    const configPayload = {
      page: 1,
      pageSize: 9999,
      sortBy,
      order,
    }
    try {
      const { users } = await fetchUsers(configPayload);
      console.log(users)
      setUnAddedUsers(users.filter(user =>
        !editUsersList.some(editUser => editUser.id === user.id)
      ));
    } catch (err) {
      throw err;
    } finally {
    }
  }

  useEffect(() => {
    console.log(unAddedUsers);
  }, [unAddedUsers])

  const refreshUsers = async () => {
    await fetchGroupUsersList();
    await fetchUnaddedUsersList();
  }

  const initEditGroup = async () => {
    setInitLoading(true);
    try {
      setGroupName(group.name);
      await fetchGroupUsersList();
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `An error occurred while fetching group users ${err.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while fetching group users ${error.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      }
    } finally {
      setInitLoading(false);
    }
  }

  const initAddUsersTab = async () => {
    try {
      setLoadingUnAddedUsers(true);
      await fetchUnaddedUsersList();
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `An error occurred while fetching users ${err.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while fetching users ${error.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      }
    } finally {
      refreshUsers();
      setLoadingUnAddedUsers(false);
    }
  }


  // handlers here
  const handleEditGroup = async () => {
    await initEditGroup();
  }

  const handleUserRemoveFromGroup = async (userIds: string[]) => {
    console.log("hitted", userIds);
    if (userIds.length === 1) {
      setRemovingUser(true);
    } else {
      setRemovingUsers(true);
    };
    const payLoad: RemoveFromGroupProps = {
      userIds,
      groupId: group.id,
    }
    try {
      console.log(payLoad)
      const res = await removeUsersInGroup(payLoad);
      console.log("res here", res);
      refreshUsers();
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `An error occurred while Removing User ${err.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while Removing User ${error.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      }
    } finally {
      setRemovingUser(false);
      setRemovingUsers(false);
    }
  }

  const handleAddUserToGroup = async (userId: string, userName: string, groupName: string) => {
    setAddingUser(true);
    const payload = {
      groupId: group.id,
      userIds: [userId]
    }
    try {
      await addUsersInGroup(payload);

      // Update editUsersList
      const addedUser = unAddedUsers.find(user => user.id === userId);
      if (addedUser) {
        setEditUsersList(prevList => [...prevList, addedUser]);
      }

      // Update unAddedUsers
      setUnAddedUsers(prevList => prevList.filter(user => user.id !== userId));

      // Clear the selection
      setSelectedAddTabUsers(prevSelected => {
        const updatedSelected = new Set(prevSelected);
        updatedSelected.delete(userId);
        return updatedSelected;
      });

      toast({
        title: `User added`,
        description: ` ${userName} Added to Group ${groupName} Successfully`,
        action: (
          <ToastAction altText="success">
            ok
          </ToastAction>
        ),
      });
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `An error occurred while adding user: ${err.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        });
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while adding user: ${error.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        });
      }
    } finally {
      setAddingUser(false);
    }
  }

  const handleChangeGroupName = async () => {
    const payLoad = {
      id: group.id,
      name: groupName,
    }
    try {
      if (groupName.length > 2) {
        await editGroup(payLoad);
      } else {
        toast({
          title: "Info",
          description: `Group name should be at least 3 characters Long`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        }),
          setGroupName(group.name)
      }
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `An error occurred while changing group name ${err.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while changing group name ${error.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      }
    } finally {
      refreshGroups();
    }
  }

  const handleSelectAllUsersInGroup = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(editUsersList.map(user => user.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };


  const handleSelectAllUsersInAddUsersInGroup = (checked: boolean) => {
    if (checked) {
      setSelectedAddTabUsers(new Set(editUsersList.map(user => user.id)));
    } else {
      setSelectedAddTabUsers(new Set());
    }
  };

  const handleToggleSorting = (field: keyof SingleUser) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
      fetchGroupUsersList();
    } else {
      setSortBy(field);
      setOrder('ASC');

    }
  };


  const handleSelectGroupUser = (userId: string, checked: boolean) => {
    const updatedSelectedUsers = new Set(selectedUsers);
    if (checked) {
      updatedSelectedUsers.add(userId);
    } else {
      updatedSelectedUsers.delete(userId);
    }
    setSelectedUsers(updatedSelectedUsers);
  };



  const handleSelectAddUser = (userId: string, checked: boolean) => {
    const updatedSelectedUsers = new Set(selectedAddTabUsers);
    if (checked) {
      updatedSelectedUsers.add(userId);
    } else {
      updatedSelectedUsers.delete(userId);
    }
    setSelectedAddTabUsers(updatedSelectedUsers);
  };



  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-transparent' onClick={handleEditGroup}>
            <Edit className='h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className='w-[1000px] max-w-none'>
          <DialogTitle className='flex flex-row items-center gap-4'>
            <div className="flex flex-row items-center text-primary">
              <Edit className='h-4 w-4 mr-2' />
              Edit Group
            </div>
            <div className="flex flex-row items-center justify-center mr-10 text-muted-foreground">
              | &nbsp; &nbsp;
              <Users className='h-4 w-4 mr-2' />
              {editUsersList.length}
            </div>
          </DialogTitle>
          <div className="flex flex-col gap-2">
            <Label htmlFor='name' className='ml-1'>Group Name</Label>
            <Input
              id="name"
              placeholder="e.g : english group"
              onChange={(e) => setGroupName(e.target.value)}
              onBlur={handleChangeGroupName}
              value={groupName}
              minLength={3}
              maxLength={50}
              required />
          </div>
          <Tabs defaultValue="group" className="w-full">
            <div className="flex w-full justify-between">
              <TabsList className="grid grid-cols-2 text-sm w-[300px]">
                <TabsTrigger value="group" onClick={() => setCurrentTab(0)}>Group Users</TabsTrigger>
                <TabsTrigger value="add" onClick={() => {
                  initAddUsersTab();
                  setCurrentTab(1);
                }}> + Add Users</TabsTrigger>
              </TabsList>
              {
                removingUsers ? (
                  <Button variant="destructive">
                    <Loader2 className='h-4 w-4 animate-spin' />
                  </Button>
                ) : (
                  <Button
                    className={selectedUsers.size > 0 ? "flex" : "hidden"}
                    variant="destructive"
                    onClick={() => handleUserRemoveFromGroup(Array.from(selectedUsers))}>
                    <Trash2 className='h-4 w-4 mr-2' />
                    Remove Users
                  </Button>
                )
              }
            </div>
            <TabsContent value="group" className='w-full'>
              <Card
                className="h-[600px] w-full overflow-y-auto p-0"
              >
                <CardContent className='p-0'>
                  <Table>
                    <TableHeader>
                      <Schema
                        toggleSorting={handleToggleSorting}
                        sortBy={sortBy}
                        order={order}
                        allSelected={allSelected}
                        onSelectAll={handleSelectAllUsersInGroup}
                      />
                    </TableHeader>
                    <TableBody>
                      {editUsersList.map((user: SingleUser) => (
                        <Row
                          key={user.id}
                          user={user}
                          selected={selectedUsers.has(user.id)}
                          onSelectUser={handleSelectGroupUser}
                          refreshUsers={refreshUsers}
                          loading={loadingUsers}
                          removingUser={removingUser}
                          removeUser={() => handleUserRemoveFromGroup([user.id])}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="add">
              <Card
                className="h-[600px] w-full overflow-y-auto p-0"
              >
                <CardContent className='p-0'>
                  <Table>
                    <TableHeader>
                      <AddUsersSchema
                        toggleSorting={handleToggleSorting}
                        sortBy={sortBy}
                        order={order}
                        allSelected={allSelectedAddTabUsers}
                        onSelectAll={handleSelectAllUsersInAddUsersInGroup}
                      />
                    </TableHeader>
                    <TableBody>
                      {unAddedUsers.map((user: SingleUser) => (
                        <AddUsersRow
                          key={user.id}
                          user={user}
                          selected={selectedAddTabUsers.has(user.id)}
                          onSelectUser={handleSelectAddUser}
                          refreshUsers={refreshUsers}
                          loading={loadingUsers}
                          addingUser={addingUser}
                          addUser={() => handleAddUserToGroup(user.id, `${user.first_name + " " + user.last_name}`, group.name)}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog >
    </>
  )
}

interface AddUsersSchemaProps {
  toggleSorting: (field: keyof SingleUser) => void;
  sortBy: keyof SingleUser;
  order: "ASC" | "DESC";
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

const AddUsersSchema: React.FC<AddUsersSchemaProps> = ({ toggleSorting, sortBy, order, allSelected, onSelectAll, }) => (
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
    <TableHead className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-default">
        <PlusSquare className='h-4 w-4' />
        Add
      </div>
    </TableHead>
  </TableRow>
);

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
    <TableHead className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-default">
        <Trash2 className='h-4 w-4' />
      </div>
    </TableHead>
  </TableRow>
);

interface AddUsersRowProps {
  user: SingleUser;
  selected: boolean;
  onSelectUser: (userId: string, checked: boolean) => void;
  refreshUsers: () => void;
  loading: boolean;
  addingUser: boolean;
  addUser: () => void;
}

const AddUsersRow: React.FC<AddUsersRowProps> = ({ user, selected, onSelectUser, loading, addingUser, addUser }) => {
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
          <Badge variant="outline" className="hover:bg-secondary hover:cursor-default">
            {user.email}
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {loading ? (
          <Skeleton className="w-32 h-4" />
        ) : (
          <Badge variant="outline" className="hover:bg-secondary cursor-default">
            {user.phone}
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {addingUser ?
          <div className='flex text-primary items-center flex-row gap-2'>
            <Loader className='h-4 w-4 animate-spin text-primary' />
            Adding
          </div> : loading ? (
            <Skeleton className="w-12 h-4" />
          ) : (
            <button onClick={addUser} className='flex flex-row items-center justify-center text-primary'>
              <Plus className='h-4 w-4 mr-2' />
              Add
            </button>
          )}
      </TableCell>
    </TableRow >
  )
}


interface RowProps {
  user: SingleUser;
  selected: boolean;
  onSelectUser: (userId: string, checked: boolean) => void;
  refreshUsers: () => void;
  loading: boolean;
  removingUser: boolean;
  removeUser: () => void;
}

const Row: React.FC<RowProps> = ({ user, selected, onSelectUser, loading, removingUser, removeUser }) => {
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
          <Badge variant="outline" className="hover:bg-secondary hover:cursor-default">
            {user.email}
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {loading ? (
          <Skeleton className="w-32 h-4" />
        ) : (
          <Badge variant="outline" className="hover:bg-secondary cursor-default">
            {user.phone}
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {removingUser ? <Loader className='h-4 w-4 animate-spin dark:text-red-600 text-red-400' /> : loading ? (
          <Skeleton className="w-32 h-4" />
        ) : (
          <button onClick={removeUser}>
            <Trash2 className='h-4 w-4 dark:text-red-600 text-red-400' />
          </button>
        )}
      </TableCell>
    </TableRow >
  )
}

export default EditUserDialog