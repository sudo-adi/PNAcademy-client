"use client"

import React from 'react'
import SubHeader from './sub-header'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '@/components/ui/textarea'
import { CalendarIcon } from "lucide-react"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

// Define TypeScript interfaces
interface FormInputs {
  dob: Date;
}

const FormSchema = z.object({
  dob: z.date({
    required_error: "Enter a valid date",
  }),
})

const DatePicker: React.FC = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="flex gap-2 w-full">
        Pick a Date
        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        disabled={(date) =>
          date > new Date() || date < new Date("1900-01-01")
        }
        initialFocus
      />
    </PopoverContent>
  </Popover>
)

const Dropdown: React.FC<{ items: string[]; label: string }> = ({ items, label }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">{label}</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {items.map((item) => (
        <DropdownMenuItem key={item}>
          <span>{item}</span>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

const SideBar: React.FC = () => {
  const form = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="flex h-full flex-col gap-2 border-l">
      <div className="flex flex-col gap-4 p-4">
        <FormInput label="Assessment Name" placeholder="Enter assessment name" />
        <FormTextarea label="Assessment Description" placeholder="Enter assessment description" />
        {/* <FormInput label="Groups" placeholder="Enter groups" /> */}
        {/* <FormInput label="Users" placeholder="Enter users" /> */}
        <div className="flex flex-col">
          <Label className='p-2'>
            Start at
          </Label>
          <div className="flex items-center flex-row gap-2">
            <DatePicker />
            <Dropdown items={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]} label="HH" />
            :
            <Dropdown items={["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"]} label="MM" />
            :
            <Dropdown items={["AM", "PM"]} label="AM" />
          </div>
        </div>
        <div className="flex flex-col">
          <Label className='p-2'>
            Ends at
          </Label>
          <div className="flex items-center flex-row gap-2">
            <DatePicker />
            <Dropdown items={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]} label="HH" />
            :
            <Dropdown items={["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"]} label="MM" />
            :
            <Dropdown items={["AM", "PM"]} label="AM" />
          </div>
        </div>
        <div className="flex flex-col">
          <Label className='p-2'>
            Duration
          </Label>
          <div className="flex items-center flex-row gap-2">
            <Dropdown items={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]} label="HH" />
            :
            <Dropdown items={["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"]} label="MM" />
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <SubHeader />
      </div>
    </div >
  )
}

const FormInput: React.FC<{ label: string; placeholder: string }> = ({ label, placeholder }) => (
  <div>
    <Label className='p-2'>
      {label}
    </Label>
    <Input placeholder={placeholder} />
  </div>
)

const FormTextarea: React.FC<{ label: string; placeholder: string }> = ({ label, placeholder }) => (
  <div>
    <Label className='p-2'>
      {label}
    </Label>
    <Textarea placeholder={placeholder} />
  </div>
)

export default SideBar
