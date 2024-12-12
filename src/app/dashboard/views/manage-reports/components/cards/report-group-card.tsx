import React from "react";
import { ArrowRight, FileText, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReportGroupCardProps {
  groupId: string;
  groupName: string;
}

const ReportGroupCard = (props: ReportGroupCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 p-0 hover:shadow-lg dark:hover:shadow-slate-700 group">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
          The Only Nazis of india
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
              <FileText className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Assessments
              </p>
              <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                69
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
              <Users className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Users
              </p>
              <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                25
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 dark:bg-slate-800/50 p-4">
        <Button
          variant="outline"
          className="w-full group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-all duration-300"
        >
          View Report
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportGroupCard;
