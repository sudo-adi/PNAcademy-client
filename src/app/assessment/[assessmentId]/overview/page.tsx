"use client";
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import useAttemptAssessmentsStore from '@/lib/stores/attempt-assessment/attempt-assessment.store';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAttemption } from '../../hooks/useAttemptAssessments';
import LockedSection from './components/locked-section';
import ActiveSection from './components/active-section';
import AttemptionViewSideBar from './components/sidebar';
import TopBar from './components/topbar';
import SubmittedSection from './components/submitted-sction';
import { AssessmentStartSectionStatus, AssignedAssessmentQuestion, GetAssessmentTimeDetailsResponse } from '@/lib/types/attemptionTypes';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PnaLoader from '@/components/common/custom-loading-animation';

interface AssessmentOverViewProps {
  params: {
    assessmentId: string;
  };
}

const AssessmentOverView: React.FC<AssessmentOverViewProps> = ({ params }) => {
  const {
    startAssessment,
    startSection,
    stopSection,
    fetchAssessmentTimeDetails,
  } = useAttemption();

  const router = useRouter();
  const { currentQuestionIndex, currentSectionId, setCurrentQuestionIndex, setCurrentSectionId } = useAttemptAssessmentsStore();
  // State management
  const [switchCount, setSwitchCount] = useState(0);
  const [statusSections, setStatusSections] = useState<AssessmentStartSectionStatus[]>([]);
  const [endedSections, setEndedSections] = useState<number[]>([]);
  const [lockedSections, setLockedSections] = useState<number[]>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeSectionQuestions, setActiveSectionQuestions] = useState<AssignedAssessmentQuestion[]>([]);
  const [localCurrentSection, setLocalCurrentSection] = useState(0);
  const [timeDetails, setTimeDetails] = useState<GetAssessmentTimeDetailsResponse['data']>();
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
      console.error('Fullscreen error:', err);
    }
  };

  const fetchTimeDetails = async () => {
    try {
      const response = await fetchAssessmentTimeDetails({ id: params.assessmentId });
      setTimeDetails(response);
    } catch (err) {
      console.error('Error fetching time details:', err);
    }
  };

  // to fetch all the status sections
  const initalizeOverViewData = async () => {
    try {
      const statusSections: AssessmentStartSectionStatus[] = await startAssessment({ assessmentId: params.assessmentId });
      if (statusSections.length > 0) {
        setStatusSections(statusSections);

        // setting submitted sections to state
        const submittedSections = statusSections
          .filter(section => section.status === "submitted")
          .map(section => section.section);
        setEndedSections(submittedSections);

        // setting locked sections to state
        const lockedSections = statusSections
          .filter(section => section.status === "not-started")
          .map(section => section.section);
        setLockedSections(lockedSections);

        const activeSection = statusSections.find(section => section.status === "started");
        const notStartedSection = statusSections.find(section => section.status === "not-started");
        if (activeSection) {
          setCurrentSectionId(activeSection.section);
          setLocalCurrentSection(activeSection.section);
          const questions = await startSection({ assessmentId: params.assessmentId, section: activeSection.section });
          setActiveSectionQuestions(questions);
        } else if (notStartedSection) {
          await startSection({ assessmentId: params.assessmentId, section: notStartedSection.section });
          await initalizeOverViewData();
        } else {
          setActiveSectionQuestions([]);
          setIsAssessmentCompleted(true);
        }
      } else {
        throw new Error('No sections found');
      }
    } catch (err) {
      throw err;
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
      await stopSection({ assessmentId: params.assessmentId, section: currentSectionId });
      await initalizeOverViewData();
    } catch (err) {
      console.error('Error ending section:', err);
    }
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setSwitchCount(prev => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    handleFullscreenChange();
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    initalizeOverViewData();
    fetchTimeDetails();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <PnaLoader />
    </div>;
  }

  console.log("here it is", currentSectionId);

  return (
    <main className="flex flex-col w-full">
      <TopBar timeDetails={timeDetails} />
      <div className="flex flex-row h-[calc(100vh-2rem)] w-full">
        <div className="flex flex-col gap-4 w-full p-10 h-[calc(100vh-4rem)] overflow-hidden overflow-y-scroll scrollbar-none">
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
                className="flex items-center gap-2">
                Submit This Section
                <MoveRight className="h-4 w-4" />
              </Button>
            </>
          )}
          {lockedSections.map((section) => (
            <LockedSection section={section} key={section} />
          ))}
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
            <Button variant="outline" onClick={() => setIsFullScreen(false)}>
              Cancel
            </Button>
            <Button onClick={toggleFullscreen}>
              Enter Full Screen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AssessmentOverView;