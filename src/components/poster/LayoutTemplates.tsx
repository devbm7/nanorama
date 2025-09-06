import type { PosterComponent, LayoutTemplateId } from "@/types/poster";

interface LayoutProps {
  components: PosterComponent[];
}

function Single({ components }: LayoutProps) {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-4">
      {components.map((c) => (
        <ComponentRenderer key={c.id} component={c} />
      ))}
    </div>
  );
}

function SplitVertical({ components }: LayoutProps) {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-4 p-6">
      <div className="space-y-4">
        {components.filter((_, i) => i % 2 === 0).map((c) => (
          <ComponentRenderer key={c.id} component={c} />
        ))}
      </div>
      <div className="space-y-4">
        {components.filter((_, i) => i % 2 === 1).map((c) => (
          <ComponentRenderer key={c.id} component={c} />
        ))}
      </div>
    </div>
  );
}

function SplitHorizontal({ components }: LayoutProps) {
  return (
    <div className="w-full h-full grid grid-rows-2 gap-4 p-6">
      <div className="space-y-4">
        {components.filter((_, i) => i % 2 === 0).map((c) => (
          <ComponentRenderer key={c.id} component={c} />
        ))}
      </div>
      <div className="space-y-4">
        {components.filter((_, i) => i % 2 === 1).map((c) => (
          <ComponentRenderer key={c.id} component={c} />
        ))}
      </div>
    </div>
  );
}

function TripleColumn({ components }: LayoutProps) {
  return (
    <div className="w-full h-full grid grid-cols-3 gap-4 p-6">
      {[0, 1, 2].map((col) => (
        <div key={col} className="space-y-4">
          {components.filter((_, i) => i % 3 === col).map((c) => (
            <ComponentRenderer key={c.id} component={c} />
          ))}
        </div>
      ))}
    </div>
  );
}

function HeaderDual({ components }: LayoutProps) {
  const [header, ...rest] = components;
  return (
    <div className="w-full h-full grid grid-rows-[2fr_3fr] gap-4 p-6">
      {header && <ComponentRenderer component={header} />}
      <div className="grid grid-cols-2 gap-4">
        {rest.map((c) => (
          <ComponentRenderer key={c.id} component={c} />
        ))}
      </div>
    </div>
  );
}

function Grid2x2({ components }: LayoutProps) {
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4 p-6">
      {components.slice(0, 4).map((c) => (
        <ComponentRenderer key={c.id} component={c} />
      ))}
    </div>
  );
}

function HeroSidebar({ components }: LayoutProps) {
  return (
    <div className="w-full h-full grid grid-cols-[2fr_1fr] gap-4 p-6">
      <div className="space-y-4">
        {components.filter((_, i) => i % 3 !== 2).map((c) => (
          <ComponentRenderer key={c.id} component={c} />
        ))}
      </div>
      <div className="space-y-4">
        {components.filter((_, i) => i % 3 === 2).map((c) => (
          <ComponentRenderer key={c.id} component={c} />
        ))}
      </div>
    </div>
  );
}

export function ComponentRenderer({ component }: { component: PosterComponent }) {
  if (component.type === "text") {
    return (
      <div className="border rounded p-4">
        <p className="whitespace-pre-wrap text-sm sm:text-base">{component.content || "(Empty text)"}</p>
      </div>
    );
  }
  return (
    <div className="border rounded p-2 flex items-center justify-center min-h-24 bg-white">
      {component.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={component.url} alt={component.prompt} className="max-w-full max-h-80 object-contain" />
      ) : (
        <div className="text-xs opacity-70">{component.prompt || "(No prompt)"}</div>
      )}
    </div>
  );
}

export function LayoutTemplates({ id, components }: { id: LayoutTemplateId; components: PosterComponent[] }) {
  switch (id) {
    case "single":
      return <Single components={components} />;
    case "split-vertical":
      return <SplitVertical components={components} />;
    case "split-horizontal":
      return <SplitHorizontal components={components} />;
    case "triple-column":
      return <TripleColumn components={components} />;
    case "header-dual":
      return <HeaderDual components={components} />;
    case "grid-2x2":
      return <Grid2x2 components={components} />;
    case "hero-sidebar":
      return <HeroSidebar components={components} />;
    default:
      return <Single components={components} />;
  }
}


