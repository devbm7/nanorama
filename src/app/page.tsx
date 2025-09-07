import { ComponentInput } from "@/components/input/ComponentInput";
import { LayoutSelector } from "@/components/input/LayoutSelector";
import { GenerateButton } from "@/components/input/GenerateButton";
import { GeneratedOnly } from "@/components/poster/GeneratedOnly";
import { ExportPanel } from "@/components/export/ExportPanel";

export default function Home() {
  return (
    <div className="min-h-screen p-6 sm:p-10 max-w-6xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Nanorama</h1>
        <ExportPanel />
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Inputs</h2>
            <ComponentInput />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Layout</h2>
            <LayoutSelector />
            <GenerateButton />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Generated</h2>
          <div id="poster-canvas-root">
            <GeneratedOnly />
          </div>
        </div>
      </section>
    </div>
  );
}
