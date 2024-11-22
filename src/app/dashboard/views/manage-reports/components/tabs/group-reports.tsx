import React, { useEffect, useState } from "react";
import { useGroups } from "../../../manage-groups/hooks/useGroups";
import { Group } from "@/lib/types/groupTypes";
import { Loader } from "lucide-react";
import ReportGroupCard from "../cards/report-group-card";

const ReportsByGroups = () => {
  const { fetchGroups } = useGroups();
  // Initialize reportsData as an empty array
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
      console.log(response);
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

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin">
      {loading && (
        <div className="flex h-full w-full items-center justify-center">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      )}

      {!loading && (
        <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-2 p-2">
          {groups.length > 0 ? (
            groups.map((group) => (
              <ReportGroupCard
                key={group.id}
                groupId={group.id}
                groupName={group.name}
              />
            ))
          ) : (
            <div>No reports available</div> // Optional: Display a message when there are no reports
          )}
        </main>
      )}
    </div>
  );
};

export default ReportsByGroups;
