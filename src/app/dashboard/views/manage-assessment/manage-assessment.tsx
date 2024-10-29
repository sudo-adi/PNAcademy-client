import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useTabStore from "@/lib/stores/manage-assessment-store/tab-store";
import { Archive, Loader, Search, Sparkles } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import AllTabContent from "./components/tab-content/all-tab-content";
import OnGoingTabContent from "./components/tab-content/ongoing-tab-content";
import ScheduledTabContent from "./components/tab-content/scheduled-tab-content";
import PreviousTabContent from "./components/tab-content/previous-tab-content";
import CreateAssessmentDialog from "./components/dialog-box/create-assessment-dialog";
import DraftsTabContent from "./components/tab-content/drafts-tab-content";
import { useRouter } from "next/navigation";
import { useAssessment } from "./hooks/useAssessment";
import { Assessment } from "@/lib/types/assessmentTypes";
import { ApiError } from "@/lib/api/apiError";
import useAssessmentsTableStore from "@/lib/stores/manage-assessment-store/assessments-table";

const ManageAssessments = () => {
  // all hooks here
  const { fetchAssessments } = useAssessment();
  const router = useRouter();

  // global states here
  const { activeTabIndex, setActiveTabIndex } = useTabStore();
  const { activePageIndex, sortBy, order, setOrder, setSortBy } =
    useAssessmentsTableStore();

  //  local states here
  const [allAssessments, setAllAssessments] = useState<Assessment[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  // loading states here
  const [assessmentLoading, setAssessmentLoading] = useState<boolean>(true);
  const [redirectingCreateWithAi, setRedirectingCreateWithAi] =
    useState<boolean>(false);

  // error states here
  const [assessmentsFetchError, setAssessmentsFetchError] = useState<
    ApiError | Error
  >();

  // local vars here

  // all functions here
  const fetchAssessmentsData = useCallback(async () => {
    const payload = {
      page: activePageIndex ? activePageIndex : 1,
      pageSize: 999,
      sortBy,
      order,
    };
    try {
      setAssessmentLoading(true);
      console.log("there u go", activePageIndex);
      const response = await fetchAssessments(payload);
      setAllAssessments(response.assesments);
      setTotalPages(response.totalPages);
    } catch (err) {
      if (err instanceof ApiError) {
        setAssessmentsFetchError(err);
      } else {
        setAssessmentsFetchError(err as Error);
      }
    } finally {
      setAssessmentLoading(false);
    }
  }, [activePageIndex, sortBy, order]);

  // all event handlers here
  const handleRefreshAssessments = () => {
    fetchAssessmentsData();
  };
  const handleToggleSorting = (field: keyof Assessment) => {
    if (sortBy === field) {
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setOrder("ASC");
    }
  };

  const handleNavigateToCreateWithAi = () => {
    try {
      setRedirectingCreateWithAi(true);
      router.push("/ai-create");
    } catch (err) {
      console.log("Error redirecting to create with ai", err);
    }
  };

  // configs for all tabs
  const tabConfig = {
    assessments: allAssessments,
    loadingAssessments: assessmentLoading,
    errorAssessments: assessmentsFetchError,
    totalPages: totalPages,
    refreshAssessments: handleRefreshAssessments,
    toggleSorting: handleToggleSorting,
  };

  // all useEffects here
  useEffect(() => {
    fetchAssessmentsData();
  }, [fetchAssessmentsData]);

  return (
    <div className="flex flex-col gap-2">
      <Card className="flex flex-row w-full p-2 justify-between items-center border-dashed gap-2">
        <div className="flex flex-row gap-2">
          <CreateAssessmentDialog />
          <Button
            onClick={handleNavigateToCreateWithAi}
            variant="link"
            className="hover:no-underline border-primary border"
            disabled={redirectingCreateWithAi}
          >
            {redirectingCreateWithAi ? (
              <div className="flex flex-row items-center justify-center">
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Create With Ai
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Create With Ai
              </div>
            )}
          </Button>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="email"
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
      </Card>
      <Tabs
        defaultValue={activeTabIndex.toString()}
        className="flex flex-col w-full items-center"
      >
        <div className="flex items-center justify-between flex-row w-full ">
          <TabsList className="grid grid-cols-4">
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
          <TabsList className="grid grid-cols-1">
            <TabsTrigger value="4" onClick={() => setActiveTabIndex(4)}>
              <Archive className="h-4 w-4 mr-2" />
              Drafts
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="w-full">
          <TabsContent value="0">
            <AllTabContent {...tabConfig} />
          </TabsContent>
          <TabsContent value="1">
            <OnGoingTabContent {...tabConfig} />
          </TabsContent>
          <TabsContent value="2">
            <ScheduledTabContent {...tabConfig} />
          </TabsContent>
          <TabsContent value="3">
            <PreviousTabContent {...tabConfig} />
          </TabsContent>
          <TabsContent value="4">
            <DraftsTabContent {...tabConfig} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ManageAssessments;
