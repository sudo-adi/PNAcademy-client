"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const QuickView = () => {
  return (
    <Dialog>
      <DialogContent className="overflow-hidden overflow-y-scroll scrollbar-none w-[800px] max-h-[calc(100vh-5rem)]">
        hey there
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;
