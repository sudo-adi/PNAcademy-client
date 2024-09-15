import React, { use, useEffect, useState } from "react";
import { useGroups } from "@/app/dashboard/views/manage-groups/hooks/useGroups";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { addGroupToAssessment, removeGroupFromAssessment } from "@/lib/services/assessment/assessment-service";
import useCreateAssessmentDetailsStore from "@/lib/stores/manage-assessment-store/assessment-details";
import { Group } from "@/lib/types/groupTypes";
import { Check, Plus, Users } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

interface GroupBadgeProps {
  assessmentId: string;
}

const AddGroup: React.FC<GroupBadgeProps> = ({ assessmentId }) => {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const { groups, loading, fetchGroups, fetchAssignedGroups, assignedGroups: ass } = useGroups();
  const { assignedGroups, setAssignedGroups, } = useCreateAssessmentDetailsStore();

  useEffect(() => {
    const fetchGroupsList = async () => {
      await fetchGroups({
        page: 1,
        pageSize: 9999,
        sortBy: 'name',
        order: order,
      });
      setGroupList(groups);
    };

    fetchGroupsList();
  }, [order]);

  const handleAssignGroup = async (groupId: string) => {
    try {
      await addGroupToAssessment({ assessmentId, groupId });
      const prev = assignedGroups;
      setAssignedGroups([...prev, groupId]);
    } catch (error) {
      console.error("Failed to assign group to assessment:", error);
    }
  };

  useEffect(() => {
    console.log(ass);
  }, [ass]);

  const handleUnassignGroup = async (groupId: string) => {
    try {
      await removeGroupFromAssessment({ assessmentId, groupId });
      const prev = assignedGroups;
      setAssignedGroups(prev.filter((id) => id !== groupId));
    } catch (error) {
      console.error("Failed to unassign group from assessment:", error);
    }
  };


  useEffect(() => {
    console.log(assignedGroups);
    fetchAssignedGroups({ id: assessmentId });
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge>
          <Plus className='h-4 w-4 mr-2' />
          Add
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Groups</DialogTitle>
          <DialogDescription>
            Select groups to assign to this assessment.
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <Card className="h-[400px] overflow-y-auto p-0 w-full">
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
        </div>
        <DialogFooter>
          <DialogClose type="submit">
            <Button>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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