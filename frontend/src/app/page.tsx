import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="text-center">
        <h1 className="text-5xl">Web Converter</h1>
        <p className="mt-4 text-lg">
          Simple, fast and reliable conversion between text, binary and hex.
        </p>
      </section>
      <Card className="flex-1 w-3/4 mt-24">
        <CardContent className="flex-1 flex justify-between gap-40 m-10">

          <Textarea placeholder="Enter text to convert" className="resize-none" />
          <Textarea placeholder="Result" className="resize-none" disabled />
        </CardContent>
      </Card>
    </main>
  );
}
