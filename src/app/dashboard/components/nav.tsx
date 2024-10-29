"use client";
import React, { useEffect, useState } from "react";
import {
  Bell,
  BellPlus,
  FileCog,
  FilePieChart,
  Files,
  LayoutDashboard,
  LogOut,
  PieChart,
  Settings,
  UserCog,
  Users,
} from "lucide-react";
import SubHeader from "./sub-header";
import useStore from "@/lib/stores/nav-store/store";
import { logout } from "@/lib/services/auth-service";
import NavButton from "./nav-button";
import { getDecodedTokenData } from "@/lib/utils/jwtUtils";
import { clearTokens } from "@/lib/utils/tokenManager";

const Nav: React.FC = () => {
  const { activeNavIndex, setActiveNavIndex } = useStore();
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const decodedTokenData = getDecodedTokenData();

    if (decodedTokenData) {
      const { permissions } = decodedTokenData;
      setPermissions(permissions); // Store permissions in state
    } else {
      console.error("No decoded token data found");
    }
  }, []);

  // Navigation items with corresponding required permissions
  const navItems = [
    {
      text: "Home",
      icon: <LayoutDashboard />,
      permission: null,
      disabled: false,
    }, // Accessible to all
    {
      text: "Manage Assessment",
      icon: <FileCog />,
      permission: "canManageAssessment",
      disabled: false,
    },
    {
      text: "My Assessments",
      icon: <Files />,
      permission: "canAttemptAssessment",
      disabled: false,
    },
    {
      text: "Manage Reports",
      icon: <PieChart />,
      permission: "canManageReports",
      disabled: false,
    },
    {
      text: "My Reports",
      icon: <FilePieChart />,
      permission: "canViewReport",
      disabled: false,
    },
    {
      text: "Manage Users & Roles",
      icon: <UserCog />,
      permission: "canManageUser",
      disabled: false,
    },
    {
      text: "Manage Groups",
      icon: <Users />,
      permission: "canManageLocalGroup",
      disabled: false,
    },
    {
      text: "Manage Notifications",
      icon: <BellPlus />,
      permission: "canManageNotification",
      disabled: false,
    },
    {
      text: "Notifications",
      icon: <Bell />,
      permission: "canViewNotification",
      disabled: false,
    },
    {
      text: "Settings",
      icon: <Settings />,
      permission: "canManageMyAccount",
      disabled: false,
    },
  ];

  return (
    <div className="flex h-full flex-col gap-2">
      <SubHeader />
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems
            .map((item, originalIndex) => ({ ...item, originalIndex })) // Preserve original index
            .filter(
              (item) =>
                !item.permission || permissions.includes(item.permission)
            ) // Filter items based on permissions
            .map((item) => (
              <NavButton
                disabled={item.disabled}
                key={item.originalIndex} // Use original index to correspond with the NavButton
                text={item.text}
                icon={item.icon}
                isActive={activeNavIndex === item.originalIndex} // Ensure isActive uses original index
                onClick={() => {
                  setActiveNavIndex(item.originalIndex);
                  console.log("Active Nav Index:", item.originalIndex);
                }}
              />
            ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <NavButton text={"Logout"} icon={<LogOut />} onClick={logout} />
      </div>
    </div>
  );
};

export default Nav;
