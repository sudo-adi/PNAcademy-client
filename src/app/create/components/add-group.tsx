"use client"
import { useGroups } from '@/app/dashboard/views/manage-groups/hooks/useGroups';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { addGroupToAssessment, removeGroupFromAssessment } from '@/lib/services/assessment/assessment-service';
import { Group } from '@/lib/types/groupTypes';
import { Plus, SearchIcon, Users, Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const AddGroup: React.FC<{ assessmentId: string, isDialogOpen: boolean }> = ({ assessmentId, isDialogOpen }) => {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [searchList, setSearchList] = useState<Group[]>([]);
  const [assignedGroups, setAssignedGroups] = useState<string[]>([]);
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const { groups, loading, fetchedGroupsRes, fetchGroups } = useGroups();

  useEffect(() => {
    const fetchGroupsList = async () => {
      await fetchGroups({
        page: 1,
        pageSize: 9999,
        sortBy: 'name',
        order: order,
      });
      setGroupList(fetchedGroupsRes?.data.groups || []);
      setAssignedGroups([]);
    };
    fetchGroupsList();
  }, [order]);


  useEffect(() => {
    setGroupList(groups);
  }, [groups]);

  const handleAssignGroup = async (groupId: string) => {
    try {
      await addGroupToAssessment({ assessmentId, groupId });
      setAssignedGroups((prev) => [...prev, groupId]);
    } catch (error) {
      console.error("Failed to assign group to assessment:", error);
    }
  };

  const handleUnassignGroup = async (groupId: string) => {
    try {
      await removeGroupFromAssessment({ assessmentId, groupId });
      setAssignedGroups((prev) => prev.filter(id => id !== groupId));
    } catch (error) {
      console.error("Failed to unassign group from assessment:", error);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen}>
        <DialogContent className="w-[400px] max-w-none">
          <DialogHeader>
            <DialogTitle className="flex flex-row">
              <Users className="h-4 w-4 mr-2" />
              Add groups
            </DialogTitle>
            <DialogDescription>
              Add Groups to assign the assessment...
            </DialogDescription>
            <div className="flex flex-row gap-2 py-4">
              <Input
                id="Search"
                type="email"
                placeholder="Search..."
                required
              />
              <Button id="Search">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <Card className="h-[400px] overflow-y-auto p-0">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <Schema
                      toggleSorting={() => setOrder(order === "ASC" ? "DESC" : "ASC")}
                      sortBy="name"
                      order={order}
                    />
                  </TableHeader>
                  <TableBody>
                    {groupList.map((group: Group) => (
                      <Row
                        key={group.id}
                        group={group}
                        loading={loading}
                        assigned={assignedGroups.includes(group.id)}
                        onAssign={handleAssignGroup}
                        onUnassign={handleUnassignGroup}
                      />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full justify-between gap-2">
              <Button variant="default">
                <Plus className="h-4 w-4 mr-2" />
                Add Groups
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface SchemaProps {
  toggleSorting: () => void;
  sortBy: keyof Group;
  order: "ASC" | "DESC";
}

const Schema: React.FC<SchemaProps> = ({ toggleSorting, order }) => (
  <TableRow>
    <TableHead onClick={toggleSorting}>
      <div className="flex gap-2 items-center cursor-pointer">
        <Users className="h-4 w-4" />
        Name {order === "ASC" ? "↓" : "↑"}
      </div>
    </TableHead>
    <TableHead className="flex flex-row justify-end items-center">
      + Add
    </TableHead>
  </TableRow>
);

interface RowProps {
  group: Group;
  loading: boolean;
  assigned: boolean;
  onAssign: (id: string) => void;
  onUnassign: (id: string) => void;
}

const Row: React.FC<RowProps> = ({ group, loading, assigned, onAssign, onUnassign }) => (
  <TableRow>
    <TableCell className="font-medium text-left">
      {loading ? <Skeleton className="w-32 h-4" /> : group.name}
    </TableCell>
    <TableCell className="w-8">
      <button onClick={() => (assigned ? onUnassign(group.id) : onAssign(group.id))}>
        <Badge>
          {assigned ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {assigned ? "Added" : "Add"}
        </Badge>
      </button>
    </TableCell>
  </TableRow>
);

export default AddGroup;
