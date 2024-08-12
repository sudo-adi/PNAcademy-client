"use client"
import React from 'react'
import OverView from '../views/overview/over-view'
import ManageUsers from '../views/manage-users/manage-users'
import ManageAssessments from '../views/manage-assessment/manage-assessment'
import Reports from '../views/reports/reports'
import Assessments from '../views/assessments/assessments'
import ManageGroups from '../views/manage-groups/manage-groups'
import ManageNotifications from '../views/manage-notifications/manage-notifications'
import useStore from '@/lib/stores/nav-store/store'
import ManageReports from '../views/manage-reports/manage-reports'
import Settings from '../views/settings/settings'

const views = [
  <OverView key={0} />,
  <ManageAssessments key={1} />,
  <Assessments key={2} />,
  <ManageReports key={3} />,
  <Reports key={4} />,
  <ManageUsers key={5} />,
  <ManageGroups key={6} />,
  <ManageNotifications key={7} />,
  <Settings key={8} />
]

const Body = () => {
  const { activeNavIndex } = useStore();
  return (
    <>
      {views[activeNavIndex]}
    </>
  )
}

export default Body