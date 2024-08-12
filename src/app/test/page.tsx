"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { addGroupToAssessment, createAssessment, getAssessmentById, getAssessments, getAssignedAssessments, removeGroupFromAssessment, updateAssessment } from '@/lib/services/assessment/assessment-service'
import { createOption, deleteOption, updateOption } from '@/lib/services/assessment/option-service'
import { addTagToQuestion, createQuestion, deleteQuestion, getQuestionById, removeTagFromQuestion, updateQuestion } from '@/lib/services/assessment/question-service'
import { createTag, deleteTag, getTagById, getTags, updateTag } from '@/lib/services/assessment/tag-service'
import { addUsersToGroup, createGroup, deleteGroups, getGroups, GetUsersByGroupId, removeUsersFromGroup, updateGroup } from '@/lib/services/user-service/group-service'
import { createRole, deleteRoles, getRoles, updateRole } from '@/lib/services/user-service/role-service'
import { deleteUsers, getUsers, registerUser, updateUser } from '@/lib/services/user-service/user-service'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { permission } from 'process'
import React from 'react'


const Test = () => {


  // Assessment Related Data

  const createAssessmentData = {
    name: 'New Assessment 001',
    description: 'This is a test assessment 001 ',
    total_marks: 100,
    duration: 60,
    start_at: "2024-08-11T15:2s7:55.251Z",
    end_at: "2024-08-11T15:27:55.251Z",
    created_by: '9c4280a6-b736-48ff-a32f-98a0dfad7c03',
    is_active: true
  }

  const getAssessmentByIdData = {
    id: ""
  }

  const getAssessmentsData = {
    page: 1,
    pageSize: 10,
    sortBy: "name" as "name",
    order: "ASC" as "ASC"
  }

  const updateAssessmentData = {
    id: "9c4280a6-b736-48ff-a32f-98a0dfad7c03",
    name: 'Test',
    description: 'This is a test assessment',
    is_active: true,
    start_at: "2024-08-11T15:27:55.251Z",
    end_at: "2024-08-11T15:27:55.251Z",
  }

  const addGroupToAssessmentData = {
    assessmentId: "9c4280a6-b736-48ff-a32f-98a0dfad7c03",
    groupId: "9c4280a6-b736-48ff-a32"
  }

  const getAssignedAssessmentsData = {
    page: 1,
    pageSize: 10,
    sortBy: "name" as "name",
    order: "ASC" as "ASC"
  }


  const removeGroupFromAssessmentData = {
    "assessmentId": "37e1b6e0-5f8d-4999-ba76-c99b5b334f26",
    "groupId": "ddadf246-ab7d-44d0-a635-8686c3ac533c"
  }


  // Option Related Data
  const createOptionData = {
    "question_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "description": "string",
    "is_correct": true
  }

  const updateOptionData = {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "description": "string",
    "is_correct": true
  }

  const deleteOptionData = {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }

  // Question Related Data

  const createQuestionData = {
    assessment_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    description: "string",
    marks: 0,
    section: 0
  }

  const getQuestionByIdData = {
    id: "string"
  }

  const updateQuestionData = {
    id: "",
    description: "",
    marks: 30,
  }

  const deleteQuestionData = {
    id: ""
  }

  const addTagToQuestionData = {
    questionId: "",
    tagId: ""
  }

  const removetagFromQuestionData = {
    questionId: "",
    tagId: ""
  }

  // Tag Service Data

  const createTagData = {
    name: "string",
  }


  const getTagByIdData = {
    id: ""
  }

  const getTagsData = {
    page: 1,
    pageSize: 10,
    sortBy: "name" as "name",
    order: "ASC" as "ASC"
  }

  const updateTagData = {
    id: "",
    name: ""
  }

  const deleteTagData = {
    id: ""
  }

  // Role Service Data

  const createRoleData = {
    name: "Admin 2.0",
    permissions: {
      canManageAssessment: true,
      canManageUser: true,
      canManageRole: true,
      canManageNotification: true,
      canManageLocalGroup: true,
      canManageReports: true,
      canAttemptAssessment: true,
      canViewReport: true,
      canManageMyAccount: true,
      canViewNotification: true
    }
  }

  const getRolesData = {
    page: 1,
    pageSize: 10,
    sortBy: "name" as "name",
    order: "ASC" as "ASC"
  }

  const updateRolesData = {

    roleId: "string",
    name: "string",
    canManageAssessment: true,
    canManageUser: true,
    canManageRole: true,
    canManageNotification: true,
    canManageLocalGroup: true,
    canManageReports: true,
    canAttemptAssessment: true,
    canViewReport: true,
    canManageMyAccount: true,
    canViewNotification: true
  }

  const deleteRolesData = {
    roleIds: []
  }


  // User Service Data
  const registerUserData = {
    firstName: "new user",
    lastName: "Prasad",
    email: "sudoa.aditya@gmail.com",
    phone: "9891331105",
    password: "Aditya@183",
    roleId: "42d1c7bb-4c06-403a-ad40-e7a973fee9ca"
  }

  const getUsersData = {
    page: 1,
    pageSize: 10,
    sortBy: "id" as "id",
    order: "ASC" as "ASC"

  }

  const updateUsersData = {
    id: "fca8fd31-4762-4f59-a15e-0f9c3f53f5aa",
    dataToUpdate: {
      firstName: "Shreshth",
      lastName: "Verma",
      email: "vermashaab@badmosh.com",
      phone: "9898989898",
    }
  }

  const deleteUsersData = {
    userIds: [

    ]
  }

  const addUsersToGroupData = {
    groupId: "1392b101-0e1e-42a2-8b98-5ff19aeac900",
    userIds: [
      "9c4280a6-b736-48ff-a32f-98a0dfad7c03",
      "c8047eab-b10b-4639-be8e-9efd4a3fd437"

    ]
  }

  const removeUsersToGroupData = {
    groupId: "94bbff6c-0190-45d1-978a-8544f403a66e",
    userIds: [
      "9c4280a6-b736-48ff-a32f-98a0dfad7c03",
    ]
  }


  // Group Service Data

  const creategroupData = {
    name: "new group again"
  }

  const getGroupsData = {
    page: 1,
    pageSize: 10,
    sortBy: "name" as "name",
    order: "ASC" as "ASC"
  }

  const updateGroupData = {
    id: "string",
    name: "string"
  }

  const deleteGroupData = {
    groupIds: [
      "94bbff6c-0190-45d1-978a-8544f403a66e"
    ]
  }


  const getUsersByGroupIdData = {
    page: 1,
    pageSize: 10,
    sortBy: "id" as "id",
    order: "ASC" as "ASC",
    groupId: "94bbff6c-0190-45d1-978a-8544f403a66e"
  }
  return (
    <div className='flex flex-col items-center justify-center overflow-y-auto gap-5 p-10'>

      {/* Assessment service testing buttons */}
      <Card>
        <CardTitle className='w-96 p-10'>
          Assessment Test Buttons
        </CardTitle>
        <Separator />
        <CardContent className='flex flex-col gap-10'>
          <Button onClick={() => createAssessment(createAssessmentData)} className='w-96'>
            Create Assessment
          </Button>
          <Button onClick={() => getAssessmentById(getAssessmentByIdData)} className='w-96'>
            Get Assessment By Id
          </Button>
          <Button onClick={() => getAssessments(getAssessmentsData)} className='w-96'>
            Get Assessments
          </Button>
          <Button onClick={() => updateAssessment(updateAssessmentData)} className='w-96'>
            Update Assessment
          </Button>
          <Button onClick={() => addGroupToAssessment(addGroupToAssessmentData)} className='w-96'>
            Add Group to Assessments
          </Button>
          <Button onClick={() => getAssignedAssessments(getAssignedAssessmentsData)} className='w-96'>
            get Assigned Assessments
          </Button>
          <Button onClick={() => removeGroupFromAssessment(removeGroupFromAssessmentData)}>
            Remove a Group From an Assessment
          </Button>
        </CardContent>
      </Card>

      {/* Option service testing buttons */}
      <Card>
        <CardTitle className='w-96 p-10'>
          Option Test Buttons
        </CardTitle>
        <Separator />
        <CardContent className='flex flex-col gap-10'>
          <Button onClick={() => createOption(createOptionData)} className='w-96'>
            Create Option
          </Button>
          <Button onClick={() => updateOption(updateOptionData)} className='w-96'>
            Update Option
          </Button>
          <Button onClick={() => deleteOption(deleteOptionData)} className='w-96'>
            Delete Option
          </Button>
        </CardContent>
      </Card>

      {/* question service testing buttons */}
      <Card>
        <CardTitle className='w-96 p-10'>
          Question Test Buttons
        </CardTitle>
        <Separator />
        <CardContent className='flex flex-col gap-10'>
          <Button onClick={() => createQuestion(createQuestionData)} className='w-96'>
            Create Question
          </Button>
          <Button onClick={() => getQuestionById(getQuestionByIdData)} className='w-96'>
            Get Question By Id
          </Button>
          <Button onClick={() => updateQuestion(updateQuestionData)} className='w-96'>
            Update Question
          </Button>
          <Button onClick={() => deleteQuestion(deleteQuestionData)} className='w-96'>
            Delete Question
          </Button>
          <Button onClick={() => addTagToQuestion(addTagToQuestionData)} className='w-96'>
            Add Tag To Question
          </Button>
          <Button onClick={() => removeTagFromQuestion(removetagFromQuestionData)} className='w-96'>
            Remove Tag From Question
          </Button>
        </CardContent>
      </Card>

      {/* tag service buttons  */}
      <Card>
        <CardTitle className='w-96 p-10'>
          Tag Test Buttons
        </CardTitle>
        <Separator />
        <CardContent className='flex flex-col gap-10'>
          <Button onClick={() => createTag(createTagData)} className='w-96'>
            Create Tag
          </Button>
          <Button onClick={() => getTagById(getTagByIdData)} className='w-96'>
            Get Tag By ID
          </Button>
          <Button onClick={() => getTags(getTagsData)} className='w-96'>
            Get Tags
          </Button>
          <Button onClick={() => updateTag(updateTagData)} className='w-96'>
            Update Tags
          </Button>
          <Button onClick={() => deleteTag(deleteTagData)} className='w-96'>
            Delete Tag
          </Button>
        </CardContent>
      </Card>

      {/* role service test buttons */}
      <Card>
        <CardTitle className='w-96 p-10'>
          Role Test Buttons
        </CardTitle>
        <Separator />
        <CardContent className='flex flex-col gap-10'>
          <Button onClick={() => createRole(createRoleData)} className='w-96'>
            Create Role
          </Button>
          <Button onClick={() => getRoles(getRolesData)} className='w-96'>
            Get Tag By ID
          </Button>
          <Button onClick={() => updateRole(updateRolesData)} className='w-96'>
            Get Tags
          </Button>
          <Button onClick={() => deleteRoles(deleteRolesData)} className='w-96'>
            Update Tags
          </Button>
        </CardContent>
      </Card>

      {/* User service test buttons */}
      <Card>
        <CardTitle className='w-96 p-10'>
          User Test Buttons
        </CardTitle>
        <Separator />
        <CardContent className='flex flex-col gap-10'>
          <Button onClick={() => registerUser(registerUserData)} className='w-96'>
            Register User
          </Button>
          <Button onClick={() => getUsers(getUsersData)} className='w-96'>
            Get Users
          </Button>
          <Button onClick={() => updateUser(updateUsersData)} className='w-96'>
            Update Users
          </Button>
          <Button onClick={() => deleteUsers(deleteUsersData)} className='w-96'>
            Delete User
          </Button>
        </CardContent>
      </Card>

      {/* Group service test buttons */}
      <Card>
        <CardTitle className='w-96 p-10'>
          User Test Buttons
        </CardTitle>
        <Separator />
        <CardContent className='flex flex-col gap-10'>
          <Button onClick={() => createGroup(creategroupData)} className='w-96'>
            Create Group
          </Button>
          <Button onClick={() => getGroups(getGroupsData)} className='w-96'>
            Get Groups
          </Button>
          <Button onClick={() => updateGroup(updateGroupData)} className='w-96'>
            Update Groups
          </Button>
          <Button onClick={() => deleteGroups(deleteGroupData)} className='w-96'>
            Delete Groups
          </Button>
          <Button onClick={() => addUsersToGroup(addUsersToGroupData)} className='w-96'>
            Add Users To group
          </Button>
          <Button onClick={() => removeUsersFromGroup(removeUsersToGroupData)} className='w-96'>
            Remove Users From Group
          </Button>
          <Button onClick={() => GetUsersByGroupId(getUsersByGroupIdData)} className='w-96'>
            Get Users By Group Id
          </Button>
        </CardContent>
      </Card>
    </div>

  )
}

export default Test