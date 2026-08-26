import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Barcode,
  Bell,
  Boxes,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Layers,
  LayoutGrid,
  ListChecks,
  MapPin,
  Package,
  Printer,
  Search,
  Target,
  Users,
  Workflow,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Navigation 2D — Centre de Biologie La Capitale" },
      {
        name: "description",
        content:
          "Console de navigation du site: techniques, localisations, utilitaires et inventaire du laboratoire.",
      },
      { property: "og:title", content: "Navigation 2D — Centre de Biologie La Capitale" },
      {
        property: "og:description",
        content:
          "Console de navigation du site: techniques, localisations, utilitaires et inventaire du laboratoire.",
      },
    ],
  }),
  component: Index,
});

const modules = [
  { label: "Rendez-vous", icon: CalendarDays },
  { label: "Portail", icon: LayoutGrid },
  { label: "Matériel", icon: Layers },
  { label: "Fiches qualité", icon: ClipboardCheck },
  { label: "Recherche", icon: Search },
  { label: "Gestion stock", icon: Package },
  { label: "Documents", icon: FileText },
  { label: "Docs / thème", icon: FileText },
  { label: "Objectifs", icon: Target },
  { label: "Projets", icon: Boxes },
  { label: "Processus", icon: Workflow },
];

const locations = [
  "DIRECTION",
  "SECRETARIAT",
  "PRELEVEMENT",
  "BIOCHIMIE",
  "IMMUNO-SERO-HEMATO",
  "MICROBIOLOGIE",
  "LAVERIE",
  "STOCK",
];

const utilitaires = [
  "Gestion de stock",
  "Documents classés ici",
  "Visualiser les audits",
  "Diffusion papier des documents",
  "Tâches associées",
  "Personnel qualifié",
];

const inventaire = [
  "Récapitulatif par fournisseur",
  "Récapitulatif par date",
  "Récapitulatif par produit",
  "Récapitulatif par produit (sans les quantités nulles)",
  "Récapitulatif par produit (vierge)",
  "Récapitulatif par lot",
  "Récapitulatif des produits déstockés",
];

function Panel({
  title,
  icon: Icon,
  items,
  active,
  onSelect,
}: {
  title: string;
  icon: typeof Layers;
  items: string[];
  active?: string;
  onSelect?: (item: string) => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-panel">
      <header className="flex items-center gap-2.5 border-b border-border bg-brand-soft px-5 py-3.5">
        <Icon className="size-4 shrink-0 text-accent-foreground" />
        <h2 className="truncate text-xs font-semibold tracking-[0.14em] text-accent-foreground uppercase">
          {title}
        </h2>
      </header>
      <ul className="divide-y divide-border/70">
        {items.map((item) => (
          <li key={item}>
            <button
              onClick={() => onSelect?.(item)}
              className={`group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-secondary ${
                active === item ? "bg-secondary font-medium text-primary" : "text-foreground"
              }`}
            >
              <span className="truncate">{item}</span>
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full bg-primary transition-opacity ${
                  active === item ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Index() {
  const [activeLocation, setActiveLocation] = useState("MICROBIOLOGIE");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-surface text-surface-foreground">
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-2.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand text-brand-foreground">
                <FlaskConical className="size-4" />
              </span>
              <span className="truncate">KaliLab</span>
            </div>
            <button className="hidden items-center gap-1.5 rounded-full bg-surface-foreground/10 px-3 py-1.5 text-xs font-medium sm:flex">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">Centre de Biologie La Capitale</span>
              <ChevronDown className="size-3.5 shrink-0 opacity-70" />
            </button>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="relative hidden md:block">
              <Barcode className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-surface-foreground/50" />
              <Input
                placeholder="Code barre"
                className="h-9 w-48 border-surface-foreground/15 bg-surface-foreground/10 pl-9 text-sm text-surface-foreground placeholder:text-surface-foreground/50 focus-visible:ring-brand"
              />
            </div>
            <button className="relative grid size-9 place-items-center rounded-full bg-surface-foreground/10">
              <Bell className="size-4" />
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 justify-center rounded-full bg-brand px-1 text-[10px] text-brand-foreground">
                82
              </Badge>
            </button>
            <span className="hidden text-xs font-medium tracking-wide opacity-80 lg:inline">
              SOMADIAG (SD)
            </span>
          </div>
        </div>

        <nav className="border-t border-surface-foreground/10">
          <div className="mx-auto flex max-w-[1600px] gap-1 overflow-x-auto px-4 pb-2 sm:px-6 [&::-webkit-scrollbar]:hidden">
            {modules.map(({ label, icon: Icon }, i) => (
              <button
                key={label}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  i === 0
                    ? "bg-surface-foreground/15 text-surface-foreground"
                    : "text-surface-foreground/70 hover:bg-surface-foreground/10 hover:text-surface-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Site
            </p>
            <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight sm:text-3xl">
              Centre de Biologie La Capitale
            </h1>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Printer className="size-4" />
              <span className="hidden sm:inline">Imprimer</span>
            </Button>
            <Button size="sm" className="gap-2">
              <ListChecks className="size-4" />
              <span className="hidden sm:inline">Matériel & techniques</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 flex gap-1 border-b border-border">
          {["Navigation 2D", "Plan du site", "Historique"].map((tab, i) => (
            <button
              key={tab}
              className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                i === 0
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-border bg-card p-5 shadow-panel lg:sticky lg:top-36 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Arborescence
            </p>
            <ul className="mt-3 space-y-0.5 border-l border-border pl-3">
              {locations.map((loc) => (
                <li key={loc}>
                  <button
                    onClick={() => setActiveLocation(loc)}
                    className={`w-full truncate rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                      activeLocation === loc
                        ? "bg-brand-soft font-semibold text-accent-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {loc}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5 text-xs text-secondary-foreground">
              <Users className="size-4 shrink-0" />
              <span className="truncate">12 opérateurs qualifiés</span>
            </div>
          </aside>

          <div className="space-y-6">
            <Panel title="Technique" icon={FlaskConical} items={["Portoirs de sérothèque"]} />
            <Panel title="Utilitaires" icon={LayoutGrid} items={utilitaires} />
          </div>

          <div className="space-y-6">
            <Panel
              title="Localisation"
              icon={MapPin}
              items={locations}
              active={activeLocation}
              onSelect={setActiveLocation}
            />
            <Panel title="Inventaire" icon={Package} items={inventaire} />
          </div>
        </div>
      </main>
    </div>
  );
}
