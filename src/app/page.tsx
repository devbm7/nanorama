import { ComponentInput } from "@/components/input/ComponentInput";
import { LayoutSelector } from "@/components/input/LayoutSelector";
import { GenerateButton } from "@/components/input/GenerateButton";
import { TabsPanel } from "@/components/poster/TabsPanel";
import { ExportPanel } from "@/components/export/ExportPanel";

export default function Home() {
  return (
    <div className="min-h-screen p-6 sm:p-10 max-w-6xl mx-auto space-y-6">
      <header className="flex items-center justify-between bg-popover text-popover-foreground rounded border border-sidebar-border shadow p-4">
        <h1 className="text-2xl font-bold tracking-tight">Nanorama</h1>
        <ExportPanel />
      </header>
      <section className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-6">
        <aside className="bg-sidebar text-sidebar-foreground rounded border border-sidebar-border shadow p-4 space-y-4">
          <div className="space-y-2">
            <h2 className="text-base font-semibold">Inputs</h2>
            <ComponentInput />
          </div>
          <div className="space-y-3">
            <h2 className="text-base font-semibold">Layout</h2>
            <LayoutSelector />
            <GenerateButton />
          </div>
        </aside>
        <TabsPanel />
      </section>
    </div>
  );
}
