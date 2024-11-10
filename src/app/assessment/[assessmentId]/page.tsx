"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import useAttemptAssessmentsStore from "@/lib/stores/attempt-assessment/attempt-assessment.store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AssessmentStartSectionStatus,
  AssignedAssessmentQuestion,
  GetAssessmentTimeDetailsResponse,
} from "@/lib/types/attemptionTypes";
import { Circle, CircleCheck, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import PnaLoader from "@/components/common/custom-loading-animation";
import TopBar from "./components/topbar";
import SubmittedSection from "./components/submitted-sction";
import ActiveSection from "./components/active-section";
import LockedSection from "./components/locked-section";
import AttemptionViewSideBar from "./components/sidebar";
import { useAttemption } from "../hooks/useAttemptAssessments";
import useTimerStore from "@/lib/stores/attempt-assessment/timer-store";
import { millisecondsToSeconds } from "date-fns";
import useVerificationStore from "@/lib/stores/verification-store/verification-store";
import { ApiError } from "@/lib/api/apiError";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useAssessment } from "@/app/dashboard/views/manage-assessment/hooks/useAssessment";

interface AttemptAssessmentProps {
  params: {
    assessmentId: string;
  };
}

const AttemptAssessment: React.FC<AttemptAssessmentProps> = ({ params }) => {
  const { assessmentId } = useVerificationStore();
  const router = useRouter();
  const { timeLeft, startTimer, resetTimer, setTimeLeft } = useTimerStore();
  const {
    startAssessment,
    startSection,
    stopSection,
    stopAssessment,
    fetchAssessmentTimeDetails,
  } = useAttemption();

  const { setAssessmentId } = useVerificationStore();

  const { fetchAssessmentById } = useAssessment();

  const [isVerified, setIsVerified] = useState(false);
  const [isAssessmentValid, setIsAssessmentValid] = useState(false);

  const { currentSectionId, setCurrentQuestionIndex, setCurrentSectionId } =
    useAttemptAssessmentsStore();

  // State management
  const [switchCount, setSwitchCount] = useState(0);
  const [statusSections, setStatusSections] = useState<
    AssessmentStartSectionStatus[]
  >([]);
  const [endedSections, setEndedSections] = useState<number[]>([]);
  const [lockedSections, setLockedSections] = useState<number[]>([]);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(
    !!document.fullscreenElement ||
      !!(document as any).webkitFullscreenElement ||
      !!(document as any).mozFullScreenElement
  );
  const [activeSectionQuestions, setActiveSectionQuestions] = useState<
    AssignedAssessmentQuestion[]
  >([]);
  const [timeDetails, setTimeDetails] =
    useState<GetAssessmentTimeDetailsResponse["data"]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAssessmentCompleted, setIsAssessmentCompleted] = useState(false);
  const [loadingAssessments, setLoadingAssessments] = useState(true);
  const [loadingSections, setLoadingSections] = useState(true);

  const toggleFullscreen = async () => {
    try {
      if (!isFullScreen) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  const fetchTimeDetails = async () => {
    try {
      const response = await fetchAssessmentTimeDetails({
        id: params.assessmentId,
      });
      setTimeDetails(response);

      const startTime = new Date(response.started_at).getTime();
      const serverTime = new Date(response.server_time).getTime();
      const duration = response.duration;
      const remainingTime = duration - (serverTime - startTime);
      setTimeLeft(millisecondsToSeconds(remainingTime));
    } catch (err: any) {
      if (err.status === 400) {
        router.push("/dashboard");
        toast({
          title: "Assessment not found",
          description: "Assessment not found",
          action: <ToastAction altText="error">Ok</ToastAction>,
        });
        return;
      } else if (err.status === 404) {
        router.push("/dashboard");
        toast({
          title: "Assessment not found",
          description: "Assessment not found Redirecting to the Dashboard",
          action: <ToastAction altText="error">Ok</ToastAction>,
        });
        return;
      } else {
        router.push("/dashboard");
        toast({
          title: "Error fetching time details",
          description: "Something Went Wrong",
          action: <ToastAction altText="error">Ok</ToastAction>,
        });
      }
      return;
    }
  };

  const initalizeOverViewData = async () => {
    let statusSections: AssessmentStartSectionStatus[] = [];

    try {
      // First try-catch block to handle the initial API call
      try {
        statusSections = await startAssessment({
          assessmentId: params.assessmentId,
        });
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 403) {
            setIsAssessmentValid(false);
            router.push("/test/" + params.assessmentId);
            return;
          } else if (err.status === 404) {
            router.push("/dashboard");
            toast({
              title: "Assessment not found",
              description: "Assessment not found",
              action: <ToastAction altText="error">Ok</ToastAction>,
            });
            return;
          } else {
            router.push("/dashboard");
            toast({
              title: "Error starting assessment",
              description: "Something Went Wrong",
              action: <ToastAction altText="error">Ok</ToastAction>,
            });
            return;
          }
        }
        throw err; // Re-throw if it's not an ApiError
      }

      // Check if sections exist
      if (!statusSections || statusSections.length === 0) {
        throw new Error("No sections found");
      }

      // Process the sections
      setStatusSections(statusSections);

      // Setting submitted sections to state
      const submittedSections = statusSections
        .filter((section) => section.status === "submitted")
        .map((section) => section.section);
      setEndedSections(submittedSections);

      // Setting locked sections to state
      const lockedSections = statusSections
        .filter((section) => section.status === "not-started")
        .map((section) => section.section);
      setLockedSections(lockedSections);

      const activeSection = statusSections.find(
        (section) => section.status === "started"
      );
      const notStartedSection = statusSections.find(
        (section) => section.status === "not-started"
      );

      if (activeSection) {
        setCurrentSectionId(activeSection.section);
        const questions = await startSection({
          assessmentId: params.assessmentId,
          section: activeSection.section,
        });
        setActiveSectionQuestions(questions);
      } else if (notStartedSection) {
        await startSection({
          assessmentId: params.assessmentId,
          section: notStartedSection.section,
        });
        await initalizeOverViewData();
      } else {
        setActiveSectionQuestions([]);
        setIsAssessmentCompleted(true);
      }
    } catch (err: any) {
      // Handle any other errors here
      console.error("Error in initalizeOverViewData:", err);
      toast({
        title: "Error",
        description: "Something went wrong while initializing the assessment",
        action: <ToastAction altText="error">Ok</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startQuestionAttempt = (index: number) => {
    setCurrentQuestionIndex(index);
    router.push(`/assessment/${params.assessmentId}/questions`);
  };

  const endSectionAttempt = async () => {
    try {
      await stopSection({
        assessmentId: params.assessmentId,
        section: currentSectionId,
      });
      await initalizeOverViewData();
    } catch (err) {
      console.error("Error ending section:", err);
    }
  };

  const handleSubmitAssessment = async () => {
    try {
      await stopAssessment({
        assessmentId: params.assessmentId,
      });
      toast({
        title: "Assessment submitted",
        description: "Assessment has been submitted successfully",
        action: <ToastAction altText="success">Ok</ToastAction>,
      });
      router.push("/dashboard");
    } catch (err: any) {
      if (err.status === 400) {
        toast({
          title: "Incomplete assessment",
          description:
            "AAll sections must be completed before ending the assessment",
          action: <ToastAction altText="error">Ok</ToastAction>,
        });
      } else if (err.status === 404) {
        toast({
          title: "Assessment not found",
          description: "Assessment not found",
          action: <ToastAction altText="error">Ok</ToastAction>,
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Error submitting assessment",
          description: "Something went wrong while submitting the assessment",
          action: <ToastAction altText="error">Ok</ToastAction>,
        });
      }
    } finally {
      setAssessmentId("");
    }
  };

  const checkVerificationAssessment = async () => {
    if (assessmentId == params.assessmentId) {
      return true;
    } else {
      router.push("/test/" + params.assessmentId);
      return false;
    }
  };

  const checkIsAssessmentValid = async () => {
    try {
      const data = await fetchAssessmentById({ id: params.assessmentId });
      if (data) {
        return true;
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400) {
          router.push("/test/" + params.assessmentId);
          toast({
            title: "Invalid Assessment ID",
            description: "Please provide a valid assessment ID",
            action: <ToastAction altText="error">Ok</ToastAction>,
          });
        } else if (err.status === 404) {
          router.push("/dashboard");
          toast({
            title: "Assessment not found",
            description: "Assessment not found",
            action: <ToastAction altText="error">Ok</ToastAction>,
          });
        } else {
          router.push("/dashboard");
          toast({
            title: "Error fetching assessment",
            description: "Something Went Wrong",
            action: <ToastAction altText="error">Ok</ToastAction>,
          });
        }
      }
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setSwitchCount((prev) => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullScreenStatus =
        !!document.fullscreenElement ||
        !!(document as any).webkitFullscreenElement ||
        !!(document as any).mozFullScreenElement;

      setIsFullScreen(fullScreenStatus);
    };

    // Initial check
    handleFullscreenChange();

    // Add all possible fullscreen change events
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);

    // Cleanup
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
    };
  }, [
    document.fullscreenElement,
    (document as any).webkitFullscreenElement,
    (document as any).mozFullScreenElement,
  ]);

  useEffect(() => {
    const initialize = async () => {
      if (await checkIsAssessmentValid()) {
        if (await checkVerificationAssessment()) {
          await initalizeOverViewData();
          await fetchTimeDetails();
          startTimer();
        }
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitAssessment();
    }
  }, [timeLeft]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PnaLoader />
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full">
      {!isVerified ? (
        <>
          <TopBar timeDetails={timeDetails} />
          <div className="flex flex-row h-[calc(100vh-2rem)] w-full">
            <div className="flex flex-col gap-4 h-[calc(100vh-2rem)] p-10 justify-between w-full">
              <div className="flex flex-col gap-4  w-full overflow-hidden overflow-y-scroll scrollbar-none">
                {endedSections.map((section) => (
                  <SubmittedSection index={section} key={section} />
                ))}
                {activeSectionQuestions.length > 0 && (
                  <>
                    <ActiveSection
                      questions={activeSectionQuestions}
                      sectionNumber={currentSectionId}
                      solveQuestion={startQuestionAttempt}
                    />
                    <Button
                      onClick={endSectionAttempt}
                      className="flex items-center gap-2"
                    >
                      Submit This Section
                      <MoveRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
                {lockedSections.map((section) => (
                  <LockedSection section={section} key={section} />
                ))}
              </div>{" "}
              <div className="flex w-full">
                <Button
                  className="w-full"
                  size={"sm"}
                  disabled={!isAssessmentCompleted}
                  onClick={handleSubmitAssessment}
                >
                  Submit Assessment <CircleCheck className="h-3 w-3 ml-2" />
                </Button>
              </div>
            </div>

            <AttemptionViewSideBar />
          </div>
          <Dialog open={!isFullScreen} onOpenChange={setIsFullScreen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Full Screen Mode Required</DialogTitle>
                <DialogDescription>
                  Please enter full screen mode to continue with the assessment.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsFullScreen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={toggleFullscreen}>Enter Full Screen</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="flex h-screen w-screen items-center  justify-center">
          <PnaLoader />
        </div>
      )}
    </main>
  );
};

export default AttemptAssessment;
