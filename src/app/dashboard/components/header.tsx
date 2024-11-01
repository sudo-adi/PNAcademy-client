"use client";
import ToggleThemeSwitch from "@/components/common/toggle-theme-switch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useStore from "@/lib/stores/nav-store/store";
import { clearTokens } from "@/lib/utils/tokenManager";
import {
  Bell,
  BellPlus,
  CircleUser,
  FileCog,
  FilePieChart,
  Files,
  Home,
  LayoutDashboard,
  LineChart,
  Menu,
  Package,
  Package2,
  PieChart,
  Settings,
  ShoppingCart,
  UserCog,
  Users,
} from "lucide-react";
import React from "react";
import Nav from "./nav";
import { ThemeColorToggle } from "@/components/common/theme-color-sitcher";

const Header = () => {
  const handleLogOut = () => {
    clearTokens();
    window.location.href = "/login";
  };
  const Title = [
    <HeaderTitle title={"Home"} icon={<LayoutDashboard />} />,
    <HeaderTitle title={"Manage Assessments"} icon={<FileCog />} />,
    <HeaderTitle title={"My Assessments"} icon={<Files />} />,
    <HeaderTitle title={"Manage Reports"} icon={<PieChart />} />,
    <HeaderTitle title={"My Reports"} icon={<FilePieChart />} />,
    <HeaderTitle title={"Manage Users & Roles"} icon={<UserCog />} />,
    <HeaderTitle title={"Manage Groups"} icon={<Users />} />,
    <HeaderTitle title={"Manage Notifications"} icon={<BellPlus />} />,
    <HeaderTitle title={"Settings"} icon={<Bell />} />,
    <HeaderTitle title={"Settings"} icon={<Settings />} />,
  ];
  const { activeNavIndex } = useStore();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Nav />
        </SheetContent>
      </Sheet>
      <div className="w-full flex items-center justify-between">
        <div className="flex">{Title[activeNavIndex]}</div>
        <div className="flex flex-row items-center gap-4">
          <ThemeColorToggle />
          <ToggleThemeSwitch />
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button onClick={handleLogOut}>Logout</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

interface HeaderTitleProps {
  title: string;
  icon: React.ReactElement;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, icon }) => {
  const iconWithClass = React.cloneElement(icon, {
    className: `${icon.props.className || ""} h-4 w-4`,
  });

  return (
    <div className="flex flex-row items-center gap-2">
      {iconWithClass}
      {title}
    </div>
  );
};

export default Header;
