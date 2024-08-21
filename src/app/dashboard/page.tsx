import Nav from "./components/nav"
import Header from "./components/header"
import Body from "./components/body"

const Dashboard = () => {
  return (
    <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Nav />
      </div>
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Body />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
