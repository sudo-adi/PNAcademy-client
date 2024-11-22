"use client";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Loader2,
  PlusSquare,
  Trash2,
  UploadIcon,
  XCircle,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AssessmentDuration from "../duration";
import useCreateAssessmentDetailsStore from "@/lib/stores/manage-assessment-store/assessment-details";
import { useAssessment } from "../../hooks/useAssessment";
import { ApiError } from "@/lib/api/apiError";
import StartsAtDateTimePicker from "../starts-at";
import EndsAtDateTimePicker from "../ends-at";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Papa from "papaparse";
import { truncate } from "lodash";
import {
  AiQuestion,
  SaveAiGeneratedAssessmentProps,
} from "@/lib/types/ai-assessment";

const assessmentSchema = z.object({
  name: z.string().min(1, { message: "Assessment name is required" }),
  description: z
    .string()
    .min(1, { message: "Assessment description is required" }),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;

const CreateAssessmentDialog = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
    mode: "onChange",
  });

  const { addAssessment, addAssessmentWithImport } = useAssessment();

  const {
    assessmentName,
    assessmentDescription,
    is_active,
    createdBy,
    startAt,
    endAt,
    duration,
    setAssessmentName,
    setAssessmentDescription,
  } = useCreateAssessmentDetailsStore();

  interface QuestionImport {
    section: string;
    question: string;
    marks: string;
    correct: string;
    a: string;
    b: string;
    c: string;
    d: string;
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [importing, setImporting] = useState<boolean>(false);
  const [importedFile, setImportedFile] = useState<QuestionImport[] | null>(
    null
  );
  const [importedFileName, setImportedFileName] = useState("");

  const transformQuestionsFormat = (
    questions: QuestionImport[]
  ): AiQuestion[] => {
    return questions.map((q) => ({
      description: q.question,
      marks: parseInt(q.marks),
      section: parseInt(q.section),
      options: [
        {
          description: q.a,
          isCorrect: q.correct === "a",
        },
        {
          description: q.b,
          isCorrect: q.correct === "b",
        },
        {
          description: q.c,
          isCorrect: q.correct === "c",
        },
        {
          description: q.d,
          isCorrect: q.correct === "d",
        },
      ],
    }));
  };

  const onSubmit = async () => {
    setIsSubmitted(true);
    try {
      setLoading(true);
      const data = {
        name: assessmentName,
        description: assessmentDescription,
        is_active: is_active,
        start_at: startAt,
        end_at: endAt,
        duration: duration,
        created_by: createdBy,
      };

      const data2 = {
        name: assessmentName,
        description: assessmentDescription,
        is_active: is_active,
        start_at: startAt,
        end_at: endAt,
        duration: duration,
      };
      if (importedFile) {
        // Transform the imported questions and add them to the request data
        const transformedQuestions = transformQuestionsFormat(importedFile);
        const dataWithQuestions = {
          ...data2,
          questions: transformedQuestions,
        };
        console.log(dataWithQuestions);
        const response = await addAssessmentWithImport(dataWithQuestions);
        console.log("here it is", response);
        router.push(`/create/${response}`);
      } else {
        const response = await addAssessment(data);
        router.push(`/create/${response.id}`);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `An error occurred while creating Assessment ${err.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while creating Assessment ${error.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
    reset();
    setIsSubmitted(false);
  };

  const handleClear = () => {
    reset();
    setIsSubmitted(false);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      toast({
        title: "Error",
        description: "No file selected",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (file.type !== "text/csv") {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    try {
      setImporting(true);
      const reader = new FileReader();

      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const results = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.toLowerCase(), // Transform headers to lowercase
        });

        if (results.data.length === 0) {
          toast({
            title: "Error",
            description: "CSV is empty or invalid",
            variant: "destructive",
          });
          return;
        }

        // Validate headers
        const requiredHeaders = [
          "section",
          "question",
          "marks",
          "correct",
          "a",
          "b",
          "c",
          "d",
        ];
        const csvHeaders = Object.keys(results.data[0] as QuestionImport);

        const missingHeaders = requiredHeaders.filter(
          (header) => !csvHeaders.includes(header)
        );

        if (missingHeaders.length > 0) {
          toast({
            title: "Invalid CSV Format",
            description: `Missing required headers: ${missingHeaders.join(
              ", "
            )}`,
            variant: "destructive",
          });
          return;
        }

        // Validate and transform data
        const isValidData = results.data.every((row: any) => {
          return (
            row.section &&
            row.question &&
            row.marks &&
            !isNaN(parseInt(row.marks)) && // Validate marks is a number
            row.correct &&
            row.a &&
            row.b &&
            row.c &&
            row.d &&
            ["a", "b", "c", "d"].includes(row.correct.toLowerCase())
          );
        });
        if (!isValidData) {
          toast({
            title: "Invalid Data Format",
            description:
              "Some rows contain invalid or missing data. Please check your CSV file.",
            variant: "destructive",
          });
          return;
        }

        // Transform data to match QuestionImport interface
        const transformedData: QuestionImport[] = results.data.map(
          (row: any) => ({
            section: row.section,
            question: row.question,
            marks: row.marks,
            correct: row.correct.toLowerCase(),
            a: row.a,
            b: row.b,
            c: row.c,
            d: row.d,
          })
        );

        setImportedFile(transformedData);
        setImportedFileName(file.name);

        toast({
          title: "Success",
          description: `Successfully imported ${transformedData.length} questions`,
          variant: "default",
        });
      };

      reader.readAsText(file);
    } catch (error) {
      console.error("Error reading file:", error);
      toast({
        title: "Error",
        description: "Failed to read the file",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusSquare className="h-4 w-4 mr-2" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden overflow-y-scroll scrollbar-none w-[800px] max-h-[calc(100vh-5rem)]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a New Assessment</DialogTitle>
            <DialogDescription>
              Fill in the details for the new assessment.
            </DialogDescription>
            <div className="flex flex-col gap-2 py-4">
              <Label htmlFor="name" className="ml-1">
                Assessment Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g English Assessment"
                {...register("name")}
                onChange={(e) => setAssessmentName(e.target.value)}
              />
              {isSubmitted && errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              <div className="h-2">{/* spacer */}</div>
              <Label htmlFor="description" className="ml-1">
                Assessment Description
              </Label>
              <Textarea
                id="description"
                className="max-h-32"
                placeholder="..."
                {...register("description")}
                onChange={(e) => setAssessmentDescription(e.target.value)}
              />
              {isSubmitted && errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <Card>
              <CardContent className="p-2">
                <StartsAtDateTimePicker />
                <div className="my-2" />
                <EndsAtDateTimePicker />
                <div className="my-2" />
                <AssessmentDuration />
              </CardContent>
            </Card>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full my-4 flex-col md:flex-row justify-between gap-2">
              <div className="flex md:flex-row flex-col gap-2">
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => reset()}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Close
                  </Button>
                </DialogClose>
                <Button variant="outline" onClick={handleClear}>
                  Clear
                </Button>
              </div>
              <div className="flex gap-2">
                <div>
                  <div className="relative overflow-hidden cursor-pointer">
                    {importedFile ? (
                      <Button
                        onClick={() => {
                          setImportedFileName("");
                          setImportedFile(null);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                      </Button>
                    ) : (
                      <Button
                        className="relative cursor-pointer"
                        variant="secondary"
                      >
                        <Label
                          htmlFor="import"
                          className="flex items-center cursor-pointer"
                        >
                          <UploadIcon className="h-4 w-4 mr-2" />
                          Import CSV
                        </Label>
                        <Input
                          id="import"
                          type="file"
                          accept=".csv"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleImport}
                          disabled={importing}
                        />
                      </Button>
                    )}
                  </div>
                </div>
                <Button type="submit" variant="default">
                  <PlusSquare className="h-4 w-4 mr-2" />
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </div>
          </DialogFooter>
          {importedFile && (
            <Card className="flex flex-row items-center justify-center w-full p-2 border-2 border-dashed text-xs max-w-full overflow-hidden">
              <FileText className="h-4 w-4 mr-2" />
              {truncate(importedFileName, { length: 50 })}
            </Card>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssessmentDialog;
