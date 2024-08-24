
"use client";
import React from 'react';
import {
  BellPlus,
  FileCog,
  FilePieChart,
  Files,
  LayoutDashboard,
  LogOut,
  PieChart,
  Settings,
  UserCog,
  Users
} from 'lucide-react';
import SubHeader from './sub-header';
import useStore from '@/lib/stores/nav-store/store';
import { logout } from '@/lib/services/auth-service';
import NavButton from './nav-button';

const Nav: React.FC = () => {
  const { activeNavIndex, setActiveNavIndex } = useStore();

  const navItems = [
    { text: 'Home', icon: <LayoutDashboard /> },
    { text: 'Manage Assessment', icon: <FileCog /> },
    { text: 'My Assessments', icon: <Files /> },
    { text: 'Manage Reports', icon: <PieChart /> },
    { text: 'My Reports', icon: <FilePieChart /> },
    { text: 'Manage Users & Roles', icon: <UserCog /> },
    { text: 'Manage Groups', icon: <Users /> },
    { text: 'Manage Notifications', icon: <BellPlus /> },
    { text: 'Settings', icon: <Settings /> }
  ];

  return (
    <div className="flex h-full flex-col gap-2">
      <SubHeader />
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item, index) => (
            <NavButton
              key={index}
              text={item.text}
              icon={item.icon}
              isActive={activeNavIndex === index}
              onClick={() => {
                setActiveNavIndex(index);
                console.log('Active Nav Index:', index);
              }}
            />
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <NavButton
          text={'Logout'}
          icon={<LogOut />}
          onClick={
            logout
          }
        />
      </div>
    </div>
  );
}

export default Nav;
