"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ClipboardList } from "lucide-react";

const AnswerKey = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-start">
      {/* Header */}
      <div className="flex h-18 w-full p-4 bg-card items-center border-b-1 border border-secondary text-sm justify-between">
        <div
          className="flex border p-2 rounded-md hover:bg-secondary cursor-pointer"
          // onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </div>
        <div className="flex items-center justify-center flex-row">
          <ClipboardList className="h-4 w-4 mr-2 text-primary" />
          <span className="text-primary mr-2">Answers</span> | Assessment Result
        </div>
        <div className="flex">
          {dummyAnswerKeyData.sections.reduce(
            (total, section) => total + section[0].marks,
            0
          )}
          /{dummyAnswerKeyData.totalPages * 40}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex flex-col w-[calc(100vw-30rem)] overflow-hidden overflow-y-auto scrollbar-thin border-l border-r p-10 h-full">
        {dummyAnswerKeyData.sections.map((sectionGroup, index) =>
          sectionGroup.map((section, sectionIndex) => (
            <div key={section.id} className="flex flex-col w-full mt-10">
              {/* Question Header */}
              <div className="flex justify-between">
                <div>
                  <Badge className="mr-2">Q. {index + 1}</Badge>
                  <Badge variant={"outline"}>Section {sectionIndex + 1}</Badge>
                </div>

                <div className="flex gap-2 flex-row items-center">
                  <div className="flex items-center justify-center border p-2 rounded-md w-auto h-6 text-xs">
                    {
                      section.options.filter(
                        (opt) => opt.is_correct && opt.is_selected
                      ).length
                    }
                    /{section.options.length}
                  </div>
                  <div className="flex mr-2">
                    {section.options.every(
                      (opt) =>
                        (opt.is_correct && opt.is_selected) ||
                        (!opt.is_correct && !opt.is_selected)
                    )
                      ? "✅"
                      : "❌"}
                  </div>
                </div>
              </div>

              {/* Question Description */}
              <div className="flex p-1 text-sm">{section.description}</div>

              {/* Options */}
              <div className="flex flex-col gap-4 px-5 py-4">
                {section.options.map((option) => (
                  <div
                    key={option.id}
                    className={`flex flex-row gap-2 items-center p-2 ${
                      option.is_selected ? "bg-secondary rounded-md" : ""
                    }`}
                  >
                    <Checkbox disabled={true} checked={option.is_selected} />
                    {option.description}
                  </div>
                ))}
              </div>

              {/* Explain Button */}
              <div className="flex underline px-8 py-2 cursor-pointer mb-5">
                {"Explain>>"}
              </div>

              <Separator className="w-full" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Dummy data for easy testing and demonstration
export const dummyAnswerKeyData = {
  sections: [
    [
      {
        id: "q1",
        description: "What is the capital of France?",
        marks: 2,
        section: 0,
        options: [
          {
            id: "q1-opt1",
            description: "London",
            is_correct: false,
            is_selected: false,
          },
          {
            id: "q1-opt2",
            description: "Paris",
            is_correct: true,
            is_selected: true,
          },
          {
            id: "q1-opt3",
            description: "Berlin",
            is_correct: false,
            is_selected: false,
          },
          {
            id: "q1-opt4",
            description: "Madrid",
            is_correct: false,
            is_selected: false,
          },
        ],
      },
    ],
    [
      {
        id: "q2",
        description: "Which planet is known as the Red Planet?",
        marks: 2,
        section: 1,
        options: [
          {
            id: "q2-opt1",
            description: "Venus",
            is_correct: false,
            is_selected: false,
          },
          {
            id: "q2-opt2",
            description: "Jupiter",
            is_correct: false,
            is_selected: false,
          },
          {
            id: "q2-opt3",
            description: "Mars",
            is_correct: true,
            is_selected: true,
          },
          {
            id: "q2-opt4",
            description: "Saturn",
            is_correct: false,
            is_selected: false,
          },
        ],
      },
    ],
  ],
  totalPages: 2,
};

export default AnswerKey;
