import { Card } from "@/components/ui/card";
import { SingleUser } from "@/lib/types/userTypes";
import React, { useState, useEffect } from "react";
import UserTableSchema from "./user-table-schema";
import UserTableRow from "./user-table-row";

interface UserTableProps {
  toggleSorting: (sortBy: keyof SingleUser) => void;
  sortBy: keyof SingleUser;
  order: "ASC" | "DESC";
  allSelected: boolean;
  users: SingleUser[];
  loadingUsers: boolean;
  selectedUsers: Set<string>;
  onSelectUser: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  refreshUsers: () => void;
}

const UserTable: React.FC<UserTableProps> = ({
  toggleSorting,
  sortBy,
  order,
  allSelected,
  users,
  selectedUsers,
  loadingUsers,
  onSelectUser,
  onSelectAll,
  refreshUsers,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card
      className={`
        my-2
        ${isMobile ? "h-[calc(100vh-14rem)]" : "h-[calc(100vh-18rem)]"}
        flex flex-col
      `}
    >
      <div className="relative flex-grow overflow-hidden rounded-2xl scrollbar-none">
        <div className="absolute inset-0 overflow-auto scrollbar-thin">
          <table className="w-full">
            <thead className="sticky bg-background top-0 z-10">
              <UserTableSchema
                toggleSorting={toggleSorting}
                sortBy={sortBy}
                order={order}
                allSelected={allSelected}
                onSelectAll={onSelectAll}
                isMobile={isMobile}
              />
            </thead>
            <tbody>
              {users.map((user: SingleUser) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  selected={selectedUsers.has(user.id)}
                  onSelectUser={onSelectUser}
                  refreshUsers={refreshUsers}
                  loading={loadingUsers}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default UserTable;
