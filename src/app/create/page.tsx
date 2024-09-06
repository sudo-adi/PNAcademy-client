"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { useAssessment } from "../dashboard/views/manage-assessment/hooks/useAssessment"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
const Create = () => {
  const [assessmentId, setAssessmentId] = useState<string>('')
  const { fetchAssessmentById, assessment, assessmentError } = useAssessment();
  const [loading, setLoading] = useState<boolean>(false);
  const [goBackLoading, setGoBackLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleGo = async () => {
    setLoading(true);
    try {
      const res = await fetchAssessmentById({ id: assessmentId });
      if (res) {
        router.push(`/create/${assessmentId}`);
      } else {
        console.log("Assessment not found or error occurred")
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch assessment:", error);
      setLoading(false);
    }
  }

  const handleGoBack = () => {
    setGoBackLoading(true);
    router.push('/dashboard');
  }
  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center">
      <Card className="w-[30rem]">
        <CardHeader>
          <CardTitle className="text-lg">
            Create a New Assessment or Update Existing
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <>
            <p className="text-xs m-2">
              Paste Assessment ID here
            </p>
            <Input
              value={assessmentId}
              placeholder="e.g. 3687d5b0-6dde-4d80-ab0b-cb62ec69488e"
              onChange={(e) => setAssessmentId(e.target.value)}
            />
          </>
        </CardContent>
        <CardFooter className="flex flex-row justify-between">
          <Badge variant="outline">
            PNAcademy
          </Badge>
          <div className="flex flex-row items-center justify-center gap-2">
            {
              goBackLoading ?
                <Button variant={"outline"} disabled>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Dashboard
                </Button> :
                <Button variant={"outline"} onClick={handleGoBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
                </Button>
            }

            {
              loading ?
                <Button disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button> :
                <Button onClick={handleGo}>
                  Go
                </Button>
            }

          </div>
        </CardFooter>
      </Card>
      {
        assessmentError && <p className="text-red-500">{
          assessmentError.status === 400 ? 'Please Enter a Valid Assessment ID' : assessmentError.status === 404 ? 'Assessment Not Found' : 'Something Went Wrong'
        }</p>
      }
    </div>
  )
}

export default Create
