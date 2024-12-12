import React, { useEffect, useState } from "react";
import { useGroups } from "../../../manage-groups/hooks/useGroups";
import { Group } from "@/lib/types/groupTypes";
import { Loader } from "lucide-react";
import ReportGroupCard from "../cards/report-group-card";

const ReportsByGroups = () => {
  const { fetchGroups } = useGroups();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const payload = {
      page: 1,
      pageSize: 9999,
      sortBy: "name" as "name",
      order: "ASC" as "ASC",
    };
    try {
      const response = await fetchGroups(payload);
      if (response) {
        setGroups(response.groups);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-12rem)] w-full items-center justify-center">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin">
      {groups.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-0">
          {groups.map((group) => (
            <ReportGroupCard
              key={group.id}
              groupId={group.id}
              groupName={group.name}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          No groups available
        </div>
      )}
    </div>
  );
};

export default ReportsByGroups;
