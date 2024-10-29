"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Verification = () => {
  const [pageIndex, setPageIndex] = useState("0");
  const router = useRouter();
  const params = useParams();
  const assessmentId = params.assessmentId as string;

  const handleTabChange = (value: string) => {
    setPageIndex(value);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Tabs
        value={pageIndex}
        onValueChange={handleTabChange}
        className="lg:w-[calc(100vw-20rem)] w-[calc(100vw-5rem)] min-w-[20rem]"
      >
        <TabsList className="grid w-[20rem] grid-cols-2">
          <TabsTrigger value="0">Rules for the Test</TabsTrigger>
          <TabsTrigger value="1">Test Description</TabsTrigger>
        </TabsList>
        <TabsContent value="0">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Attemption Guidelines</CardTitle>
              <CardDescription>
                To maintain the integrity of the test, please adhere to the
                following rules. These guidelines are in place to ensure a
                secure and fair experience for all participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex dark:bg-black p-4 rounded-lg border-2 border-dashed">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 text-muted-foreground text-sm max-h-[30rem] overflow-hidden overflow-y-scroll">
                    <h1>Test Conduct Guidelines</h1>
                    <h2>Ensure a Fair and Secure Test Environment</h2>
                    <ul
                      style={{ listStyleType: "disc", paddingLeft: "20px" }}
                      className="flex flex-col gap-2"
                    >
                      <li>
                        <strong>Do not switch tabs:</strong> Navigating away
                        from the test window is strictly prohibited and may lead
                        to disqualification.
                      </li>
                      <li>
                        <strong>Window switching is restricted:</strong> Keep
                        the test window open at all times without switching to
                        other applications.
                      </li>
                      <li>
                        <strong>Right-click is disabled:</strong> Avoid
                        attempting any actions that rely on right-clicking.
                      </li>
                      <li>
                        <strong>No keyboard shortcuts:</strong> All shortcuts
                        are disabled during the test, so stay focused within the
                        provided test controls.
                      </li>
                      <li>
                        <strong>Timer will start upon test initiation:</strong>{" "}
                        Be aware that the timer will begin as soon as you start
                        the test.
                      </li>
                      <li>
                        <strong>Finish before the time is up:</strong> Ensure
                        that you complete your test before the timer runs out.
                      </li>
                      <li>
                        <strong>Test submission after time expiration:</strong>{" "}
                        Once the time is over, you cannot attempt the test
                        again, and it will be automatically submitted.
                      </li>
                      <li>
                        <strong>Copy and paste is not allowed:</strong> Any form
                        of copying and pasting during the test is strictly
                        prohibited.
                      </li>
                      <li>
                        <strong>Finality of submitted sections:</strong> Once a
                        section is submitted, you cannot go back and attempt
                        that section again.
                      </li>
                    </ul>
                    <p>
                      Failure to follow these rules may result in immediate
                      termination of your test session. Good luck, and stay
                      focused!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="1">
          <Card>
            <CardHeader>
              <CardTitle>Description for this Assessment</CardTitle>
              <CardDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
                laborum, ducimus iure officiis fuga repellat ipsa suscipit
                repellendus est quas!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex dark:bg-black p-4 rounded-lg border-2 border-dashed">
                helo world
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <div className="flex flex-row items-center justify-end gap-2 my-2">
          <Button
            variant={"outline"}
            className={pageIndex === "0" ? "hidden" : "block"}
            onClick={() => handleTabChange("0")}
          >
            Previous
          </Button>
          <Button
            onClick={() => handleTabChange("1")}
            className={pageIndex === "1" ? "hidden" : "block"}
          >
            Next
          </Button>
          <Button
            className={pageIndex === "1" ? "block" : "hidden"}
            onClick={() => router.push(`/assessment/${assessmentId}/overview`)}
          >
            Start Assessment
          </Button>
        </div>
      </Tabs>
    </main>
  );
};

export default Verification;
