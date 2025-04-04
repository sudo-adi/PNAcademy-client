import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDot, Clock, GitCommitVertical } from 'lucide-react';

const AllTabContent = () => {
  return (
    <Card className="border-dashed h-[calc(100vh-21rem)] md:h-[calc(100vh-16rem)] w-full p-4 overflow-y-auto scrollbar-none bg-transparent">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col h-[20rem]">
          <CardHeader className="p-0">
            <div className="relative w-full h-32">
              <Image
                src="/logo-dark.png"
                alt="Assessment image"
                layout="fill"
                objectFit="contain"
                className="rounded-t-lg bg-muted p-10"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <div className="flex justify-between items-center mb-2">
              <CardTitle className="text-lg font-semibold">Assessment 01</CardTitle>
              <CircleDot className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Hello wold
            </p>
          </CardContent>
          <CardFooter className="p-3 pt-0 bg-muted rounded-b-lg">
            <div className="flex justify-between items-center w-full pt-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">20 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitCommitVertical className="h-4 w-4" />
                  <span className="text-xs">Total marks: 60</span>
                </div>
              </div>
              <Button size="sm" className="rounded-xl text-xs px-4">
                Start
              </Button>
            </div>
          </CardFooter>
        </Card>

      </div>
    </Card>

  );
};

export default AllTabContent;