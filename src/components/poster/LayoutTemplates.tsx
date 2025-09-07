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
        {components
          .filter((c) => c.slotIndex === 0 || (c.slotIndex == null && components.indexOf(c) % 2 === 0))
          .map((c) => (
          <ComponentRenderer key={c.id} component={c} />
        ))}
      </div>
      <div className="space-y-4">
        {components
          .filter((c) => c.slotIndex === 1 || (c.slotIndex == null && components.indexOf(c) % 2 === 1))
          .map((c) => (
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
        {components
          .filter((c) => c.slotIndex === 0 || (c.slotIndex == null && components.indexOf(c) % 2 === 0))
          .map((c) => (
          <ComponentRenderer key={c.id} component={c} />
        ))}
      </div>
      <div className="space-y-4">
        {components
          .filter((c) => c.slotIndex === 1 || (c.slotIndex == null && components.indexOf(c) % 2 === 1))
          .map((c) => (
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
          {components
            .filter((c) => c.slotIndex === col || (c.slotIndex == null && components.indexOf(c) % 3 === col))
            .map((c) => (
            <ComponentRenderer key={c.id} component={c} />
          ))}
        </div>
      ))}
    </div>
  );
}

function HeaderDual({ components }: LayoutProps) {
  const header = components.find((c) => c.slotIndex === 0) || components[0];
  const rest = components.filter((c) => c !== header);
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
      {[0, 1, 2, 3].map((slot) => (
        <div key={slot}>
          {components
            .filter((c) => c.slotIndex === slot || (c.slotIndex == null && components.indexOf(c) === slot))
            .map((c) => (
              <ComponentRenderer key={c.id} component={c} />
            ))}
        </div>
      ))}
    </div>
  );
}

function HeroSidebar({ components }: LayoutProps) {
  return (
    <div className="w-full h-full grid grid-cols-[2fr_1fr] gap-4 p-6">
      <div className="space-y-4">
        {components
          .filter((c) => c.slotIndex === 0 || (c.slotIndex == null && components.indexOf(c) % 3 !== 2))
          .map((c) => (
          <ComponentRenderer key={c.id} component={c} />
        ))}
      </div>
      <div className="space-y-4">
        {components
          .filter((c) => c.slotIndex === 1 || (c.slotIndex == null && components.indexOf(c) % 3 === 2))
          .map((c) => (
          <ComponentRenderer key={c.id} component={c} />
        ))}
      </div>
    </div>
  );
}

export function ComponentRenderer({ component }: { component: PosterComponent }) {
  
  if (component.type === "infoCard") {
    return (
      <div className="border rounded p-4 space-y-2">
        {component.title && <div className="font-semibold">{component.title}</div>}
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {(component.bullets || []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="border rounded p-2 flex items-center justify-center min-h-24 bg-white">
      {component.generatedUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={component.generatedUrl} alt={component.prompt} className="max-w-full max-h-80 object-contain" />
      ) : component.assetUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={component.assetUrl} alt={component.prompt} className="max-w-full max-h-80 object-contain" />
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


