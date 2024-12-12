import { Card } from "@/components/ui/card";
import { ArchiveIcon, CircleDot, CircleIcon, UsersIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDashboardStats } from "./hooks/useDashboard";

const OverView = () => {
  const [totalAssessments, setTotalAssessments] = useState<number>(0);
  const [ongoingAssessmentsCount, setOngoingAssessmentsCount] =
    useState<number>(0);
  const [scheduledAssessmentsCount, setScheduledAssessmentsCount] =
    useState<number>(0);
  const [pastAssessmentsCount, setPastAssessmentsCount] = useState<number>(0);
  const [draftAssessmentsCount, setDraftAssessmentsCount] = useState<number>(0);
  const { fetchAllDashboardStats } = useDashboardStats();
  const fetchStats = async () => {
    try {
      const stats = await fetchAllDashboardStats();
      setTotalAssessments(stats.totalAssessments);
      setOngoingAssessmentsCount(stats.ongoingAssessmentsCount);
      setScheduledAssessmentsCount(stats.scheduledAssessmentsCount);
      setPastAssessmentsCount(stats.pastAssessmentsCount);
      setDraftAssessmentsCount(stats.draftAssessmentsCount);
    } catch (err) {}
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col h-full gap-4 max-h-[calc(100vh-7rem)] overflow-y-scroll scrollbar-none">
      <div className="flex gap-4">
        <Card className="flex flex-col p-4 w-full h-[10rem] cursor-pointer">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-bold text-muted-foreground">
              Total
              <br /> Assessments
            </h1>
          </div>
          <div className="flex flex-row items-end justify-between h-full">
            <CircleDot className="h-6 w-6 text-primary" />
            <h1 className="text-6xl font-bold text-primary">
              {totalAssessments}
            </h1>
          </div>
        </Card>
        <Card className="flex flex-col p-4 w-full h-[10rem] cursor-pointer">
          <h1 className="text-sm font-bold text-muted-foreground">
            Ongoing
            <br /> Assessments
          </h1>
          <div className="flex flex-row items-end justify-between h-full">
            <div className="relative">
              <CircleIcon className="absolute h-6 w-6 text-green-500 dark:text-green-700 animate-ping" />
              <CircleDot className="h-6 w-6 text-green-500 dark:text-green-700" />
            </div>
            <h1 className="text-6xl font-bold text-green-500 dark:text-green-700">
              {ongoingAssessmentsCount}
            </h1>
          </div>
        </Card>
      </div>
      <div className="flex gap-4">
        <Card className="flex flex-col p-4 w-full h-[10rem]  cursor-pointer">
          <h1 className="text-sm font-bold text-muted-foreground">
            Scheduled
            <br /> Assessments
          </h1>
          <div className="flex flex-row items-end justify-between h-full">
            <CircleDot className="h-6 w-6 text-yellow-500 dark:text-yellow-600" />
            <h1 className="text-6xl font-bold text-yellow-500 dark:text-yellow-600">
              {scheduledAssessmentsCount}
            </h1>
          </div>
        </Card>
        <Card className="flex flex-col p-4 w-full h-[10rem]  cursor-pointer">
          <h1 className="text-sm font-bold text-muted-foreground ">
            Past
            <br /> Assessments
          </h1>
          <div className="flex flex-row items-end justify-between h-full">
            <CircleDot className="h-6 w-6 text-red-500 dark:text-red-700" />
            <h1 className="text-6xl font-bold text-red-500 dark:text-red-700">
              {pastAssessmentsCount}
            </h1>
          </div>
        </Card>
        <Card className="flex flex-col p-4 w-full h-[10rem]  cursor-pointer">
          <h1 className="text-sm font-bold text-muted-foreground ">Drafts</h1>
          <div className="flex flex-row items-end justify-between h-full">
            <ArchiveIcon className="h-6 w-6" />
            <h1 className="text-6xl font-bold ">{draftAssessmentsCount}</h1>
          </div>
        </Card>
      </div>
      <div className="flex w-full min-h-[20rem] border-2 border-dashed items-center justify-center md:text-4xl text-xl rounded-3xl">
        Manage Reports OverView
      </div>
      <div className="flex gap-4">
        <Card className="flex flex-col p-4 w-[20rem] h-[10rem]  cursor-pointer">
          <h1 className="text-sm font-bold text-muted-foreground">
            Total
            <br /> Users
          </h1>
          <div className="flex flex-row items-end justify-between h-full">
            <UsersIcon className="h-6 w-6" />
            <h1 className="text-6xl font-bold ">234</h1>
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 w-full h-[10rem] md:text-2xl text-xl text-center cursor-pointer">
          Avaiable roles, users and groups overview
        </Card>
      </div>
    </div>
  );
};

export default OverView;
