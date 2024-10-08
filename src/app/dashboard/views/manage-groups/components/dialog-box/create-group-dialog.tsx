import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronDown, Loader2, Mail, Phone, Plus, PlusSquare, ScrollText, Trash2, User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { SingleUser } from '@/lib/types/userTypes';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useUsers } from '../../../manage-users/hooks/useUsers';
import useGroupUsersSelectTableStore from '@/lib/stores/manage-groups-store.ts/group-user-select-table-store';
import { ApiError } from '@/lib/api/apiError';
import { useGroups } from '../../hooks/useGroups';
import { Group } from '@/lib/types/groupTypes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRoles } from '../../../manage-users/hooks/useRoles';
import { Role } from '@/lib/types/roleTypes';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface CreateGroupDialogProps {
  refreshGroups: () => void;
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({ refreshGroups }) => {

  // all refs here
  const scrollRef = useRef<HTMLDivElement>(null);

  // all hooks here
  const { fetchUsers, fetchUsersByRoleId } = useUsers();
  const { fetchRoles } = useRoles();
  const { addGroup, addUsersInGroup } = useGroups();

  // global states here
  const { activePageIndex, displayNumberOfRows, sortBy, order, setOrder, setSortBy } = useGroupUsersSelectTableStore();

  // local states here
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [groupName, setGroupName] = useState<string>('');
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [group, setGroup] = useState<Group>();
  const [creatingGroup, setCreatingGroup] = useState<boolean>(false);
  const [users, setUsers] = useState<SingleUser[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleTab, setRoleTab] = useState<number>();
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
  const [createGroupError, setCreateGroupError] = useState<ApiError | Error>();
  const [fetchUsersDataError, setFetchUsersDataError] = useState<ApiError | Error>();
  const [fetchUsersDataByRoleError, setFetchUersDataByRoleError] = useState<ApiError | Error>();
  const [fetchRolesDataError, setFetchRolesDataError] = useState<ApiError | Error>();


  // local vars here
  const allSelected = users.length > 0 && selectedUsers.size === users.length;


  // local functions here
  const fetchUsersData = useCallback(async () => {
    setLoadingUsers(true);
    const payload = {
      page: activePageIndex,
      pageSize: displayNumberOfRows,
      sortBy,
      order
    };
    try {
      const response = await fetchUsers(payload);
      setUsers(response.users);
    } catch (err) {
      if (err instanceof ApiError) {
        setFetchUsersDataError(err);
        toast({
          title: "Error",
          description: `An error occurred while creating group ${err.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      } else {
        setFetchUsersDataError(err as Error);
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while creating group ${error.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      }
    } finally {
      setLoadingUsers(false);
    }
  }, [sortBy, order]);

  const fetchUsersDataByRole = useCallback(async (roleId: string) => {
    setLoadingUsers(true);
    try {
      const response = await fetchUsersByRoleId({ roleId });
      setUsers(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setFetchUersDataByRoleError(err);
        toast({
          title: "Error",
          description: `An error occurred while creating group ${err.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      } else {
        setFetchUersDataByRoleError(err as Error);
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while creating group ${error.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      }
    } finally {
      setLoadingUsers(false);
    }
  }, [selectedRole]);

  const fetchRolesData = useCallback(async () => {
    const payload = {
      page: 1,
      pageSize: 9999,
      sortBy: 'name' as 'name',
      order: 'ASC' as 'ASC',
    }
    try {
      setLoadingRoles(true);
      const response = await fetchRoles(payload);
      setRoles(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setFetchRolesDataError(err);
        toast({
          title: "Error",
          description: `An error occurred while fetching roles ${err.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      } else {
        setFetchRolesDataError(err as Error);
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while fetching roles ${error.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      }
    } finally {
      setLoadingRoles(false);
    }
  }, []);

  const createGroupWithUsers = async () => {
    setCreatingGroup(true);
    const payload = {
      name: groupName
    };
    setStatusDialogOpen(true);
    try {
      const response = await addGroup(payload);
      setGroup(response);
      if (response.id) {
        await addUsersInGroup({ userIds: Array.from(selectedUsers), groupId: response.id });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setCreateGroupError(err);
        toast({
          title: "Error",
          description: `An error occurred while creating group ${err.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      } else {
        setCreateGroupError(err as Error);
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while creating group ${error.message}`,
          action: (
            <ToastAction altText="error">
              ok
            </ToastAction>
          ),
        })
      }
    } finally {
      setGroupName("");
      setSelectedUsers(new Set());
      refreshGroups();
      setCreatingGroup(false);
    }
  }

  // handlers here
  const handleRefreshUsers = () => {
    fetchUsersData();
  };

  const handleToggleSorting = (field: keyof SingleUser) => {
    if (sortBy === field) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setOrder('ASC');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(users.map(user => user.id)));
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


  const handleCloseStatusDialog = () => {
    setStatusDialogOpen(false);
    setGroupName('');
    setSelectedRole(undefined);
    setSelectedUsers(new Set());
    setCreateGroupError(undefined);
  }

  // Scroll function that triggers when hovering over the tabs list
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };


  // UseEffects here
  useEffect(() => {
    fetchRolesData();
  }, []);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);












  interface data {
    [key: string]: {
      users: SingleUser[],
      selectedUsers: Set<string>,
      allSelected: boolean,
      loading: boolean
    }
  }

  const [roleTabsData, setRoleTabsData] = useState<data>({});

  const handleAllSelect = (roleId: string, checked: boolean) => {
    setRoleTabsData(prev => {
      const updatedData = { ...prev[roleId] };
      if (checked) {
        updatedData.selectedUsers = new Set(updatedData.users.map(user => user.id));
        updatedData.allSelected = true;
      } else {
        updatedData.selectedUsers = new Set();
        updatedData.allSelected = false;
      }
      return { ...prev, [roleId]: updatedData };
    });
  };

  const handleUserSelect = (roleId: string, userId: string, checked: boolean) => {
    setRoleTabsData(prev => {
      const updatedData = { ...prev[roleId] };
      const updatedSelectedUsers = new Set(updatedData.selectedUsers);
      if (checked) {
        updatedSelectedUsers.add(userId);
      } else {
        updatedSelectedUsers.delete(userId);
      }
      updatedData.selectedUsers = updatedSelectedUsers;
      updatedData.allSelected = updatedSelectedUsers.size === updatedData.users.length;
      return { ...prev, [roleId]: updatedData };
    });
  };

  const handleError = (err: any, context: string) => {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    toast({
      title: "Error",
      description: `An error occurred while ${context}: ${errorMessage}`,
      action: <ToastAction altText="error">ok</ToastAction>,
    });
  };

  useEffect(() => {
    const initializeRoleTabs = async () => {
      try {
        const rolesResponse = await fetchRoles({
          page: 1,
          pageSize: 9999,
          sortBy: 'name',
          order: 'ASC',
        });
        setRoles(rolesResponse);
        const initialRoleTabsData: data = {};
        rolesResponse.forEach(role => {
          initialRoleTabsData[role.id] = {
            users: [],
            selectedUsers: new Set(),
            allSelected: false,
            loading: false
          };
        });
        setRoleTabsData(initialRoleTabsData);
      } catch (err) {
        handleError(err, 'fetching roles');
      }
    };
    initializeRoleTabs();
  }, []);

  const [currentRoleId, setCurrentRoleId] = useState<string>("");

  // const renderRoleTabContent = (roleId: string) => {
  //   const { users, selectedUsers, allSelected, loading } = roleTabsData[roleId];
  //   return (
  //     <TabsContent value={roleId}>
  //       <Card className="h-[600px] overflow-y-auto p-0">
  //         <CardContent className='p-0'>
  //           <Table>
  //             <TableHeader>
  //               <UsersSchema
  //                 toggleSorting={handleToggleSorting}
  //                 sortBy={sortBy}
  //                 order={order}
  //                 allSelected={allSelected}
  //                 onSelectAll={(checked) => handleAllSelect(roleId, checked)}
  //               />
  //             </TableHeader>
  //             <TableBody>
  //               {users.map((user: SingleUser) => (
  //                 <UsersRow
  //                   key={user.id}
  //                   user={user}
  //                   selected={selectedUsers.has(user.id)}
  //                   onSelectUser={(userId, checked) => handleUserSelect(roleId, userId, checked)}
  //                   refreshUsers={() => fetchUsersDataByRole(roleId)}
  //                   loading={loading}
  //                   roles={roles}
  //                 />
  //               ))}
  //             </TableBody>
  //           </Table>
  //         </CardContent>
  //       </Card>
  //     </TabsContent>
  //   );
  // };

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
              Creating group will allow you to assign multiple users to a single group.
            </DialogDescription>
            <div className="flex flex-col gap-2 py-1 pt-4">
              <Label htmlFor='name' className='ml-1'>Group Name</Label>
              <Input
                id="name"
                value={groupName}
                type="email"
                placeholder="e.g : english group"
                onChange={(e) => setGroupName(e.target.value)}
                required />
            </div>

            <Tabs defaultValue="group" className="w-full">
              <div className="flex w-full justify-between">
                <div className="flex flex-row gap-2">
                  <TabsList className="grid grid-cols-1 text-sm w-[150px]">
                    <TabsTrigger value="group">Seleted Users</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid grid-cols-1 text-sm w-[100px]">
                    <TabsTrigger value="all">All Users</TabsTrigger>
                  </TabsList>
                  <TabsList
                    className="flex flex-row max-w-[400px] items-start justify-start overflow-x-hidden hover:overflow-x-auto scrollbar-none"
                    onWheel={handleScroll}
                    ref={scrollRef}
                  >

                    {roles.map((role: Role, index) => (
                      <TabsTrigger value={`${index}`} onClick={() => {
                        setCurrentRoleId(role.id)

                      }}>
                        {role.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {/* button  */}
              </div>
              <TabsContent value="group" className='w-full'>
                <Card
                  className="h-[600px] overflow-y-auto p-0"
                >
                  <CardContent className='p-0'>
                    <Table>
                      <TableHeader>
                        <SelectedUsersSchema
                          toggleSorting={handleToggleSorting}
                          sortBy={sortBy}
                          order={order}
                          allSelected={allSelected}
                          onSelectAll={handleSelectAll}
                        />
                      </TableHeader>
                      <TableBody>
                        {users.map((user: SingleUser) => (
                          <SelectedUsersRow
                            key={user.id}
                            user={user}
                            selected={selectedUsers.has(user.id)}
                            onSelectUser={handleSelectUser}
                            refreshUsers={handleRefreshUsers}
                            loading={loadingUsers}
                            roles={roles}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="all">
                <Card
                  className="h-[600px] overflow-y-auto p-0"
                >
                  <CardContent className='p-0'>
                    <Table>
                      <TableHeader>
                        <UsersSchema
                          toggleSorting={handleToggleSorting}
                          sortBy={sortBy}
                          order={order}
                          allSelected={allSelected}
                          onSelectAll={handleSelectAll}
                        />
                      </TableHeader>
                      <TableBody>
                        {users.map((user: SingleUser) => (
                          <UsersRow
                            key={user.id}
                            user={user}
                            selected={selectedUsers.has(user.id)}
                            onSelectUser={handleSelectUser}
                            refreshUsers={handleRefreshUsers}
                            loading={loadingUsers}
                            roles={roles}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* {renderRoleTabContent(currentRoleId)} */}
            </Tabs>
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
                  Remove All
                </Button>

              </div>

              <div className="flex flex-row items-center gap-2">
                <Button
                  disabled={selectedUsers.size > 0 && groupName.length > 2 ? false : true}
                  variant="default"
                  onClick={createGroupWithUsers}>
                  <Plus className='h-4 w-4 mr-2' />
                  Create Group
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{createGroupError ? 'Error' : 'Group Created'}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {creatingGroup ? <Loader2 className='animate-spin' /> : createGroupError ? createGroupError.message
              : `Group ${group?.name} with ${selectedUsers.size} members
               Created Successfully`}</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="default"
                onClick={handleCloseStatusDialog}
              >Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Selected Users Row and Schema
interface SelectedUsersSchemaProps {
  toggleSorting: (field: keyof SingleUser) => void;
  sortBy: keyof SingleUser;
  order: "ASC" | "DESC";
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

const SelectedUsersSchema: React.FC<SelectedUsersSchemaProps> = ({ toggleSorting, sortBy, order, allSelected, onSelectAll, }) => (
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
    <TableHead>
      <div className="flex gap-2 items-center cursor-pointer">
        <ScrollText className="h-4 w-4" />
        Role
      </div>
    </TableHead>
    <TableHead className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-default">
        <Phone className='h-4 w-4' />
        Phone Number
      </div>
    </TableHead>
    <TableHead>
      <Trash2 className='h-4 w-4' />
    </TableHead>
  </TableRow>
);


interface SelectedUsersRowProps {
  user: SingleUser;
  selected: boolean;
  onSelectUser: (userId: string, checked: boolean) => void;
  refreshUsers: () => void;
  loading: boolean;
  roles: Role[]
}

const SelectedUsersRow: React.FC<SelectedUsersRowProps> = ({ user, selected, onSelectUser, loading, roles }) => {
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
          <Badge variant="outline" className="hover:bg-secondary hover:cursor-default">
            {user.email}
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {user?.role_id && Array.isArray(roles) ? roles.find(role => role.id === user.role_id)?.name || "No role" : "No role"}
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
        <button>
          <Trash2 className='h-4 w-4 text-destructive' />
        </button>
      </TableCell>
    </TableRow >
  )
}


// Selected Users Row and Schema
interface UsersSchemaProps {
  toggleSorting: (field: keyof SingleUser) => void;
  sortBy: keyof SingleUser;
  order: "ASC" | "DESC";
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

const UsersSchema: React.FC<UsersSchemaProps> = ({ toggleSorting, sortBy, order, allSelected, onSelectAll, }) => (
  <TableRow>
    <TableHead className="sm:table-cell">
      <div className="flex w-4 items-center gap-2">
        <Checkbox
          checked={allSelected}
          onCheckedChange={(checked) => onSelectAll(checked as boolean)} />
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
    <TableHead>
      <div className="flex gap-2 items-center cursor-pointer">
        <ScrollText className="h-4 w-4" />
        Role
      </div>
    </TableHead>
    <TableHead className="hidden md:table-cell">
      <div className="flex gap-2 items-center cursor-default">
        <Phone className='h-4 w-4' />
        Phone Number
      </div>
    </TableHead>
    <TableHead>
      <div className="flex flex-row items-center gap-2">
        <PlusSquare className='h-4 w-4' />
        Add
      </div>
    </TableHead>
  </TableRow>
);

interface UsersRowProps {
  user: SingleUser;
  selected: boolean;
  onSelectUser: (userId: string, checked: boolean) => void;
  refreshUsers: () => void;
  loading: boolean;
  roles: Role[];
}

const UsersRow: React.FC<UsersRowProps> = ({ user, selected, onSelectUser, loading, roles }) => {
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
      <TableCell className="font-medium text-left">
        <Badge variant="outline" className="hover:bg-secondary hover:cursor-default">
          {user?.role_id && Array.isArray(roles) ? roles.find(role => role.id === user.role_id)?.name || "No role" : "No role"}
        </Badge>
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
        <button className='text-primary'>
          + Add
        </button>
      </TableCell>
    </TableRow >
  )
}




export default CreateGroupDialog