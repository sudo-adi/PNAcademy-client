import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/lib/types/answer-keyTypes";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ExplanationDialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  explanation: string | null;
  isLoading: boolean;
}

const ExplanationDialogBox: React.FC<ExplanationDialogBoxProps> = ({
  isOpen,
  onClose,
  question,
  explanation,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        <DialogHeader>
          <DialogTitle className="text-base font-medium">
            Question Explanation
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          {/* Question */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">Question:</h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              {question.description}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">Options:</h3>
            <div className="space-y-1.5">
              {question.options.map((option) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center justify-between p-2 rounded-md text-xs ${
                    option.is_correct
                      ? "bg-green-50 dark:bg-green-900/20"
                      : option.is_selected && !option.is_correct
                      ? "bg-red-50 dark:bg-red-900/20"
                      : "bg-slate-50 dark:bg-slate-800/50"
                  }`}
                >
                  <span className="flex-1">{option.description}</span>
                  <div className="flex items-center gap-2">
                    {option.is_correct ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : option.is_selected ? (
                      <XCircle className="w-4 h-4 text-red-500" />
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">Explanation:</h3>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span className="text-xs text-slate-500">
                      Generating explanation...
                    </span>
                  </div>
                  <Skeleton className="h-3 w-[90%]" />
                  <Skeleton className="h-3 w-[80%]" />
                  <Skeleton className="h-3 w-[95%]" />
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md"
                >
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    {explanation || "No explanation available."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExplanationDialogBox;
