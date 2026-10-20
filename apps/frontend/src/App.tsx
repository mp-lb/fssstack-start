import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function App() {
  return (
    <main className="grid min-h-svh place-items-center p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Fssstack Start</CardTitle>
          <CardDescription>Configurator for Fssstack projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="button">Create a project</Button>
        </CardContent>
      </Card>
    </main>
  )
}
