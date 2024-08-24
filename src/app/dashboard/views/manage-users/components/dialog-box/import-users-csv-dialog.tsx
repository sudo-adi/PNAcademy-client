import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUpIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';

const ImportCsvDialog = () => {
  const { importUsersFromCSV } = useUsers();
  const [users, setUsers] = useState<File | null>(null);
  const [updateExisting, setUpdateExisting] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);

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

  const handleImport = () => {
    if (users) {
      importUsersFromCSV({ users, updateExisting });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileUpIcon className="h-4 w-4 mr-2" />
          Import as CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Users from CSV</DialogTitle>
          <DialogDescription>
            Drag and drop a CSV file, choose a file, or select one from your computer.
          </DialogDescription>
        </DialogHeader>
        <Card className="p-4 mt-4">
          <div
            className={`border-2 border-dashed p-4 rounded-lg text-center ${dragging ? 'bg-gray-100' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleFileDrop}
          >
            {users ? (
              <p>{users.name}</p>
            ) : (
              <p>Drag and drop a CSV file here, or click to select a file</p>
            )}
          </div>
          <Button className="mt-2" asChild>
            <label>
              Choose File
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </Button>
          <Label className="flex items-center mt-4">
            <Input
              type="checkbox"
              checked={updateExisting}
              onChange={(e) => setUpdateExisting(e.target.checked)}
              className="mr-2"
            />
            Update existing users
          </Label>
          <Button onClick={handleImport} disabled={!users} className="mt-4">
            Import Users
          </Button>
        </Card>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportCsvDialog;
