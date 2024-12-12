import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { CloudUpload, FileTextIcon, FileUpIcon, Trash2 } from "lucide-react";
import React, { useState, useRef } from "react";
import { useUsers } from "../../hooks/useUsers";
import { ApiError } from "@/lib/api/apiError";

const ImportCsvDialog = () => {
  const { importUsersFromCSV } = useUsers();
  const [users, setUsers] = useState<File | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setUsers(event.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUsers(event.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (users) {
      setIsLoading(true);
      try {
        await importUsersFromCSV({ users, updateExisting: false });
        console.log("Users imported successfully");
        setUsers(null);
      } catch (error) {
        if (error instanceof ApiError) {
          console.log("Error importing users:", error.message);
        } else {
          console.log("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input before triggering
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setUsers(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant="outline">
          <FileUpIcon className="h-4 w-4 mr-2" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex flex-row">
            <FileUpIcon className="h-4 w-4 mr-2" />
            Import Users from CSV
          </DialogTitle>
          <DialogDescription>
            Drag and drop a CSV file, choose a file, or select one from your
            computer.
          </DialogDescription>
        </DialogHeader>
        <Card className="p-4 mt-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".csv"
            className="hidden"
            key={users ? "file-input" : "empty-input"} // Force input refresh
          />
          {users ? (
            <div className="flex flex-row p-2 border-dashed border-secondary w-full items-center justify-between rounded-lg border dark:bg-black bg-white border-muted">
              <div className="flex flex-row items-center">
                <FileTextIcon className="h-4 w-4 mr-2" /> {users.name}
              </div>
              <div className="flex">
                <Button
                  variant="outline"
                  onClick={handleRemoveFile}
                  className="ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed p-4 text-center cursor-pointer bg-white rounded-lg dark:bg-black ${
                dragging ? "bg-gray-100" : ""
              }`}
              onClick={triggerFileInput}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleFileDrop}
            >
              <CloudUpload className="h-8 w-8 mx-auto" />
              <p>
                Drag and drop a CSV
                <br /> file here, or click to select a file
              </p>
            </div>
          )}
          <Button
            onClick={handleImport}
            disabled={!users}
            className="w-full mt-4 text-xs"
            size="sm"
          >
            Import Users
          </Button>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ImportCsvDialog;
