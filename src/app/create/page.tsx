import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import SideBar from "./components/sidebar"
import { FilePen, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"
import { Separator } from "@/components/ui/separator"
import Header from "./components/header"

const Create = () => {
  return (
    <div className="flex max-h-screen flex-row overflow-y-hidden">
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex flex-1 flex-col lg:gap-2 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Assessment Name</h1>
          </div>
          <Card className="flex flex-row w-full gap-2 p-2 justify-between bg-transparent border-none">
            <div className="flex gap-2">
              <Badge variant="secondary">
                Section 1
              </Badge>
              <Badge variant="outline">
                Section 2
              </Badge>
              <Badge variant="outline">
                Section 3
              </Badge>
              <Badge variant="outline">
                Section 4
              </Badge>
              <Badge variant="outline">
                <Plus className="h-4 w-4" />
              </Badge>
            </div>
            <div className="flex">
              <Badge variant="secondary">
                5
              </Badge>
            </div>
          </Card>
          <Card className="flex flex-row w-full p-2 justify-between border-dashed bg-transparent">
            <div className="flex gap-2">
              <Button>
                1
              </Button>
              <Button variant="outline">
                2
              </Button>
              <Button variant="outline">
                3
              </Button>
              <Button variant="outline">
                4
              </Button>
              <Button variant="outline">
                5
              </Button>
              <Button variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              {/* Add any additional components or content here */}
            </div>
          </Card>
          <div className="flex flex-col gap-2 w-full max-h-[calc(100vh-16rem)]">
            <Card className="flex flex-col items-center justify-start border border-dashed rounded-lg max-h-[60rem] w-full p-4 gap-4 overflow-y-auto scrollbar-none">
              <div className="flex flex-col w-full">
                <Label className="p-2">Question</Label>
                <Textarea className="w-full" placeholder="Enter your Question..." />
              </div>
              <Separator className="border-1" />
              <div className="flex flex-col w-full">
                <Label className="p-2">Option 1</Label>
                <Textarea className="w-full" placeholder="Enter Option 1..." />
              </div>
              <div className="flex flex-col w-full">
                <Label className="p-2">Option 2</Label>
                <Textarea className="w-full" placeholder="Enter Option 2..." />
              </div>
              <div className="flex flex-col w-full">
                <Label className="p-2">Option 3</Label>
                <Textarea className="w-full" placeholder="Enter Option 3..." />
              </div>
              <div className="flex flex-col w-full">
                <Label className="p-2">Option 4</Label>
                <Textarea className="w-full" placeholder="Enter Option 4..." />
              </div>
              <Button>
                <Plus className="h-4 w-4" />
                Add Option
              </Button>
            </Card>
            <Card className="flex flex-row items-center justify-center min-h-[7rem] max-h-[15rem]">
              <Badge>Python</Badge>
            </Card>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2">
                Powered by
                <Badge variant="outline">PNAcademy</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Previous</Button>
                <Button>Next</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="hidden border-r bg-muted/40 md:block md:w-[350px] lg:min-w-[400px]">
        <SideBar />
      </div>
    </div>
  )
}

export default Create
