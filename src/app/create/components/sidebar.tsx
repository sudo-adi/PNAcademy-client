"use client"
import React from 'react'
import SubHeader from './sub-header'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import TimePicker from './timePicker'
import useCreateAssessmentStore from '@/lib/stores/manage-assessment-store/assessment-details'
import Assessment from '@/app/assessment/page'

const Dropdown: React.FC<{ items: string[]; label: string }> = ({ items, label }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className='w-full' asChild>
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

interface FormInputProps {
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, placeholder, onChange, value }) => (
  <div>
    <Label className='p-2'>
      {label}
    </Label>
    <Input placeholder={placeholder} onChange={onChange} value={value} />
  </div>
)

interface FormTextareaProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ label, placeholder, onChange, value }) => (
  <div>
    <Label className='p-2'>
      {label}
    </Label>
    <Textarea placeholder={placeholder} onChange={onChange} value={value} />
  </div>
)


const SideBar: React.FC = () => {
  const {
    assessmentName,
    assessmentDescription,
    startAt,
    endAt,
    duration,
    createdBy,
    setAssessmentName,
    setAssessmentDescription,
    setDuration,
    setEndAt,
    setStartAt,
    setIsActive } = useCreateAssessmentStore()

  return (
    <div className="flex h-full flex-col gap-2 border-l">
      <div className="flex flex-col gap-4 p-4">
        <FormInput
          label="Assessment Name"
          placeholder="Enter assessment name"
          onChange={(e) => setAssessmentName(e.target.value)}
          value={assessmentName}
        />
        <FormTextarea
          label="Assessment Description"
          placeholder="Enter assessment description"
          onChange={(e) => setAssessmentDescription(e.target.value)}
          value={assessmentDescription} />
        <div className="flex flex-col">
          <Label className='p-2'>
            Starts at:
          </Label>
          <div className="flex items-start flex-row gap-2">

          </div>
        </div>
        <div className="flex flex-col">
          <Label className='p-2'>
            Ends at:
          </Label>
          <div className="flex items-center flex-row gap-2">

          </div>
        </div>
        <div className="flex flex-col">
          <Label className='p-2'>
            Duration :
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

export default SideBar
