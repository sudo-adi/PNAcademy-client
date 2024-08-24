"use client"
import ToggleThemeSwitch from '@/components/common/toggle-theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import useStore from '@/lib/stores/nav-store/store'
import { BellPlus, CircleUser, FileCog, FilePieChart, Files, Home, LayoutDashboard, LineChart, Menu, Package, Package2, PieChart, Settings, ShoppingCart, UserCog, Users } from 'lucide-react'
import React from 'react'

const Header = () => {

  const Title = [
    <HeaderTitle title={'Home'} icon={<LayoutDashboard />} />,
    <HeaderTitle title={'Manage Assessments'} icon={<FileCog />} />,
    <HeaderTitle title={'My Assessments'} icon={<Files />} />,
    <HeaderTitle title={'Manage Reports'} icon={<PieChart />} />,
    <HeaderTitle title={'My Reports'} icon={<FilePieChart />} />,
    <HeaderTitle title={'Manage Users & Roles'} icon={<UserCog />} />,
    <HeaderTitle title={'Manage Groups'} icon={<Users />} />,
    <HeaderTitle title={'Manage Notifications'} icon={<BellPlus />} />,
    <HeaderTitle title={'Settings'} icon={<Settings />} />,
  ]
  const { activeNavIndex } = useStore();
  return (

    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <button
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="">PNAcademy</span>
            </button>
            <button
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </button>
            <button
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </button>
            <button
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </button>
            <button
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Customers
            </button>
            <button
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Analytics
            </button>
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our
                  support team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex items-center justify-between">
        <div className="flex">
          {Title[activeNavIndex]}
        </div>
        <ToggleThemeSwitch />
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
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}


interface HeaderTitleProps {
  title: string
  icon: React.ReactElement
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, icon }) => {

  const iconWithClass = React.cloneElement(icon, {
    className: `${icon.props.className || ''} h-4 w-4`
  });

  return (
    <div className="flex flex-row items-center gap-2">
      {iconWithClass}
      {title}
    </div>
  )
}



export default Header