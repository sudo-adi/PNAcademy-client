import { useRef } from "react";
import ReportGroupCard from "./report-group-card";

export const GroupCardScrollViewList: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      onWheel={handleWheel}
      className="
        w-full
        flex
        flex-row
        overflow-x-auto
        space-x-4
        pb-4
        scrollbar
        scrollbar-track-slate-100
        scrollbar-thumb-slate-300
        dark:scrollbar-track-slate-800
        dark:scrollbar-thumb-slate-600
        scroll-smooth
        hover:scrollbar-thumb-slate-400
        dark:hover:scrollbar-thumb-slate-500
      "
      style={{
        scrollbarWidth: "thin",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* {dummyAssessments.map((assessment, index) => ( */}
      <div
        // key={`${assessment.assessmentId}-${index}`}
        className="
            flex-shrink-0
            flex-row flex gap-5
            scroll-snap-align-start
            scroll-ml-4
            last:mr-4
          "
      >
        <ReportGroupCard groupId={""} groupName={""} />
        <ReportGroupCard groupId={""} groupName={""} />
        <ReportGroupCard groupId={""} groupName={""} />
        <ReportGroupCard groupId={""} groupName={""} />
        <ReportGroupCard groupId={""} groupName={""} />
      </div>
      {/* ))} */}
    </div>
  );
};
