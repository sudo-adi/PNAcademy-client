"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { use, useEffect, useState } from "react";
import AllTabContent from "./components/tab-content/all-tab-content";
import OnGoingTabContent from "./components/tab-content/ongoing-tab-content";
import ScheduledTabContent from "./components/tab-content/scheduled-tab-content";
import PreviousTabContent from "./components/tab-content/previous-tab-content";
import { useAssignedAssessments } from "./hooks/useAssignedAssessments";
import { AssignedAssessment } from "@/lib/types/assessmentTypes";
import { useRouter } from "next/navigation";
import { Loader, RefreshCw, Search } from "lucide-react";

const Assessments = () => {
  // all hooks here
  const { fetchAssignedAssessments } = useAssignedAssessments();
  const router = useRouter();

  // all state here
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [assessments, setAssessments] = useState<AssignedAssessment[]>([]);
  const [assessmentId, setAssessmentId] = useState<string>("");
  const [isJoining, setIsJoining] = useState(false);
  const [disableJoinButton, setDisableJoinButton] = useState(false);

  // all functions here
  const getAssignedAssessments = async () => {
    try {
      const assessments = await fetchAssignedAssessments({
        page: 1,
        pageSize: 999,
        sortBy: "updatedAt",
        order: "DESC",
      });
      setAssessments(assessments);
    } catch (err) {}
  };

  const joinWithAssessmentID = (assessmentId: string) => {
    router.push(`/test/${assessmentId}/`);
  };

  const changeAssessmentId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uuidValue = e.target.value;
    console.log(uuidValue);

    // Regular expression for UUID validation
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    // Check if the input matches UUID format
    const isValidUUID = uuidRegex.test(uuidValue);

    if (isValidUUID) {
      setAssessmentId(uuidValue);
    }

    // Enable button only if UUID is valid
    setDisableJoinButton(isValidUUID);
  };

  // all useEffects here
  useEffect(() => {
    getAssignedAssessments();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-1 overflow-y-hidden">
        <Card className="flex flex-row w-full p-[2px] px-[3px] justify-between items-center border-dashed gap-1">
          <Button className="flex items-center justify-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <div className="flex w-7/10 h-full lg:w-auto items-center space-x-2">
            <Input
              className="min-w-[22rem] w-full min-h-[20px]"
              variant="clean"
              type="email"
              placeholder="Join with assessment Id..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeAssessmentId(e)
              }
            />
            <Button
              type="submit"
              className="flex items-center justify-center gap-1 active:shadow-2xl active:shadow-white"
              onClick={() => joinWithAssessmentID(assessmentId)}
              disabled={!disableJoinButton}
            >
              {isJoining ? <Loader className="h-4 w-4 animate-spin" /> : "Join"}
            </Button>
          </div>
        </Card>
        <Tabs
          defaultValue={activeTabIndex.toString()}
          className="flex flex-col items-center"
        >
          <div className="flex items-top lg:justify-between flex-col-reverse lg:flex-row px-2 lg:px-0 lg:w-full w-full gap-2">
            <TabsList className="grid grid-cols-4 w-full lg:w-auto">
              <TabsTrigger value="0" onClick={() => setActiveTabIndex(0)}>
                All
              </TabsTrigger>
              <TabsTrigger value="1" onClick={() => setActiveTabIndex(1)}>
                OnGoing
              </TabsTrigger>
              <TabsTrigger value="2" onClick={() => setActiveTabIndex(2)}>
                Scheduled
              </TabsTrigger>
              <TabsTrigger value="3" onClick={() => setActiveTabIndex(3)}>
                Previous
              </TabsTrigger>
            </TabsList>
            <div className="flex w-full max-w-lg items-center space-x-2 p-0">
              <Input
                type="email"
                className="min-h-[20px]ß"
                variant="clean"
                placeholder="Search User with email, id or name..."
              />
              <Button
                type="submit"
                className="flex items-center justify-center  gap-1"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
          <div className="w-full">
            <TabsContent value="0">
              <AllTabContent assessments={assessments} />
            </TabsContent>
            <TabsContent value="1">
              <OnGoingTabContent assessments={assessments} />
            </TabsContent>
            <TabsContent value="2">
              <ScheduledTabContent assessments={assessments} />
            </TabsContent>
            <TabsContent value="3">
              <PreviousTabContent assessments={assessments} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Assessments;
